import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const news = [
  {
    id: "1",
    title: "Second semester registration timetable released",
    category: "Academic",
    time: "20 min ago",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "2",
    title: "Student Union announces campus transport update",
    category: "Announcement",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "3",
    title: "Free tutorial sessions begin this weekend",
    category: "Tutorial",
    time: "Today",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "4",
    title: "Library extends opening hours for examinations",
    category: "Campus",
    time: "Yesterday",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
  },
];

export default function CampusNews() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const results = useMemo(
    () =>
      news.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Campus News"
        subtitle="Announcements and updates from your school"
        back
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search campus news"
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        renderItem={({ item }) => (
          <Pressable className="mb-4 flex-1 overflow-hidden rounded-2xl bg-gray-light">
            <Image
              source={{ uri: item.image }}
              className="h-28 w-full"
              resizeMode="cover"
            />
            <View className="min-h-28 p-3">
              <Text className="font-msbold text-sm leading-5" numberOfLines={3}>
                {item.title}
              </Text>
              <View className="mt-auto flex-row items-center justify-between pt-3">
                <Text className="font-msbold text-[9px] text-green">
                  {item.category}
                </Text>
                <Text className="font-mregular text-[9px] text-gray-300">
                  {item.time}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="newspaper-outline" size={44} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              No news found
            </Text>
          </View>
        }
      />
    </View>
  );
}
