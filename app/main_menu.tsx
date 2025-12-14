import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { matrisMainLogoWhite } from "./photosStore";
import theme from "./styles/theme";

export default function MainMenu(): React.ReactElement {
  const startButtonPressed = () => {
    router.push("/Panel_Seciniz");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.primaryDark]}
        style={styles.gradient}
      />

      <View style={styles.hero}>
        <Image source={matrisMainLogoWhite} style={styles.imageContainer} />
        <Text style={styles.heroSubtitle}>Nefesinden Sağlığını Keşfet</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={startButtonPressed}
        >
          <Text style={styles.primaryButtonText}>Başla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.palette.background,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },

  heroTitle: {
    fontSize: 48,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1.5,
  },

  heroSubtitle: {
    color: "rgba(255,255,255,0.85)",
    marginTop: theme.spacing.sm,
    fontSize: 22,
  },

  primaryButton: {
    marginTop: 40,
    backgroundColor: theme.palette.surface,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  primaryButtonText: {
    color: theme.palette.primaryLight,
    fontSize: 20,
    fontWeight: "700",
  },
  imageContainer: {
    height: 80,
    width: 250,
  },
});
