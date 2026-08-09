import SettingsScreen from "@/components/SettingsScreen";
import { Text, View } from "react-native";
export default function Support() {
  return (
    <SettingsScreen
      title="Help & support"
      subtitle="We’re here when you need us"
      items={[
        {
          icon: "chatbubble-ellipses-outline",
          title: "Chat with support",
          note: "Typical reply within a few minutes",
        },
        {
          icon: "mail-outline",
          title: "Send us an email",
          note: "support@campuso.app",
        },
        {
          icon: "help-circle-outline",
          title: "Frequently asked questions",
          note: "Quick answers about Campuso",
        },
        {
          icon: "warning-outline",
          title: "Report a problem",
          note: "Tell us when something isn’t working",
        },
      ]}
      footer={
        <View className="items-center py-8">
          <Text className="font-msbold text-sm text-green">Campuso Care</Text>
          <Text className="mt-1 font-mregular text-xs text-gray-300">
            Available Monday–Saturday, 8am–8pm
          </Text>
        </View>
      }
    />
  );
}
