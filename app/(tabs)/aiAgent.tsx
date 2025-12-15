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

/* MESAJ TİPİ */
type ChatMessage = {
  text: string;
  from: "user" | "ai";
};

export default function TabTwoScreen(): React.ReactElement {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const userMessage = message.trim();

    /* KULLANICI MESAJI */
    setChat((prev) => [...prev, { text: userMessage, from: "user" }]);

    setMessage("");

    /* SAHTE AI CEVABI (DEMO İÇİN) */
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        {
          text: "Verileriniz analiz edildi. Mevcut ölçümlere göre solunum değerleriniz stabil görünüyor. Düzenli ölçüm yapmaya devam etmeniz önerilir.",
          from: "ai",
        },
      ]);
    }, 600);
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
          {/* ÜST BÖLÜM */}
          <View style={styles.hero}>
            <Text style={styles.title}>AI Asistanı</Text>
            <Text style={styles.subtitle}>
              Nefes sağlığınız hakkında yapay zeka destekli sohbet ve öneriler
            </Text>
          </View>

          {/* CHAT ALANI */}
          <ScrollView
            style={styles.chatArea}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {chat.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.bubbleWrapper,
                  msg.from === "ai" && { alignItems: "flex-start" },
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    theme.elevation.low as any,
                    msg.from === "ai" && styles.aiBubble,
                  ]}
                >
                  <Text style={styles.bubbleText}>{msg.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* ALT GİRİŞ */}
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

/* STYLES */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.palette.background,
  },

  container: {
    flex: 1,
    padding: theme.spacing.md,
  },

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
    textAlign: "center",
  },

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

  aiBubble: {
    backgroundColor: theme.palette.primaryLight,
    borderColor: theme.palette.primary,
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
