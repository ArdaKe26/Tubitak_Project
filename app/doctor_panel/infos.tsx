import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
  getPatients,
  getSelectedPatient,
  setSelectedPatient,
} from "../patientStore";
import theme from "../styles/theme";

export default function Infos(): React.ReactElement {
  const [selected, setSelected] = React.useState("");

  const [data, setData] = useState<{ key: string; value: string }[]>([]);
  const [defaultOption, setDefaultOption] = useState<
    { key: string; value: string } | undefined
  >(undefined);

  useEffect(() => {
    const patients = getPatients();
    const mapped = patients.map((p) => ({ key: p, value: p }));
    setData(mapped);
    const sel = getSelectedPatient();
    if (sel) {
      setSelected(sel);
      const opt = mapped.find((m) => m.value === sel);
      if (opt) setDefaultOption(opt);
    } else {
      setDefaultOption(undefined);
    }
  }, []);

  const texty = (): string => {
    if (!selected) return "No patients have been selected";
    return selected;
  };

  const feedback_pressed = () => {
    router.push("/doctor_panel/feedback");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={[styles.header, theme.elevation.low as any]}>
          <Text style={styles.title}>Patient Info</Text>
          <Text style={styles.subtitle}>Select a patient to see details</Text>
        </View>

        <View style={styles.content}>
          <SelectList
            setSelected={(val: string) => {
              setSelected(val);
              try {
                setSelectedPatient(val);
              } catch (e) {}
            }}
            data={data}
            save="value"
            defaultOption={defaultOption}
            boxStyles={styles.selectBox}
            dropdownStyles={styles.dropdown}
          />

          <View style={[styles.infoCard, theme.elevation.medium as any]}>
            <Text style={styles.selectedText}>{texty()}</Text>
          </View>

          <View style={styles.metricsRow}>
            <View style={[styles.metricCard, theme.elevation.low as any]}>
              <Text style={styles.metricValue}>72</Text>
              <Text style={styles.metricLabel}>Son 1 Ay</Text>
            </View>
            <View style={[styles.metricCard, theme.elevation.low as any]}>
              <Text style={styles.metricValue}>68</Text>
              <Text style={styles.metricLabel}>Son 3 Ay</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={[styles.metricCard, theme.elevation.low as any]}>
              <Text style={styles.metricValue}>65</Text>
              <Text style={styles.metricLabel}>Son 6 Ay</Text>
            </View>
            <View style={[styles.metricCard, theme.elevation.low as any]}>
              <Text style={styles.metricValue}>61</Text>
              <Text style={styles.metricLabel}>Son 1 Yıl</Text>
            </View>
          </View>

          {/* EK ANALİZ 1: TREND */}
          <Text style={styles.sectionHeader}>Genel Eğilim</Text>
          <View style={styles.metricsRow}>
            <View style={[styles.trendCard, theme.elevation.low as any]}>
              <Text style={styles.trendTitle}>Stabilite</Text>
              <Text style={styles.trendValue}>84%</Text>
              <Text style={styles.trendSub}>Genel değişim</Text>
            </View>
            <View style={[styles.trendCard, theme.elevation.low as any]}>
              <Text style={styles.trendTitle}>İyileşme</Text>
              <Text style={styles.trendValue}>+12%</Text>
              <Text style={styles.trendSub}>Son ay</Text>
            </View>
          </View>

          {/* EK ANALİZ 2: ORTALAMALAR */}
          <Text style={styles.sectionHeader}>Ortalama Değerler</Text>
          <View style={styles.metricsRow}>
            <View style={[styles.avgCard, theme.elevation.low as any]}>
              <Text style={styles.avgTitle}>VOC Seviyesi</Text>
              <Text style={styles.avgValue}>320 ppm</Text>
            </View>

            <View style={[styles.avgCard, theme.elevation.low as any]}>
              <Text style={styles.avgTitle}>Nem Etkisi</Text>
              <Text style={styles.avgValue}>45%</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={[styles.avgCard, theme.elevation.low as any]}>
              <Text style={styles.avgTitle}>Solunum Kalitesi</Text>
              <Text style={styles.avgValue}>78 / 100</Text>
            </View>

            <View style={[styles.avgCard, theme.elevation.low as any]}>
              <Text style={styles.avgTitle}>Kararlılık Skoru</Text>
              <Text style={styles.avgValue}>A−</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={feedback_pressed}
            >
              <Text style={styles.primaryButtonText}>Geri Bildirim Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.palette.background },
  header: { padding: theme.spacing.md },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    color: theme.palette.text,
  },
  subtitle: { color: theme.palette.muted, marginTop: 6 },
  content: { paddingHorizontal: theme.spacing.md },
  selectBox: {
    borderRadius: 10,
    borderColor: theme.palette.border,
    backgroundColor: theme.palette.surface,
    paddingHorizontal: theme.spacing.sm,
  },
  dropdown: { borderRadius: 10 },
  infoCard: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: 12,
    backgroundColor: theme.palette.surface,
  },
  selectedText: { fontSize: 18, marginTop: 0, color: theme.palette.text },
  buttonRow: { marginTop: theme.spacing.lg, width: 180, marginBottom: 10 },
  primaryButton: {
    backgroundColor: theme.palette.primaryDark,
    borderRadius: 10,
    overflow: "hidden",
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  metricsRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.palette.primaryDark,
  },
  metricLabel: { color: theme.palette.muted, marginTop: 6 },

  /* TREND KARTLARI */
  sectionHeader: {
    marginTop: theme.spacing.lg,
    marginLeft: theme.spacing.md,
    fontWeight: "700",
    color: theme.palette.text,
    fontSize: theme.typography.body,
  },
  trendCard: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  trendTitle: {
    fontWeight: "600",
    color: theme.palette.text,
  },
  trendValue: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.palette.primaryDark,
    marginTop: 6,
  },
  trendSub: {
    marginTop: 4,
    color: theme.palette.muted,
  },

  /* ORTALAMA KARTLARI */
  avgCard: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  avgTitle: {
    fontWeight: "600",
    color: theme.palette.text,
  },
  avgValue: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.palette.primaryDark,
    marginTop: 8,
  },
});
