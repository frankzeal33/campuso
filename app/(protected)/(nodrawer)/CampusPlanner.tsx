import AppScreenHeader from "@/components/AppScreenHeader";
import { usePlannerStore } from "@/store/PlannerStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const filters = ["All", "Classes", "Deadlines"] as const;

export default function CampusPlanner() {
  const { items, initializePlanner, toggleCompleted, removePlannerItem } =
    usePlannerStore();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  useEffect(() => {
    initializePlanner();
  }, [initializePlanner]);

  const results = useMemo(
    () =>
      items.filter(
        (item) =>
          filter === "All" ||
          (filter === "Classes" && item.type === "class") ||
          (filter === "Deadlines" && item.type === "deadline"),
      ),
    [filter, items],
  );
  const nextClass = items.find((item) => item.type === "class");
  const pendingDeadlines = items.filter(
    (item) => item.type === "deadline" && !item.completed,
  ).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Campus planner"
        subtitle="Classes and deadlines in one place"
        back
        action={
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(protected)/(nodrawer)/PlannerForm",
                params: { mode: "add" },
              } as any)
            }
            className="size-10 items-center justify-center rounded-full bg-green"
          >
            <Ionicons name="add" size={23} color="#fff" />
          </Pressable>
        }
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        ListHeaderComponent={
          <View>
            <View className="mb-4 rounded-3xl bg-green p-5">
              <View className="flex-row items-start">
                <View className="size-11 items-center justify-center rounded-full bg-white/20">
                  <Ionicons name="time-outline" size={23} color="#fff" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="font-mregular text-[10px] uppercase tracking-wider text-white/70">
                    Up next
                  </Text>
                  <Text className="mt-1 font-mbold text-base text-white">
                    {nextClass?.title || "Your schedule is clear"}
                  </Text>
                  {nextClass ? (
                    <Text className="mt-1 font-mregular text-[11px] text-white/80">
                      {nextClass.day} · {nextClass.time} · {nextClass.detail}
                    </Text>
                  ) : null}
                </View>
              </View>
              <View className="mt-4 flex-row items-center rounded-2xl bg-white/10 px-3 py-2">
                <Ionicons name="document-text-outline" size={16} color="#fff" />
                <Text className="ml-2 font-msbold text-[10px] text-white">
                  {pendingDeadlines} pending deadline{pendingDeadlines === 1 ? "" : "s"}
                </Text>
              </View>
            </View>

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
          </View>
        }
        renderItem={({ item }) => {
          const isDeadline = item.type === "deadline";
          return (
            <View className="mb-3 flex-row items-center rounded-2xl bg-gray-light p-4">
              <Pressable
                onPress={() => isDeadline && toggleCompleted(item.id)}
                className={`size-11 items-center justify-center rounded-full ${isDeadline && item.completed ? "bg-green" : "bg-green-lighter"}`}
              >
                <Ionicons
                  name={
                    isDeadline
                      ? item.completed
                        ? "checkmark"
                        : "document-text-outline"
                      : "school-outline"
                  }
                  size={20}
                  color={isDeadline && item.completed ? "#fff" : "#008751"}
                />
              </Pressable>
              <View className="ml-3 flex-1">
                <Text
                  className={`font-msbold text-sm ${item.completed ? "text-gray-300 line-through" : "text-gray"}`}
                >
                  {item.title}
                </Text>
                {item.detail ? (
                  <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                    {item.detail}
                  </Text>
                ) : null}
                <View className="mt-2 flex-row items-center gap-1">
                  <Ionicons name="calendar-outline" size={12} color="#787878" />
                  <Text className="font-mmedium text-[9px] text-gray-300">
                    {item.day} · {item.time}
                  </Text>
                </View>
              </View>
              <View className="gap-2">
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(protected)/(nodrawer)/PlannerForm",
                      params: { mode: "edit", id: item.id },
                    } as any)
                  }
                  className="size-8 items-center justify-center rounded-full bg-white"
                >
                  <Ionicons name="pencil-outline" size={15} color="#008751" />
                </Pressable>
                <Pressable
                  onPress={() => removePlannerItem(item.id)}
                  className="size-8 items-center justify-center rounded-full bg-white"
                >
                  <Ionicons name="trash-outline" size={15} color="#EF4444" />
                </Pressable>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="calendar-clear-outline" size={48} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              Nothing planned here
            </Text>
          </View>
        }
      />

    </SafeAreaView>
  );
}
