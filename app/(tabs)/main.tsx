import { getAuth, signOut } from "@firebase/auth";
import { router } from "expo-router";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // Redirect to login page after sign out
      router.replace("/Panel_Seciniz");
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Çıkış Hatası", err.message);
      } else {
        Alert.alert("Çıkış Hatası", "Bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <View>
      <Text>Main Screen</Text>
      <Text>
        Here users will be able to see their helath data that has been recorded
        and analyzed from their breath samples
      </Text>

      <Text>Analiz Sonuçları:</Text>

      <Text> - Son 1 Ay: </Text>
      <Text> - Son 3 Ay: </Text>
      <Text> - Son 6 Ay: </Text>
      <Text> - Son 1 Yıl: </Text>

      <View style={styles.logoutWrapper}>
        <Button title="Çıkış Yap" color="#d9534f" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  logoutWrapper: {
    marginTop: 20,
    alignSelf: "center",
    width: 200,
  },
});
