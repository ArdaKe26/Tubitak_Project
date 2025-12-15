import { getAuth, signOut } from "@firebase/auth";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import theme from "../styles/theme";

export default function TabTwoScreen(): React.ReactElement {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
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
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View style={[styles.header, theme.elevation.low as any]}>
          <Text style={styles.title}>Analizler</Text>
          <Text style={styles.subtitle}>
            Nefes örneklerinizden elde edilen sağlık verileri
          </Text>
        </View>

        {/* ANA METRİKLER */}
        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, theme.elevation.low as any]}>
            <Text style={styles.metricValue}>72</Text>
            <Text style={styles.metricLabel}>Son 1 Ay</Text>
          </View>
          <View style={[styles.metricCard, theme.elevation.low as any]}>
            <Text style={styles.metricValue}>68</Text>
            <Text style={styles.metricLabel}>Son 3 Ay</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, theme.elevation.low as any]}>
            <Text style={styles.metricValue}>65</Text>
            <Text style={styles.metricLabel}>Son 6 Ay</Text>
          </View>
          <View style={[styles.metricCard, theme.elevation.low as any]}>
            <Text style={styles.metricValue}>61</Text>
            <Text style={styles.metricLabel}>Son 1 Yıl</Text>
          </View>
        </View>

        {/* EK ANALİZ 1: TREND */}
        <Text style={styles.sectionHeader}>Genel Eğilim</Text>
        <View style={styles.metricsRow}>
          <View style={[styles.trendCard, theme.elevation.low as any]}>
            <Text style={styles.trendTitle}>Stabilite</Text>
            <Text style={styles.trendValue}>84%</Text>
            <Text style={styles.trendSub}>Genel değişim</Text>
          </View>
          <View style={[styles.trendCard, theme.elevation.low as any]}>
            <Text style={styles.trendTitle}>İyileşme</Text>
            <Text style={styles.trendValue}>+12%</Text>
            <Text style={styles.trendSub}>Son ay</Text>
          </View>
        </View>

        {/* EK ANALİZ 2: ORTALAMALAR */}
        <Text style={styles.sectionHeader}>Ortalama Değerler</Text>
        <View style={styles.metricsRow}>
          <View style={[styles.avgCard, theme.elevation.low as any]}>
            <Text style={styles.avgTitle}>VOC Seviyesi</Text>
            <Text style={styles.avgValue}>320 ppm</Text>
          </View>

          <View style={[styles.avgCard, theme.elevation.low as any]}>
            <Text style={styles.avgTitle}>Nem Etkisi</Text>
            <Text style={styles.avgValue}>45%</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={[styles.avgCard, theme.elevation.low as any]}>
            <Text style={styles.avgTitle}>Solunum Kalitesi</Text>
            <Text style={styles.avgValue}>78 / 100</Text>
          </View>

          <View style={[styles.avgCard, theme.elevation.low as any]}>
            <Text style={styles.avgTitle}>Kararlılık Skoru</Text>
            <Text style={styles.avgValue}>A−</Text>
          </View>
        </View>

        {/* ÇIKIŞ */}
        <View style={styles.logoutWrapper}>
          <View style={styles.dangerButton}>
            <Button title="Çıkış Yap" color={"#fff"} onPress={handleLogout} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.palette.background,
    padding: theme.spacing.md,
  },
  header: { paddingVertical: theme.spacing.md },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: "700",
    color: theme.palette.text,
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  subtitle: {
    color: theme.palette.muted,
    marginTop: 6,
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },

  /* ANA KARTLAR */
  metricsRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginRight: theme.spacing.md,
    marginLeft: theme.spacing.md,
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.palette.primaryDark,
  },
  metricLabel: { color: theme.palette.muted, marginTop: 6 },

  /* TREND KARTLARI */
  sectionHeader: {
    marginTop: theme.spacing.lg,
    marginLeft: theme.spacing.md,
    fontWeight: "700",
    color: theme.palette.text,
    fontSize: theme.typography.body,
  },
  trendCard: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  trendTitle: {
    fontWeight: "600",
    color: theme.palette.text,
  },
  trendValue: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.palette.primaryDark,
    marginTop: 6,
  },
  trendSub: {
    marginTop: 4,
    color: theme.palette.muted,
  },

  /* ORTALAMA KARTLARI */
  avgCard: {
    flex: 1,
    backgroundColor: theme.palette.surface,
    padding: theme.spacing.md,
    borderRadius: 12,
  },
  avgTitle: {
    fontWeight: "600",
    color: theme.palette.text,
  },
  avgValue: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.palette.primaryDark,
    marginTop: 8,
  },

  logoutWrapper: {
    marginTop: theme.spacing.lg,
    alignSelf: "center",
    width: 200,
  },
  dangerButton: {
    backgroundColor: theme.palette.danger,
    borderRadius: 10,
    overflow: "hidden",
    width: 200,
    marginBottom: theme.spacing.lg,
  },
});
