import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addFeedback, getFeedbacks } from "../feedbackStore"; // 🔥 EKLENDİ
import { getSelectedPatient } from "../patientStore";
import theme from "../styles/theme";

export default function Feedback() {
  const selected = getSelectedPatient();
  const [message, setMessage] = useState("");

  const history = getFeedbacks(); // 🔥 artık global store

  const sendFeedback = () => {
    if (!selected) {
      Alert.alert("Hasta seçilmedi", "Lütfen önce bir hasta seçin.");
      return;
    }
    if (message.trim() === "") {
      Alert.alert("Mesaj boş", "Lütfen göndermek için bir mesaj yazın.");
      return;
    }

    const entry = { to: selected, text: message.trim() };
    addFeedback(entry); // 🔥 global listeye ekliyoruz
    setMessage("");

    console.log("Feedback sent:", entry);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.palette.background },
        ]}
      >
        <View style={[styles.header, theme.elevation.low as any]}>
          <Text style={styles.title}>Geri Bildirim Gönder</Text>
          <Text style={styles.subtitle}>
            Seçili hastaya hızlıca geri bildirim gönderin.
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Seçili Hasta:</Text>
          <Text style={styles.selected}>
            {selected ?? "(Hiçbiri seçili değil)"}
          </Text>

          <Text style={styles.label}>Mesajınız</Text>
          <TextInput
            style={[styles.input, theme.elevation.low as any]}
            placeholder={
              selected
                ? `Geri bildirim yazın (${selected})`
                : "Önce bir hasta seçin"
            }
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.sendButton} onPress={sendFeedback}>
              <Text style={styles.sendButtonText}>Gönder</Text>
            </TouchableOpacity>
          </View>

          {history.length > 0 && (
            <View style={styles.history}>
              <Text style={styles.historyTitle}>
                Gönderilen Geri Bildirimler
              </Text>

              {history.map((h, i) => (
                <View
                  key={i}
                  style={[styles.historyItem, theme.elevation.low as any]}
                >
                  <Text style={styles.historyTo}>{h.to}:</Text>
                  <Text style={styles.historyText}>{h.text}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginTop: 16, marginLeft: 16, marginRight: 16 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    color: theme.palette.text,
  },
  subtitle: { marginBottom: 12, color: theme.palette.muted },
  content: { marginBottom: 16, marginLeft: 16, marginRight: 16 },
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
  sendButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  sendButtonText: { color: "#fff", fontWeight: "700" },
  history: { marginTop: 12 },
  historyTitle: {
    fontWeight: "700",
    marginBottom: 6,
    color: theme.palette.text,
  },
  historyItem: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.palette.surface,
  },
  historyTo: { fontWeight: "700", color: theme.palette.text },
  historyText: { marginTop: 4, color: theme.palette.text },
});
