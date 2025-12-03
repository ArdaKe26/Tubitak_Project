import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getSelectedPatient } from "../patientStore";

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
    Alert.alert(
      "Gönderildi",
      `Geri bildirim ${selected} kullanıcısına gönderildi.`
    );
    console.log("Feedback sent:", entry);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback Screen</Text>
      <Text style={styles.subtitle}>
        Burada doktorlar, `Infos` sayfasında seçili hastaya geri dönüş
        sağlayabilir.
      </Text>

      <Text style={styles.label}>Seçili Hasta:</Text>
      <Text style={styles.selected}>
        {selected ?? "(Hiçbiri seçili değil)"}
      </Text>

      <Text style={styles.label}>Mesajınız</Text>
      <TextInput
        style={styles.input}
        placeholder={
          selected
            ? `Geri bildirim yazın (${selected})`
            : "Önce bir hasta seçin"
        }
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <View style={styles.buttonRow}>
        <Button title="Gönder" onPress={sendFeedback} />
      </View>

      {history.length > 0 && (
        <View style={styles.history}>
          <Text style={styles.historyTitle}>Gönderilen Geri Bildirimler</Text>
          {history.map((h, idx) => (
            <View key={idx} style={styles.historyItem}>
              <Text style={styles.historyTo}>{h.to}:</Text>
              <Text style={styles.historyText}>{h.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  subtitle: { marginBottom: 12, color: "#666" },
  label: { fontWeight: "600", marginTop: 8 },
  selected: { marginBottom: 8, color: "#222" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  buttonRow: { marginBottom: 12 },
  history: { marginTop: 12 },
  historyTitle: { fontWeight: "700", marginBottom: 6 },
  historyItem: {
    marginBottom: 8,
    backgroundColor: "#f4f4f4",
    padding: 8,
    borderRadius: 6,
  },
  historyTo: { fontWeight: "700" },
  historyText: { marginTop: 4 },
});
