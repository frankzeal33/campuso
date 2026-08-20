import { AppMode, useAppModeStore } from "@/store/AppModeStore";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModeSwitch() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const setMode = useAppModeStore((state) => state.setMode);
  const mode: AppMode = params.mode === "provider" ? "provider" : "student";
  const provider = mode === "provider";
  const pulse = useSharedValue(0);

  const circleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 0.45, 1], [0.72, 0.4, 0.08]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [0.78, 1.58]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(pulse.value, [0, 0.5, 1], [0.94, 1.14, 0.94]) },
      { rotate: `${interpolate(pulse.value, [0, 0.5, 1], [-3, 4, -3])}deg` },
    ],
  }));

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, {
        duration: 720,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true,
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMode(mode);
    const timer = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace(
        provider
          ? "/(protected)/(drawer)/(provider-tabs)/Dashboard"
          : "/(protected)/(drawer)/(student-tabs)/Home",
      );
    }, 1600);
    return () => {
      clearTimeout(timer);
      cancelAnimation(pulse);
    };
  }, [mode, provider, pulse, setMode]);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="size-40 items-center justify-center">
        <Animated.View
          className={`absolute size-32 rounded-full border-2 ${provider ? "border-yellow bg-yellow-light" : "border-green bg-green-drawer"}`}
          style={circleStyle}
        />
        <Animated.View
          className={`size-24 items-center justify-center rounded-full border-2 shadow-lg ${provider ? "border-yellow bg-white" : "border-green bg-white"}`}
          style={iconStyle}
        >
          <Ionicons
            name={provider ? "briefcase" : "school"}
            size={40}
            color={provider ? "#9A6200" : "#008751"}
          />
        </Animated.View>
      </View>
      <Text className="mt-7 font-mbold text-2xl text-gray">
        {provider ? "Provider" : "Student"} mode
      </Text>
      <View className="mt-3 flex-row items-center">
        <View className="mr-2 size-2 animate-pulse rounded-full bg-green" />
        <Text className="font-mregular text-xs text-gray-300">
          Switching your Campuso experience…
        </Text>
      </View>
    </SafeAreaView>
  );
}
