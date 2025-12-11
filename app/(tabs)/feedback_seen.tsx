import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import theme from "../styles/theme";

export default function FeedbackSeen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.header, theme.elevation.low as any]}>
        <Text style={styles.title}>Gelen Geri Bildirimler</Text>
        <Text style={styles.subtitle}>Doktorunuzun size verdiği geri bildirimleri burada görüntüleyebilirsiniz.</Text>
      </View>

      <View style={styles.listWrap}>
        <View style={[styles.feedbackItem, theme.elevation.low as any]}>
          <Text style={styles.feedbackTitle}>Örnek Geri Bildirim</Text>
          <Text style={styles.feedbackText}>Düzenli egzersiz nefes sağlığını iyileştirebilir.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.palette.background, padding: theme.spacing.md },
  header: { padding: theme.spacing.md, borderRadius: 12, backgroundColor: theme.palette.surface },
  title: { fontSize: theme.typography.h2, fontWeight: "700", color: theme.palette.text },
  subtitle: { marginTop: theme.spacing.sm, color: theme.palette.muted },
  listWrap: { marginTop: theme.spacing.md },
  feedbackItem: { backgroundColor: theme.palette.surface, padding: theme.spacing.md, borderRadius: 12, marginBottom: theme.spacing.sm },
  feedbackTitle: { fontWeight: "700", color: theme.palette.text },
  feedbackText: { color: theme.palette.muted, marginTop: theme.spacing.sm },
});
