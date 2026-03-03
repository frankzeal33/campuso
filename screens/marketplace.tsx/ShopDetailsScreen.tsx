import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
const ICON_SIZE = 36;
const { width } = Dimensions.get("window");

export default function ShopDetailsScreen() {

  const insets = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const prevScroll = useSharedValue(0);
  const showBottomButtons = useSharedValue(1); // 1 = visible, 0 = hidden

  // Scroll handler
  const scrollHandler = useAnimatedScrollHandler((event) => {
  const currentOffset = event.contentOffset.y;
  const contentHeight = event.contentSize.height;
  const layoutHeight = event.layoutMeasurement.height;

    const isAtBottom =
        layoutHeight + currentOffset >= contentHeight - 10; // small threshold

        // If at bottom → ALWAYS show buttons
        if (isAtBottom) {
            showBottomButtons.value = 1;
        } else {
            // Detect scroll direction
            if (currentOffset > prevScroll.value && currentOffset > 50) {
            // scrolling down → hide
            showBottomButtons.value = 0;
            } else if (currentOffset < prevScroll.value) {
            // scrolling up → show
            showBottomButtons.value = 1;
            }
        }

        prevScroll.value = currentOffset;
        scrollY.value = currentOffset;
    });

  // Header image shrink animation
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [HEADER_HEIGHT, 100],
      Extrapolation.CLAMP
    );
    return { height };
  });

  // Top icons fade/move animation
  const iconAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, HEADER_HEIGHT / 2], [1, 0], Extrapolation.CLAMP);
    const translateY = interpolate(scrollY.value, [0, HEADER_HEIGHT / 2], [0, -20], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // Bottom buttons hide/show animation
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
      {/* Header Image */}
      <Animated.Image
        source={{
          uri: "https://res.cloudinary.com/frankzeal/image/upload/v1772372189/Green_Youth_Soccer_Camp_Event_Flyer_x01ayb.png",
        }}
        style={[styles.headerImage, imageAnimatedStyle]}
        resizeMode="cover"
      />

      {/* Top Icons */}
      <Animated.View style={[styles.topIconsContainer, iconAnimatedStyle]}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={ICON_SIZE} color="white" />
        </Pressable>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable style={styles.iconButton}>
            <Ionicons name="heart-outline" size={ICON_SIZE} color="white" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="share-social-outline" size={ICON_SIZE} color="white" />
          </Pressable>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Consulate of Liberia, Lagos</Text>
          <Text style={styles.text}>
            Provides passport services and consular assistance for Liberian nationals, visa
            enquiries, document authentication, and emergency assistance.
          </Text>
          {/* Add more content here */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Text key={i} style={[styles.text, { marginTop: 10 }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Item {i + 1}
            </Text>
          ))}
        </View>
      </Animated.ScrollView>

        {/* Bottom Buttons */}
        <Animated.View style={[
            styles.bottomButtons,
            { bottom: insets.bottom + 10 },
            bottomButtonsAnimatedStyle,
        ]}>
        <Pressable style={styles.bottomButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </Pressable>
        <Pressable style={styles.bottomButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Share</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    position: "absolute",
    top: 0,
  },
  topIconsContainer: {
    position: "absolute",
    top: 40, // safe area for iOS notch
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 50
  },
  iconButton: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#064E3B",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 800,
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
    justifyContent: "space-between",
    gap: 16,
    zIndex: 50
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