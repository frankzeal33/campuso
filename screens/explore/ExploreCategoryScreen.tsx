import AppScreenHeader from "@/components/AppScreenHeader";
import SearchBar from "@/components/SearchBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Category = {
  title: string;
  subtitle: string;
  prompt: string;
  icon: string;
  tint: string;
  accent: string;
  items: {
    id: string;
    title: string;
    note: string;
    meta: string;
    icon: string;
    action: string;
  }[];
};

const categories: Record<string, Category> = {
  restaurants: {
    title: "Restaurants",
    subtitle: "Fresh meals delivered around campus",
    prompt: "Search meals or restaurants",
    icon: "restaurant-outline",
    tint: "#EEEAF7",
    accent: "#6842A5",
    items: [
      {
        id: "1",
        title: "Tasty Bites",
        note: "Rice, pasta and local favourites",
        meta: "20–30 min · From ₦2,500",
        icon: "fast-food-outline",
        action: "View menu",
      },
      {
        id: "2",
        title: "Campus Kitchen",
        note: "Breakfast, swallow and soups",
        meta: "15–25 min · From ₦1,800",
        icon: "restaurant-outline",
        action: "View menu",
      },
      {
        id: "3",
        title: "Chop & Chill",
        note: "Grills, shawarma and smoothies",
        meta: "25–35 min · From ₦3,000",
        icon: "pizza-outline",
        action: "View menu",
      },
    ],
  },
  shops: {
    title: "Shops",
    subtitle: "Everyday essentials from trusted vendors",
    prompt: "Search shops or products",
    icon: "storefront-outline",
    tint: "#FFF4D6",
    accent: "#9A6700",
    items: [
      {
        id: "1",
        title: "Campus Mart",
        note: "Groceries and daily essentials",
        meta: "Open · 0.4 km away",
        icon: "basket-outline",
        action: "Shop now",
      },
      {
        id: "2",
        title: "Tech Hub",
        note: "Phones, accessories and repairs",
        meta: "Open · Student Centre",
        icon: "phone-portrait-outline",
        action: "Shop now",
      },
      {
        id: "3",
        title: "Campus Drip",
        note: "Fashion, footwear and accessories",
        meta: "Open · 0.8 km away",
        icon: "shirt-outline",
        action: "Shop now",
      },
    ],
  },
  pharmacies: {
    title: "Pharmacies",
    subtitle: "Health essentials from verified pharmacies",
    prompt: "Search medicine or pharmacy",
    icon: "medkit-outline",
    tint: "#EAF2FB",
    accent: "#28679A",
    items: [
      {
        id: "1",
        title: "Campus Health Pharmacy",
        note: "Prescriptions and health essentials",
        meta: "Open 24 hours · 0.3 km",
        icon: "medkit-outline",
        action: "Browse",
      },
      {
        id: "2",
        title: "Wellness Plus",
        note: "Vitamins, skincare and personal care",
        meta: "Open until 9 PM · 0.7 km",
        icon: "fitness-outline",
        action: "Browse",
      },
      {
        id: "3",
        title: "QuickCare",
        note: "Fast medicine pickup and delivery",
        meta: "Delivery in 20–30 min",
        icon: "medical-outline",
        action: "Browse",
      },
    ],
  },
  bills: {
    title: "Pay Bills",
    subtitle: "Quick, secure payments from campus",
    prompt: "Search bill provider",
    icon: "receipt-outline",
    tint: "#EAF7F0",
    accent: "#008751",
    items: [
      {
        id: "1",
        title: "Airtime & Data",
        note: "All Nigerian mobile networks",
        meta: "Instant delivery",
        icon: "phone-portrait-outline",
        action: "Buy",
      },
      {
        id: "2",
        title: "Electricity",
        note: "Prepaid and postpaid meters",
        meta: "All major providers",
        icon: "flash-outline",
        action: "Pay",
      },
      {
        id: "3",
        title: "Cable TV",
        note: "DStv, GOtv and Startimes",
        meta: "Instant activation",
        icon: "tv-outline",
        action: "Pay",
      },
      {
        id: "4",
        title: "Internet",
        note: "Top up your broadband plan",
        meta: "Secure payment",
        icon: "wifi-outline",
        action: "Pay",
      },
    ],
  },
  packages: {
    title: "Packages",
    subtitle: "Send, receive and track deliveries",
    prompt: "Enter tracking number or courier",
    icon: "cube-outline",
    tint: "#FDECEF",
    accent: "#B83D5D",
    items: [
      {
        id: "1",
        title: "Send a package",
        note: "Door-to-door campus delivery",
        meta: "Get an instant estimate",
        icon: "paper-plane-outline",
        action: "Send",
      },
      {
        id: "2",
        title: "Track delivery",
        note: "See your package’s live progress",
        meta: "Use your tracking number",
        icon: "navigate-outline",
        action: "Track",
      },
      {
        id: "3",
        title: "Pickup points",
        note: "Safe collection spots near you",
        meta: "4 locations on campus",
        icon: "location-outline",
        action: "View",
      },
    ],
  },
  markets: {
    title: "Local Markets",
    subtitle: "Fresh produce and better local prices",
    prompt: "Search produce or market",
    icon: "leaf-outline",
    tint: "#E9F7F1",
    accent: "#157A55",
    items: [
      {
        id: "1",
        title: "Student Gate Market",
        note: "Fresh food, groceries and household items",
        meta: "Open today · 0.6 km",
        icon: "basket-outline",
        action: "Explore",
      },
      {
        id: "2",
        title: "Community Farmers Market",
        note: "Farm-fresh fruits and vegetables",
        meta: "Open Mon–Sat · 1.2 km",
        icon: "leaf-outline",
        action: "Explore",
      },
      {
        id: "3",
        title: "Evening Market",
        note: "Affordable ingredients and quick meals",
        meta: "Opens 4 PM · 0.9 km",
        icon: "moon-outline",
        action: "Explore",
      },
    ],
  },
  events: {
    title: "Campus Events",
    subtitle: "Discover what’s happening around you",
    prompt: "Search events or organisers",
    icon: "calendar-outline",
    tint: "#F4F1E8",
    accent: "#806A2A",
    items: [
      {
        id: "1",
        title: "Tech Innovation Summit",
        note: "Main Auditorium · Computer Science",
        meta: "Sat, 15 Mar · 10:00 AM",
        icon: "hardware-chip-outline",
        action: "View event",
      },
      {
        id: "2",
        title: "Cultural Day Fiesta",
        note: "Campus Square · Student Union",
        meta: "Thu, 20 Mar · 2:00 PM",
        icon: "musical-notes-outline",
        action: "View event",
      },
      {
        id: "3",
        title: "Inter-Faculty Tournament",
        note: "University Sports Complex",
        meta: "Sat, 5 Apr · 4:00 PM",
        icon: "football-outline",
        action: "View event",
      },
    ],
  },
  more: {
    title: "More Services",
    subtitle: "Everything else you need on campus",
    prompt: "Search campus services",
    icon: "grid-outline",
    tint: "#F3F3F3",
    accent: "#2F2F2F",
    items: [
      {
        id: "1",
        title: "Handyman & Fixers",
        note: "Repairs, installation and quick fixes",
        meta: "Verified campus providers",
        icon: "hammer-outline",
        action: "Find help",
      },
      {
        id: "2",
        title: "Advertise on Campus",
        note: "Promote a brand, product or event",
        meta: "Reach verified students",
        icon: "megaphone-outline",
        action: "Create ad",
      },
      {
        id: "3",
        title: "Used Items",
        note: "Buy and sell with verified students",
        meta: "Safe campus trading",
        icon: "pricetags-outline",
        action: "Explore",
      },
      {
        id: "4",
        title: "Laundry",
        note: "Pickup, wash and doorstep delivery",
        meta: "From ₦1,500",
        icon: "shirt-outline",
        action: "Book",
      },
      {
        id: "5",
        title: "Printing",
        note: "Documents, projects and binding",
        meta: "Same-day service",
        icon: "print-outline",
        action: "Order",
      },
      {
        id: "6",
        title: "Cleaning",
        note: "Room and apartment cleaning",
        meta: "From ₦4,000",
        icon: "sparkles-outline",
        action: "Book",
      },
    ],
  },
};

const categoryImages: Record<string, string[]> = {
  restaurants: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
  ],
  shops: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  ],
  pharmacies: [
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=900&q=80",
  ],
  bills: [
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
  ],
  packages: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=900&q=80",
  ],
  markets: [
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1485637701894-09ad422f6de6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=900&q=80",
  ],
  events: [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
  ],
  more: [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
  ],
};

export default function ExploreCategoryScreen({
  categoryKey,
}: {
  categoryKey?: string;
}) {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string }>();
  const key =
    categoryKey ??
    (typeof params.category === "string" ? params.category : "more");
  const category = categories[key] ?? categories.more;
  const [query, setQuery] = useState("");
  const items = useMemo(
    () =>
      category.items.filter((item) =>
        `${item.title} ${item.note}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [category.items, query],
  );
  const openItem = (item: Category["items"][number]) => {
    const params = { title: item.title, action: item.action };
    if (key === "events")
      return router.push("/(protected)/(nodrawer)/EventDetails");
    if (key === "restaurants")
      return router.push({
        pathname: "/(protected)/(nodrawer)/RestaurantDetails",
        params,
      });
    if (key === "shops")
      return router.push({
        pathname: "/(protected)/(nodrawer)/StoreDetails",
        params,
      });
    if (key === "pharmacies")
      return router.push({
        pathname: "/(protected)/(nodrawer)/PharmacyDetails",
        params,
      });
    if (key === "bills")
      return router.push({
        pathname: "/(protected)/(nodrawer)/BillPayment",
        params,
      });
    if (key === "packages")
      return router.push({
        pathname: "/(protected)/(nodrawer)/PackageService",
        params,
      });
    if (key === "markets")
      return router.push({
        pathname: "/(protected)/(nodrawer)/MarketDetails",
        params,
      });
    if (item.title === "Advertise on Campus")
      return router.push("/(protected)/(nodrawer)/Advertise" as any);
    if (item.title === "Used Items")
      return router.push("/(protected)/(nodrawer)/UsedItems" as any);
    return router.push({
      pathname: "/(protected)/(nodrawer)/ServiceBooking",
      params,
    });
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader
        title={category.title}
        subtitle={category.subtitle}
        back
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder={category.prompt}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => openItem(item)}
            className="mb-4 flex-1 overflow-hidden rounded-2xl bg-gray-light"
          >
            <Image
              source={{
                uri: categoryImages[key]?.[index] ?? categoryImages.more[0],
              }}
              className="h-28 w-full bg-gray-light"
              resizeMode="cover"
            />
            <View className="min-h-32 p-3">
              <Text className="font-msbold text-sm text-gray" numberOfLines={2}>
                {item.title}
              </Text>
              <Text
                className="mt-1 font-mregular text-[10px] leading-4 text-gray-300"
                numberOfLines={2}
              >
                {item.note}
              </Text>
              <Text
                className="mt-2 font-msbold text-[10px] text-green"
                numberOfLines={2}
              >
                {item.meta}
              </Text>
              <View className="mt-auto flex-row items-center justify-between pt-3">
                <Text className="font-msbold text-[9px] text-green">
                  {item.action}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color="#787878"
                />
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Ionicons name="search-outline" size={44} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              Nothing matched your search
            </Text>
          </View>
        }
      />
    </View>
  );
}
