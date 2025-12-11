import { getAuth, signOut } from "@firebase/auth";
import { router } from "expo-router";
import React from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import theme from "../styles/theme";

export default function TabTwoScreen(): React.ReactElement {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      // Redirect to login page after sign out
      router.replace("/Panel_Seciniz");
    } catch (err: unknown) {
      if (err instanceof Error) {
        Alert.alert("Çıkış Hatası", err.message);
      } else {
        Alert.alert("Çıkış Hatası", "Bilinmeyen bir hata oluştu.");
      }
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.header, theme.elevation.low as any]}>
        <Text style={styles.title}>Analizler</Text>
        <Text style={styles.subtitle}>Nefes örneklerinizden elde edilen sağlık verileri</Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, theme.elevation.low as any]}>
          <Text style={styles.metricValue}>—</Text>
          <Text style={styles.metricLabel}>Son 1 Ay</Text>
        </View>
        <View style={[styles.metricCard, theme.elevation.low as any]}>
          <Text style={styles.metricValue}>—</Text>
          <Text style={styles.metricLabel}>Son 3 Ay</Text>
        </View>
      </View>

      <View style={styles.logoutWrapper}>
        <View style={styles.dangerButton}>
          <Button title="Çıkış Yap" color={"#fff"} onPress={handleLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.palette.background, padding: theme.spacing.md },
  header: { paddingVertical: theme.spacing.md },
  title: { fontSize: theme.typography.h2, fontWeight: "700", color: theme.palette.text },
  subtitle: { color: theme.palette.muted, marginTop: 6 },
  card: { backgroundColor: theme.palette.surface, padding: theme.spacing.md, borderRadius: 12, marginTop: theme.spacing.md },
  sectionTitle: { fontWeight: "700", color: theme.palette.text, marginBottom: theme.spacing.sm },
  item: { color: theme.palette.text, marginBottom: 6 },
  logoutWrapper: { marginTop: theme.spacing.lg, alignSelf: "center", width: 200 },
  metricsRow: { flexDirection: "row", gap: theme.spacing.md, marginTop: theme.spacing.md },
  metricCard: { flex: 1, backgroundColor: theme.palette.surface, padding: theme.spacing.md, borderRadius: 12, alignItems: "center" },
  metricValue: { fontSize: 20, fontWeight: "700", color: theme.palette.primaryDark },
  metricLabel: { color: theme.palette.muted, marginTop: 6 },
  dangerButton: { backgroundColor: theme.palette.danger, borderRadius: 10, overflow: "hidden", width: 200 },
});
