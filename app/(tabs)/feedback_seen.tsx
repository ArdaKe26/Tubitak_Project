import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getFeedbacks } from "../feedbackStore";
import theme from "../styles/theme";

export default function FeedbackSeen() {
  const feedbacks = getFeedbacks();

  return (
    <View style={{ flex: 1, backgroundColor: theme.palette.background }}>
      <SafeAreaView style={styles.screen}>
        <View style={[styles.header, theme.elevation.low as any]}>
          <Text style={styles.title}>Gelen Geri Bildirimler</Text>
          <Text style={styles.subtitle}>
            Doktorunuzun size verdiği geri bildirimleri burada
            görüntüleyebilirsiniz.
          </Text>
        </View>

        <View style={styles.listWrap}>
          {feedbacks.length === 0 && (
            <Text style={{ color: theme.palette.muted }}>
              Henüz geri bildirim yok.
            </Text>
          )}

          {feedbacks.map((f, i) => (
            <View
              key={i}
              style={[styles.feedbackItem, theme.elevation.low as any]}
            >
              <Text style={styles.feedbackTitle}>{f.to}</Text>
              <Text style={styles.feedbackText}>{f.text}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.palette.background,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  header: {
    padding: theme.spacing.md,
    borderRadius: 12,
    marginTop: theme.spacing.md,
    backgroundColor: theme.palette.surface,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    color: theme.palette.text,
  },
  subtitle: { marginTop: theme.spacing.sm, color: theme.palette.muted },
  listWrap: { marginTop: theme.spacing.md },
  feedbackItem: {
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
  },
  feedbackTitle: { fontWeight: "700", color: theme.palette.text },
  feedbackText: { color: theme.palette.muted, marginTop: theme.spacing.sm },
});
