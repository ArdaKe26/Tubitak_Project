import { router } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import theme from "./styles/theme";

export default function MainMenu(): React.ReactElement {
  const startButtonPressed = () => {
    router.push("/Panel_Seciniz");
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Nanose</Text>
        <Text style={styles.heroSubtitle}>Hasta yönetimi ve sağlık verileri</Text>
        <View style={styles.actionRow}>
          <View style={styles.primaryButton}>
            <Button title="Başla" color={"#fff"} onPress={startButtonPressed} />
          </View>
        </View>
      </View>
      <View style={[styles.card, theme.elevation.low]}>
        <Text style={styles.cardTitle}>Hızlı başla</Text>
        <Text style={styles.cardText}>Hastaları ekleyin ve ilk ölçümlerinizi yükleyin.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.palette.background, padding: theme.spacing.md },
  hero: { backgroundColor: theme.palette.primary, padding: theme.spacing.lg, borderRadius: 16, alignItems: "center" },
  heroTitle: { fontSize: theme.typography.h1, fontWeight: "800", color: "#fff" },
  heroSubtitle: { color: "rgba(255,255,255,0.9)", marginTop: theme.spacing.sm },
  actionRow: { marginTop: theme.spacing.md },
  primaryButton: { backgroundColor: theme.palette.accent, borderRadius: 12, overflow: "hidden" },
  card: { backgroundColor: theme.palette.surface, padding: theme.spacing.md, borderRadius: 12, marginTop: theme.spacing.md },
  cardTitle: { fontWeight: "700", fontSize: theme.typography.h3, color: theme.palette.text },
  cardText: { color: theme.palette.muted, marginTop: theme.spacing.sm },
});
