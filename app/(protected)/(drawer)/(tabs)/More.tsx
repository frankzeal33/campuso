import AppScreenHeader from "@/components/AppScreenHeader";
import useWalletStore from "@/store/WalletStore";
import { useReferralStore } from "@/store/ReferralStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const menu = [
  {
    label: "Campus safety & SOS",
    note: "Emergency help, trusted contacts and reports",
    icon: "shield-checkmark-outline",
    route: "/(protected)/(nodrawer)/CampusSafety",
  },
  {
    label: "Anonymous campus help",
    note: "Ask sensitive questions without showing your identity",
    icon: "chatbubbles-outline",
    route: "/(protected)/(nodrawer)/AnonymousHelp",
  },
  {
    label: "Campus planner",
    note: "Track classes and assignment deadlines",
    icon: "calendar-outline",
    route: "/(protected)/(nodrawer)/CampusPlanner",
  },
  {
    label: "Campus news",
    note: "Announcements and school updates",
    icon: "newspaper-outline",
    route: "/(protected)/(nodrawer)/CampusNews",
  },
  {
    label: "Advertise on campus",
    note: "Promote a business, product or event",
    icon: "megaphone-outline",
    route: "/(protected)/(nodrawer)/Advertise",
  },
  {
    label: "Buy & sell used items",
    note: "Trade safely with verified students",
    icon: "pricetags-outline",
    route: "/(protected)/(nodrawer)/UsedItems",
  },
  {
    label: "My profile",
    note: "Edit your campus identity",
    icon: "person-outline",
    route: "/(protected)/(nodrawer)/Profile",
  },
  {
    label: "Saved items",
    note: "Posts, shops and listings",
    icon: "bookmark-outline",
    route: "/(protected)/(nodrawer)/SavedItems",
  },
  {
    label: "Notifications",
    note: "Updates and activity",
    icon: "notifications-outline",
    route: "/(protected)/(nodrawer)/Notifications",
  },
  {
    label: "Security",
    note: "Password and account access",
    icon: "shield-checkmark-outline",
    route: "/(protected)/(nodrawer)/Security",
  },
  {
    label: "Discovery settings",
    note: "Choose whether to explore other schools",
    icon: "school-outline",
    route: "/(protected)/(nodrawer)/DiscoverySettings",
  },
  {
    label: "Help & support",
    note: "Get answers and contact us",
    icon: "help-circle-outline",
    route: "/(protected)/(nodrawer)/Support",
  },
];

export default function More() {
  const insets = useSafeAreaInsets();
  const walletTotal = useWalletStore((state) => state.wallet.total);
  const rewardPoints = useReferralStore((state) => state.refData.totalEarned);
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title="More"
        subtitle="Your account and Campuso settings"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <Pressable
          onPress={() => router.push("/(protected)/(nodrawer)/Profile")}
          className="mb-5 flex-row items-center rounded-3xl bg-green p-5"
        >
          <View className="size-16 items-center justify-center rounded-full bg-white/20">
            <Text className="font-mbold text-xl text-white">OD</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-mbold text-lg text-white">Oladapo Koiki</Text>
            <Text className="font-mregular text-xs text-white/70">
              bjkoiki19@gmail.com
            </Text>
            <View className="mt-2 self-start rounded-full bg-yellow px-2 py-1">
              <Text className="font-msbold text-[9px] text-gray">
                Verified student
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={22} color="white" />
        </Pressable>
        <View className="mb-5 flex-row gap-3">
          <Pressable
            onPress={() => router.push("/(protected)/(nodrawer)/CampusWallet" as any)}
            className="flex-1 rounded-2xl bg-yellow-light p-4"
          >
            <View className="flex-row items-start justify-between">
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color="#8A5A00"
            />
              <Ionicons name="arrow-forward-circle" size={22} color="#8A5A00" />
            </View>
            <Text className="mt-4 font-mregular text-[11px] text-gray-300">
              Campuso wallet
            </Text>
            <Text className="mt-1 font-mbold text-lg">₦{walletTotal.toLocaleString()}.00</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(protected)/(nodrawer)/ReferralWallet" as any)}
            className="flex-1 rounded-2xl bg-green-drawer p-4"
          >
            <View className="flex-row items-start justify-between">
            <Ionicons name="gift-outline" size={24} color="#008751" />
              <Ionicons name="arrow-forward-circle" size={22} color="#008751" />
            </View>
            <Text className="mt-4 font-mregular text-[11px] text-gray-300">
              Referral rewards
            </Text>
            <Text className="mt-1 font-mbold text-lg">{rewardPoints} pts</Text>
          </Pressable>
        </View>
        <Text className="mb-2 font-msbold text-xs uppercase tracking-widest text-gray-300">
          Account
        </Text>
        <View className="overflow-hidden rounded-2xl bg-gray-light">
          {menu.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => item.route && router.push(item.route as any)}
              className="flex-row items-center p-4"
            >
              <View className="size-10 items-center justify-center rounded-full bg-green-lighter">
                <Ionicons name={item.icon as any} size={20} color="#008751" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-gray">
                  {item.label}
                </Text>
                <Text className="mt-0.5 font-mregular text-[10px] text-gray-300">
                  {item.note}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#C3C3C3" />
            </Pressable>
          ))}
        </View>
        <Pressable className="mt-5 flex-row items-center justify-center gap-2 rounded-2xl bg-red-50 py-4">
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text className="font-msbold text-sm text-red-600">Log out</Text>
        </Pressable>
        <Text className="py-5 text-center font-mregular text-[10px] text-gray-200">
          Campuso version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
