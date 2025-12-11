import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import theme from "../styles/theme";
import {
  getPatients,
  getSelectedPatient,
  setSelectedPatient,
} from "../patientStore";

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

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={feedback_pressed}>
            <Text style={styles.primaryButtonText}>Geri Bildirim Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.palette.background },
  header: { padding: theme.spacing.md },
  title: { fontSize: theme.typography.h2, fontWeight: "700", color: theme.palette.text },
  subtitle: { color: theme.palette.muted, marginTop: 6 },
  content: { paddingHorizontal: theme.spacing.md },
  selectBox: { borderRadius: 10, borderColor: theme.palette.border, backgroundColor: theme.palette.surface, paddingHorizontal: theme.spacing.sm },
  dropdown: { borderRadius: 10 },
  infoCard: { marginTop: theme.spacing.md, padding: theme.spacing.md, borderRadius: 12, backgroundColor: theme.palette.surface },
  selectedText: { fontSize: 18, marginTop: 0, color: theme.palette.text },
  buttonRow: { marginTop: theme.spacing.lg, width: 180 },
  primaryButton: { backgroundColor: theme.palette.primaryDark, borderRadius: 10, overflow: "hidden", paddingVertical: 10, alignItems: "center" },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
