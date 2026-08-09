import Header from "@/components/Header";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CollapsibleHeader = () => (
  <View style={styles.header}>
    <Image
      source={{ uri: "https://i.pravatar.cc/200" }}
      style={styles.avatar}
    />
    <Text style={styles.name}>Ojiego Franklin</Text>
    <Text style={styles.username}>frankzeal33@gmail.com</Text>
  </View>
);

export default function ProfileScreen() {
  const screen = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const DATA = Array.from({ length: 30 }, (_, i) => i);

  const renderGridItem = () => <View style={styles.gridItem} />;

  return (
    <View className="flex-1 bg-white">
      <View style={{ paddingTop: insets.top }} className="z-10 bg-white px-4">
        <Header title="Profile" showGoBack onpress={() => router.back()} />
      </View>

      <Tabs.Container
        renderHeader={CollapsibleHeader}
        revealHeaderOnScroll
        headerContainerStyle={styles.headerContainer}
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            scrollEnabled={false}
            style={styles.tabBar}
            labelStyle={[styles.tabLabel, { width: screen.width / 3 - 6 }]}
            indicatorStyle={{ backgroundColor: "#008751", height: 2 }}
          />
        )}
      >
        <Tabs.Tab name="Posts">
          <Tabs.FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={renderGridItem}
            keyExtractor={(i) => i.toString()}
            contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
          />
        </Tabs.Tab>

        <Tabs.Tab name="Tagged">
          <Tabs.FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={renderGridItem}
            keyExtractor={(i) => i.toString()}
            contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
          />
        </Tabs.Tab>

        <Tabs.Tab name="Saved">
          <Tabs.FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={renderGridItem}
            keyExtractor={(i) => i.toString()}
            contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  persistentHeader: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    zIndex: 10,
  },
  headerContainer: {
    shadowOpacity: 0,
    shadowColor: "transparent",
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  navText: { fontWeight: "600", fontSize: 16 },
  header: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    marginBottom: 10,
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  username: { color: "gray" },
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
  },
  tabLabel: { fontWeight: "600", padding: 8, textAlign: "center" },
  gridItem: {
    width: "33.33%",
    aspectRatio: 1,
    backgroundColor: "#ddd",
  },
});
