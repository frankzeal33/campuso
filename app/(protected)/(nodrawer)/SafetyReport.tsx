import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import TextArea from "@/components/TextArea";
import { useSafetyStore } from "@/store/SafetyStore";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = ["Harassment", "Theft", "Unsafe area", "Medical", "Other"];

export default function SafetyReport() {
  const { addReport } = useSafetyStore();
  const [category, setCategory] = useState("Unsafe area");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [locating, setLocating] = useState(false);

  const useCurrentLocation = async () => {
    setLocating(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission needed",
          "Enable location to attach your position.",
        );
        return;
      }
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(
        `${current.coords.latitude.toFixed(6)}, ${current.coords.longitude.toFixed(6)}`,
      );
    } finally {
      setLocating(false);
    }
  };

  const submit = async () => {
    if (!location.trim() || !description.trim()) return;
    await addReport({
      category,
      location: location.trim(),
      description: description.trim(),
      anonymous,
    });
    Alert.alert("Report submitted", "Your safety report has been saved.", [
      { text: "Done", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Safety report"
        subtitle="Share enough detail to help responders"
        back
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <Text className="mb-2 font-msbold text-xs text-gray">Concern type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -16 }}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 16,
            paddingBottom: 18,
          }}
        >
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              className={`rounded-full px-4 py-2 ${category === item ? "bg-green" : "bg-gray-light"}`}
            >
              <Text
                className={`font-msbold text-[10px] ${category === item ? "text-white" : "text-gray-300"}`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <FormField
          title="Location"
          value={location}
          handleChangeText={setLocation}
          placeholder="Where did this happen?"
          labelStyle="text-xs text-gray"
          inputContainerStyles="rounded-2xl border-0"
          inputStyles="text-sm"
        />
        <Pressable
          onPress={useCurrentLocation}
          className="mt-2 flex-row items-center self-start rounded-full bg-green-lighter px-3 py-2"
        >
          <Ionicons name="locate-outline" size={15} color="#008751" />
          <Text className="ml-1 font-msbold text-[9px] text-green">
            {locating ? "Getting location…" : "Use current location"}
          </Text>
        </Pressable>

        <TextArea
          title="What happened?"
          value={description}
          handleChangeText={setDescription}
          placeholder="Describe the concern and include useful details"
          maxLength={500}
          otherStyles="mt-5"
          labelStyle="text-xs text-gray"
          inputBg="bg-inputBg"
          inputContainerStyles="h-36 rounded-2xl border-0 py-3"
          inputStyles="h-full text-sm"
        />
        <Text className="mt-2 text-right font-mregular text-[9px] text-gray-300">
          {description.length}/500
        </Text>

        <View className="mt-5 flex-row items-center rounded-2xl bg-gray-light p-4">
          <View className="size-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="eye-off-outline" size={20} color="#008751" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-gray">
              Report anonymously
            </Text>
            <Text className="mt-1 font-mregular text-[9px] text-gray-300">
              Your profile information will not be attached.
            </Text>
          </View>
          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            trackColor={{ false: "#DDDDDD", true: "#3BA440" }}
            thumbColor="#fff"
          />
        </View>

        <CustomButton
          title="Submit safety report"
          handlePress={submit}
          disableButton={!location.trim() || !description.trim()}
          containerStyles="mt-6 rounded-2xl"
          textStyles="text-sm text-white"
        />
        <Text className="mt-3 text-center font-mregular text-[9px] leading-4 text-gray-300">
          For immediate danger, call 112 instead of waiting for a report
          response.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
