import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButtomSheet, {
  CustomBottomSheetRef,
} from "@/components/CustomButtomSheet";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import SearchBar from "@/components/SearchBar";
import { useSafetyStore } from "@/store/SafetyStore";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as Contacts from "expo-contacts";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrustedContactForm() {
  const { mode = "add", id } = useLocalSearchParams<{ mode?: "add" | "edit"; id?: string }>();
  const { contacts, initializeSafety, addContact, updateContact } = useSafetyStore();
  const contactSheetRef = useRef<CustomBottomSheetRef>(null);
  const [loaded, setLoaded] = useState(mode !== "edit");
  const [contactQuery, setContactQuery] = useState("");
  const [deviceContacts, setDeviceContacts] = useState<Contacts.ExistingContact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    initializeSafety();
  }, [initializeSafety]);

  useEffect(() => {
    if (mode !== "edit" || loaded) return;
    const contact = contacts.find((item) => item.id === id);
    if (!contact) return;
    setName(contact.name);
    setPhone(contact.phone);
    setRelationship(contact.relationship);
    setLoaded(true);
  }, [contacts, id, loaded, mode]);

  const filteredContacts = useMemo(
    () =>
      deviceContacts.filter(
        (contact) =>
          contact.phoneNumbers?.length &&
          `${contact.name || ""} ${contact.phoneNumbers[0]?.number || ""}`
            .toLowerCase()
            .includes(contactQuery.toLowerCase()),
      ),
    [contactQuery, deviceContacts],
  );

  const openContactPicker = async () => {
    setLoadingContacts(true);
    try {
      const permission = await Contacts.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Contacts permission needed",
          "Allow contact access to choose a trusted contact. You can still enter one manually.",
          [
            { text: "Not now", style: "cancel" },
            { text: "Open settings", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      const result = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
        sort: Contacts.SortTypes.FirstName,
      });
      setDeviceContacts(result.data.filter((contact) => contact.phoneNumbers?.length));
      setContactQuery("");
      contactSheetRef.current?.present();
    } catch {
      Alert.alert("Unable to load contacts", "Please try again or enter the contact manually.");
    } finally {
      setLoadingContacts(false);
    }
  };

  const chooseContact = (contact: Contacts.ExistingContact) => {
    setName(contact.name || `${contact.firstName || ""} ${contact.lastName || ""}`.trim());
    setPhone(contact.phoneNumbers?.[0]?.number || "");
    contactSheetRef.current?.dismiss();
  };

  const save = async () => {
    if (!name.trim() || !phone.trim() || !relationship.trim()) return;
    const value = {
      name: name.trim(),
      phone: phone.trim(),
      relationship: relationship.trim(),
    };
    if (mode === "edit" && id) await updateContact(id, value);
    else await addContact(value);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title={mode === "edit" ? "Edit contact" : "Add trusted contact"}
        subtitle="Someone you can reach during an emergency"
        back
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <Pressable
          onPress={openContactPicker}
          disabled={loadingContacts}
          className="mb-5 flex-row items-center rounded-2xl bg-green-lighter p-4"
        >
          <View className="size-11 items-center justify-center rounded-full bg-white">
            <Ionicons name="book-outline" size={21} color="#008751" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-green">
              {loadingContacts ? "Loading contacts…" : "Choose from contacts"}
            </Text>
            <Text className="mt-1 font-mregular text-[10px] text-gray-300">
              Fill the name and phone number automatically
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#008751" />
        </Pressable>

        <View className="mb-5 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-gray-100" />
          <Text className="font-msbold text-[9px] uppercase text-gray-300">
            Or enter manually
          </Text>
          <View className="h-px flex-1 bg-gray-100" />
        </View>

        <FormField
          title="Full name"
          value={name}
          handleChangeText={setName}
          placeholder="Contact name"
          labelStyle="text-xs text-gray"
          inputContainerStyles="rounded-2xl border-0"
          inputStyles="text-sm"
        />
        <FormField
          title="Phone number"
          value={phone}
          handleChangeText={setPhone}
          placeholder="e.g. 08012345678"
          keyboardType="phone-pad"
          labelStyle="text-xs text-gray"
          otherStyles="mt-5"
          inputContainerStyles="rounded-2xl border-0"
          inputStyles="text-sm"
        />
        <FormField
          title="Relationship"
          value={relationship}
          handleChangeText={setRelationship}
          placeholder="e.g. Parent, friend, guardian"
          labelStyle="text-xs text-gray"
          otherStyles="mt-5"
          inputContainerStyles="rounded-2xl border-0"
          inputStyles="text-sm"
        />
        <CustomButton
          title={mode === "edit" ? "Save changes" : "Add contact"}
          handlePress={save}
          disableButton={!name.trim() || !phone.trim() || !relationship.trim()}
          containerStyles="mt-7 rounded-2xl"
          textStyles="text-sm text-white"
        />
      </ScrollView>

      <CustomButtomSheet
        ref={contactSheetRef}
        snapPoints={["90%"]}
        dynamicSizing={false}
        scrollable
      >
        <View className="flex-1">
          <View className="mb-4 flex-row items-center">
            <View className="flex-1">
              <Text className="font-mbold text-xl text-gray">Choose contact</Text>
              <Text className="mt-0.5 font-mregular text-xs text-gray-300">
                Select someone you trust
              </Text>
            </View>
            <Pressable
              onPress={() => contactSheetRef.current?.dismiss()}
              className="size-9 items-center justify-center rounded-full bg-gray-light"
            >
              <Ionicons name="close" size={20} color="#2F2F2F" />
            </Pressable>
          </View>

          <SearchBar
            value={contactQuery}
            onChangeText={setContactQuery}
            placeholder="Search name or number"
            bottomSheet
            containerStyles="mx-0 mb-2 h-[52px] border border-gray-200 bg-white"
            inputStyles="h-full"
          />

          <BottomSheetFlatList
            data={filteredContacts}
            keyExtractor={(contact) => contact.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => chooseContact(item)}
                className="flex-row items-center py-3"
              >
                <View className="size-11 items-center justify-center rounded-full bg-green-drawer">
                  <Text className="font-mbold text-xs text-green">
                    {(item.name || "C").slice(0, 2).toUpperCase()}
                  </Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="font-msbold text-sm text-gray">
                    {item.name || "Unnamed contact"}
                  </Text>
                  <Text className="mt-1 font-mregular text-[10px] text-gray-300">
                    {item.phoneNumbers?.[0]?.number}
                  </Text>
                </View>
                <View className="size-8 items-center justify-center rounded-full bg-green-lighter">
                  <Ionicons name="add" size={17} color="#008751" />
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View className="items-center py-16">
                <Ionicons name="people-outline" size={42} color="#C3C3C3" />
                <Text className="mt-3 font-msbold text-gray-300">
                  No contacts found
                </Text>
              </View>
            }
          />
        </View>
      </CustomButtomSheet>
    </SafeAreaView>
  );
}
