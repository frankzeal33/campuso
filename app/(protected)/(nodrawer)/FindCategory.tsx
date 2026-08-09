import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { listings } from "@/constants/appData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindCategory() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      listings.filter(
        (item) =>
          item.category === category &&
          `${item.title} ${item.location} ${item.provider}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title={category || "Find"}
        subtitle={`${results.length} options available near you`}
        back
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={`Search ${category?.toLowerCase() || "listings"}`}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(protected)/(nodrawer)/FindDetails",
                params: { id: item.id },
              } as any)
            }
            className="mb-3 rounded-2xl bg-gray-light p-4"
          >
            <View className="flex-row items-center">
              <View className="size-14 items-center justify-center rounded-2xl bg-white">
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={26}
                  color="#008751"
                />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-gray">
                  {item.title}
                </Text>
                <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                  {item.location}
                </Text>
                <View className="mt-2 flex-row items-center gap-1">
                  <Ionicons name="star" size={12} color="#FEC844" />
                  <Text className="font-msbold text-[10px] text-gray-300">
                    {item.rating} · {item.provider}
                  </Text>
                </View>
              </View>
              <Text className="font-mbold text-xs text-green">
                {item.price}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-24">
            <Ionicons name="search-outline" size={46} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              No {category?.toLowerCase()} found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
