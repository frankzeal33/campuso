import EventHorizontalList from "@/components/EventHorizontalList";
import Explore from "@/components/Explore";
import HomeHighlights from "@/components/HomeHighlights";
import Media from "@/components/Media";
import Suggestions from "@/components/Suggestions";
import { images } from "@/constants";
import { getGreetingMessage } from "@/utils/getGreetingMessage";
import { Octicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { memo } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const sliderBanners = [
  {
    image: images.card1,
    title: "Everything You Need,",
    highlight: "Closer Than You Think",
    description: "Trusted shops and everyday essentials around you.",
    action: "Shop Now",
    route: "/(protected)/(drawer)/(student-tabs)/MarketPlace",
  },
  {
    image: images.card2,
    title: "Find Your Space,",
    highlight: "Live With Ease",
    description: "Verified housing and trusted campus services.",
    action: "Explore Now",
    route: "/(protected)/(drawer)/(student-tabs)/Find",
  },
  {
    image: images.card3,
    title: "Your Campus,",
    highlight: "Your Best Moments",
    description: "Discover events and never miss what’s happening.",
    action: "View Events",
    route: "/(protected)/(nodrawer)/Events",
  },
];

const CarouselComponent = memo(({ width }: { width: number }) => {
  return (
    <Carousel
      autoPlayInterval={5000}
      data={sliderBanners}
      height={140}
      autoPlay
      loop
      pagingEnabled
      snapEnabled
      width={width}
      style={{ width }}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      renderItem={({ item }) => (
        <Pressable
          style={{
            width: "100%",
            height: "100%",
            alignSelf: "center",
            borderRadius: 14,
            overflow: "hidden",
            backgroundColor: "#ccc",
          }}
          onPress={() => router.push(item.route as any)}
        >
          <Image
            source={item.image}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              borderRadius: 14,
            }}
          />
          <View className="h-full w-[47%] justify-center px-4 py-2">
            <Text
              className="font-mbold text-[13px] leading-[15px] text-white"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              className="font-mbold text-[13px] leading-[15px] text-yellow"
              numberOfLines={1}
            >
              {item.highlight}
            </Text>
            <Text
              className="mt-1.5 font-mmedium text-[7px] leading-[10px] text-white"
              numberOfLines={2}
            >
              {item.description}
            </Text>
            <View className="mt-2 self-start flex-row items-center gap-1 rounded-full bg-white px-3 py-1.5">
              <Text className="font-msbold text-[8px] text-green">
                {item.action}
              </Text>
              <Octicons name="chevron-right" size={10} color="#008751" />
            </View>
          </View>
        </Pressable>
      )}
    />
  );
});

CarouselComponent.displayName = "CarouselComponent";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const greeting = getGreetingMessage();
  const screen = useWindowDimensions();
  const fullWidth = screen.width;

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <StatusBar style="dark" />
      <View className="w-full justify-between items-center gap-4 flex-row py-3 px-4">
        <Pressable
          className="flex-1 items-center flex-row gap-2"
          onPress={openDrawer}
        >
          <View className="rounded-full items-center justify-center bg-green size-9">
            <Text className="text-white font-msbold text-base">OD</Text>
          </View>
          <View className="flex-1 items-start flex-col">
            <Text
              className="text-base font-msbold text-green"
              numberOfLines={1}
            >
              Hi, Oladapo Koiki
            </Text>
            <Text className="font-mmedium text-xs">{greeting}</Text>
          </View>
        </Pressable>

        <Pressable
          className="relative"
          onPress={() =>
            router.push("/(protected)/(nodrawer)/Notifications" as any)
          }
        >
          <View className="absolute -right-0.5 -top-1 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 z-50">
            <Text className="font-mmedium text-[10px] text-white">4</Text>
          </View>
          <Octicons name="bell-fill" size={24} color="#218225" />
        </Pressable>
      </View>
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
        ListHeaderComponent={() => (
          <View className="flex-1">
            <CarouselComponent width={fullWidth} />
            <Explore />
            <HomeHighlights
              afterToday={<Suggestions />}
              beforeNearby={<EventHorizontalList />}
            />
            <Media />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
