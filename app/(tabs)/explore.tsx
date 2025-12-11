import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import theme from "../styles/theme";

export default function TabTwoScreen(): React.ReactElement {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.title}>AI Asistanı</Text>
        <Text style={styles.subtitle}>Nefes sağlığınız hakkında yapay zeka destekli sohbet ve öneriler alabilirsiniz.</Text>
      </View>

      <View style={[styles.card, theme.elevation.low as any]}>
        <Text style={styles.cardTitle}>Sohbet başlat</Text>
        <Text style={styles.cardText}>Kısa bir sohbet başlatarak öneriler alın.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.palette.background, padding: theme.spacing.md },
  hero: { backgroundColor: theme.palette.primaryLight, padding: theme.spacing.lg, borderRadius: 12, alignItems: "center" },
  title: { fontSize: theme.typography.h2, fontWeight: "800", color: theme.palette.primaryDark },
  subtitle: { marginTop: theme.spacing.sm, color: theme.palette.primaryDark },
  card: { marginTop: theme.spacing.md, backgroundColor: theme.palette.surface, padding: theme.spacing.md, borderRadius: 12 },
  cardTitle: { fontWeight: "700", color: theme.palette.text },
  cardText: { color: theme.palette.muted, marginTop: theme.spacing.sm },
});
