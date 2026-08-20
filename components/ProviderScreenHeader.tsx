import { useProfileStore } from "@/store/ProfileStore";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router, useSegments } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import AppScreenHeader from "./AppScreenHeader";

type Props = {
  title: string;
  subtitle?: string;
};

export default function ProviderScreenHeader({ title, subtitle }: Props) {
  const segments = useSegments();
  const navigation = useNavigation();
  const profile = useProfileStore((state) => state.userProfile);
  const isProviderTab = segments.some(
    (segment) => segment === "(provider-tabs)",
  );

  if (!isProviderTab) {
    return <AppScreenHeader title={title} subtitle={subtitle} back />;
  }

  const name = profile.fullName || "Oladapo Koiki";
  const avatar = profile.profilePicture
    ? { uri: profile.profilePicture }
    : null;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <View className="flex-row items-center px-4 pb-4 pt-3">
      <Pressable
        accessibilityLabel="Open provider menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        className="size-11 items-center justify-center overflow-hidden rounded-full bg-green"
      >
        {avatar ? (
          <Image source={avatar} className="size-11 rounded-full" />
        ) : (
          <Text className="font-msbold text-sm text-white">{initials}</Text>
        )}
      </Pressable>

      <View className="flex-1 items-center px-2">
        <Text className="font-mbold text-lg text-gray" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            className="mt-0.5 font-mregular text-[9px] text-gray-300"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <Pressable
        accessibilityLabel="Open notifications"
        onPress={() => router.push("/(protected)/(nodrawer)/Notifications")}
        className="size-11 items-center justify-center rounded-full bg-gray-light"
      >
        <Ionicons name="notifications-outline" size={21} color="#2F2F2F" />
        <View className="absolute -right-0.5 -top-1 min-w-4 items-center justify-center rounded-full border border-white bg-red-500 px-1 py-0.5">
          <Text className="font-msbold text-[8px] text-white">4</Text>
        </View>
      </Pressable>
    </View>
  );
}
