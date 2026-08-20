import ProviderScreenHeader from "@/components/ProviderScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const transactions = [
  {
    id: "1",
    title: "Laptop screen repair",
    note: "Chiamaka N. · Today",
    amount: "+₦32,000",
  },
  {
    id: "2",
    title: "Device setup",
    note: "Tobi A. · Yesterday",
    amount: "+₦2,500",
  },
  {
    id: "3",
    title: "Payout to bank",
    note: "GTBank · Aug 6",
    amount: "-₦25,000",
  },
];
export default function ProviderEarnings() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ProviderScreenHeader
        title="Earnings & reviews"
        subtitle="Track income and customer trust"
      />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-3xl bg-green p-5">
          <View className="flex-row justify-between">
            <View>
              <Text className="font-mregular text-xs text-white/70">
                Available earnings
              </Text>
              <Text className="mt-1 font-mbold text-3xl text-white">
                ₦48,500
              </Text>
            </View>
            <View className="size-12 items-center justify-center rounded-full bg-yellow">
              <Ionicons name="wallet-outline" size={23} color="#2F2F2F" />
            </View>
          </View>
          <Text className="mt-5 font-mregular text-[9px] text-white/60">
            Next payout · Monday, Aug 10
          </Text>
        </View>
        <View className="my-4 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-yellow-light p-4">
            <Text className="font-mbold text-xl text-gray">4.8</Text>
            <Text className="mt-1 font-mregular text-[9px] text-gray-300">
              Average rating
            </Text>
          </View>
          <View className="flex-1 rounded-2xl bg-green-drawer p-4">
            <Text className="font-mbold text-xl text-green">96%</Text>
            <Text className="mt-1 font-mregular text-[9px] text-gray-300">
              Positive reviews
            </Text>
          </View>
        </View>
        <Text className="mb-2 font-mbold text-lg text-gray">
          Recent earnings
        </Text>
        {transactions.map((item, index) => (
          <View key={item.id} className="flex-row items-center py-3">
            <View className="size-11 items-center justify-center rounded-full bg-gray-light">
              <Ionicons
                name={item.amount.startsWith("+") ? "arrow-down" : "arrow-up"}
                size={18}
                color="#008751"
              />
            </View>
            <View
              className={`ml-3 flex-1 pb-3 ${index === transactions.length - 1 ? "" : "border-b border-gray-100"}`}
            >
              <View className="flex-row justify-between">
                <Text className="font-msbold text-sm text-gray">
                  {item.title}
                </Text>
                <Text
                  className={`font-msbold text-xs ${item.amount.startsWith("+") ? "text-green" : "text-gray"}`}
                >
                  {item.amount}
                </Text>
              </View>
              <Text className="mt-1 font-mregular text-[9px] text-gray-300">
                {item.note}
              </Text>
            </View>
          </View>
        ))}
        <Text className="mb-2 mt-4 font-mbold text-lg text-gray">
          Latest review
        </Text>
        <View className="rounded-2xl bg-gray-light p-4">
          <View className="flex-row justify-between">
            <Text className="font-msbold text-sm text-gray">Chiamaka N.</Text>
            <Text className="font-msbold text-xs text-[#9A6200]">★★★★★</Text>
          </View>
          <Text className="mt-2 font-mregular text-[10px] leading-4 text-gray-300">
            Fast response and the repair was completed exactly when promised.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
