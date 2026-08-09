import { useSkeletonCommonProps } from "@/utils/SkeletonProps";
import { router } from "expo-router";
import moment from "moment";
import { Skeleton } from "moti/skeleton";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
const width = Dimensions.get("window").width;

type eventType = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  isFree: boolean;
  ticketPrice?: number;
  image: string;
};

const eventsList: eventType[] = [
  {
    id: "3",
    title: "Inter-Faculty Football Tournament",
    category: "Sports",
    description: "Competitive football matches between faculties.",
    location: "University Sports Complex",
    date: "2026-04-05",
    time: "4:00 PM",
    organizer: "Sports Committee",
    isFree: false,
    ticketPrice: 5,
    image:
      "https://res.cloudinary.com/frankzeal/image/upload/v1772372185/Black_and_Orange_Basketball_Tournament_Flyer_A4_khw0ng.png",
  },
  {
    id: "4",
    title: "Entrepreneurship Bootcamp",
    category: "Business",
    description:
      "Hands-on training for students interested in starting their own businesses.",
    location: "Business School Hall",
    date: "2026-04-12",
    time: "9:00 AM",
    organizer: "Entrepreneurship Club",
    isFree: false,
    ticketPrice: 20,
    image:
      "https://res.cloudinary.com/frankzeal/image/upload/v1772372189/Green_Youth_Soccer_Camp_Event_Flyer_x01ayb.png",
  },
  {
    id: "5",
    title: "Career Fair 2026",
    category: "Career",
    description:
      "Meet recruiters from top companies and explore internship opportunities.",
    location: "Multipurpose Hall",
    date: "2026-05-02",
    time: "11:00 AM",
    organizer: "Career Services Office",
    isFree: true,
    image:
      "https://res.cloudinary.com/frankzeal/image/upload/v1772372240/Music_Party_Festival_Event_Flyer_cby3md.png",
  },
  {
    id: "6",
    title: "Campus Music Night",
    category: "Music",
    description:
      "An evening of live performances from student artists and bands.",
    location: "Campus Amphitheatre",
    date: "2026-05-09",
    time: "6:00 PM",
    organizer: "Music Society",
    isFree: true,
    image:
      "https://res.cloudinary.com/frankzeal/image/upload/v1772372244/Purple_Modern_Charity_Event_Flyer_u8bhno.png",
  },
];

const EventHorizontalList = () => {
  const events = eventsList;
  const loading = false;
  const skeletonProps = useSkeletonCommonProps();
  const dummy = new Array(4).fill(null);

  return (
    <View className="py-2">
      <View className="w-full px-4 pb-2 flex-row items-center justify-between gap-1">
        <Text className="font-msbold text-base">Latest Events</Text>
        <Pressable
          onPress={() => router.push("/(protected)/(nodrawer)/Events" as any)}
        >
          <Text className="font-msbold text-xs text-green">View All</Text>
        </Pressable>
      </View>
      {loading ? (
        <FlatList
          data={dummy}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View className="w-3" />}
          renderItem={({ item }) => (
            <View className="w-44">
              <Skeleton.Group show={loading}>
                <Skeleton
                  height={230}
                  width={"100%"}
                  radius={12}
                  {...skeletonProps}
                />
              </Skeleton.Group>
            </View>
          )}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
      ) : (
        <FlatList
          data={events}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              className="w-60 overflow-hidden rounded-lg"
              onPress={() =>
                router.push("/(protected)/(nodrawer)/EventDetails")
              }
            >
              <View className="relative h-[270px] overflow-hidden rounded-xl">
                <Image
                  className="h-full w-full"
                  source={{ uri: item.image }}
                  resizeMode="cover"
                />
                <View className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5">
                  <Text className="font-msbold text-[9px] text-green">
                    {item.category}
                  </Text>
                </View>
                <View className="absolute right-3 top-3 rounded-full bg-green px-3 py-1.5">
                  <Text className="font-msbold text-[9px] text-white">
                    {item.isFree ? "FREE" : `₦${item.ticketPrice}`}
                  </Text>
                </View>
              </View>
              <Text className="mt-2 font-msbold text-base" numberOfLines={1}>
                {item.title}
              </Text>
              <Text className="mt-1 font-msbold text-xs">
                {moment(
                  `${item.date} ${item.time}`,
                  "YYYY-MM-DD h:mm A",
                ).format("ddd, MMM Do ● h:mm A")}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={() => (
            <View
              className="items-center justify-center px-4 py-8 bg-gray-50 rounded-md"
              style={{ width: width - 32 }}
            >
              <Text className="text-xl font-extrabold">No Events Yet</Text>
              <Text className="text-sm text-center mt-1">
                Latest events will show here.
              </Text>
            </View>
          )}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        />
      )}
    </View>
  );
};

export default EventHorizontalList;
