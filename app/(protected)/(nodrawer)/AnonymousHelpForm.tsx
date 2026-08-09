import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import TextArea from "@/components/TextArea";
import { HelpPost, useAnonymousHelpStore } from "@/store/AnonymousHelpStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories: HelpPost["category"][] = [
  "Academic",
  "Social",
  "Wellbeing",
  "Financial",
];

export default function AnonymousHelpForm() {
  const { mode = "add", id } = useLocalSearchParams<{ mode?: "add" | "edit"; id?: string }>();
  const { posts, initializeHelp, addPost, updatePost } = useAnonymousHelpStore();
  const [category, setCategory] = useState<HelpPost["category"]>("Academic");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    initializeHelp();
  }, [initializeHelp]);

  useEffect(() => {
    if (mode !== "edit" || !id) return;
    const post = posts.find((item) => item.id === id && item.isOwner);
    if (!post) return;
    setCategory(post.category);
    setTitle(post.title);
    setContent(post.content);
  }, [id, mode, posts]);

  const publish = async () => {
    if (!title.trim() || !content.trim()) return;
    const values = {
      category,
      title: title.trim(),
      content: content.trim(),
    };
    if (mode === "edit" && id) {
      await updatePost(id, values);
      router.back();
      return;
    }
    const newId = await addPost(values);
    router.replace({
      pathname: "/(protected)/(nodrawer)/AnonymousHelpDetails",
      params: { id: newId },
    } as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title={mode === "edit" ? "Edit question" : "Ask anonymously"}
        subtitle="Your profile will not appear on the post"
        back
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <View className="mb-5 flex-row rounded-2xl bg-green-lighter p-4">
          <Ionicons name="eye-off-outline" size={21} color="#008751" />
          <Text className="ml-2 flex-1 font-mregular text-[10px] leading-4 text-gray-300">
            No name, email, course, or profile photo is displayed with your question.
          </Text>
        </View>

        <Text className="mb-2 font-msbold text-xs text-gray">Topic</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingBottom: 18 }}>
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              className={`rounded-full px-4 py-2 ${category === item ? "bg-green" : "bg-gray-light"}`}
            >
              <Text className={`font-msbold text-[10px] ${category === item ? "text-white" : "text-gray-300"}`}>
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <FormField
          title="Question title"
          value={title}
          handleChangeText={setTitle}
          placeholder="Summarise what you need help with"
          labelStyle="text-xs text-gray"
          inputContainerStyles="rounded-2xl border-0"
          inputStyles="text-sm"
        />
        <TextArea
          title="Tell the community more"
          value={content}
          handleChangeText={setContent}
          placeholder="Share enough context for someone to support you"
          maxLength={800}
          otherStyles="mt-5"
          labelStyle="text-xs text-gray"
          inputBg="bg-inputBg"
          inputContainerStyles="h-48 rounded-2xl border-0 py-3"
          inputStyles="h-full text-sm"
        />
        <Text className="mt-2 text-right font-mregular text-[9px] text-gray-300">
          {content.length}/800
        </Text>
        <CustomButton
          title={mode === "edit" ? "Save changes" : "Publish anonymously"}
          handlePress={publish}
          disableButton={!title.trim() || !content.trim()}
          containerStyles="mt-6 rounded-2xl"
          textStyles="text-sm text-white"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
