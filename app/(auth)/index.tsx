import CustomButton from "@/components/CustomButton";
import { data, videos } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const videoSource = videos.onboardingVideo;

export default function VideoOnboarding() {

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const SLIDE_DURATION = 6000;

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  // Animate progress
  const animateProgress = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: SLIDE_DURATION,
      useNativeDriver: false,
    }).start();
  };

  // Start auto-scroll
  const startAutoScroll = () => {
    if (intervalRef.current) return; // prevent multiple intervals

    animateProgress();

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.onboardingSlide.length;

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        progressAnim.setValue(0);
        animateProgress();

        return nextIndex;
      });
    }, SLIDE_DURATION);

  };

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    progressAnim.stopAnimation();
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" backgroundColor="transparent" />

      {/* Background Video */}
      <VideoView
        player={player}
        contentFit="cover"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />

      <Text
        className="px-4 text-3xl text-white font-mbold"
        style={{ position: "absolute", top: insets.top + 20 }}
      >
        Campuso
      </Text>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={data.onboardingSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}

        // Pause when user touches
        onTouchStart={stopAutoScroll}

        // Resume when released
        onTouchEnd={startAutoScroll}

        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(index);
          progressAnim.setValue(0);
          animateProgress();
        }}

        renderItem={({ item }) => (
          <View
            style={{
              width,
              height,
              bottom: insets.bottom + 40,
            }}
            className="justify-end px-4"
          >
            <Text className="text-white text-3xl font-mbold mb-4">
              {item.title}
            </Text>

            <Text className="text-white text-base font-mmedium leading-6 mb-8 text-justify">
              {item.description}
            </Text>

            <View className="flex-row gap-4">
              <CustomButton title="LOG IN" handlePress={() => router.push("/(auth)/Login")} containerStyles="flex-1 bg-white" textStyles='text-black'/>
              <CustomButton title="REGISTER" handlePress={() => router.push("/(auth)/Register")} containerStyles="flex-1" textStyles='text-white'/>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View
        className="absolute w-full flex-row px-4 gap-2"
        style={{ bottom: insets.bottom + 10 }}
      >
        {data.onboardingSlide.map((_, index) => {
          
          const widthAnim = progressAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 30],
          });

          return (
            <View
              key={index}
              className="h-2 rounded-full bg-white/40 overflow-hidden"
              style={{
                width: index === activeIndex ? 30 : 8,
              }}
            >
              {index === activeIndex && (
                <Animated.View
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: widthAnim,
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}