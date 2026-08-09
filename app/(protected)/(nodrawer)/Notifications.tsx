import AppScreenHeader from "@/components/AppScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const initial = [
  {
    id: "1",
    title: "Welcome to Campuso!",
    body: "Your campus community is ready. Start exploring what is happening around you.",
    time: "Just now",
    icon: "sparkles",
    unread: true,
  },
  {
    id: "2",
    title: "New event near you",
    body: "Tech & Innovation Hangout starts this Friday at the Student Centre.",
    time: "2h",
    icon: "calendar",
    unread: true,
  },
  {
    id: "3",
    title: "Connection request",
    body: "Amara Okafor wants to connect with you.",
    time: "5h",
    icon: "people",
    unread: true,
  },
  {
    id: "4",
    title: "Marketplace update",
    body: "An item you saved has a new lower price.",
    time: "Yesterday",
    icon: "bag-handle",
    unread: false,
  },
];
export default function Notifications() {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState(initial);
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Notifications"
        back
        action={
          <Pressable
            onPress={() =>
              setItems(items.map((item) => ({ ...item, unread: false })))
            }
          >
            <Text className="font-msbold text-xs text-green">
              Mark all read
            </Text>
          </Pressable>
        }
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        renderItem={({ item }) => (
          <Pressable
            className={`mb-3 flex-row rounded-2xl p-4 ${item.unread ? "bg-green-lighter" : "bg-gray-light"}`}
          >
            <View className="size-11 items-center justify-center rounded-full bg-white">
              <Ionicons name={item.icon as any} size={21} color="#008751" />
            </View>
            <View className="ml-3 flex-1">
              <View className="flex-row items-center">
                <Text className="flex-1 font-msbold text-sm text-gray">
                  {item.title}
                </Text>
                <Text className="font-mregular text-[9px] text-gray-300">
                  {item.time}
                </Text>
              </View>
              <Text className="mt-1 font-mregular text-xs leading-5 text-gray-300">
                {item.body}
              </Text>
            </View>
            {item.unread ? (
              <View className="ml-2 mt-1 size-2 rounded-full bg-green" />
            ) : null}
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-24">
            <Ionicons
              name="notifications-off-outline"
              size={50}
              color="#C3C3C3"
            />
            <Text className="mt-4 font-msbold text-gray-300">
              You’re all caught up
            </Text>
          </View>
        }
      />
    </View>
  );
}
