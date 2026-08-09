import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import { ReferralHistoryItem, useReferralStore } from "@/store/ReferralStore";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Share, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function RewardRow({ item, isLast }: { item: ReferralHistoryItem; isLast: boolean }) {
  const earned = item.status === "earned";
  return <View className="flex-row items-center py-2.5">
    <View className={`size-11 items-center justify-center rounded-full ${earned ? "bg-green-drawer" : "bg-yellow-light"}`}><Ionicons name={earned ? "gift-outline" : "time-outline"} size={19} color={earned ? "#008751" : "#8A5A00"} /></View>
    <View className={`ml-3 flex-1 pb-3.5 ${isLast ? "" : "border-b border-gray-100"}`}><View className="flex-row justify-between"><Text className="flex-1 font-msbold text-sm text-gray">{item.name}</Text><Text className={`font-msbold text-sm ${earned ? "text-green" : "text-gray-300"}`}>+{item.points} pts</Text></View><View className="mt-1 flex-row justify-between"><Text className="font-mregular text-[9px] capitalize text-gray-300">{item.status}</Text><Text className="font-mregular text-[9px] text-gray-300">{item.date}</Text></View></View>
  </View>;
}

export default function ReferralWallet() {
  const { refData, history } = useReferralStore();
  const [filter, setFilter] = useState<"all" | "earned" | "pending">("all");
  const filteredHistory = useMemo(
    () =>
      filter === "all"
        ? history
        : history.filter((item) => item.status === filter),
    [filter, history],
  );
  const invite = () => Share.share({ message: `Join me on Campuso with referral code ${refData.referralCode}. Connect with your campus community and earn rewards.` });
  return <SafeAreaView className="flex-1 bg-white">
    <AppScreenHeader title="Referral rewards" subtitle="Invite friends and earn points" back />
    <FlatList data={filteredHistory} keyExtractor={(item) => item.id} renderItem={({ item, index }) => <RewardRow item={item} isLast={index === filteredHistory.length - 1} />} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }} showsVerticalScrollIndicator={false} ListHeaderComponent={<View>
      <View className="mb-4 rounded-3xl bg-green p-5">
        <View className="flex-row items-start justify-between"><View><Text className="font-mregular text-xs text-white/70">Available reward points</Text><Text className="mt-1 font-mbold text-3xl text-white">{refData.totalEarned} pts</Text></View><View className="size-12 items-center justify-center rounded-full bg-yellow"><Ionicons name="gift-outline" size={24} color="#2F2F2F" /></View></View>
        <View className="mt-5 rounded-2xl bg-white/10 p-4"><Text className="font-mregular text-[10px] text-white/60">YOUR REFERRAL CODE</Text><View className="mt-1 flex-row items-center justify-between"><Text className="font-mbold text-lg tracking-wider text-white">{refData.referralCode}</Text><Ionicons name="share-social-outline" size={21} color="#fff" /></View></View>
      </View>
      <View className="mb-4 flex-row gap-3"><View className="flex-1 rounded-2xl bg-green-drawer p-4"><Text className="font-mbold text-xl text-green">{refData.invitees}</Text><Text className="mt-1 font-mregular text-[10px] text-gray-300">Friends invited</Text></View><View className="flex-1 rounded-2xl bg-yellow-light p-4"><Text className="font-mbold text-xl text-gray">20 pts</Text><Text className="mt-1 font-mregular text-[10px] text-gray-300">Next reward</Text></View></View>
      <CustomButton title="Invite friends" handlePress={invite} containerStyles="rounded-2xl mb-6" textStyles="text-white text-sm" />
      <Text className="font-mbold text-lg text-gray">Reward history</Text><Text className="mb-1 mt-0.5 font-mregular text-[10px] text-gray-300">Points earned from your referrals</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-4 mb-1 mt-3" contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
        {(["all", "earned", "pending"] as const).map((item) => {
          const active = filter === item;
          return <Pressable key={item} onPress={() => setFilter(item)} className={`rounded-full px-4 py-2 ${active ? "bg-green" : "bg-gray-light"}`}>
            <Text className={`font-msbold text-[10px] capitalize ${active ? "text-white" : "text-gray-300"}`}>{item}</Text>
          </Pressable>;
        })}
      </ScrollView>
    </View>} ListEmptyComponent={<View className="items-center py-10"><View className="size-12 items-center justify-center rounded-full bg-gray-light"><Ionicons name="gift-outline" size={22} color="#787878" /></View><Text className="mt-3 font-msbold text-sm text-gray">No rewards here</Text><Text className="mt-1 font-mregular text-[10px] text-gray-300">Try another reward filter.</Text></View>} />
  </SafeAreaView>;
}
