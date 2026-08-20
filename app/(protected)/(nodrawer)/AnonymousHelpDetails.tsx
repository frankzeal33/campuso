import AppScreenHeader from "@/components/AppScreenHeader";
import { useAnonymousHelpStore } from "@/store/AnonymousHelpStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnonymousHelpDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { posts, initializeHelp, addReply, markHelpful } =
    useAnonymousHelpStore();
  const [reply, setReply] = useState("");
  const listRef = useRef<FlatList>(null);
  const post = posts.find((item) => item.id === id);

  useEffect(() => {
    initializeHelp();
  }, [initializeHelp]);

  if (!post) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AppScreenHeader title="Anonymous help" back />
        <View className="flex-1 items-center justify-center">
          <Text className="font-msbold text-gray-300">Post not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const sendReply = async () => {
    const content = reply.trim();
    if (!content) return;
    await addReply(post.id, content);
    setReply("");
    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true }),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Anonymous help"
        subtitle={post.category}
        back
        action={
          post.isOwner ? (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(protected)/(nodrawer)/AnonymousHelpForm",
                  params: { mode: "edit", id: post.id },
                } as any)
              }
              className="flex-row items-center rounded-full bg-green-lighter px-3 py-2"
            >
              <Ionicons name="pencil-outline" size={13} color="#008751" />
              <Text className="ml-1 font-msbold text-[9px] text-green">
                Edit
              </Text>
            </Pressable>
          ) : undefined
        }
      />
      <FlatList
        ref={listRef}
        data={post.replies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListHeaderComponent={
          <View>
            <View className="mb-4 rounded-2xl bg-gray-light p-4">
              <View className="flex-row items-center">
                <View className="size-9 items-center justify-center rounded-full bg-green-drawer">
                  <Ionicons name="person-outline" size={17} color="#008751" />
                </View>
                <Text className="ml-2 flex-1 font-msbold text-[10px] text-gray">
                  Anonymous student
                </Text>
                <Text className="font-mregular text-[8px] text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text className="mt-4 font-mbold text-lg text-gray">
                {post.title}
              </Text>
              <Text className="mt-2 font-mregular text-xs leading-5 text-gray-300">
                {post.content}
              </Text>
              <Pressable
                onPress={() => markHelpful(post.id)}
                className="mt-4 flex-row items-center self-start rounded-full bg-green-lighter px-3 py-2"
              >
                <Ionicons name="heart-outline" size={15} color="#008751" />
                <Text className="ml-1 font-msbold text-[9px] text-green">
                  Helpful · {post.helpful}
                </Text>
              </Pressable>
            </View>
            <Text className="mb-2 font-mbold text-base text-gray">
              Supportive replies · {post.replies.length}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-3 flex-row items-start">
            <View className="size-8 items-center justify-center rounded-full bg-yellow-light">
              <Ionicons name="person-outline" size={15} color="#8A5A00" />
            </View>
            <View className="ml-2 flex-1 rounded-2xl bg-gray-light p-3">
              <Text className="font-msbold text-[9px] text-gray">
                Anonymous reply
              </Text>
              <Text className="mt-1 font-mregular text-[11px] leading-5 text-gray-300">
                {item.content}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="py-8 text-center font-mregular text-[10px] text-gray-300">
            Be the first person to leave a kind, useful reply.
          </Text>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="flex-row items-end gap-2 border-t border-gray-100 bg-white px-3 py-2">
          <TextInput
            value={reply}
            onChangeText={setReply}
            placeholder="Write a supportive reply"
            placeholderTextColor="#787878"
            multiline
            className="max-h-24 min-h-11 flex-1 rounded-3xl bg-gray-light px-4 py-3 font-mregular text-sm text-gray"
          />
          <Pressable
            onPress={sendReply}
            disabled={!reply.trim()}
            className="size-11 items-center justify-center rounded-full bg-green"
            style={{ opacity: reply.trim() ? 1 : 0.4 }}
          >
            <Ionicons name="send" size={19} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
