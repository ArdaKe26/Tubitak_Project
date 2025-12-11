import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSelectedPatient } from "../patientStore";
import theme from "../styles/theme";

export default function Feedback() {
  const selected = getSelectedPatient();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<{ to: string; text: string }[]>([]);

  const sendFeedback = () => {
    if (!selected) {
      Alert.alert("Hasta seçilmedi", "Lütfen önce bir hasta seçin.");
      return;
    }
    if (message.trim() === "") {
      Alert.alert("Mesaj boş", "Lütfen göndermek için bir mesaj yazın.");
      return;
    }

    // For now store feedback in local history and log it. Replace with API call if needed.
    const entry = { to: selected, text: message.trim() };
    setHistory((h) => [entry, ...h]);
    setMessage("");
    // Alert.alert(
    //   "Gönderildi",
    //   `Geri bildirim ${selected} kullanıcısına gönderildi.`
    // );
    console.log("Feedback sent:", entry);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.palette.background }]}>
      <View style={[styles.header, theme.elevation.low as any]}>
        <Text style={styles.title}>Geri Bildirim Gönder</Text>
        <Text style={styles.subtitle}>Seçili hastaya hızlıca geri bildirim gönderin.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Seçili Hasta:</Text>
        <Text style={styles.selected}>{selected ?? "(Hiçbiri seçili değil)"}</Text>

        <Text style={styles.label}>Mesajınız</Text>
        <TextInput
          style={[styles.input, theme.elevation.low as any]}
          placeholder={selected ? `Geri bildirim yazın (${selected})` : "Önce bir hasta seçin"}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.sendButton} onPress={sendFeedback}>
            <Text style={styles.sendButtonText}>Gönder</Text>
          </TouchableOpacity>
        </View>

        {history.length > 0 && (
          <View style={styles.history}>
            <Text style={styles.historyTitle}>Gönderilen Geri Bildirimler</Text>
            {history.map((h, idx) => (
              <View key={idx} style={[styles.historyItem, theme.elevation.low as any]}>
                <Text style={styles.historyTo}>{h.to}:</Text>
                <Text style={styles.historyText}>{h.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 4, color: theme.palette.text },
  subtitle: { marginBottom: 12, color: theme.palette.muted },
  content: { padding: 16 },
  label: { fontWeight: "600", marginTop: 8, color: theme.palette.text },
  selected: { marginBottom: 8, color: theme.palette.text },
  input: {
    borderWidth: 0,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 12,
    backgroundColor: theme.palette.surface,
  },
  buttonRow: { marginBottom: 12 },
  sendButton: { backgroundColor: theme.palette.primary, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, alignItems: "center" },
  sendButtonText: { color: "#fff", fontWeight: "700" },
  history: { marginTop: 12 },
  historyTitle: { fontWeight: "700", marginBottom: 6, color: theme.palette.text },
  historyItem: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.palette.surface,
  },
  historyTo: { fontWeight: "700", color: theme.palette.text },
  historyText: { marginTop: 4, color: theme.palette.text },
});
