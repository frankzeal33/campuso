import AppScreenHeader from "@/components/AppScreenHeader";
import useWalletStore, { WalletTransaction } from "@/store/WalletStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const money = (value: number) => `₦${value.toLocaleString()}.00`;

function TransactionRow({ item, isLast }: { item: WalletTransaction; isLast: boolean }) {
  const credit = item.type === "credit";
  return (
    <View className="flex-row items-center py-2.5">
      <View className={`size-11 items-center justify-center rounded-full ${credit ? "bg-green-drawer" : "bg-yellow-light"}`}>
        <Ionicons name={credit ? "arrow-down" : "arrow-up"} size={19} color={credit ? "#008751" : "#8A5A00"} />
      </View>
      <View className={`ml-3 flex-1 pb-3.5 ${isLast ? "" : "border-b border-gray-100"}`}>
        <View className="flex-row items-center justify-between">
          <Text className="font-msbold text-sm text-gray">{item.title}</Text>
          <Text className={`font-msbold text-sm ${credit ? "text-green" : "text-gray"}`}>{credit ? "+" : "-"}{money(item.amount)}</Text>
        </View>
        <View className="mt-1 flex-row justify-between">
          <Text className="font-mregular text-[10px] text-gray-300">{item.note}</Text>
          <Text className="font-mregular text-[9px] text-gray-300">{item.date}</Text>
        </View>
      </View>
    </View>
  );
}

export default function CampusWallet() {
  const { wallet, transactions } = useWalletStore();
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const filteredTransactions = useMemo(
    () =>
      filter === "all"
        ? transactions
        : transactions.filter((item) => item.type === filter),
    [filter, transactions],
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader title="Campus wallet" subtitle="Fund, pay and track your money" back />
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TransactionRow
            item={item}
            isLast={index === filteredTransactions.length - 1}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View>
          <View className="mb-4 overflow-hidden rounded-3xl bg-green p-5">
            <View className="flex-row items-center justify-between">
              <View className="size-11 items-center justify-center rounded-full bg-white/15"><Ionicons name="wallet-outline" size={23} color="#fff" /></View>
              <Ionicons name="shield-checkmark-outline" size={22} color="#F5C344" />
            </View>
            <Text className="mt-6 font-mregular text-xs text-white/70">Available balance</Text>
            <Text className="mt-1 font-mbold text-3xl text-white">{money(wallet.total)}</Text>
            <Text className="mt-2 font-mregular text-[10px] text-white/60">Secure campus payments in one place</Text>
            <Pressable
              onPress={() => router.push("/(protected)/(nodrawer)/FundWallet" as any)}
              className="mt-5 flex-row items-center justify-center rounded-2xl bg-white py-3.5"
            >
              <Ionicons name="add-circle-outline" size={19} color="#008751" />
              <Text className="ml-2 font-msbold text-sm text-green">Fund wallet</Text>
            </Pressable>
          </View>
          <Text className="font-mbold text-lg text-gray">Transaction history</Text>
          <Text className="mb-1 mt-0.5 font-mregular text-[10px] text-gray-300">Your latest wallet activity</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-4 mb-1 mt-3"
            contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
          >
            {(["all", "credit", "debit"] as const).map((item) => {
              const active = filter === item;
              return (
                <Pressable
                  key={item}
                  onPress={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 ${active ? "bg-green" : "bg-gray-light"}`}
                >
                  <Text className={`font-msbold text-[10px] capitalize ${active ? "text-white" : "text-gray-300"}`}>
                    {item === "credit" ? "Money in" : item === "debit" ? "Money out" : "All"}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>}
        ListEmptyComponent={
          <View className="items-center py-10">
            <View className="size-12 items-center justify-center rounded-full bg-gray-light">
              <Ionicons name="receipt-outline" size={22} color="#787878" />
            </View>
            <Text className="mt-3 font-msbold text-sm text-gray">No transactions here</Text>
            <Text className="mt-1 font-mregular text-[10px] text-gray-300">Try another transaction filter.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
