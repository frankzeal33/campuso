import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { PlannerItem, usePlannerStore } from "@/store/PlannerStore";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlannerForm() {
  const { mode = "add", id } = useLocalSearchParams<{
    mode?: "add" | "edit";
    id?: string;
  }>();
  const {
    items,
    initializePlanner,
    addPlannerItem,
    updatePlannerItem,
  } = usePlannerStore();
  const [loaded, setLoaded] = useState(mode !== "edit");
  const [itemType, setItemType] = useState<PlannerItem["type"]>("class");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    initializePlanner();
  }, [initializePlanner]);

  useEffect(() => {
    if (mode !== "edit" || loaded) return;
    const item = items.find((plannerItem) => plannerItem.id === id);
    if (!item) return;
    setItemType(item.type);
    setTitle(item.title);
    setDetail(item.detail);
    setDay(item.day);
    setTime(item.time);
    setLoaded(true);
  }, [id, items, loaded, mode]);

  const saveItem = async () => {
    if (!title.trim() || !day.trim() || !time.trim()) return;
    const existing = items.find((item) => item.id === id);
    const value = {
      type: itemType,
      title: title.trim(),
      detail: detail.trim(),
      day: day.trim(),
      time: time.trim(),
      completed:
        itemType === "deadline" ? existing?.completed || false : undefined,
    };

    if (mode === "edit" && id) {
      await updatePlannerItem(id, value);
    } else {
      await addPlannerItem(value);
    }
    router.back();
  };

  const isEdit = mode === "edit";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title={isEdit ? "Edit planner item" : "Add to planner"}
        subtitle="Keep your academic week organised"
        back
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        >
          <View className="mb-5 flex-row rounded-2xl bg-gray-light p-1">
            {(["class", "deadline"] as const).map((type) => (
              <Pressable
                key={type}
                onPress={() => setItemType(type)}
                className={`h-11 flex-1 items-center justify-center rounded-xl ${itemType === type ? "bg-green" : ""}`}
              >
                <Text
                  className={`font-msbold text-xs capitalize ${itemType === type ? "text-white" : "text-gray-300"}`}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="mb-5 rounded-2xl bg-green-lighter p-4">
            <Text className="font-msbold text-xs text-green">
              {itemType === "class" ? "Class schedule" : "Assignment deadline"}
            </Text>
            <Text className="mt-1 font-mregular text-[10px] leading-4 text-gray-300">
              {itemType === "class"
                ? "Add the course, venue, day, and start time to your weekly plan."
                : "Add the task, useful details, due date, and submission time."}
            </Text>
          </View>

          <FormField
            title={itemType === "class" ? "Class or course" : "Deadline title"}
            value={title}
            handleChangeText={setTitle}
            placeholder={
              itemType === "class" ? "e.g. CSC 301" : "e.g. Submit assignment"
            }
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
            inputStyles="text-sm"
          />
          <FormField
            title={itemType === "class" ? "Venue" : "Details"}
            value={detail}
            handleChangeText={setDetail}
            placeholder={
              itemType === "class" ? "e.g. LT 2" : "Optional details"
            }
            labelStyle="text-xs text-gray"
            otherStyles="mt-5"
            inputContainerStyles="rounded-2xl border-0"
            inputStyles="text-sm"
          />
          <View className="mt-5 flex-row gap-3">
            <View className="flex-1">
              <FormField
                title={itemType === "class" ? "Day" : "Due date"}
                value={day}
                handleChangeText={setDay}
                placeholder="e.g. Monday"
                labelStyle="text-xs text-gray"
                inputContainerStyles="rounded-2xl border-0"
                inputStyles="text-sm"
              />
            </View>
            <View className="flex-1">
              <FormField
                title="Time"
                value={time}
                handleChangeText={setTime}
                placeholder="e.g. 9:00 AM"
                labelStyle="text-xs text-gray"
                inputContainerStyles="rounded-2xl border-0"
                inputStyles="text-sm"
              />
            </View>
          </View>

          <CustomButton
            title={
              isEdit
                ? "Save changes"
                : itemType === "class"
                  ? "Add class"
                  : "Add deadline"
            }
            handlePress={saveItem}
            disableButton={!title.trim() || !day.trim() || !time.trim()}
            containerStyles="mt-7 rounded-2xl"
            textStyles="text-sm text-white"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
