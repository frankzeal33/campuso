import VendorList from '@/components/VendorList'
import { images } from '@/constants'
import { getGreetingMessage } from '@/utils/getGreetingMessage'
import { Octicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { memo } from 'react'
import { FlatList, Image, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native'
import Carousel from "react-native-reanimated-carousel"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const sliderImages = [
   images.card1,
  images.card2,
  images.card1,
  images.card3
];

const featuredGames = [
	images.featured1,
	images.featured2,
	images.featured3,
	images.featured4,
];

const CarouselComponent = memo(({ width }: { width: number }) => {
  return (
    <Carousel
      autoPlayInterval={5000}
      data={sliderImages}
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
            alignSelf: 'center',
            borderRadius: 14,
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

            <Pressable className='relative' onPress={() => router.push("/(protected)/(drawer)/(routes)/Notifications")}>
                <View className="absolute -top-2 -right-1 bg-red-600 rounded-full min-w-[18px] min-h-[18px] items-center justify-center px-[4px] z-50">
                  <Text className="text-white text-xs font-mmedium" numberOfLines={1} adjustsFontSizeToFit>5</Text>
                </View>
                <Octicons name="bell-fill" size={24} color="#218225" />
            </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1 flex-grow'>
            <View className='flex-1'>
                <CarouselComponent width={fullWidth}/>
                <VendorList />
                <View>
                    <View className='w-full px-4 flex-row items-center justify-between mt-2 mb-1'>
                        <Text className='text-sm font-mbold'>Featured Games</Text>
                    </View>
                    <FlatList
                        nestedScrollEnabled={true}
                        horizontal
                        scrollEnabled={true}
                        data={featuredGames}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <Pressable style={{
                                width: itemWidth,
                                height: 95,
                                alignSelf: 'center',
                                borderRadius: 12,
                                overflow: 'hidden',
                                backgroundColor: "#1F1F1F",
                                marginBottom: 2,

                            }} 
                            // onPress={() => router.push("/(protected)/(routes)/TicketDetails")}
                            >
                                <Image source={item} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 12}}
                                />
                            </Pressable>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default HomeScreen