import AppScreenHeader from "@/components/AppScreenHeader";
import { useSafetyStore } from "@/store/SafetyStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, FlatList, Linking, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrustedContacts() {
  const { contacts, initializeSafety, removeContact } = useSafetyStore();

  useEffect(() => {
    initializeSafety();
  }, [initializeSafety]);

  const confirmRemove = (id: string, name: string) => {
    Alert.alert("Remove trusted contact?", `${name} will be removed.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeContact(id) },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Trusted contacts"
        subtitle="People you can reach quickly"
        back
        action={
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(protected)/(nodrawer)/TrustedContactForm",
                params: { mode: "add" },
              } as any)
            }
            className="size-10 items-center justify-center rounded-full bg-green"
          >
            <Ionicons name="person-add-outline" size={20} color="#fff" />
          </Pressable>
        }
      />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-2xl bg-gray-light p-4">
            <View className="flex-row items-center">
              <View className="size-12 items-center justify-center rounded-full bg-green-drawer">
                <Text className="font-mbold text-sm text-green">
                  {item.name.slice(0, 2).toUpperCase()}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-msbold text-sm text-gray">{item.name}</Text>
                <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                  {item.relationship} · {item.phone}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(protected)/(nodrawer)/TrustedContactForm",
                    params: { mode: "edit", id: item.id },
                  } as any)
                }
                className="size-8 items-center justify-center rounded-full bg-white"
              >
                <Ionicons name="pencil-outline" size={15} color="#008751" />
              </Pressable>
            </View>
            <View className="mt-4 flex-row gap-2">
              <Pressable
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
                className="h-10 flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-green"
              >
                <Ionicons name="call-outline" size={16} color="#fff" />
                <Text className="font-msbold text-[10px] text-white">Call</Text>
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL(`sms:${item.phone}`)}
                className="h-10 flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-white"
              >
                <Ionicons name="chatbubble-outline" size={16} color="#008751" />
                <Text className="font-msbold text-[10px] text-green">Message</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmRemove(item.id, item.name)}
                className="size-10 items-center justify-center rounded-xl bg-red-50"
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-24">
            <Ionicons name="people-outline" size={48} color="#C3C3C3" />
            <Text className="mt-3 font-msbold text-gray-300">
              No trusted contacts yet
            </Text>
            <Text className="mt-1 text-center font-mregular text-[10px] text-gray-300">
              Add someone you trust for quick access during an emergency.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
