import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, Pressable, Text, useWindowDimensions, View } from "react-native";
import { Extrapolation, interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

type Placement = "marketplace" | "find" | "people";

const adverts = {
  marketplace: [
    { id: "market-1", image: images.card1, tag: "SPONSORED", title: "Campus deals, delivered fast", note: "Shop trusted vendors close to you", action: "Shop now", route: "/(protected)/(nodrawer)/Shops" },
    { id: "market-2", image: images.card2, tag: "STUDENT DEAL", title: "Save more on daily essentials", note: "Limited offers from verified sellers", action: "View deals", route: "/(protected)/(drawer)/(tabs)/MarketPlace" },
    { id: "market-3", image: images.card3, tag: "SELL ON CAMPUS", title: "Turn your products into sales", note: "Reach students in your community", action: "Advertise", route: "/(protected)/(nodrawer)/Advertise" },
  ],
  find: [
    { id: "find-1", image: images.card2, tag: "VERIFIED HOUSING", title: "Find a place that feels right", note: "Student-friendly homes near campus", action: "Find housing", route: "/(protected)/(nodrawer)/FindCategory?category=Apartments" },
    { id: "find-2", image: images.card1, tag: "LOCAL SERVICES", title: "Trusted help is nearby", note: "Repairs, laundry, tutors and more", action: "Find services", route: "/(protected)/(nodrawer)/Services" },
    { id: "find-3", image: images.card3, tag: "OPPORTUNITIES", title: "Discover your next campus job", note: "Flexible roles built for students", action: "Explore jobs", route: "/(protected)/(nodrawer)/FindCategory?category=Jobs" },
  ],
  people: [
    { id: "people-1", image: images.card3, tag: "CAMPUS CONNECTIONS", title: "Meet your next study partner", note: "Connect with verified students", action: "Find people", route: "/(protected)/(drawer)/(tabs)/People" },
    { id: "people-2", image: images.card2, tag: "COMMUNITIES", title: "Better conversations start here", note: "Create a group around your interests", action: "Open chats", route: "/(protected)/(nodrawer)/Chats" },
    { id: "people-3", image: images.card1, tag: "REFER & EARN", title: "Bring your friends to Campuso", note: "Earn points for successful referrals", action: "Invite friends", route: "/(protected)/(nodrawer)/ReferralWallet" },
  ],
};

export default function AdvertisementCarousel({ placement }: { placement: Placement }) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const data = adverts[placement];
  const carouselWidth = width - 32;

  return <View className="mb-4">
    <Carousel
      data={data}
      width={carouselWidth}
      height={116}
      loop
      autoPlay
      autoPlayInterval={4500}
      scrollAnimationDuration={900}
      pagingEnabled
      enabled={false}
      onSnapToItem={setActiveIndex}
      customAnimation={(value) => {
        "worklet";
        return {
          opacity: interpolate(
            value,
            [-1, 0, 1],
            [0, 1, 0],
            Extrapolation.CLAMP,
          ),
          transform: [{ translateX: 0 }],
          zIndex: Math.round(
            interpolate(
              value,
              [-1, 0, 1],
              [0, 10, 0],
              Extrapolation.CLAMP,
            ),
          ),
        };
      }}
      renderItem={({ item }) => <Pressable onPress={() => router.push(item.route as any)} className="overflow-hidden rounded-2xl">
        <ImageBackground source={item.image} resizeMode="cover" className="h-full w-full overflow-hidden rounded-2xl">
          <View className="h-full w-[62%] justify-center px-4">
            <Text className="font-msbold text-[7px] tracking-widest text-yellow">{item.tag}</Text>
            <Text className="mt-1 font-mbold text-[14px] leading-[17px] text-white" numberOfLines={2}>{item.title}</Text>
            <Text className="mt-1 font-mregular text-[8px] text-white/75" numberOfLines={1}>{item.note}</Text>
            <View className="mt-2 self-start flex-row items-center rounded-full bg-white px-3 py-1.5"><Text className="font-msbold text-[8px] text-green">{item.action}</Text><Ionicons name="arrow-forward" size={9} color="#008751" className="ml-1" /></View>
          </View>
          <View className="absolute right-3 top-3 rounded-full bg-black/25 px-2 py-1"><Text className="font-msbold text-[6px] text-white">AD</Text></View>
        </ImageBackground>
      </Pressable>}
    />
    <View className="mt-2 flex-row justify-center gap-1.5">
      {data.map((item, index) => <View key={item.id} className={`h-1.5 rounded-full ${index === activeIndex ? "w-5 bg-green" : "w-1.5 bg-gray-200"}`} />)}
    </View>
  </View>;
}
