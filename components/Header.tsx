import { FontAwesome6 } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type headerProps = {
  title: string;
  right?: ReactElement;
  showGoBack?: boolean;
  showRight?: boolean;
  icon?: any;
  onpress?: () => void;
};

export default function Header({
  title,
  right,
  showGoBack,
  showRight,
  icon,
  onpress,
}: headerProps) {
  return (
    <View className="flex-row items-center justify-between py-4 gap-1">
      {showGoBack ? (
        <TouchableOpacity onPress={onpress}>
          <FontAwesome6 name="circle-chevron-left" size={30} color="#C3C3C3" />
        </TouchableOpacity>
      ) : (
        <Text />
      )}
      <Text
        className="flex-1 text-2xl font-msbold text-center"
        numberOfLines={1}
      >
        {title}
      </Text>
      {showRight ? icon : <View className="w-7" />}
    </View>
  );
}
