import AppScreenHeader from "@/components/AppScreenHeader";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import SearchBar from "@/components/SearchBar";
import { people } from "@/constants/appData";
import { useDiscoveryStore } from "@/store/DiscoveryStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function People() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("Everyone");
  const [connected, setConnected] = useState<string[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { allowCrossSchool, initializeDiscovery } = useDiscoveryStore();
  const modes = [
    "Everyone",
    "Study partners",
    "Friends",
    "Dating",
    ...(allowCrossSchool ? ["Other schools"] : []),
  ];

  useEffect(() => {
    initializeDiscovery();
  }, [initializeDiscovery]);

  useFocusEffect(
    useCallback(() => {
      const loadUnreadMessages = async () => {
        const saved = await AsyncStorage.getItem("chat-conversations");
        if (!saved) {
          setUnreadMessages(6);
          return;
        }
        const conversations = JSON.parse(saved) as { unread?: number }[];
        setUnreadMessages(
          conversations.reduce((total, item) => total + (item.unread || 0), 0),
        );
      };

      loadUnreadMessages();
    }, []),
  );

  useEffect(() => {
    if (!allowCrossSchool && mode === "Other schools") setMode("Everyone");
  }, [allowCrossSchool, mode]);

  const results = useMemo(
    () =>
      people.filter(
        (person) =>
          person.name.toLowerCase().includes(query.toLowerCase()) &&
          (person.isSameSchool || allowCrossSchool) &&
          (mode !== "Other schools" || !person.isSameSchool),
      ),
    [allowCrossSchool, mode, query],
  );
  const toggle = (id: string) =>
    setConnected((value) =>
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id],
    );
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="People"
        subtitle="Meet people in your campus community"
        action={
          <Pressable
            onPress={() => router.push("/(protected)/(nodrawer)/Chats" as any)}
            className="size-10 items-center justify-center rounded-full bg-green-lighter"
          >
            <Ionicons name="chatbubbles-outline" size={21} color="#008751" />
            {unreadMessages > 0 ? (
              <View className="absolute -right-1 -top-1 min-w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 py-0.5">
                <Text className="font-msbold text-[8px] text-white">
                  {unreadMessages > 99 ? "99+" : unreadMessages}
                </Text>
              </View>
            ) : null}
          </Pressable>
        }
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search people or interests"
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        ListHeaderComponent={
          <View>
            <AdvertisementCarousel placement="people" />
            <FlatList
              data={modes}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{
                gap: 8,
                paddingHorizontal: 16,
                paddingBottom: 14,
              }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setMode(item)}
                  className={`rounded-full px-4 py-2 ${mode === item ? "bg-green" : "bg-gray-light"}`}
                >
                  <Text
                    className={`font-msbold text-[10px] ${mode === item ? "text-white" : "text-gray-300"}`}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <View className="mb-3 rounded-2xl bg-green p-5">
              <Text className="font-mbold text-xl text-white">
                {mode === "Everyone"
                  ? "Find your campus circle"
                  : mode === "Other schools"
                    ? "Explore beyond your campus"
                    : `Find ${mode.toLowerCase()}`}
              </Text>
              <Text className="mt-1 font-mregular text-sm leading-5 text-white/80">
                Connect authentically with verified students in a safe campus
                community.
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const active = connected.includes(item.id);
          return (
            <View
              className="mb-4 rounded-3xl bg-white p-4"
              style={{
                elevation: 1,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.04,
                shadowRadius: 3,
              }}
            >
              <View className="flex-row items-center">
                <View className="relative">
                  {item.image ? (
                    <Image
                      source={item.image}
                      className="size-16 rounded-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="size-16 items-center justify-center rounded-full bg-green-drawer">
                      <Text className="font-mbold text-lg text-green">
                        {item.initials}
                      </Text>
                    </View>
                  )}
                  <View className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-white bg-green-light" />
                </View>
                <View className="ml-3 flex-1">
                  <View className="flex-row items-center gap-1">
                    <Text
                      className="flex-shrink font-msbold text-[15px] text-gray"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Ionicons
                      name="checkmark-circle"
                      size={15}
                      color="#008751"
                    />
                  </View>
                  <Text className="mt-1 font-mregular text-[11px] text-gray-300">
                    {item.course}
                  </Text>
                  {!item.isSameSchool ? (
                    <Text className="mt-1 font-mmedium text-[10px] text-green">
                      {item.school}
                    </Text>
                  ) : null}
                  <Text className="mt-1 font-mmedium text-[10px] text-green">
                    Active now
                  </Text>
                </View>
              </View>

              <View className="mt-3 flex-row gap-2">
                {item.interests.map((interest) => (
                  <Text
                    key={interest}
                    className="rounded-full bg-gray-light px-3 py-1.5 font-mmedium text-[9px] text-gray-300"
                  >
                    {interest}
                  </Text>
                ))}
              </View>

              <View className="mt-4 flex-row gap-2">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(protected)/(nodrawer)/Chat",
                      params: { id: item.id, title: item.name },
                    } as any)
                  }
                  className="h-10 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-green"
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={15}
                    color="#008751"
                  />
                  <Text className="font-msbold text-[11px] text-green">
                    Message
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => toggle(item.id)}
                  className={`h-10 flex-1 items-center justify-center rounded-xl ${active ? "bg-green-lighter" : "bg-green"}`}
                >
                  <Text
                    className={`text-center font-msbold text-[11px] ${active ? "text-green" : "text-white"}`}
                  >
                    {active ? "Connected" : "Connect"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
