import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import SearchBar from "@/components/SearchBar";
import TextArea from "@/components/TextArea";
import CustomButtomSheet, {
  CustomBottomSheetRef,
} from "@/components/CustomButtomSheet";
import { people } from "@/constants/appData";
import { useDiscoveryStore } from "@/store/DiscoveryStore";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import { RectButton } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type Conversation = {
  id: string;
  title: string;
  lastMessage: string;
  time?: string;
  updatedAt?: string;
  unread?: number;
  isGroup?: boolean;
  members?: string[];
  description?: string;
  photoUri?: string;
};

const initialConversations: Conversation[] = [
  {
    id: "1",
    title: "Amara Okafor",
    lastMessage: "Sure! Does 2 PM work for you?",
    time: "11:46 AM",
    unread: 2,
  },
  {
    id: "campus-tech-circle",
    title: "Campus Tech Circle",
    lastMessage: "Tobi: I’ve shared the project files",
    time: "10:32 AM",
    isGroup: true,
    members: ["1", "2", "3"],
  },
  {
    id: "3",
    title: "Zainab Musa",
    lastMessage: "See you after the economics lecture",
    time: "Yesterday",
  },
  {
    id: "study-squad",
    title: "Study Squad 📚",
    lastMessage: "David: Library by 4 PM?",
    time: "Yesterday",
    unread: 4,
    isGroup: true,
    members: ["1", "3", "4"],
  },
];

const getPerson = (id: string) => people.find((person) => person.id === id);

export default function Chats() {
  const [query, setQuery] = useState("");
  const [conversationFilter, setConversationFilter] = useState<
    "All" | "Unread" | "Read" | "Friends" | "Groups" | "Other schools"
  >("All");
  const { allowCrossSchool, initializeDiscovery } = useDiscoveryStore();
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const groupSheetRef = useRef<CustomBottomSheetRef>(null);
  const personalSheetRef = useRef<CustomBottomSheetRef>(null);
  const openSwipeableRef = useRef<SwipeableMethods | null>(null);
  const swipeableRefs = useRef(
    new Map<string, ReturnType<typeof createRef<SwipeableMethods>>>(),
  );
  const [groupStep, setGroupStep] = useState<1 | 2>(1);
  const [memberQuery, setMemberQuery] = useState("");
  const [personalQuery, setPersonalQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupPhoto, setGroupPhoto] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    initializeDiscovery();
  }, [initializeDiscovery]);

  useEffect(() => {
    if (!allowCrossSchool && conversationFilter === "Other schools") {
      setConversationFilter("All");
    }
  }, [allowCrossSchool, conversationFilter]);

  useEffect(() => {
    const loadConversations = async () => {
      const [saved, deletedValue] = await Promise.all([
        AsyncStorage.getItem("chat-conversations"),
        AsyncStorage.getItem("deleted-chat-conversations"),
      ]);
      const deletedIds = deletedValue
        ? (JSON.parse(deletedValue) as string[])
        : [];
      if (!saved) return;

      const stored = JSON.parse(saved) as Conversation[];
      setConversations(() => {
        const storedIds = new Set(stored.map((item) => item.id));
        return [
          ...stored,
          ...initialConversations.filter(
            (item) => !storedIds.has(item.id) && !deletedIds.includes(item.id),
          ),
        ];
      });
    };

    loadConversations();
  }, []);

  const filteredConversations = useMemo(
    () =>
      conversations.filter(
        (conversation) => {
          const person = getPerson(conversation.id);
          const canShowConversation =
            conversation.isGroup ||
            !person ||
            person.isSameSchool ||
            allowCrossSchool;
          return (
            canShowConversation &&
            conversation.title.toLowerCase().includes(query.toLowerCase()) &&
          (conversationFilter === "All" ||
            (conversationFilter === "Unread" && !!conversation.unread) ||
            (conversationFilter === "Read" && !conversation.unread) ||
            (conversationFilter === "Friends" && !conversation.isGroup) ||
              (conversationFilter === "Groups" && conversation.isGroup) ||
              (conversationFilter === "Other schools" &&
                !conversation.isGroup &&
                person &&
                !person.isSameSchool))
          );
        },
      ),
    [allowCrossSchool, conversationFilter, conversations, query],
  );
  const filteredPeople = useMemo(
    () =>
      people.filter(
        (person) =>
          (person.isSameSchool || allowCrossSchool) &&
          person.name.toLowerCase().includes(memberQuery.toLowerCase()) ||
          ((person.isSameSchool || allowCrossSchool) &&
            person.course.toLowerCase().includes(memberQuery.toLowerCase())),
      ),
    [allowCrossSchool, memberQuery],
  );
  const filteredPersonalPeople = useMemo(
    () =>
      people.filter(
        (person) =>
          (person.isSameSchool || allowCrossSchool) &&
          (person.name.toLowerCase().includes(personalQuery.toLowerCase()) ||
            person.course.toLowerCase().includes(personalQuery.toLowerCase()) ||
            person.school.toLowerCase().includes(personalQuery.toLowerCase())),
      ),
    [allowCrossSchool, personalQuery],
  );

  const openGroupSheet = () => {
    setGroupStep(1);
    setMemberQuery("");
    setGroupName("");
    setGroupDescription("");
    setGroupPhoto(null);
    setSelectedMembers([]);
    groupSheetRef.current?.present();
  };

  const closeGroupSheet = () => groupSheetRef.current?.dismiss();

  const openPersonalSheet = () => {
    setPersonalQuery("");
    personalSheetRef.current?.present();
  };

  const startPersonalChat = (person: (typeof people)[number]) => {
    personalSheetRef.current?.dismiss();
    router.push({
      pathname: "/(protected)/(nodrawer)/Chat",
      params: { id: person.id, title: person.name, isGroup: "false" },
    } as any);
  };

  const openChat = async (
    conversation: Conversation,
    sourceConversations = conversations,
  ) => {
    const updatedConversations = sourceConversations.map((item) =>
      item.id === conversation.id ? { ...item, unread: 0 } : item,
    );
    setConversations(updatedConversations);
    await AsyncStorage.setItem(
      "chat-conversations",
      JSON.stringify(updatedConversations),
    );
    router.push({
      pathname: "/(protected)/(nodrawer)/Chat",
      params: {
        id: conversation.id,
        title: conversation.title,
        isGroup: conversation.isGroup ? "true" : "false",
      },
    } as any);
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((members) =>
      members.includes(id)
        ? members.filter((memberId) => memberId !== id)
        : [...members, id],
    );
  };

  const createGroup = async () => {
    const title = groupName.trim();
    if (!title || selectedMembers.length < 2) return;

    const group: Conversation = {
      id: `group-${Date.now()}`,
      title,
      lastMessage: "Group created",
      time: "Now",
      isGroup: true,
      members: selectedMembers,
      description: groupDescription.trim(),
      photoUri: groupPhoto || undefined,
    };
    const updated = [group, ...conversations];
    setConversations(updated);
    await AsyncStorage.setItem("chat-conversations", JSON.stringify(updated));
    setGroupName("");
    setGroupDescription("");
    setGroupPhoto(null);
    setSelectedMembers([]);
    closeGroupSheet();
    openChat(group, updated);
  };

  const saveConversations = async (updated: Conversation[]) => {
    setConversations(updated);
    await AsyncStorage.setItem("chat-conversations", JSON.stringify(updated));
  };

  const clearConversation = (conversation: Conversation) => {
    Alert.alert(
      "Clear conversation?",
      `All messages in ${conversation.title} will be removed.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(`chat-history-${conversation.id}`);
            await saveConversations(
              conversations.map((item) =>
                item.id === conversation.id
                  ? { ...item, lastMessage: "No messages yet", time: "", unread: 0 }
                  : item,
              ),
            );
          },
        },
      ],
    );
  };

  const removeConversation = (
    conversation: Conversation,
    action: "delete" | "exit",
  ) => {
    Alert.alert(
      action === "exit" ? "Exit group?" : "Delete conversation?",
      action === "exit"
        ? `You will leave ${conversation.title} and remove its chat history.`
        : `This will remove ${conversation.title} and its chat history.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: action === "exit" ? "Exit" : "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = conversations.filter(
              (item) => item.id !== conversation.id,
            );
            const deletedValue = await AsyncStorage.getItem(
              "deleted-chat-conversations",
            );
            const deletedIds = deletedValue
              ? (JSON.parse(deletedValue) as string[])
              : [];
            await Promise.all([
              saveConversations(updated),
              AsyncStorage.removeItem(`chat-history-${conversation.id}`),
              AsyncStorage.setItem(
                "deleted-chat-conversations",
                JSON.stringify([...new Set([...deletedIds, conversation.id])]),
              ),
            ]);
          },
        },
      ],
    );
  };

  const renderSwipeActions = (conversation: Conversation) => (
    <View className="flex-row">
      <RectButton
        onPress={() => clearConversation(conversation)}
        style={{ width: 76, backgroundColor: "#FEC844" }}
      >
        <View className="flex-1 items-center justify-center">
          <Ionicons name="trash-bin-outline" size={19} color="#2F2F2F" />
          <Text className="mt-1 font-msbold text-[9px] text-gray">Clear</Text>
        </View>
      </RectButton>
      <RectButton
        onPress={() =>
          removeConversation(
            conversation,
            conversation.isGroup ? "exit" : "delete",
          )
        }
        style={{ width: 76, backgroundColor: "#EF4444" }}
      >
        <View className="flex-1 items-center justify-center">
          <Ionicons
            name={conversation.isGroup ? "exit-outline" : "trash-outline"}
            size={19}
            color="#fff"
          />
          <Text className="mt-1 font-msbold text-[9px] text-white">
            {conversation.isGroup ? "Exit" : "Delete"}
          </Text>
        </View>
      </RectButton>
    </View>
  );

  const pickGroupPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setGroupPhoto(result.assets[0].uri);
  };

  const renderAvatar = (conversation: Conversation) => {
    if (conversation.isGroup) {
      if (conversation.photoUri) {
        return (
          <Image
            source={{ uri: conversation.photoUri }}
            className="size-14 rounded-full"
          />
        );
      }
      return (
        <View className="size-14 items-center justify-center rounded-full bg-green-lighter">
          <Ionicons name="people" size={24} color="#008751" />
        </View>
      );
    }

    const person = getPerson(conversation.id);
    return person?.image ? (
      <Image source={person.image} className="size-14 rounded-full" />
    ) : (
      <View className="size-14 items-center justify-center rounded-full bg-green-drawer">
        <Text className="font-mbold text-base text-green">
          {person?.initials || conversation.title.slice(0, 2).toUpperCase()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Chats"
        subtitle={`${conversations.length} conversations`}
        back
        action={
          <Pressable
            onPress={openPersonalSheet}
            className="size-10 items-center justify-center rounded-full bg-green"
          >
            <Ionicons name="person-outline" size={18} color="#fff" />
            <View className="absolute bottom-0 right-0 size-5 items-center justify-center rounded-full border-2 border-white bg-yellow">
              <Ionicons name="add" size={11} color="#2F2F2F" />
            </View>
          </Pressable>
        }
      />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search conversations"
        containerStyles="mb-3 border-0"
      />

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Pressable
              onPress={openGroupSheet}
              className="mb-3 flex-row items-center rounded-2xl bg-green-lighter p-4"
            >
              <View className="size-11 items-center justify-center rounded-full bg-green">
                <Ionicons name="people" size={21} color="#fff" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-green">
                  Create a group chat
                </Text>
                <Text className="mt-0.5 font-mregular text-[10px] text-gray-300">
                  Bring classmates and friends together
                </Text>
              </View>
              <View className="size-8 items-center justify-center rounded-full bg-white">
                <Ionicons name="arrow-forward" size={17} color="#008751" />
              </View>
            </Pressable>

            <FlatList
              data={[
                "All",
                "Unread",
                "Read",
                "Friends",
                "Groups",
                ...(allowCrossSchool ? (["Other schools"] as const) : []),
              ] as const}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{
                gap: 8,
                paddingHorizontal: 16,
                paddingBottom: 4,
              }}
              renderItem={({ item }) => {
                const active = conversationFilter === item;
                return (
                  <Pressable
                    onPress={() => setConversationFilter(item)}
                    className={`rounded-full px-4 py-2 ${active ? "bg-green" : "bg-gray-light"}`}
                  >
                    <Text
                      className={`font-msbold text-[11px] ${active ? "text-white" : "text-gray-300"}`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        }
        renderItem={({ item, index }) => {
          let rowRef = swipeableRefs.current.get(item.id);
          if (!rowRef) {
            rowRef = createRef<SwipeableMethods>();
            swipeableRefs.current.set(item.id, rowRef);
          }
          return (
            <ReanimatedSwipeable
              ref={rowRef}
              friction={2}
              rightThreshold={40}
              overshootRight={false}
              containerStyle={{ marginHorizontal: -16 }}
              renderRightActions={() => renderSwipeActions(item)}
              onSwipeableWillOpen={() => {
                if (
                  openSwipeableRef.current &&
                  openSwipeableRef.current !== rowRef.current
                ) {
                  openSwipeableRef.current.close();
                }
                openSwipeableRef.current = rowRef.current;
              }}
              onSwipeableWillClose={() => {
                if (openSwipeableRef.current === rowRef.current) {
                  openSwipeableRef.current = null;
                }
              }}
            >
              <Pressable
                onPress={() => openChat(item)}
                className="flex-row bg-white pl-4"
              >
                <View className="justify-center py-3">{renderAvatar(item)}</View>
                <View
                  className={`ml-3 flex-1 justify-center py-3 pr-4 ${index < filteredConversations.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <View className="flex-row items-center">
                    <Text
                      className="flex-1 font-msbold text-[15px] text-gray"
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <Text className="ml-2 font-mregular text-[10px] text-gray-300">
                      {item.time || "Now"}
                    </Text>
                  </View>
                  <View className="mt-1 flex-row items-center">
                    {item.isGroup ? (
                      <Ionicons
                        name="people-outline"
                        size={13}
                        color="#787878"
                      />
                    ) : null}
                    <Text
                      className={`${item.isGroup ? "ml-1" : ""} flex-1 font-mregular text-xs text-gray-300`}
                      numberOfLines={1}
                    >
                      {item.lastMessage}
                    </Text>
                    {item.unread ? (
                      <View className="ml-2 min-w-5 items-center justify-center rounded-full bg-green px-1.5 py-0.5">
                        <Text className="font-msbold text-[9px] text-white">
                          {item.unread}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            </ReanimatedSwipeable>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-24">
            <Ionicons name="chatbubbles-outline" size={48} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              No conversations found
            </Text>
          </View>
        }
      />

      <CustomButtomSheet
        ref={personalSheetRef}
        snapPoints={["90%"]}
        dynamicSizing={false}
        scrollable
      >
        <View className="flex-1">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="font-mbold text-xl text-gray">New chat</Text>
              <Text className="mt-0.5 font-mregular text-xs text-gray-300">
                Find someone to message
              </Text>
            </View>
            <Pressable
              onPress={() => personalSheetRef.current?.dismiss()}
              className="size-9 items-center justify-center rounded-full bg-gray-light"
            >
              <Ionicons name="close" size={20} color="#2F2F2F" />
            </Pressable>
          </View>

          <SearchBar
            value={personalQuery}
            onChangeText={setPersonalQuery}
            placeholder="Search name, course, or school"
            bottomSheet
            containerStyles="mx-0 mb-2 h-[52px] border border-gray-200 bg-white"
            inputStyles="h-full"
          />

          <BottomSheetFlatList
            data={filteredPersonalPeople}
            keyExtractor={(person) => person.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item: person }) => (
              <Pressable
                onPress={() => startPersonalChat(person)}
                className="flex-row items-center py-3"
              >
                {person.image ? (
                  <Image source={person.image} className="size-12 rounded-full" />
                ) : (
                  <View className="size-12 items-center justify-center rounded-full bg-green-drawer">
                    <Text className="font-msbold text-xs text-green">
                      {person.initials}
                    </Text>
                  </View>
                )}
                <View className="ml-3 flex-1">
                  <Text className="font-msbold text-sm text-gray">
                    {person.name}
                  </Text>
                  <Text className="mt-0.5 font-mregular text-[10px] text-gray-300">
                    {person.course}
                  </Text>
                  {!person.isSameSchool ? (
                    <Text className="mt-1 font-mmedium text-[9px] text-green">
                      {person.school}
                    </Text>
                  ) : null}
                </View>
                <View className="size-9 items-center justify-center rounded-full bg-green-lighter">
                  <Ionicons name="chatbubble-outline" size={17} color="#008751" />
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View className="items-center py-16">
                <Ionicons name="person-outline" size={38} color="#C3C3C3" />
                <Text className="mt-3 font-msbold text-gray-300">
                  No people found
                </Text>
              </View>
            }
          />
        </View>
      </CustomButtomSheet>

      <CustomButtomSheet
        ref={groupSheetRef}
        snapPoints={["90%"]}
        dynamicSizing={false}
        scrollable
      >
        {groupStep === 1 ? (
          <View className="flex-1">
            <View className="mb-4 flex-row items-center justify-between">
              <View>
                <Text className="font-mbold text-xl text-gray">Add members</Text>
                <Text className="mt-0.5 font-mregular text-xs text-gray-300">
                  {selectedMembers.length} selected · minimum of 2
                </Text>
              </View>
              <Pressable
                onPress={closeGroupSheet}
                className="size-9 items-center justify-center rounded-full bg-gray-light"
              >
                <Ionicons name="close" size={20} color="#2F2F2F" />
              </Pressable>
            </View>

            <SearchBar
              value={memberQuery}
              onChangeText={setMemberQuery}
              placeholder="Search people"
              bottomSheet
              containerStyles="mx-0 mb-2 h-[52px] border border-gray-200 bg-white"
              inputStyles="h-full"
            />

            <BottomSheetFlatList
              data={filteredPeople}
              keyExtractor={(person) => person.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 12 }}
              renderItem={({ item: person }) => {
                const selected = selectedMembers.includes(person.id);
                return (
                  <Pressable
                    onPress={() => toggleMember(person.id)}
                    className="flex-row items-center py-3"
                  >
                    {person.image ? (
                      <Image
                        source={person.image}
                        className="size-12 rounded-full"
                      />
                    ) : (
                      <View className="size-12 items-center justify-center rounded-full bg-green-drawer">
                        <Text className="font-msbold text-xs text-green">
                          {person.initials}
                        </Text>
                      </View>
                    )}
                    <View className="ml-3 flex-1">
                      <Text className="font-msbold text-sm text-gray">
                        {person.name}
                      </Text>
                      <Text className="mt-0.5 font-mregular text-[10px] text-gray-300">
                        {person.course}
                      </Text>
                    </View>
                    <View
                      className={`size-6 items-center justify-center rounded-full ${selected ? "bg-green" : "border border-gray-200"}`}
                    >
                      {selected ? (
                        <Ionicons name="checkmark" size={15} color="#fff" />
                      ) : null}
                    </View>
                  </Pressable>
                );
              }}
              ListEmptyComponent={
                <View className="items-center py-16">
                  <Ionicons name="search" size={38} color="#C3C3C3" />
                  <Text className="mt-3 font-msbold text-gray-300">
                    No people found
                  </Text>
                </View>
              }
            />

            <CustomButton
              title="Next"
              handlePress={() => setGroupStep(2)}
              disableButton={selectedMembers.length < 2}
              containerStyles="rounded-2xl"
              textStyles="text-sm text-white"
            />
          </View>
        ) : (
          <View className="flex-1">
            <View className="mb-5 flex-row items-center">
              <Pressable
                onPress={() => setGroupStep(1)}
                className="size-9 items-center justify-center rounded-full bg-gray-light"
              >
                <Ionicons name="arrow-back" size={20} color="#2F2F2F" />
              </Pressable>
              <Text className="ml-3 flex-1 font-mbold text-xl text-gray">
                Group details
              </Text>
              <Pressable
                onPress={closeGroupSheet}
                className="size-9 items-center justify-center rounded-full bg-gray-light"
              >
                <Ionicons name="close" size={20} color="#2F2F2F" />
              </Pressable>
            </View>

            <Pressable onPress={pickGroupPhoto} className="mb-6 self-center">
              {groupPhoto ? (
                <Image
                  source={{ uri: groupPhoto }}
                  className="size-24 rounded-full"
                />
              ) : (
                <View className="size-24 items-center justify-center rounded-full bg-green-lighter">
                  <Ionicons name="camera-outline" size={30} color="#008751" />
                </View>
              )}
              <View className="absolute bottom-0 right-0 size-8 items-center justify-center rounded-full border-2 border-white bg-green">
                <Ionicons name="add" size={17} color="#fff" />
              </View>
            </Pressable>

            <FormField
              title="Group name"
              value={groupName}
              handleChangeText={setGroupName}
              placeholder="Enter a group name"
              labelStyle="text-xs text-gray"
              inputBg="bg-inputBg"
              inputContainerStyles="rounded-2xl border-0"
              inputStyles="text-sm text-gray"
            />

            <TextArea
              title="Description"
              value={groupDescription}
              handleChangeText={setGroupDescription}
              placeholder="What is this group about?"
              maxLength={160}
              otherStyles="mt-5"
              labelStyle="text-xs text-gray"
              inputBg="bg-inputBg"
              inputContainerStyles="h-28 rounded-2xl border-0 py-3"
              inputStyles="h-full text-sm text-gray"
            />
            <Text className="mt-2 text-right font-mregular text-[10px] text-gray-300">
              {groupDescription.length}/160
            </Text>

            <CustomButton
              title="Create group"
              handlePress={createGroup}
              disableButton={!groupName.trim()}
              containerStyles="mt-6 rounded-2xl"
              textStyles="text-sm text-white"
            />
          </View>
        )}
      </CustomButtomSheet>
    </SafeAreaView>
  );
}
