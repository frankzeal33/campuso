import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { listings } from "@/constants/appData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const filters = ["Everything", "Apartments", "Services"];
export default function Find() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Everything");
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Find"
        subtitle="Housing and trusted services around you"
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="What are you looking for?"
      />
      <FlatList
        data={listings.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        ListHeaderComponent={
          <View>
            <FlatList
              data={filters}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{
                gap: 8,
                paddingHorizontal: 16,
                paddingBottom: 18,
              }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 ${filter === item ? "bg-green" : "bg-gray-light"}`}
                >
                  <Text
                    className={`font-msbold text-xs ${filter === item ? "text-white" : "text-gray-300"}`}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
            <View className="mb-4 flex-row gap-3">
              <View className="flex-1 rounded-2xl bg-yellow-light p-4">
                <Ionicons name="home-outline" size={25} color="#8A5A00" />
                <Text className="mt-4 font-mbold text-base text-gray">
                  Find a place
                </Text>
                <Text className="mt-1 font-mregular text-[11px] text-gray-300">
                  Verified rooms nearby
                </Text>
              </View>
              <View className="flex-1 rounded-2xl bg-green-drawer p-4">
                <MaterialCommunityIcons
                  name="tools"
                  size={25}
                  color="#008751"
                />
                <Text className="mt-4 font-mbold text-base text-gray">
                  Get it fixed
                </Text>
                <Text className="mt-1 font-mregular text-[11px] text-gray-300">
                  Reliable local help
                </Text>
              </View>
            </View>
            <Text className="mb-3 font-mbold text-lg">Recommended</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable className="mb-3 flex-row overflow-hidden rounded-2xl bg-gray-light p-3">
            <View className="size-20 items-center justify-center rounded-xl bg-white">
              <MaterialCommunityIcons
                name={item.icon as any}
                size={34}
                color="#008751"
              />
            </View>
            <View className="ml-3 flex-1 justify-center">
              <Text className="font-msbold text-sm text-gray">
                {item.title}
              </Text>
              <Text className="mt-1 font-mregular text-[11px] text-gray-300">
                {item.location}
              </Text>
              <Text className="mt-2 font-mbold text-sm text-green">
                {item.price}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C3C3C3" />
          </Pressable>
        )}
      />
    </View>
  );
}
