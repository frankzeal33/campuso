import ImageDetailCarousel from "@/components/ImageDetailCarousel";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 500;
const { width } = Dimensions.get("window");

const carouselImages = [
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372180/1131w-LZtBbF-igKQ_f4e4ln.png",
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372183/Brown_And_Black_Bold_Food_Catering_Flyer_axjlu0.png",
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372185/Black_and_Orange_Basketball_Tournament_Flyer_A4_khw0ng.png",
  "https://res.cloudinary.com/frankzeal/image/upload/v1772372189/Green_Youth_Soccer_Camp_Event_Flyer_x01ayb.png",
];

export default function EventDetailsScreen() {
  const insets = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const prevScroll = useSharedValue(0);
  const showBottomButtons = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    const contentHeight = event.contentSize.height;
    const layoutHeight = event.layoutMeasurement.height;

    const isAtBottom = layoutHeight + currentOffset >= contentHeight - 10;

    if (isAtBottom) {
      showBottomButtons.value = 1;
    } else {
      if (currentOffset > prevScroll.value && currentOffset > 50) {
        showBottomButtons.value = 0;
      } else if (currentOffset < prevScroll.value) {
        showBottomButtons.value = 1;
      }
    }

    prevScroll.value = currentOffset;
    scrollY.value = currentOffset;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 100],
      Extrapolation.CLAMP,
    );

    return { height };
  });

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT / 2],
      [1, 0],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT / 2],
      [0, -20],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const bottomButtonsAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(showBottomButtons.value, [0, 1], [100, 0]);
    const opacity = interpolate(showBottomButtons.value, [0, 1], [0, 1]);

    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#003D33" }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* HEADER */}
        <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
          <View style={styles.overlay} />

          <ImageDetailCarousel
            images={carouselImages}
            animatedStyle={{ flex: 1 }}
          />
        </Animated.View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>Consulate of Liberia, Lagos</Text>
          <Text style={styles.text}>
            Provides passport services and consular assistance for Liberian
            nationals, visa enquiries, document authentication, and emergency
            assistance.
          </Text>

          {Array.from({ length: 20 }).map((_, i) => (
            <Text key={i} style={[styles.text, { marginTop: 10 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Item{" "}
              {i + 1}
            </Text>
          ))}
        </View>
      </Animated.ScrollView>

      {/* TOP ICONS */}
      <Animated.View
        style={[
          styles.topIconsContainer,
          iconAnimatedStyle,
          { top: insets.top + 10 },
        ]}
      >
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="white" />
        </Pressable>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable style={styles.iconButton}>
            <Ionicons name="heart-outline" size={20} color="white" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={22} color="white" />
          </Pressable>
        </View>
      </Animated.View>

      {/* BOTTOM BUTTONS */}
      <Animated.View
        style={[
          styles.bottomButtons,
          { bottom: insets.bottom + 10 },
          bottomButtonsAnimatedStyle,
        ]}
      >
        <Pressable style={styles.bottomButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </Pressable>

        <Pressable style={styles.bottomButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Share</Text>
        </Pressable>
      </Animated.View>

      <StatusBar translucent backgroundColor="transparent" style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  topIconsContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 50,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#064E3B",
    borderRadius: 20,
    padding: 14,
    minHeight: 800,
    margin: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  bottomButtons: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    gap: 16,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
