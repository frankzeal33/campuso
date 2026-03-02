import { images } from '@/constants';
import { Marquee } from '@animatereactnative/marquee';
import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

const featuredGames = [
    images.featured1,
    images.featured2,
    images.featured3,
    images.featured4,
];

export default function Suggestions() {

    const screen = useWindowDimensions();
    const fullWidth = screen.width
    const width = fullWidth - 16; // 16px padding on left sides
    const itemWidth = width * 0.82;  // 82% of screen width for item

  return (
    <View className='py-2'>
        <View className='w-full px-4 flex-row items-center justify-between pb-2'>
            <Text className='font-msbold text-base'>Suggestions for you</Text>
        </View>
        <Marquee speed={1} spacing={12}>
            <View className="flex-row gap-3">
            {featuredGames.map((item, index) => (
                <Pressable
                    key={index}
                    style={{
                        width: itemWidth,
                        height: 60,
                        borderRadius: 8,
                        overflow: "hidden",
                        backgroundColor: "#1F1F1F",
                    }}
                >
                <Image
                    source={item}
                    style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    }}
                />
                </Pressable>
            ))}
            </View>
        </Marquee>
    </View>
  )
}