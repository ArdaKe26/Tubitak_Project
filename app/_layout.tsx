//Bu Kod Hatalıdır!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/* 
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { Link, Redirect, router } from "expo-router";

export default function App3() {
  return (
    <View>
      <Button title="Üreticiyim" onPress={ProducerButtonPressed} ></Button>
      <Button title="Tüketiciyim" onPress={CustomerButtonPressed}></Button>
    </View>
  );
}

const CustomerButtonPressed = () => {
  router.push("/login/Panel_Seciniz")
};

const ProducerButtonPressed = () => {
  router.push("/(tabs)/deneme")
};

*/

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
