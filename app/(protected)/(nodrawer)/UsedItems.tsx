import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const usedItems = [
  {
    id: "1",
    title: "iPhone 12 · 128GB",
    condition: "Neatly used",
    price: "₦285,000",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Study desk and chair",
    condition: "Good condition",
    price: "₦45,000",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Engineering textbooks",
    condition: "Lightly used",
    price: "₦18,500",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Mini refrigerator",
    condition: "Excellent condition",
    price: "₦95,000",
    image:
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
  },
];
export default function UsedItems() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      usedItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Used Items"
        subtitle="Buy and sell safely with verified students"
        back
        action={
          <Pressable className="flex-row items-center gap-1 rounded-full bg-green px-3 py-2">
            <Ionicons name="add" size={16} color="white" />
            <Text className="font-msbold text-[10px] text-white">
              Sell item
            </Text>
          </Pressable>
        }
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search used items"
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
        renderItem={({ item }) => (
          <Pressable className="mb-4 flex-1 overflow-hidden rounded-2xl bg-gray-light">
            <Image
              source={{ uri: item.image }}
              className="h-32 w-full"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="font-msbold text-sm" numberOfLines={2}>
                {item.title}
              </Text>
              <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                {item.condition}
              </Text>
              <Text className="mt-3 font-mbold text-sm text-green">
                {item.price}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
