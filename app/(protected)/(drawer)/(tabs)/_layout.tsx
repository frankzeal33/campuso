import { useThemeStore } from "@/store/ThemeStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {

  const insets = useSafeAreaInsets();
  const { theme } = useThemeStore()

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "MarketPlace") {
            return (
              <Ionicons
                name={focused ? "cart-sharp" : "cart-outline"}
                size={size}
                color={color}
              />
            );
          }

          if (route.name === "People") {
            return (
              <Ionicons
                name={focused ? "people-sharp" : "people-outline"}
                size={size}
                color={color} />
            );
          }

          if (route.name === "Find") {
            return (
              <MaterialCommunityIcons 
                name={focused ? "tag-search" : "tag-search-outline"}
                size={size}
                color={color} />
            );
          }

          if (route.name === "More") {
            return (
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={size}
                color={color}
              />
            );
          }

          return <Ionicons name="ellipse-outline" size={size} color={color} />;
        },
        tabBarActiveTintColor: "#008751",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#DDDDDD",
          borderTopWidth: 1,
          paddingTop: 8,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          position: "relative",
          elevation: 0,
        },
      })}
    >
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="MarketPlace" options={{ title: "MarketPlace" }} />
      <Tabs.Screen name="People" options={{ title: "People" }} />
      <Tabs.Screen name="Find" options={{ title: "Find" }} />
      <Tabs.Screen name="More" options={{ title: "More" }} />
    </Tabs>
  );
}