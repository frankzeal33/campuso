import AppScreenHeader from "@/components/AppScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SettingItem = {
  icon: string;
  title: string;
  note: string;
  trailing?: ReactNode;
  onPress?: () => void;
};
export default function SettingsScreen({
  title,
  subtitle,
  items,
  footer,
}: {
  title: string;
  subtitle: string;
  items: SettingItem[];
  footer?: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <AppScreenHeader title={title} subtitle={subtitle} back />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View className="overflow-hidden rounded-2xl bg-gray-light">
          {items.map((item) => (
            <Pressable
              key={item.title}
              onPress={item.onPress}
              className="flex-row items-center p-4"
            >
              <View className="size-11 items-center justify-center rounded-full bg-green-lighter">
                <Ionicons name={item.icon as any} size={21} color="#008751" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-gray">
                  {item.title}
                </Text>
                <Text className="mt-1 font-mregular text-[11px] text-gray-300">
                  {item.note}
                </Text>
              </View>
              {item.trailing ?? (
                <Ionicons name="chevron-forward" size={18} color="#C3C3C3" />
              )}
            </Pressable>
          ))}
        </View>
        {footer}
      </ScrollView>
    </View>
  );
}
