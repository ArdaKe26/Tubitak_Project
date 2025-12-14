import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import theme from "../styles/theme";

export default function TabTwoScreen(): React.ReactElement {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    setChat((prev) => [...prev, message.trim()]);
    setMessage("");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.top}>
            <View style={styles.hero}>
              <Text style={styles.title}>AI Asistanı</Text>
              <Text style={styles.subtitle}>
                Nefes sağlığınız hakkında yapay zeka destekli sohbet ve öneriler
                alabilirsiniz.
              </Text>
            </View>
          </View>

          <ScrollView
            style={styles.chatArea}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {chat.map((msg, i) => (
              <View key={i} style={styles.bubbleWrapper}>
                <View style={[styles.bubble, theme.elevation.low as any]}>
                  <Text style={styles.bubbleText}>{msg}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textBox}
                placeholder="Mesaj yaz..."
                placeholderTextColor="#999"
                value={message}
                onChangeText={setMessage}
              />

              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Text style={styles.sendButtonText}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.palette.background,
  },

  container: {
    flex: 1,
    padding: theme.spacing.md,
  },

  top: {},

  hero: {
    backgroundColor: theme.palette.primaryLight,
    padding: theme.spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },

  title: {
    fontSize: theme.typography.h2,
    fontWeight: "800",
    color: theme.palette.text,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    color: theme.palette.primaryDark,
  },

  card: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  cardTitle: { fontWeight: "700", color: theme.palette.text },
  cardText: { color: theme.palette.muted, marginTop: theme.spacing.sm },

  chatArea: {
    flex: 1,
    marginTop: theme.spacing.md,
  },

  bubbleWrapper: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    backgroundColor: theme.palette.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.palette.border,
  },

  bubbleText: {
    color: theme.palette.text,
  },

  footer: {
    paddingBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textBox: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    borderColor: theme.palette.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: theme.spacing.md,
  },

  sendButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  sendButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
