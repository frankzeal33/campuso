import { useSkeletonCommonProps } from '@/utils/SkeletonProps';
import { router } from 'expo-router';
import moment from 'moment';
import { Skeleton } from 'moti/skeleton';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
const width = Dimensions.get("window").width

type eventType = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  time: string,
  organizer: string,
  isFree: boolean,
  ticketPrice?: number,
  image: string
}

const eventsList: eventType[] = [
  {
    "id": "1",
    "title": "Tech Innovation Summit 2026",
    "category": "Technology",
    "description": "A conference featuring tech talks, startup showcases, and networking sessions.",
    "location": "Main Auditorium",
    "date": "2026-03-15",
    "time": "10:00 AM",
    "organizer": "Computer Science Department",
    "isFree": true,
    "image": "https://res.cloudinary.com/frankzeal/image/upload/v1772372180/1131w-LZtBbF-igKQ_f4e4ln.png"
  },
  {
    "id": "2",
    "title": "Cultural Day Fiesta",
    "category": "Culture",
    "description": "Celebrating diversity with music, dance, and traditional food exhibitions.",
    "location": "Campus Square",
    "date": "2026-03-20",
    "time": "2:00 PM",
    "organizer": "Student Union Government",
    "isFree": true,
    "image": "https://res.cloudinary.com/frankzeal/image/upload/v1772372183/Brown_And_Black_Bold_Food_Catering_Flyer_axjlu0.png"
  },
  {
    "id": "3",
    "title": "Inter-Faculty Football Tournament",
    "category": "Sports",
    "description": "Competitive football matches between faculties.",
    "location": "University Sports Complex",
    "date": "2026-04-05",
    "time": "4:00 PM",
    "organizer": "Sports Committee",
    "isFree": false,
    "ticketPrice": 5,
    "image": "https://res.cloudinary.com/frankzeal/image/upload/v1772372185/Black_and_Orange_Basketball_Tournament_Flyer_A4_khw0ng.png"
  },
  {
    "id": "4",
    "title": "Entrepreneurship Bootcamp",
    "category": "Business",
    "description": "Hands-on training for students interested in starting their own businesses.",
    "location": "Business School Hall",
    "date": "2026-04-12",
    "time": "9:00 AM",
    "organizer": "Entrepreneurship Club",
    "isFree": false,
    "ticketPrice": 20,
    "image": "https://res.cloudinary.com/frankzeal/image/upload/v1772372189/Green_Youth_Soccer_Camp_Event_Flyer_x01ayb.png"
  },
  {
    "id": "5",
    "title": "Career Fair 2026",
    "category": "Career",
    "description": "Meet recruiters from top companies and explore internship opportunities.",
    "location": "Multipurpose Hall",
    "date": "2026-05-02",
    "time": "11:00 AM",
    "organizer": "Career Services Office",
    "isFree": true,
    "image": "https://res.cloudinary.com/frankzeal/image/upload/v1772372240/Music_Party_Festival_Event_Flyer_cby3md.png"
  },
  {
    "id": "6",
    "title": "Career Fair 2026",
    "category": "Career",
    "description": "Meet recruiters from top companies and explore internship opportunities.",
    "location": "Multipurpose Hall",
    "date": "2026-05-02",
    "time": "11:00 AM",
    "organizer": "Career Services Office",
    "isFree": true,
    "image": "https://res.cloudinary.com/frankzeal/image/upload/v1772372244/Purple_Modern_Charity_Event_Flyer_u8bhno.png"
  }
]

const EventHorizontalList = () => {

  const [events, setEvents] = useState<eventType[]>(eventsList)
  const [loading, setLoading] = useState(false)
  const skeletonProps = useSkeletonCommonProps();
  const dummy = new Array(4).fill(null)

  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false)

  return (
    <View className='py-2'>
      <View className='w-full px-4 pb-2 flex-row items-center justify-between gap-1'>
        <Text className='font-msbold text-base'>Latest Events</Text>
        <Pressable onPress={() => router.push("/(protected)/(drawer)/(tabs)/Home")}>
          <Text className='font-msbold text-green text-base'>View All</Text>
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
          <View className='w-44'>
            <Skeleton.Group show={loading}>
              <Skeleton height={230} width={"100%"} radius={12} {...skeletonProps} />
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
        contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable className='p-2 w-64 bg-inputBg rounded-xl overflow-hidden' onPress={() => router.push("/(protected)/(nodrawer)/EventDetails")}>
            <Image
              style={{width: "100%", height:250, borderRadius: 10}}
              source={{
                uri: item?.image
              }}
              resizeMode={"cover"}
            />
            <Text className='font-msbold text-base mt-2 leading-5' numberOfLines={3}>{item?.title}</Text>
            <Text className='font-msbold text-xs mt-1'>{moment(`${item.date} ${item.time}`,"YYYY-MM-DD h:mm A").format("ddd, MMM Do ● h:mm A")}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className="items-center justify-center px-2 py-8 bg-gray-50 rounded-md" style={{width: width - 24}}>
            <Text className="text-xl font-extrabold">
                No Events Yet
            </Text>
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
  )
}

export default EventHorizontalList
