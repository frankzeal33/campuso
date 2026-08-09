import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import { listings } from "@/constants/appData";
import { useSavedItemsStore } from "@/store/SavedItemsStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = listings.find((listing) => listing.id === id);
  const { initializeSavedItems, isSaved, toggleSavedItem } =
    useSavedItemsStore();
  const savedId = `find-${id}`;

  useEffect(() => {
    initializeSavedItems();
  }, [initializeSavedItems]);

  if (!item) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AppScreenHeader title="Listing" back />
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="alert-circle-outline" size={48} color="#C3C3C3" />
          <Text className="mt-3 font-msbold text-gray-300">
            This listing is no longer available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Listing details"
        back
        action={
          <Pressable
            onPress={() =>
              toggleSavedItem({
                id: savedId,
                type: "Find",
                title: item.title,
                subtitle: `${item.category} · ${item.price}`,
                icon: item.icon,
                route: "/(protected)/(nodrawer)/FindDetails",
                params: { id: item.id },
              })
            }
            className="size-10 items-center justify-center rounded-full bg-green-lighter"
          >
            <Ionicons
              name={isSaved(savedId) ? "bookmark" : "bookmark-outline"}
              size={20}
              color="#008751"
            />
          </Pressable>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <View className="h-48 items-center justify-center rounded-3xl bg-green-lighter">
          <View className="size-24 items-center justify-center rounded-full bg-white">
            <MaterialCommunityIcons
              name={item.icon as any}
              size={48}
              color="#008751"
            />
          </View>
          <View className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5">
            <Text className="font-msbold text-[10px] text-green">
              {item.category}
            </Text>
          </View>
        </View>

        <Text className="mt-5 font-mbold text-2xl text-gray">
          {item.title}
        </Text>
        <View className="mt-2 flex-row items-center">
          <Ionicons name="location-outline" size={16} color="#787878" />
          <Text className="ml-1 font-mregular text-xs text-gray-300">
            {item.location}
          </Text>
        </View>
        <Text className="mt-4 font-mbold text-xl text-green">
          {item.price}
        </Text>

        <View className="mt-5 rounded-2xl bg-gray-light p-4">
          <Text className="font-msbold text-sm text-gray">About this listing</Text>
          <Text className="mt-2 font-mregular text-xs leading-5 text-gray-300">
            {item.description}
          </Text>
        </View>

        <View className="mt-4 flex-row items-center rounded-2xl bg-gray-light p-4">
          <View className="size-12 items-center justify-center rounded-full bg-green-drawer">
            <Text className="font-mbold text-sm text-green">
              {item.provider.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          <View className="ml-3 flex-1">
            <View className="flex-row items-center gap-1">
              <Text className="font-msbold text-sm text-gray">
                {item.provider}
              </Text>
              {item.verified ? (
                <Ionicons name="checkmark-circle" size={15} color="#008751" />
              ) : null}
            </View>
            <View className="mt-1 flex-row items-center gap-1">
              <Ionicons name="star" size={13} color="#FEC844" />
              <Text className="font-mregular text-[10px] text-gray-300">
                {item.rating} rating · Verified provider
              </Text>
            </View>
          </View>
        </View>

        <CustomButton
          title="Message provider"
          handlePress={() =>
            router.push({
              pathname: "/(protected)/(nodrawer)/Chat",
              params: { id: `listing-${item.id}`, title: item.provider },
            } as any)
          }
          containerStyles="mt-6 rounded-2xl"
          textStyles="text-sm text-white"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
