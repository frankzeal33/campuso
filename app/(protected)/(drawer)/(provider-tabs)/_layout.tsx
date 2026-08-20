import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: Record<
  string,
  {
    active: keyof typeof Ionicons.glyphMap;
    inactive: keyof typeof Ionicons.glyphMap;
  }
> = {
  Dashboard: { active: "grid", inactive: "grid-outline" },
  Catalog: { active: "pricetags", inactive: "pricetags-outline" },
  Orders: { active: "receipt", inactive: "receipt-outline" },
  Earnings: { active: "wallet", inactive: "wallet-outline" },
  Account: { active: "person-circle", inactive: "person-circle-outline" },
};

export default function ProviderTabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icon = icons[route.name];
          return (
            <Ionicons
              name={focused ? icon.active : icon.inactive}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#008751",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 8,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          elevation: 0,
        },
      })}
    >
      <Tabs.Screen name="Dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="Catalog" options={{ title: "Catalog" }} />
      <Tabs.Screen name="Orders" options={{ title: "Orders" }} />
      <Tabs.Screen name="Earnings" options={{ title: "Earnings" }} />
      <Tabs.Screen name="Account" options={{ title: "Account" }} />
    </Tabs>
  );
}
