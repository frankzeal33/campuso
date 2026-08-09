import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Kind =
  | "restaurant"
  | "shop"
  | "pharmacy"
  | "bill"
  | "package"
  | "market"
  | "service";

const config: Record<
  Kind,
  {
    title: string;
    subtitle: string;
    icon: string;
    tint: string;
    accent: string;
    button: string;
    features: string[];
  }
> = {
  restaurant: {
    title: "Restaurant",
    subtitle: "Menu and delivery details",
    icon: "restaurant-outline",
    tint: "#EEEAF7",
    accent: "#6842A5",
    button: "View basket",
    features: ["Popular meals", "Full menu", "Delivery information"],
  },
  shop: {
    title: "Campus Shop",
    subtitle: "Products from a trusted vendor",
    icon: "storefront-outline",
    tint: "#FFF4D6",
    accent: "#9A6700",
    button: "View cart",
    features: ["Popular products", "New arrivals", "Store information"],
  },
  pharmacy: {
    title: "Pharmacy",
    subtitle: "Verified health and wellness store",
    icon: "medkit-outline",
    tint: "#EAF2FB",
    accent: "#28679A",
    button: "View basket",
    features: ["Health essentials", "Personal care", "Prescription support"],
  },
  bill: {
    title: "Pay Bill",
    subtitle: "Fast and secure bill payment",
    icon: "receipt-outline",
    tint: "#EAF7F0",
    accent: "#008751",
    button: "Continue to payment",
    features: ["Provider", "Account details", "Payment amount"],
  },
  package: {
    title: "Package Service",
    subtitle: "Send and track deliveries",
    icon: "cube-outline",
    tint: "#FDECEF",
    accent: "#B83D5D",
    button: "Continue",
    features: ["Pickup details", "Delivery address", "Package information"],
  },
  market: {
    title: "Local Market",
    subtitle: "Fresh produce from nearby sellers",
    icon: "leaf-outline",
    tint: "#E9F7F1",
    accent: "#157A55",
    button: "View basket",
    features: ["Fresh produce", "Groceries", "Market information"],
  },
  service: {
    title: "Book Service",
    subtitle: "Verified help around campus",
    icon: "construct-outline",
    tint: "#F3F3F3",
    accent: "#2F2F2F",
    button: "Request service",
    features: ["Choose service", "Select a time", "Add your location"],
  },
};

const products = [
  { name: "Popular choice", note: "Highly rated by students", price: "₦2,500" },
  { name: "Campus favourite", note: "Fast and reliable", price: "₦3,200" },
  { name: "Value option", note: "Great quality for less", price: "₦1,800" },
];

const productImages: Record<Kind, string[]> = {
  restaurant: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
  ],
  shop: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
  ],
  pharmacy: [
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80",
  ],
  market: [
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  ],
  bill: [],
  package: [],
  service: [],
};

export default function ServiceActionScreen({ kind }: { kind: Kind }) {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ title?: string; action?: string }>();
  const current = config[kind];
  const displayTitle =
    typeof params.title === "string" ? params.title : current.title;
  const action = typeof params.action === "string" ? params.action : "";
  const [form, setForm] = useState({ reference: "", amount: "", address: "" });
  const isForm = kind === "bill" || kind === "package" || kind === "service";

  const Hero = () => (
    <View className="rounded-3xl bg-gray-light p-5">
      <View className="size-14 items-center justify-center rounded-2xl bg-white">
        <Ionicons name={current.icon as any} size={29} color="#008751" />
      </View>
      <Text className="mt-5 font-mbold text-2xl text-gray">{displayTitle}</Text>
      <Text className="mt-2 font-mregular text-xs leading-5 text-gray-300">
        {isForm
          ? `Complete the details below to ${action.toLowerCase() || "continue"}.`
          : "Verified by Campuso · Trusted by students · Fast campus delivery"}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title={kind === "bill" ? displayTitle : current.title}
        subtitle={current.subtitle}
        back
      />
      {isForm ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 110,
          }}
        >
          {kind !== "bill" ? <Hero /> : null}
          <View className={kind !== "bill" ? "mt-2" : ""}>
            <FormField
              title={
                kind === "bill"
                  ? "Provider or service"
                  : kind === "package"
                    ? "Pickup location"
                    : "Service needed"
              }
              value={form.reference}
              placeholder="Enter here"
              handleChangeText={(value: string) =>
                setForm({ ...form, reference: value })
              }
              otherStyles="mt-5"
            />
            <FormField
              title={
                kind === "bill"
                  ? "Account / phone number"
                  : "Delivery or service address"
              }
              value={form.address}
              placeholder="Enter here"
              handleChangeText={(value: string) =>
                setForm({ ...form, address: value })
              }
              otherStyles="mt-5"
            />
            <FormField
              title={kind === "bill" ? "Amount" : "Additional details"}
              value={form.amount}
              placeholder="Enter here"
              handleChangeText={(value: string) =>
                setForm({ ...form, amount: value })
              }
              otherStyles="mt-5"
              keyboardType={kind === "bill" ? "numeric" : "default"}
            />
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 110,
          }}
          ListHeaderComponent={
            <View>
              <Hero />
              <View className="mb-4 mt-6 flex-row items-center justify-between">
                <Text className="font-mbold text-lg">
                  {current.features[0]}
                </Text>
                <Text className="font-msbold text-xs text-green">See all</Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <Pressable className="mb-4 flex-1 overflow-hidden rounded-2xl bg-gray-light">
              <Image
                source={{ uri: productImages[kind][index] }}
                className="h-28 w-full bg-gray-light"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="font-msbold text-sm">{item.name}</Text>
                <Text className="mt-1 font-mregular text-[10px] leading-4 text-gray-300">
                  {item.note}
                </Text>
                <View className="mt-3 flex-row items-center justify-between">
                  <Text className="font-mbold text-xs text-green">
                    {item.price}
                  </Text>
                  <Pressable className="size-8 items-center justify-center rounded-full bg-green">
                    <Ionicons name="add" size={18} color="white" />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          )}
          ListFooterComponent={
            <View className="mt-3 rounded-2xl bg-gray-light p-4">
              <Text className="font-msbold text-sm">About {displayTitle}</Text>
              <View className="mt-3 flex-row items-center gap-2">
                <Ionicons name="checkmark-circle" size={18} color="#008751" />
                <Text className="font-mregular text-xs text-gray-300">
                  {current.features[1]}
                </Text>
              </View>
              <View className="mt-3 flex-row items-center gap-2">
                <Ionicons name="checkmark-circle" size={18} color="#008751" />
                <Text className="font-mregular text-xs text-gray-300">
                  {current.features[2]}
                </Text>
              </View>
            </View>
          }
        />
      )}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3"
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <CustomButton
          title={current.button}
          containerStyles="w-full"
          textStyles="text-white"
        />
      </View>
    </View>
  );
}
