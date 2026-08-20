import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const suggestions = [
  {
    id: "1",
    image: images.featured1,
    eyebrow: "STUDENT DEALS",
    title: "Give it a second life",
    description: "Buy and sell fairly-used items safely on campus.",
    action: "Browse items",
    route: "/(protected)/(nodrawer)/UsedItems",
  },
  {
    id: "2",
    image: images.featured2,
    eyebrow: "GROW ON CAMPUS",
    title: "Put your brand out there",
    description: "Reach verified students with a campaign that converts.",
    action: "Create an ad",
    route: "/(protected)/(nodrawer)/Advertise",
  },
  {
    id: "3",
    image: images.featured3,
    eyebrow: "QUICK FIX",
    title: "Get trusted help nearby",
    description: "Book verified handymen for repairs and setup.",
    action: "Find a fixer",
    route: "/(protected)/(nodrawer)/ServiceBooking",
  },
  {
    id: "4",
    image: images.featured4,
    eyebrow: "CONNECT",
    title: "Meet your study match",
    description: "Find reading partners and campus friends.",
    action: "Find people",
    route: "/(protected)/(drawer)/(student-tabs)/People",
  },
];

export default function Suggestions() {
  const { width } = useWindowDimensions();
  return (
    <View className="py-3">
      <View className="w-full flex-row items-center justify-between px-4 pb-3">
        <Text className="font-msbold text-base">Suggestions for you</Text>
      </View>
      <FlatList
        data={suggestions}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={width * 0.82 + 12}
        decelerationRate="fast"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(item.route as any)}
            className="h-20 overflow-hidden rounded-xl"
            style={{ width: width * 0.82 }}
          >
            <Image
              source={item.image}
              className="absolute h-full w-full"
              resizeMode="cover"
            />
            <View className="h-full w-[52%] justify-center px-3">
              <Text className="font-msbold text-[6px] tracking-widest text-yellow">
                {item.eyebrow}
              </Text>
              <Text
                className="mt-0.5 font-mbold text-[11px] leading-[13px] text-white"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <View className="mt-1.5 self-start flex-row items-center gap-1 rounded-full bg-white px-2.5 py-1">
                <Text className="font-msbold text-[7px] text-green">
                  {item.action}
                </Text>
                <Ionicons name="arrow-forward" size={8} color="#008751" />
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
