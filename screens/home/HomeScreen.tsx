import EventHorizontalList from '@/components/EventHorizontalList'
import Explore from '@/components/Explore'
import Media from '@/components/Media'
import Suggestions from '@/components/Suggestions'
import { images } from '@/constants'
import { getGreetingMessage } from '@/utils/getGreetingMessage'
import { Octicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { memo } from 'react'
import { FlatList, Image, Pressable, Text, useWindowDimensions, View } from 'react-native'
import Carousel from "react-native-reanimated-carousel"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const sliderImages = [
  images.card1,
  images.card2,
  images.card1,
  images.card3
];

const CarouselComponent = memo(({ width }: { width: number }) => {
  return (
    <Carousel
      autoPlayInterval={5000}
      data={sliderImages}
      height={120}
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
            alignSelf: 'center',
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: "#1F1F1F"
          }}
        //   onPress={() => router.push("/(protected)/(routes)/AllTickets")}
        >
          <Image
            source={item}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 14,
            }}
          />
        </Pressable>
      )}
    />
  );
});

const HomeScreen = () => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const greeting = getGreetingMessage("Franklin");
  const screen = useWindowDimensions();
  const fullWidth = screen.width
  const width = fullWidth - 16; // 16px padding on left sides
  const itemWidth = width * 0.82;  // 82% of screen width for item

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <View className='flex-1 bg-white' style={{ paddingTop: insets.top }}>
        <StatusBar style="dark"/>
        <View className="w-full justify-between items-center gap-4 flex-row py-3 px-4">
            <Pressable className="flex-1 items-center flex-row gap-2" onPress={openDrawer}>
                <View className='rounded-full items-center justify-center bg-green size-9'>
                    <Text className='text-white font-msbold text-base'>OD</Text>
                </View>
                <View className='flex-1 items-start flex-col'>
                    <Text className="text-base font-msbold text-green" numberOfLines={1}>Hi, Oladapo Koiki</Text>
                    <Text className="font-mmedium text-xs">{greeting}</Text>
                </View>
            </Pressable>

            <Pressable className='relative' onPress={() => router.push("/(protected)/(nodrawer)/Notifications")}>
                <View className="absolute -top-2 -right-1 bg-red-600 rounded-full min-w-[18px] min-h-[18px] items-center justify-center px-[4px] z-50">
                  <Text className="text-white text-xs font-mmedium" numberOfLines={1} adjustsFontSizeToFit>5</Text>
                </View>
                <Octicons name="bell-fill" size={24} color="#218225" />
            </Pressable>
        </View>
        <FlatList
          data={[]}
          renderItem={null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          ListHeaderComponent={() => (
            <View className='flex-1'>
              <CarouselComponent width={fullWidth}/>
              <Explore />
              <EventHorizontalList />
              <Suggestions />
              <Media/>
            </View>
          )}
      />
    </View>
  )
}

export default HomeScreen