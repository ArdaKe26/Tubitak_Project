import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveBackgroundColor: "#ebebebff",
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Cihazlarım",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bluetooth-connect"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="main"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart-pulse"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="aiAgent"
        options={{
          title: "Yapay Zeka Danışmanı",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="robot" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feedback_seen"
        options={{
          title: "Geri Bildirimlerim",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
