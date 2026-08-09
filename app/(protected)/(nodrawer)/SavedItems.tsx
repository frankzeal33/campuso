import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { useSavedItemsStore } from "@/store/SavedItemsStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filters = ["All", "Marketplace", "Find", "Events"] as const;

export default function SavedItems() {
  const { items, initializeSavedItems, removeSavedItem } = useSavedItemsStore();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    initializeSavedItems();
  }, [initializeSavedItems]);

  const results = useMemo(
    () =>
      items.filter(
        (item) =>
          (filter === "All" || item.type === filter) &&
          `${item.title} ${item.subtitle}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, items, query],
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Saved items"
        subtitle={`${items.length} saved for later`}
        back
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search saved items"
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <FlatList
            data={filters}
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
                onPress={() => setFilter(item)}
                className={`rounded-full px-4 py-2 ${filter === item ? "bg-green" : "bg-gray-light"}`}
              >
                <Text
                  className={`font-msbold text-[10px] ${filter === item ? "text-white" : "text-gray-300"}`}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: item.route, params: item.params } as any)
            }
            className="mb-3 flex-row items-center rounded-2xl bg-gray-light p-3"
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                className="size-16 rounded-xl"
              />
            ) : (
              <View className="size-16 items-center justify-center rounded-xl bg-green-lighter">
                <MaterialCommunityIcons
                  name={(item.icon || "bookmark-outline") as any}
                  size={28}
                  color="#008751"
                />
              </View>
            )}
            <View className="ml-3 flex-1">
              <Text className="font-msbold text-sm text-gray" numberOfLines={1}>
                {item.title}
              </Text>
              <Text className="mt-1 font-mregular text-[10px] text-gray-300" numberOfLines={1}>
                {item.subtitle}
              </Text>
              <Text className="mt-2 self-start rounded-full bg-green-lighter px-2 py-1 font-msbold text-[8px] text-green">
                {item.type}
              </Text>
            </View>
            <Pressable
              onPress={() => removeSavedItem(item.id)}
              className="size-9 items-center justify-center rounded-full bg-white"
            >
              <Ionicons name="bookmark" size={18} color="#008751" />
            </Pressable>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-24">
            <Ionicons name="bookmark-outline" size={50} color="#C3C3C3" />
            <Text className="mt-4 font-msbold text-gray-300">
              Nothing saved yet
            </Text>
            <Text className="mt-1 text-center font-mregular text-[10px] text-gray-300">
              Bookmark products, events, and useful listings to find them here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
