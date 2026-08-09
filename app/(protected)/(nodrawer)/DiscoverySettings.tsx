import AppScreenHeader from "@/components/AppScreenHeader";
import { useDiscoveryStore } from "@/store/DiscoveryStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiscoverySettings() {
  const {
    allowCrossSchool,
    visibleToOtherSchools,
    initializeDiscovery,
    setAllowCrossSchool,
    setVisibleToOtherSchools,
  } = useDiscoveryStore();

  useEffect(() => {
    initializeDiscovery();
  }, [initializeDiscovery]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Discovery settings"
        subtitle="Control what you see across campuses"
        back
      />

      <View className="mx-4 rounded-3xl bg-gray-light p-4">
        <View className="flex-row items-center">
          <View className="size-11 items-center justify-center rounded-full bg-green-lighter">
            <Ionicons name="school-outline" size={22} color="#008751" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-gray">
              Explore other schools
            </Text>
            <Text className="mt-1 font-mregular text-[11px] leading-4 text-gray-300">
              See people, conversations, and community content from other
              schools. You can also add them to group chats.
            </Text>
          </View>
          <Switch
            value={allowCrossSchool}
            onValueChange={setAllowCrossSchool}
            trackColor={{ false: "#DDDDDD", true: "#3BA440" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View className="mx-4 mt-3 rounded-3xl bg-gray-light p-4">
        <View className="flex-row items-center">
          <View className="size-11 items-center justify-center rounded-full bg-green-lighter">
            <Ionicons name="eye-outline" size={22} color="#008751" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-gray">
              Show my profile to other schools
            </Text>
            <Text className="mt-1 font-mregular text-[11px] leading-4 text-gray-300">
              Allow verified students from other schools to discover your
              profile, course, interests, and school information.
            </Text>
          </View>
          <Switch
            value={visibleToOtherSchools}
            onValueChange={setVisibleToOtherSchools}
            trackColor={{ false: "#DDDDDD", true: "#3BA440" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      <View className="mx-4 mt-4 flex-row rounded-2xl bg-yellow-light p-4">
        <Ionicons name="information-circle-outline" size={20} color="#8A5A00" />
        <Text className="ml-2 flex-1 font-mregular text-[11px] leading-4 text-gray-300">
          These permissions are independent. You can explore other schools
          without making your own profile visible to them.
        </Text>
      </View>
    </SafeAreaView>
  );
}
