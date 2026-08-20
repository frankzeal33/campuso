import AppScreenHeader from "@/components/AppScreenHeader";
import { useSafetyStore } from "@/store/SafetyStore";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  Share,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CampusSafety() {
  const { contacts, reports, initializeSafety } = useSafetyStore();
  const [sharingLocation, setSharingLocation] = useState(false);

  useEffect(() => {
    initializeSafety();
  }, [initializeSafety]);

  const callEmergency = () => {
    Alert.alert(
      "Call emergency services?",
      "This will call Nigeria’s national emergency number, 112.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call 112",
          style: "destructive",
          onPress: () => Linking.openURL("tel:112"),
        },
      ],
    );
  };

  const shareLocation = async () => {
    setSharingLocation(true);
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Location permission needed",
          "Enable location access to share where you are during a safety situation.",
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      await Share.share({
        message: `I’m sharing my current location through Campuso Safety: https://maps.google.com/?q=${latitude},${longitude}`,
      });
    } catch {
      Alert.alert("Unable to share location", "Please try again in a moment.");
    } finally {
      setSharingLocation(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Campus safety"
        subtitle="Quick help when you need it"
        back
        action={
          <View className="size-10 items-center justify-center rounded-full bg-red-50">
            <Ionicons name="shield-checkmark" size={21} color="#DC2626" />
          </View>
        }
      />

      <FlatList
        data={reports.slice(0, 3)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Pressable
              onPress={callEmergency}
              className="mb-4 items-center rounded-3xl bg-red-600 p-6"
            >
              <View className="size-16 items-center justify-center rounded-full bg-white/20">
                <Ionicons name="call" size={30} color="#fff" />
              </View>
              <Text className="mt-3 font-mbold text-xl text-white">
                Emergency SOS
              </Text>
              <Text className="mt-1 text-center font-mregular text-[11px] text-white/80">
                Tap to call Nigeria’s national emergency line · 112
              </Text>
            </Pressable>

            <View className="mb-4 flex-row gap-3">
              <Pressable
                onPress={shareLocation}
                disabled={sharingLocation}
                className="flex-1 rounded-2xl bg-green-drawer p-4"
              >
                <Ionicons name="location-outline" size={24} color="#008751" />
                <Text className="mt-4 font-msbold text-sm text-gray">
                  {sharingLocation ? "Getting location…" : "Share location"}
                </Text>
                <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                  Send your live position
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push("/(protected)/(nodrawer)/TrustedContacts" as any)
                }
                className="flex-1 rounded-2xl bg-yellow-light p-4"
              >
                <Ionicons name="people-outline" size={24} color="#8A5A00" />
                <Text className="mt-4 font-msbold text-sm text-gray">
                  Trusted contacts
                </Text>
                <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                  {contacts.length} contact{contacts.length === 1 ? "" : "s"}{" "}
                  added
                </Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() =>
                router.push("/(protected)/(nodrawer)/SafetyReport" as any)
              }
              className="mb-5 flex-row items-center rounded-2xl bg-gray-light p-4"
            >
              <View className="size-11 items-center justify-center rounded-full bg-white">
                <Ionicons name="megaphone-outline" size={21} color="#008751" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-gray">
                  Report a safety concern
                </Text>
                <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                  Report anonymously or include your identity
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#C3C3C3" />
            </Pressable>

            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-mbold text-lg text-gray">
                Recent reports
              </Text>
              <Text className="font-mregular text-[10px] text-gray-300">
                Stored privately on device
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-3 rounded-2xl bg-gray-light p-4">
            <View className="flex-row items-center">
              <Text className="flex-1 font-msbold text-sm text-gray">
                {item.category}
              </Text>
              <Text className="rounded-full bg-yellow-light px-2 py-1 font-msbold text-[8px] text-gray">
                {item.status}
              </Text>
            </View>
            <Text className="mt-1 font-mregular text-[10px] text-gray-300">
              {item.location} · {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <Text
              className="mt-2 font-mregular text-[11px] leading-4 text-gray-300"
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center rounded-2xl bg-gray-light py-10">
            <Ionicons
              name="shield-checkmark-outline"
              size={38}
              color="#C3C3C3"
            />
            <Text className="mt-3 font-msbold text-gray-300">
              No safety reports
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
