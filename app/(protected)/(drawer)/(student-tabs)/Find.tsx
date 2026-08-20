import AppScreenHeader from "@/components/AppScreenHeader";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import SearchBar from "@/components/SearchBar";
import { findCategories, listings } from "@/constants/appData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const filters = ["Everything", ...findCategories.map((item) => item.name)];
const categoryColors = [
  { background: "#FFF0CD", accent: "#9A6200", iconBackground: "#FFF8E8" },
  { background: "#E4FFE5", accent: "#008751", iconBackground: "#F4FFF5" },
  { background: "#E8F1FF", accent: "#2563A9", iconBackground: "#F5F9FF" },
  { background: "#F2E9FF", accent: "#7C3FB0", iconBackground: "#FAF7FF" },
  { background: "#FFE8E8", accent: "#C24141", iconBackground: "#FFF7F7" },
  { background: "#E2F8F4", accent: "#087F6B", iconBackground: "#F2FFFC" },
];

export default function Find() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Everything");
  const results = useMemo(
    () =>
      listings.filter(
        (item) =>
          (filter === "Everything" || item.category === filter) &&
          `${item.title} ${item.location} ${item.category} ${item.provider}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, query],
  );

  const openCategory = (category: string) =>
    router.push({
      pathname: "/(protected)/(nodrawer)/FindCategory",
      params: { category },
    } as any);

  const openListing = (id: string) =>
    router.push({
      pathname: "/(protected)/(nodrawer)/FindDetails",
      params: { id },
    } as any);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Find"
        subtitle="Discover opportunities and help around campus"
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="What are you looking for?"
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        ListHeaderComponent={
          <View>
            <AdvertisementCarousel placement="find" />
            <Text className="mb-3 font-mbold text-lg text-gray">
              Browse categories
            </Text>
            <FlatList
              data={findCategories}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 16,
                paddingBottom: 16,
              }}
              keyExtractor={(item) => item.name}
              renderItem={({ item, index }) => {
                const colors = categoryColors[index % categoryColors.length];
                return (
                  <Pressable
                    onPress={() => openCategory(item.name)}
                    className="w-36 rounded-2xl p-4"
                    style={{ backgroundColor: colors.background }}
                  >
                    <View
                      className="size-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: colors.iconBackground }}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={21}
                        color={colors.accent}
                      />
                    </View>
                    <Text className="mt-4 font-msbold text-sm text-gray">
                      {item.name}
                    </Text>
                    <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                      {
                        listings.filter(
                          (listing) => listing.category === item.name,
                        ).length
                      }{" "}
                      available
                    </Text>
                  </Pressable>
                );
              }}
            />

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
            <Text className="mb-3 font-mbold text-lg text-gray">
              {filter === "Everything" ? "Recommended" : filter}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openListing(item.id)}
            className="mb-3 flex-row overflow-hidden rounded-2xl bg-gray-light p-3"
          >
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
              <Text className="mt-1 font-mmedium text-[9px] text-green">
                {item.category}
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
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="search-outline" size={46} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              Nothing found
            </Text>
            <Text className="mt-1 font-mregular text-[10px] text-gray-300">
              Try another search or category
            </Text>
          </View>
        }
      />
    </View>
  );
}
