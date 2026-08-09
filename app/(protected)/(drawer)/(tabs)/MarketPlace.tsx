import AppScreenHeader from "@/components/AppScreenHeader";
import AdvertisementCarousel from "@/components/AdvertisementCarousel";
import SearchBar from "@/components/SearchBar";
import { marketplaceCategories, products, vendors } from "@/constants/appData";
import { useSavedItemsStore } from "@/store/SavedItemsStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MarketPlace() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [browseBy, setBrowseBy] = useState<"Products" | "Vendors">("Products");
  const { initializeSavedItems, isSaved, toggleSavedItem } =
    useSavedItemsStore();

  useEffect(() => {
    initializeSavedItems();
  }, [initializeSavedItems]);

  const results = useMemo(
    () =>
      browseBy === "Products"
        ? products.filter(
            (item) =>
              (category === "All" || item.category === category) &&
              `${item.name} ${item.seller}`
                .toLowerCase()
                .includes(query.toLowerCase()),
          )
        : vendors.filter((item) =>
            `${item.name} ${item.category}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          ),
    [browseBy, category, query],
  );

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Marketplace"
        subtitle="Shop trusted campus vendors"
        action={
          <Pressable className="size-10 items-center justify-center rounded-full bg-green-lighter">
            <Ionicons name="bag-handle-outline" size={21} color="#008751" />
          </Pressable>
        }
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search products and stores"
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        ListHeaderComponent={
          <View>
            <AdvertisementCarousel placement="marketplace" />
            <FlatList
              data={["Products", "Vendors"] as const}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{
                gap: 8,
                paddingHorizontal: 16,
                paddingBottom: 10,
              }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setBrowseBy(item)}
                  className={`rounded-full px-4 py-2 ${browseBy === item ? "bg-green" : "bg-gray-light"}`}
                >
                  <Text
                    className={`font-msbold text-xs ${browseBy === item ? "text-white" : "text-gray-300"}`}
                  >
                    By {item}
                  </Text>
                </Pressable>
              )}
            />
            {browseBy === "Products" ? (
              <FlatList
                data={marketplaceCategories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item}
                style={{ marginHorizontal: -16 }}
                contentContainerStyle={{
                  gap: 8,
                  paddingHorizontal: 16,
                  paddingBottom: 18,
                }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setCategory(item)}
                    className={`rounded-full px-4 py-2 ${category === item ? "bg-green" : "bg-gray-light"}`}
                  >
                    <Text
                      className={`font-msbold text-xs ${category === item ? "text-white" : "text-gray-300"}`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            ) : (
              <View className="h-2" />
            )}
            <Text className="mb-3 font-mbold text-lg">
              {browseBy === "Products"
                ? "Popular near you"
                : "Verified vendors"}
            </Text>
          </View>
        }
        renderItem={({ item }: { item: any }) =>
          browseBy === "Products" ? (
            <Pressable
              onPress={() => router.push("/(protected)/(nodrawer)/ShopDetails")}
              className="mb-4 flex-1 overflow-hidden rounded-2xl bg-gray-light"
            >
              <View className="relative h-32">
                <Image
                  source={{ uri: item.image }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={(event) => {
                    event.stopPropagation();
                    toggleSavedItem({
                      id: `marketplace-${item.id}`,
                      type: "Marketplace",
                      title: item.name,
                      subtitle: `${item.seller} · ${item.price}`,
                      image: item.image,
                      route: "/(protected)/(nodrawer)/ShopDetails",
                    });
                  }}
                  className="absolute right-3 top-3 size-8 items-center justify-center rounded-full bg-white"
                >
                  <Ionicons
                    name={
                      isSaved(`marketplace-${item.id}`)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={17}
                    color={
                      isSaved(`marketplace-${item.id}`) ? "#008751" : "#2F2F2F"
                    }
                  />
                </Pressable>
              </View>
              <View className="p-3">
                <Text
                  numberOfLines={2}
                  className="font-msbold text-sm text-gray"
                >
                  {item.name}
                </Text>
                <Text className="mt-1 font-mregular text-[11px] text-gray-300">
                  {item.seller}
                </Text>
                <Text className="mt-2 font-mbold text-sm text-green">
                  {item.price}
                </Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => router.push("/(protected)/(nodrawer)/ShopDetails")}
              className="mb-4 flex-1 overflow-hidden rounded-2xl bg-gray-light"
            >
              <View className="relative h-28">
                <Image
                  source={{ uri: item.image }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
                {item.verified ? (
                  <View className="absolute right-2 top-2 flex-row items-center gap-1 rounded-full bg-white px-2 py-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={12}
                      color="#008751"
                    />
                    <Text className="font-msbold text-[8px] text-green">
                      Verified
                    </Text>
                  </View>
                ) : null}
              </View>
              <View className="p-3">
                <Text className="font-msbold text-sm" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                  {item.category}
                </Text>
                <View className="mt-3 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={12} color="#FEC844" />
                    <Text className="font-msbold text-[10px]">
                      {item.rating}
                    </Text>
                  </View>
                  <Text className="font-mregular text-[9px] text-gray-300">
                    {item.distance}
                  </Text>
                </View>
              </View>
            </Pressable>
          )
        }
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="search-outline" size={46} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              No products found
            </Text>
          </View>
        }
      />
    </View>
  );
}
