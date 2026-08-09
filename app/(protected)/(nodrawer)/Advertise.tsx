import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Advertise() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    title: "",
    audience: "",
    budget: "",
    description: "",
  });
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="Advertise on Campus"
        subtitle="Reach students who matter to your brand"
        back
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View className="rounded-3xl bg-green p-5">
          <View className="size-12 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="megaphone-outline" size={25} color="white" />
          </View>
          <Text className="mt-4 font-mbold text-xl text-white">
            Launch your campus campaign
          </Text>
          <Text className="mt-2 font-mregular text-xs leading-5 text-white/80">
            Promote a business, product or event directly to verified students.
          </Text>
        </View>
        <FormField
          title="Campaign title"
          value={form.title}
          placeholder="What are you promoting?"
          handleChangeText={(value: string) =>
            setForm({ ...form, title: value })
          }
          otherStyles="mt-5"
        />
        <FormField
          title="Target audience"
          value={form.audience}
          placeholder="School, faculty or department"
          handleChangeText={(value: string) =>
            setForm({ ...form, audience: value })
          }
          otherStyles="mt-5"
        />
        <FormField
          title="Budget"
          value={form.budget}
          placeholder="Enter amount"
          keyboardType="numeric"
          handleChangeText={(value: string) =>
            setForm({ ...form, budget: value })
          }
          otherStyles="mt-5"
        />
        <FormField
          title="Campaign description"
          value={form.description}
          placeholder="Tell students about your offer"
          handleChangeText={(value: string) =>
            setForm({ ...form, description: value })
          }
          otherStyles="mt-5"
        />
        <CustomButton
          title="Review campaign"
          containerStyles="mt-6 w-full"
          textStyles="text-white"
        />
      </ScrollView>
    </View>
  );
}
