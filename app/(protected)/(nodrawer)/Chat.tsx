import ChatCard from "@/components/ChatCard";
import AppScreenHeader from "@/components/AppScreenHeader";
import { useThemeStore } from "@/store/ThemeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const { theme } = useThemeStore();
  const { id, title, isGroup } = useLocalSearchParams() as any;
  const listRef = useRef<FlatList>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! Thanks for connecting with me 👋",
    },
    {
      role: "user",
      content: "Hey! Nice to meet you. How is your day going?",
    },
    {
      role: "assistant",
      content: "It’s going well, just finished a lecture. How about yours?",
    },
    {
      role: "user",
      content: "Pretty good too. I noticed we’re both interested in tech.",
    },
    {
      role: "assistant",
      content: "Yes! I’m actually working on a small mobile app project.",
    },
    {
      role: "user",
      content: "That sounds interesting. Are you working with a team?",
    },
    {
      role: "assistant",
      content: "Not yet. I’m looking for someone to collaborate with.",
    },
    {
      role: "user",
      content:
        "I’d love to hear more about it. Want to meet at the library tomorrow?",
    },
    {
      role: "assistant",
      content: "Sure! Does 2 PM work for you?",
    },
  ]);

  const historyKey = `chat-history-${id || title || "default"}`;

  const scrollToLatest = useCallback((animated = false) => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated }));
  }, []);

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => scrollToLatest(false), 100);
      return () => clearTimeout(timeout);
    }, [scrollToLatest]),
  );

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await AsyncStorage.getItem(historyKey);
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      }
    };

    loadHistory();
  }, [historyKey]);

  const sendMessage = async () => {
    const content = messageText.trim();
    if (!content) return;

    const updatedMessages = [...messages, { role: "user", content }];
    setMessages(updatedMessages);
    setMessageText("");
    await AsyncStorage.setItem(historyKey, JSON.stringify(updatedMessages));

    const savedConversations = await AsyncStorage.getItem("chat-conversations");
    const conversations = savedConversations
      ? JSON.parse(savedConversations)
      : [];
    const conversationId = String(id || title || "default");
    const existingConversation = conversations.find(
      (conversation: any) => conversation.id === conversationId,
    );
    const updatedConversation = {
      ...existingConversation,
      id: conversationId,
      title: String(title || "Chat"),
      lastMessage: content,
      time: "Now",
      updatedAt: new Date().toISOString(),
      unread: 0,
      isGroup: isGroup === "true",
    };
    await AsyncStorage.setItem(
      "chat-conversations",
      JSON.stringify([
        updatedConversation,
        ...conversations.filter(
          (conversation: any) => conversation.id !== conversationId,
        ),
      ]),
    );
    scrollToLatest(true);
  };

  return (
    <SafeAreaView className="h-full w-full bg-white">
      <View className="bg-white">
        <AppScreenHeader
          title={title || "Chat"}
          titleClassName="text-lg"
          subtitle={isGroup === "true" ? "Group conversation" : "Online"}
          back
          action={
            <View className="size-10 items-center justify-center rounded-full bg-green-lighter">
              <Text className="font-mbold text-sm text-green">
                {(title || "C").charAt(0).toUpperCase()}
              </Text>
            </View>
          }
        />
      </View>
      <ImageBackground
        source={require("@/assets/images/chat-bg.jpeg")}
        className="w-full flex-1"
        style={{ backgroundColor: theme.colors.background }}
        imageStyle={{ opacity: theme.dark ? 0.18 : 0.35 }}
        resizeMode="cover"
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <ChatCard message={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          ListFooterComponent={<View style={{ height: 16 }} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          onContentSizeChange={() => scrollToLatest(false)}
          onLayout={() => scrollToLatest(false)}
          keyboardShouldPersistTaps="handled"
        />
      </ImageBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-row items-end gap-2 bg-white px-3 py-2">
          <TouchableOpacity className="size-11 items-center justify-center rounded-full bg-gray-light">
            <Ionicons name="add" size={25} color="#008751" />
          </TouchableOpacity>

          <View className="min-h-11 flex-1 flex-row items-center rounded-3xl bg-gray-light px-3">
            <TouchableOpacity className="mr-2">
              <Ionicons name="happy-outline" size={21} color="#787878" />
            </TouchableOpacity>
            <TextInput
              className="max-h-24 flex-1 py-2.5 font-mregular text-sm text-gray"
              placeholder="Message"
              placeholderTextColor="#787878"
              value={messageText}
              onChangeText={setMessageText}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              multiline
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="camera-outline" size={21} color="#787878" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={messageText.trim() ? sendMessage : undefined}
            className="size-11 items-center justify-center rounded-full bg-green"
          >
            <Ionicons
              name={messageText.trim() ? "send" : "mic-outline"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <StatusBar
        style={theme.dark ? "light" : "dark"}
        backgroundColor={theme.colors.inputBg}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
