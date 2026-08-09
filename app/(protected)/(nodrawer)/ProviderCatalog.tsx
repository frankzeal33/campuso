import AppScreenHeader from "@/components/AppScreenHeader";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const items = [{ id: "1", title: "Phone and laptop repair", price: "From ₦5,000", status: "Active", image: images.featured3 }, { id: "2", title: "Device setup service", price: "₦2,500", status: "Active", image: images.card1 }, { id: "3", title: "Used study laptop", price: "₦185,000", status: "Paused", image: images.featured1 }];
export default function ProviderCatalog() {
  return <SafeAreaView className="flex-1 bg-white"><AppScreenHeader title="Listings & services" subtitle="Manage what students can discover" back action={<Pressable onPress={() => router.push("/(protected)/(nodrawer)/Advertise" as any)} className="size-10 items-center justify-center rounded-full bg-green"><Ionicons name="add" size={22} color="#fff" /></Pressable>} /><ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
    <View className="mb-4 flex-row gap-3">{[{ value: "3", label: "Total" }, { value: "2", label: "Active" }, { value: "128", label: "Views" }].map((stat) => <View key={stat.label} className="flex-1 rounded-2xl bg-gray-light p-4"><Text className="font-mbold text-lg text-gray">{stat.value}</Text><Text className="font-mregular text-[8px] text-gray-300">{stat.label}</Text></View>)}</View>
    {items.map((item, index) => <Pressable key={item.id} className="flex-row items-center py-3"><Image source={item.image} className="size-20 rounded-xl" resizeMode="cover" /><View className={`ml-3 flex-1 pb-3 ${index === items.length - 1 ? "" : "border-b border-gray-100"}`}><View className="flex-row justify-between"><Text className="flex-1 font-msbold text-sm text-gray">{item.title}</Text><Text className={`rounded-full px-2 py-1 font-msbold text-[8px] ${item.status === "Active" ? "bg-green-drawer text-green" : "bg-yellow-light text-gray"}`}>{item.status}</Text></View><Text className="mt-1 font-mbold text-xs text-green">{item.price}</Text><View className="mt-3 flex-row gap-4"><Pressable onPress={() => router.push({ pathname: "/(protected)/(nodrawer)/EditOwnedContent", params: { type: "service", title: item.title } } as any)}><Text className="font-msbold text-[9px] text-green">Edit</Text></Pressable><Text className="font-msbold text-[9px] text-gray-300">Analytics</Text><Text className="font-msbold text-[9px] text-red-500">{item.status === "Active" ? "Pause" : "Activate"}</Text></View></View></Pressable>)}
  </ScrollView></SafeAreaView>;
}
