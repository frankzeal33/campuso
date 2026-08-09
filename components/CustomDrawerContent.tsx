import { useProfileStore } from "@/store/ProfileStore";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const sections = [
  {
    title: "Main",
    items: [
      { label: "Home", note: "Your campus at a glance", icon: "home-outline", route: "/(protected)/(drawer)/(tabs)/Home" },
      { label: "Marketplace", note: "Products and campus vendors", icon: "bag-handle-outline", route: "/(protected)/(drawer)/(tabs)/MarketPlace" },
      { label: "People", note: "Connections and conversations", icon: "people-outline", route: "/(protected)/(drawer)/(tabs)/People" },
      { label: "Find", note: "Housing, jobs and services", icon: "search-outline", route: "/(protected)/(drawer)/(tabs)/Find" },
    ],
  },
  {
    title: "Provider tools",
    items: [
      { label: "Provider overview", note: "Business performance and shortcuts", icon: "grid-outline", route: "/(protected)/(nodrawer)/ProviderDashboard" },
      { label: "Business profile", note: "Store details and availability", icon: "storefront-outline", route: "/(protected)/(nodrawer)/ProviderBusiness" },
      { label: "Listings & services", note: "Manage products and services", icon: "pricetags-outline", route: "/(protected)/(nodrawer)/ProviderCatalog" },
      { label: "Orders & bookings", note: "Customer requests and progress", icon: "receipt-outline", route: "/(protected)/(nodrawer)/ProviderActivity" },
      { label: "Earnings & reviews", note: "Income, payouts and feedback", icon: "analytics-outline", route: "/(protected)/(nodrawer)/ProviderEarnings" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "My profile", note: "Campus identity and activity", icon: "person-outline", route: "/(protected)/(nodrawer)/Profile" },
      { label: "Notifications", note: "Updates and activity", icon: "notifications-outline", route: "/(protected)/(nodrawer)/Notifications" },
      { label: "Security", note: "Password and account access", icon: "shield-checkmark-outline", route: "/(protected)/(nodrawer)/Security" },
      { label: "Help & support", note: "Answers and assistance", icon: "help-circle-outline", route: "/(protected)/(nodrawer)/Support" },
    ],
  },
] as const;

export default function CustomDrawerContent(props: any) {
  const { top, bottom } = useSafeAreaInsets();
  const pathname = usePathname();
  const profile = useProfileStore((state) => state.userProfile);
  const name = profile.fullName || "Oladapo Koiki";
  const email = profile.email || "bjkoiki19@gmail.com";
  const avatar = profile.profilePicture ? { uri: profile.profilePicture } : null;

  const navigate = (route: string) => {
    props.navigation.closeDrawer();
    router.push(route as any);
  };

  return <View className="flex-1 bg-white">
    <View className="bg-green-drawer px-4 pb-5" style={{ paddingTop: top + 12 }}>
      <View className="flex-row items-center justify-between">
        <Text className="font-mbold text-lg text-green">Campuso</Text>
        <Pressable onPress={() => props.navigation.closeDrawer()} className="size-9 items-center justify-center rounded-full bg-white"><Ionicons name="close" size={20} color="#2F2F2F" /></Pressable>
      </View>
      <Pressable onPress={() => navigate("/(protected)/(nodrawer)/Profile")} className="mt-5 flex-row items-center">
        {avatar ? <Image source={avatar} className="size-14 rounded-full" /> : <View className="size-14 items-center justify-center rounded-full bg-green"><Text className="font-mbold text-lg text-white">{name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</Text></View>}
        <View className="ml-3 flex-1"><View className="flex-row items-center"><Text className="flex-shrink font-mbold text-base text-gray" numberOfLines={1}>{name}</Text><Ionicons name="checkmark-circle" size={14} color="#008751" className="ml-1" /></View><Text className="mt-1 font-mregular text-[10px] text-gray-300" numberOfLines={1}>{email}</Text><Text className="mt-1 font-msbold text-[9px] text-green">View profile</Text></View>
        <Ionicons name="chevron-forward" size={18} color="#008751" />
      </Pressable>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 16, paddingTop: 18 }}>
      {sections.map((section) => <View key={section.title} className="mb-6">
        <Text className="mb-3 ml-2 font-mbold text-[11px] uppercase tracking-widest text-gray-300">{section.title}</Text>
        <View className="gap-1 rounded-2xl bg-gray-light p-1.5">
          {section.items.map((item) => {
            const active = pathname.includes(item.route.split("/").pop() || "__none__");
            const provider = section.title === "Provider tools";
            return <Pressable key={item.label} onPress={() => navigate(item.route)} className={`flex-row items-center rounded-xl px-3 py-3 ${active ? "bg-green" : ""}`}>
              <View className={`size-9 items-center justify-center rounded-full ${active ? "bg-white/20" : provider ? "bg-yellow-light" : "bg-green-drawer"}`}><Ionicons name={item.icon as any} size={17} color={active ? "#FFFFFF" : provider ? "#8A5A00" : "#008751"} /></View>
              <View className="ml-3 flex-1 py-1"><Text className={`font-msbold text-[13px] ${active ? "text-white" : "text-gray"}`}>{item.label}</Text></View>
              <Ionicons name="chevron-forward" size={16} color={active ? "#FFFFFF" : "#C3C3C3"} />
            </Pressable>;
          })}
        </View>
      </View>)}
    </ScrollView>

    <View className="border-t border-gray-100 px-4 pt-3" style={{ paddingBottom: bottom + 10 }}>
      <Pressable onPress={() => router.replace("/(auth)/Login")} className="flex-row items-center rounded-2xl bg-red-50 px-4 py-3"><View className="size-9 items-center justify-center rounded-full bg-red-500"><Ionicons name="power-outline" size={18} color="#fff" /></View><Text className="ml-3 flex-1 font-msbold text-sm text-red-500">Log out</Text><Text className="font-mregular text-[9px] text-gray-300">v1.0</Text></Pressable>
    </View>
  </View>;
}
