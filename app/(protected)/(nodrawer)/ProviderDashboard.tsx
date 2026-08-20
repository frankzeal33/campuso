import ProviderScreenHeader from "@/components/ProviderScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tools = [
  {
    title: "Business profile",
    note: "Store details and availability",
    icon: "storefront-outline",
    route: "/(protected)/(nodrawer)/ProviderBusiness",
    color: "bg-green-drawer",
  },
  {
    title: "Listings & services",
    note: "Manage what students can find",
    icon: "pricetags-outline",
    route: "/(protected)/(nodrawer)/ProviderCatalog",
    color: "bg-yellow-light",
  },
  {
    title: "Orders & bookings",
    note: "Track and update requests",
    icon: "receipt-outline",
    route: "/(protected)/(nodrawer)/ProviderActivity",
    color: "bg-[#E8F1FF]",
  },
  {
    title: "Advertise",
    note: "Reach more campus customers",
    icon: "megaphone-outline",
    route: "/(protected)/(nodrawer)/Advertise",
    color: "bg-[#F2E9FF]",
  },
];

export default function ProviderDashboard() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <ProviderScreenHeader
        title="Dashboard"
        subtitle="Run your campus business from one place"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
      >
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-mbold text-2xl text-gray">Overview</Text>
          <Pressable className="flex-row items-center rounded-full border border-gray-100 bg-gray-light px-3 py-2">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="mx-1.5 font-mregular text-[10px] text-gray-300">
              All Time
            </Text>
            <Ionicons name="chevron-down" size={12} color="#6B7280" />
          </Pressable>
        </View>
        <View className="rounded-3xl bg-green p-5">
          <View className="flex-row items-start justify-between">
            <View className="size-12 items-center justify-center rounded-full bg-white/15">
              <Ionicons name="storefront-outline" size={24} color="#fff" />
            </View>
            <View className="flex-row items-center rounded-full bg-yellow px-3 py-1.5">
              <View className="mr-1.5 size-2 rounded-full bg-green" />
              <Text className="font-msbold text-[8px] text-gray">
                STORE OPEN
              </Text>
            </View>
          </View>
          <Text className="mt-5 font-mbold text-xl text-white">
            Campus Tech & Services
          </Text>
          <Text className="mt-1 font-mregular text-[10px] text-white/70">
            Verified provider · University of Lagos
          </Text>
        </View>
        <View className="my-4 flex-row gap-3">
          {[
            { value: "12", label: "New orders" },
            { value: "₦48k", label: "This month" },
            { value: "4.8", label: "Rating" },
          ].map((stat) => (
            <View
              key={stat.label}
              className="flex-1 rounded-2xl bg-gray-light p-4"
            >
              <Text className="font-mbold text-lg text-gray">{stat.value}</Text>
              <Text className="mt-1 font-mregular text-[8px] text-gray-300">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="font-mbold text-lg text-gray">Manage business</Text>
          <Pressable
            onPress={() =>
              router.push("/(protected)/(nodrawer)/ProviderActivity" as any)
            }
          >
            <Text className="font-msbold text-[10px] text-green">
              View activity
            </Text>
          </Pressable>
        </View>
        <View className="flex-row flex-wrap justify-between">
          {tools.map((tool) => (
            <Pressable
              key={tool.title}
              onPress={() => router.push(tool.route as any)}
              className={`mb-3 w-[48.5%] rounded-2xl p-4 ${tool.color}`}
            >
              <Ionicons name={tool.icon as any} size={22} color="#008751" />
              <Text className="mt-4 font-msbold text-xs text-gray">
                {tool.title}
              </Text>
              <Text className="mt-1 font-mregular text-[8px] leading-3 text-gray-300">
                {tool.note}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={() =>
            router.push("/(protected)/(nodrawer)/ProviderEarnings" as any)
          }
          className="mt-1 flex-row items-center rounded-2xl bg-yellow-light p-4"
        >
          <View className="size-11 items-center justify-center rounded-full bg-white">
            <Ionicons name="wallet-outline" size={21} color="#8A5A00" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-gray">
              Earnings and reviews
            </Text>
            <Text className="mt-1 font-mregular text-[9px] text-gray-300">
              View payouts, transactions and customer feedback
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color="#8A5A00" />
        </Pressable>
      </ScrollView>
    </View>
  );
}
