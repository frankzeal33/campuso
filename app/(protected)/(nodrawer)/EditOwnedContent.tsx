import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import TextArea from "@/components/TextArea";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditOwnedContent() {
  const {
    type = "content",
    title = "",
    detail = "",
  } = useLocalSearchParams<{
    type?: string;
    title?: string;
    detail?: string;
  }>();
  const [name, setName] = useState(title);
  const [description, setDescription] = useState(detail);
  const [extra, setExtra] = useState("");
  const label =
    type === "listing"
      ? "listing"
      : type === "event"
        ? "event"
        : type === "service"
          ? "service"
          : "post";
  const save = () => {
    if (!name.trim()) return;
    Alert.alert("Changes saved", `Your ${label} has been updated.`, [
      { text: "Done", onPress: () => router.back() },
    ]);
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title={`Edit ${label}`}
        subtitle="Update content you created"
        back
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <View className="mb-5 rounded-2xl bg-green-drawer p-4">
          <Text className="font-msbold text-xs text-green">
            You own this {label}
          </Text>
          <Text className="mt-1 font-mregular text-[10px] leading-4 text-gray-300">
            Only you can change the information shown here.
          </Text>
        </View>
        <FormField
          title="Title"
          value={name}
          handleChangeText={setName}
          placeholder={`Enter ${label} title`}
          labelStyle="text-xs text-gray"
          inputContainerStyles="rounded-2xl border-0"
        />
        <TextArea
          title="Description"
          value={description}
          handleChangeText={setDescription}
          placeholder={`Describe your ${label}`}
          otherStyles="mt-5"
          labelStyle="text-xs text-gray"
          inputContainerStyles="h-40 rounded-2xl"
          inputStyles="h-36 text-sm"
        />
        {label !== "post" ? (
          <FormField
            title={
              label === "event" ? "Date and venue" : "Price or availability"
            }
            value={extra}
            handleChangeText={setExtra}
            placeholder="Add useful details"
            otherStyles="mt-5"
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
          />
        ) : null}
        <CustomButton
          title="Save changes"
          handlePress={save}
          disableButton={!name.trim()}
          containerStyles="mt-7 rounded-2xl"
          textStyles="text-sm text-white"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
