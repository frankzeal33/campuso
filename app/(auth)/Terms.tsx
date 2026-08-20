import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Terms() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <View className="mt-3 flex-row items-center justify-between pb-3">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left-circle" size={30} color="#C3C3C3" />
        </TouchableOpacity>
        <Image
          source={images.logo}
          className="h-10 w-28"
          resizeMode="contain"
        />
        <View className="w-10" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text className="mb-8 mt-6 text-center font-mbold text-2xl text-green">
          Terms & Conditions
        </Text>
        <Text className="mb-4 font-msbold text-gray">
          Last updated: August 2026
        </Text>
        <Text className="mb-6 text-justify font-mregular leading-6 text-gray">
          <Text className="font-msbold">1. Acceptance of terms. </Text>By
          accessing or using Campuso, you agree to these Terms and Conditions.
          If you do not agree, you should not use the app.
        </Text>
        <Text className="mb-6 text-justify font-mregular leading-6 text-gray">
          <Text className="font-msbold">2. Account registration. </Text>You
          agree to provide accurate and current information, protect your
          account credentials, and notify us if you suspect unauthorized access.
        </Text>
        <Text className="mb-6 text-justify font-mregular leading-6 text-gray">
          <Text className="font-msbold">3. Campus safety. </Text>Use
          marketplace, community, and provider features responsibly. Verify
          important details before making payments, meeting people, or relying
          on a listing.
        </Text>
        <Text className="mb-6 text-justify font-mregular leading-6 text-gray">
          <Text className="font-msbold">4. Permitted use. </Text>You may use
          Campuso only for lawful purposes. Fraud, harassment, impersonation,
          harmful content, and misuse of another person&apos;s information are
          prohibited.
        </Text>
      </ScrollView>
      <View className="gap-3 pb-3">
        <CustomButton
          title="Accept"
          handlePress={() => router.back()}
          containerStyles="w-full"
          textStyles="text-white"
        />
        <CustomButton
          title="Cancel"
          handlePress={() => router.back()}
          containerStyles="w-full"
          bgColor="bg-red-100"
          textStyles="text-red-500"
        />
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
