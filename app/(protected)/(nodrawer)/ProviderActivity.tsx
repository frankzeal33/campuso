import AppScreenHeader from "@/components/AppScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const requests = [{ id: "1", customer: "Chiamaka N.", item: "Laptop screen repair", amount: "₦32,000", status: "New", time: "10 min ago" }, { id: "2", customer: "Tobi A.", item: "Device setup service", amount: "₦2,500", status: "In progress", time: "1h ago" }, { id: "3", customer: "Amara J.", item: "Phone diagnostics", amount: "₦5,000", status: "Completed", time: "Yesterday" }];
export default function ProviderActivity() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? requests : requests.filter((item) => item.status === filter);
  return <SafeAreaView className="flex-1 bg-white"><AppScreenHeader title="Orders & bookings" subtitle="Respond quickly to student requests" back /><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16, paddingBottom: 10 }}>{["All", "New", "In progress", "Completed"].map((item) => <Pressable key={item} onPress={() => setFilter(item)} className={`rounded-full px-4 py-2.5 ${filter === item ? "bg-green" : "bg-gray-light"}`}><Text className={`font-msbold text-[10px] ${filter === item ? "text-white" : "text-gray-300"}`}>{item}</Text></Pressable>)}</ScrollView>
    <View className="px-4">{visible.map((item) => <View key={item.id} className="mb-3 rounded-2xl bg-gray-light p-4"><View className="flex-row items-start"><View className="size-11 items-center justify-center rounded-full bg-white"><Ionicons name="receipt-outline" size={20} color="#008751" /></View><View className="ml-3 flex-1"><View className="flex-row justify-between"><Text className="font-msbold text-sm text-gray">{item.customer}</Text><Text className="font-mbold text-xs text-green">{item.amount}</Text></View><Text className="mt-1 font-mregular text-[10px] text-gray-300">{item.item}</Text><Text className="mt-2 font-mregular text-[8px] text-gray-300">{item.time}</Text></View></View><View className="mt-3 flex-row items-center justify-between border-t border-gray-100 pt-3"><Text className="rounded-full bg-white px-3 py-1.5 font-msbold text-[8px] text-gray">{item.status}</Text><View className="flex-row gap-2"><Pressable className="rounded-xl border border-green px-3 py-2"><Text className="font-msbold text-[9px] text-green">Message</Text></Pressable><Pressable className="rounded-xl bg-green px-3 py-2"><Text className="font-msbold text-[9px] text-white">Update</Text></Pressable></View></View></View>)}</View>
  </ScrollView></SafeAreaView>;
}
