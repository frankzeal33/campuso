import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { people } from "@/constants/appData";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function People() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("Everyone");
  const [connected, setConnected] = useState<string[]>([]);
  const results = useMemo(
    () =>
      people.filter((person) =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
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
          <View className="size-10 items-center justify-center rounded-full bg-green-lighter">
            <Ionicons name="people-outline" size={22} color="#008751" />
          </View>
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
            <FlatList
              data={["Everyone", "Study partners", "Friends", "Dating"]}
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
            <View className="mb-3 flex-row items-center rounded-2xl bg-gray-light p-3">
              <View className="size-14 items-center justify-center rounded-full bg-green-drawer">
                <Text className="font-mbold text-lg text-green">
                  {item.initials}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-gray">
                  {item.name}
                </Text>
                <Text className="mt-0.5 font-mregular text-[11px] text-gray-300">
                  {item.course}
                </Text>
                <View className="mt-2 flex-row gap-1">
                  {item.interests.map((interest) => (
                    <Text
                      key={interest}
                      className="rounded-full bg-white px-2 py-1 font-mmedium text-[9px] text-gray-300"
                    >
                      {interest}
                    </Text>
                  ))}
                </View>
              </View>
              <Pressable
                onPress={() => toggle(item.id)}
                className={`rounded-full px-3 py-2 ${active ? "bg-green-lighter" : "bg-green"}`}
              >
                <Text
                  className={`font-msbold text-[11px] ${active ? "text-green" : "text-white"}`}
                >
                  {active ? "Connected" : "Connect"}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}
