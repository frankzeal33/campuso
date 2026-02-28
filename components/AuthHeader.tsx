import { images } from '@/constants';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AuthHeader() {

    const { top } = useSafeAreaInsets();

  return (
    <View className='items-center justify-center' style={{ paddingTop: top}}>
        <View className='flex-row gap-1 items-center py-6 px-5'>
            <Image source={images.logo} className='mx-auto size-8'/>
            <Text className="px-4 text-2xl text-white font-mbold">Campuso</Text>
        </View>
    </View>
  )
}