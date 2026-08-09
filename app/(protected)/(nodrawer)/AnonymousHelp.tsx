import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { HelpPost, useAnonymousHelpStore } from "@/store/AnonymousHelpStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filters = ["All", "Academic", "Social", "Wellbeing", "Financial"] as const;

export default function AnonymousHelp() {
  const { posts, initializeHelp, markHelpful } = useAnonymousHelpStore();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    initializeHelp();
  }, [initializeHelp]);

  const results = useMemo(
    () =>
      posts.filter(
        (post) =>
          (filter === "All" || post.category === filter) &&
          `${post.title} ${post.content}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [filter, posts, query],
  );

  const openPost = (post: HelpPost) =>
    router.push({
      pathname: "/(protected)/(nodrawer)/AnonymousHelpDetails",
      params: { id: post.id },
    } as any);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Anonymous help"
        subtitle="Ask safely. Support kindly."
        back
        action={
          <Pressable
            onPress={() =>
              router.push("/(protected)/(nodrawer)/AnonymousHelpForm" as any)
            }
            className="size-10 items-center justify-center rounded-full bg-green"
          >
            <Ionicons name="add" size={23} color="#fff" />
          </Pressable>
        }
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search questions"
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        ListHeaderComponent={
          <View>
            <FlatList
              data={filters}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingBottom: 14 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 ${filter === item ? "bg-green" : "bg-gray-light"}`}
                >
                  <Text className={`font-msbold text-[10px] ${filter === item ? "text-white" : "text-gray-300"}`}>
                    {item}
                  </Text>
                </Pressable>
              )}
            />

            <Pressable
              onPress={() => router.push("/(protected)/(nodrawer)/CampusSafety" as any)}
              className="mb-4 flex-row items-center rounded-2xl bg-yellow-light p-3"
            >
              <Ionicons name="shield-checkmark-outline" size={20} color="#8A5A00" />
              <Text className="ml-2 flex-1 font-mregular text-[10px] leading-4 text-gray-300">
                In immediate danger or a crisis? Open Campus Safety for emergency help.
              </Text>
              <Ionicons name="chevron-forward" size={17} color="#8A5A00" />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openPost(item)}
            className="mb-3 rounded-2xl bg-gray-light p-4"
          >
            <View className="flex-row items-center">
              <View className="size-9 items-center justify-center rounded-full bg-green-drawer">
                <Ionicons name="person-outline" size={17} color="#008751" />
              </View>
              <View className="ml-2 flex-1">
                <Text className="font-msbold text-[10px] text-gray">
                  Anonymous student
                </Text>
                <Text className="mt-0.5 font-mregular text-[8px] text-gray-300">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text className="rounded-full bg-white px-2 py-1 font-msbold text-[8px] text-green">{item.category}</Text>
            </View>
            <Text className="mt-3 font-msbold text-sm text-gray">{item.title}</Text>
            <Text className="mt-2 font-mregular text-[11px] leading-5 text-gray-300" numberOfLines={3}>
              {item.content}
            </Text>
            <View className="mt-3 flex-row items-center gap-4">
              <Pressable
                onPress={(event) => {
                  event.stopPropagation();
                  markHelpful(item.id);
                }}
                className="flex-row items-center gap-1"
              >
                <Ionicons name="heart-outline" size={15} color="#008751" />
                <Text className="font-msbold text-[9px] text-gray-300">
                  Helpful {item.helpful}
                </Text>
              </Pressable>
              <View className="flex-row items-center gap-1">
                <Ionicons name="chatbubble-outline" size={14} color="#787878" />
                <Text className="font-msbold text-[9px] text-gray-300">
                  {item.replies.length} replies
                </Text>
              </View>
              {item.isOwner ? (
                <Pressable
                  onPress={(event) => {
                    event.stopPropagation();
                    router.push({ pathname: "/(protected)/(nodrawer)/AnonymousHelpForm", params: { mode: "edit", id: item.id } } as any);
                  }}
                  className="ml-auto flex-row items-center"
                >
                  <Ionicons name="pencil-outline" size={12} color="#008751" />
                  <Text className="ml-1 font-msbold text-[9px] text-green">Edit</Text>
                </Pressable>
              ) : null}
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="chatbubbles-outline" size={48} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">No questions found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
