import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Use runtime require for the native BLE lib to avoid build errors when it's not installed.
// Types are kept as `any` here so the project can compile even before the dependency is added.

type DeviceItem = {
  id: string;
  name?: string | null;
  raw?: any;
};

export default function HomeScreen(): React.ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  const [connectedDeviceId, setConnectedDeviceId] = useState<string | null>(
    null
  );

  const managerRef = useRef<any | null>(null);

  const getManager = () => {
    if (!managerRef.current) {
      try {
        // lazy require so we don't trigger native initialization at module import
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const BleModule = require("react-native-ble-plx");
        const BleManagerCtor =
          BleModule?.BleManager ?? BleModule?.default ?? BleModule;
        if (!BleManagerCtor)
          throw new Error("BleManager constructor not found");
        managerRef.current = new BleManagerCtor();
      } catch (e) {
        console.warn("Failed to create BleManager (native module missing)", e);
        managerRef.current = null;
      }
    }
    return managerRef.current;
  };

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== "android") return true;

    try {
      const sdkInt = Platform.Version as number;
      // Android 12 (API 31) and above require BLUETOOTH_SCAN and BLUETOOTH_CONNECT
      if (sdkInt >= 31) {
        const perms = [
          "android.permission.BLUETOOTH_SCAN",
          "android.permission.BLUETOOTH_CONNECT",
        ];
        // Optionally request location for discovery on some devices
        perms.push("android.permission.ACCESS_FINE_LOCATION");
        const res = await PermissionsAndroid.requestMultiple(perms as any);
        const allGranted = Object.values(res).every(
          (v) => v === PermissionsAndroid.RESULTS.GRANTED
        );
        return allGranted;
      }

      // Older Androids: require location
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Bluetooth taraması için konum izni gereklidir",
          buttonPositive: "Tamam",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn("Permission error", err);
      return false;
    }
  }, []);

  const startScan = useCallback(async () => {
    setDevices([]);
    const ok = await requestPermissions();
    if (!ok) {
      Alert.alert(
        "İzin gerekli",
        "Bluetooth taraması için gerekli izin verilmedi."
      );
      return;
    }

    setScanning(true);
    const manager = getManager();

    // If manager couldn't be created (native module not linked / Expo managed),
    // inform the developer and stop — we do NOT run a mock scan when the user
    // requested a real BLE page.
    if (!manager) {
      Alert.alert(
        "Native BLE yok",
        "Cihazda `react-native-ble-plx` native modülü bulunamadı.\nExpo managed ise `npx expo prebuild` veya eject yapmanız gerekir. Gerçek BLE için native modül gereklidir."
      );
      setScanning(false);
      return;
    }

    manager.startDeviceScan(null, null, (error: any, device: any) => {
      if (error) {
        console.warn("BLE scan error", error);
        setScanning(false);
        try {
          manager.stopDeviceScan();
        } catch (e) {}
        return;
      }
      if (device && device.id) {
        setDevices((prev) => {
          if (prev.find((p) => p.id === device.id)) return prev;
          return [
            ...prev,
            { id: device.id, name: device.name ?? undefined, raw: device },
          ];
        });
      }
    });

    setTimeout(() => {
      try {
        manager.stopDeviceScan();
      } catch (e) {}
      setScanning(false);
    }, 8000);
  }, [requestPermissions]);

  useEffect(() => {
    if (!modalVisible) {
      try {
        const m = managerRef.current;
        if (m) m.stopDeviceScan();
      } catch (e) {}
      setScanning(false);
      setDevices([]);
    }
  }, [modalVisible]);

  useEffect(() => {
    return () => {
      try {
        const m = managerRef.current;
        if (m) {
          m.destroy();
          managerRef.current = null;
        }
      } catch (e) {}
    };
  }, []);

  const openBluetoothModal = () => {
    setModalVisible(true);
    setTimeout(() => startScan(), 250);
  };

  const connectToDevice = async (device: DeviceItem) => {
    setScanning(false);
    const manager = getManager();
    try {
      if (device.raw) {
        const connected = await device.raw.connect();
        await connected.discoverAllServicesAndCharacteristics();
        setConnectedDeviceId(connected.id);
        setModalVisible(false);
        Alert.alert("Bağlandı", `${device.name ?? device.id} cihaza bağlandı`);
        return;
      }

      const d = await manager.connectToDevice(device.id);
      await d.discoverAllServicesAndCharacteristics();
      setConnectedDeviceId(d.id);
      setModalVisible(false);
      Alert.alert("Bağlandı", `${device.name ?? device.id} cihaza bağlandı`);
    } catch (err) {
      console.warn("Connect error", err);
      Alert.alert("Hata", "Cihaza bağlanılamadı");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Cihazlar</Text>
        <Text style={styles.subtitle}>
          Bluetooth aracılığıyla cihaz bağlamak için butona tıklayın.
        </Text>

        <View style={styles.buttonRow}>
          <Button title="Bluetooth Bağla" onPress={openBluetoothModal} />
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cihaz Tarama</Text>
          {scanning ? (
            <ActivityIndicator size="large" />
          ) : (
            <Text style={styles.hint}>{devices.length} cihaz bulundu</Text>
          )}

          <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.deviceItem}
                onPress={() => connectToDevice(item)}
              >
                <Text style={styles.deviceName}>{item.name ?? item.id}</Text>
                <Text style={styles.deviceId}>{item.id}</Text>
                {connectedDeviceId === item.id ? (
                  <Text style={{ color: "green" }}>Bağlandı</Text>
                ) : null}
              </TouchableOpacity>
            )}
            ListEmptyComponent={() =>
              !scanning ? <Text>Hiç cihaz bulunamadı</Text> : null
            }
          />

          <View style={styles.modalButtons}>
            <Button
              title={scanning ? "Duraklat" : "Yeniden Tara"}
              onPress={() => (scanning ? setScanning(false) : startScan())}
            />
            <Button title="Kapat" onPress={() => setModalVisible(false)} />
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.noteTitle}>Not</Text>
            <Text style={styles.noteText}>
              Gerçek Bluetooth desteği için `react-native-ble-plx` veya uygun
              bir BLE kütüphanesi kurmanız ve Android/iOS izinlerini (location,
              bluetooth) yönetmeniz gerekir.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  content: { flex: 1 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#666", marginBottom: 16 },
  buttonRow: { width: 180 },
  modalContainer: { flex: 1, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  hint: { marginBottom: 8 },
  deviceItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  deviceName: { fontWeight: "600" },
  deviceId: { color: "#666", fontSize: 12 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  footerNote: { marginTop: 16 },
  noteTitle: { fontWeight: "700" },
  noteText: { color: "#666" },
});
