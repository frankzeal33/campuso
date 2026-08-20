import ProviderScreenHeader from "@/components/ProviderScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import TextArea from "@/components/TextArea";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProviderBusiness() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    name: "Campus Tech & Services",
    category: "Repairs and student services",
    phone: "0803 000 0000",
    location: "Student Centre, Shop 14",
    hours: "Mon–Sat · 8:00 AM–6:00 PM",
    description:
      "Reliable device repairs and practical student services delivered around campus.",
  });
  const field = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ProviderScreenHeader
        title="Business profile"
        subtitle="How students see your business"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <View className="mb-5 flex-row items-center rounded-2xl bg-green-drawer p-4">
          <View className="size-14 items-center justify-center rounded-2xl bg-white">
            <Ionicons name="storefront" size={26} color="#008751" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-gray">
              Verified campus provider
            </Text>
            <Text className="mt-1 font-mregular text-[9px] text-gray-300">
              Your profile is visible in Marketplace and Find.
            </Text>
          </View>
          <Ionicons name="checkmark-circle" size={21} color="#008751" />
        </View>
        <View className="gap-4">
          <FormField
            title="Business name"
            value={form.name}
            handleChangeText={(value: string) => field("name", value)}
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
          />
          <FormField
            title="Category"
            value={form.category}
            handleChangeText={(value: string) => field("category", value)}
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
          />
          <FormField
            title="Contact number"
            value={form.phone}
            handleChangeText={(value: string) => field("phone", value)}
            keyboardType="phone-pad"
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
          />
          <FormField
            title="Campus location"
            value={form.location}
            handleChangeText={(value: string) => field("location", value)}
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
          />
          <FormField
            title="Opening hours"
            value={form.hours}
            handleChangeText={(value: string) => field("hours", value)}
            labelStyle="text-xs text-gray"
            inputContainerStyles="rounded-2xl border-0"
          />
          <TextArea
            title="About the business"
            value={form.description}
            handleChangeText={(value: string) => field("description", value)}
            labelStyle="text-xs text-gray"
            inputContainerStyles="h-32 rounded-2xl"
            inputStyles="h-28 text-sm"
          />
        </View>
        <CustomButton
          title="Save business profile"
          handlePress={() =>
            Alert.alert(
              "Profile saved",
              "Your provider information has been updated.",
            )
          }
          containerStyles="mt-6 rounded-2xl"
          textStyles="text-sm text-white"
        />
      </ScrollView>
    </View>
  );
}
