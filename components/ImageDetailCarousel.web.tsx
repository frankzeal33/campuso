import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const { width } = Dimensions.get("window");

type Props = {
  images: string[];
  animatedStyle?: object;
};

export default function ImageDetailCarousel({ images, animatedStyle }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Animated.View
      style={[
        { position: "absolute", top: 0, width, height: "100%" },
        animatedStyle,
      ]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image) => (
          <Pressable
            key={image}
            onPress={() => setSelectedImage(image)}
            style={{ width, height: "100%" }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={selectedImage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View className="flex-1 items-center justify-center bg-black/95">
          <Pressable
            accessibilityLabel="Close image viewer"
            onPress={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 rounded-full bg-white/20 px-4 py-2"
          >
            <Text className="font-msbold text-white">Close</Text>
          </Pressable>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "92%", height: "86%" }}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </Modal>
    </Animated.View>
  );
}
