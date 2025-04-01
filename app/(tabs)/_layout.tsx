import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  console.log("Current color scheme:", colorScheme);
  console.log("Active tint color:", Colors[colorScheme ?? "light"]?.tint);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#121212" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor:
            Colors[colorScheme ?? "light"]?.tint || "white",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: Platform.select({
            ios: { position: "absolute" },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
