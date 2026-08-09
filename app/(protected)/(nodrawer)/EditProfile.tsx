import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import TextArea from "@/components/TextArea";
import { useProfileStore } from "@/store/ProfileStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
  const { userProfile, setProfile } = useProfileStore();
  const [form, setForm] = useState({
    fullName: userProfile.fullName || "Oladapo Koiki",
    userName: userProfile.userName || "oladapokoiki",
    email: userProfile.email || "bjkoiki19@gmail.com",
    phoneNumber: userProfile.phoneNumber,
    school: userProfile.school || "University of Lagos",
    course: userProfile.course || "Computer Science",
    level: userProfile.level || "400L",
    bio: userProfile.bio || "Building, learning and connecting across campus.",
    interests: (userProfile.interests ?? []).join(", ") || "Technology, Design, Football",
    profilePicture: userProfile.profilePicture,
  });
  const [saving, setSaving] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Photo permission needed", "Allow photo access to choose a profile picture.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled) update("profilePicture", result.assets[0].uri);
  };

  const save = async () => {
    if (!form.fullName.trim() || !form.userName.trim() || !form.email.trim()) {
      Alert.alert("Complete your profile", "Name, username, and email are required.");
      return;
    }
    setSaving(true);
    const updated = {
      ...userProfile,
      ...form,
      fullName: form.fullName.trim(),
      userName: form.userName.trim().replace(/^@/, ""),
      interests: form.interests.split(",").map((item) => item.trim()).filter(Boolean),
      isProfileCreated: true,
    };
    await AsyncStorage.setItem("userProfile", JSON.stringify(updated));
    setProfile(updated);
    setSaving(false);
    router.back();
  };

  const avatar = form.profilePicture ? { uri: form.profilePicture } : { uri: "https://i.pravatar.cc/240?img=12" };
  return <SafeAreaView className="flex-1 bg-white">
    <AppScreenHeader title="Edit profile" subtitle="Keep your campus identity up to date" back />
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <View className="mb-6 items-center rounded-3xl bg-green-drawer p-5">
          <Pressable onPress={pickPhoto} className="relative"><Image source={avatar} className="size-24 rounded-full" /><View className="absolute bottom-0 right-0 size-8 items-center justify-center rounded-full border-2 border-green-drawer bg-green"><Ionicons name="camera" size={15} color="#fff" /></View></Pressable>
          <Text className="mt-3 font-msbold text-sm text-gray">Profile photo</Text><Text className="mt-1 font-mregular text-[9px] text-gray-300">Tap the photo to choose another</Text>
        </View>
        <View className="gap-4">
          <FormField title="Full name" value={form.fullName} handleChangeText={(value: string) => update("fullName", value)} placeholder="Your full name" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" />
          <FormField title="Username" value={form.userName} handleChangeText={(value: string) => update("userName", value)} placeholder="Username" autoCapitalize="none" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" />
          <FormField title="Email" value={form.email} handleChangeText={(value: string) => update("email", value)} placeholder="Email address" keyboardType="email-address" autoCapitalize="none" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" />
          <FormField title="Phone number" value={form.phoneNumber} handleChangeText={(value: string) => update("phoneNumber", value)} placeholder="Phone number" keyboardType="phone-pad" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" />
          <FormField title="School" value={form.school} handleChangeText={(value: string) => update("school", value)} placeholder="Your school" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" />
          <View className="flex-row gap-3"><View className="flex-1"><FormField title="Course" value={form.course} handleChangeText={(value: string) => update("course", value)} placeholder="Course" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" /></View><View className="w-24"><FormField title="Level" value={form.level} handleChangeText={(value: string) => update("level", value)} placeholder="400L" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" /></View></View>
          <TextArea title="Bio" value={form.bio} handleChangeText={(value: string) => update("bio", value)} placeholder="Tell your campus community about yourself" labelStyle="text-xs text-gray" inputContainerStyles="h-28 rounded-2xl border-gray-200" inputStyles="h-24 text-sm" maxLength={180} />
          <FormField title="Interests" value={form.interests} handleChangeText={(value: string) => update("interests", value)} placeholder="Technology, Music, Sports" labelStyle="text-xs text-gray" inputContainerStyles="rounded-2xl border-0" inputStyles="text-sm" />
          <Text className="-mt-2 font-mregular text-[9px] text-gray-300">Separate interests with commas.</Text>
        </View>
        <CustomButton title="Save changes" handlePress={save} isLoading={saving} containerStyles="mt-7 rounded-2xl" textStyles="text-sm text-white" />
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
