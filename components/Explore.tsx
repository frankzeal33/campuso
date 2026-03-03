import { data } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';

const backgroundColors = [
  "#EEEAF7", // Restaurants (light purple)
  "#FFF4D6", // Shops (light yellow)
  "#EAF2FB", // Pharmacies (light blue)
  "#EAF7F0", // Bills (light green)
  "#FDECEF", // Packages (light pink)
  "#E9F7F1", // Local Markets (mint)
  "#F4F1E8", // Events (beige)
  "#F3F3F3", // More (light grey)
];

const Explore = () => {

  return (
    <View className='pt-2 px-4'>
      <View className='w-full pb-2 flex-row items-center justify-between gap-1'>
        <Text className='font-msbold text-base'>Explore</Text>
      </View>
      <FlatList
        data={data.explore}
        keyExtractor={(item, index) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={{gap: 6, marginBottom: 6}}
        renderItem={({ item, index }) => (
          <Pressable className='px-2 py-4 items-center flex-1 rounded-md' style={{backgroundColor: backgroundColors[index],}} onPress={() => router.push("/(protected)/(nodrawer)/ShopDetails")}>
            <Image
              style={{ width:28, height:28 }}
              source={item?.image}
              resizeMode="contain"
            />
            <Text className='font-mmedium text-center text-[9px] leading-4 mt-1' numberOfLines={3}>{item?.title}</Text>
          </Pressable>
        )}
      />

    </View>
  )
}

export default Explore