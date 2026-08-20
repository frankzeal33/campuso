import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  back?: boolean;
  action?: ReactNode;
  titleClassName?: string;
};

export default function AppScreenHeader({
  title,
  subtitle,
  back,
  action,
  titleClassName,
}: Props) {
  return (
    <View className="flex-row items-center gap-3 px-4 pb-4 pt-3">
      {back && (
        <Pressable
          onPress={() => router.back()}
          className="size-10 items-center justify-center rounded-full bg-gray-light"
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </Pressable>
      )}
      <View className="flex-1">
        <Text
          className={`font-mbold text-gray ${titleClassName ?? "text-xl"}`}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 font-mregular text-xs text-gray-300">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}
