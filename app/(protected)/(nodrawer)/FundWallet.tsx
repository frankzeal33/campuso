import AppScreenHeader from "@/components/AppScreenHeader";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import useWalletStore from "@/store/WalletStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const choices = [1000, 2000, 5000, 10000];

export default function FundWallet() {
  const [amount, setAmount] = useState("");
  const fundWallet = useWalletStore((state) => state.fundWallet);
  const numericAmount = Number(amount.replace(/,/g, ""));
  const submit = () => {
    if (!numericAmount || numericAmount < 100) return;
    fundWallet(numericAmount);
    Alert.alert(
      "Wallet funded",
      `₦${numericAmount.toLocaleString()}.00 has been added to your wallet.`,
      [{ text: "Done", onPress: () => router.back() }],
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppScreenHeader
        title="Fund wallet"
        subtitle="Add money to your Campuso balance"
        back
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 16 }}
      >
        <View className="mb-6 rounded-3xl bg-green-drawer p-5">
          <View className="size-11 items-center justify-center rounded-full bg-white">
            <Ionicons name="add" size={24} color="#008751" />
          </View>
          <Text className="mt-4 font-mbold text-lg text-gray">
            How much do you want to add?
          </Text>
          <Text className="mt-1 font-mregular text-[10px] text-gray-300">
            Minimum funding amount is ₦100
          </Text>
        </View>
        <FormField
          title="Amount"
          value={amount}
          handleChangeText={setAmount}
          placeholder="₦0.00"
          keyboardType="number-pad"
          inputBg="bg-white"
          inputContainerStyles="border-gray-200 rounded-2xl"
        />
        <View className="my-4 flex-row flex-wrap gap-2">
          {choices.map((choice) => (
            <Pressable
              key={choice}
              onPress={() => setAmount(String(choice))}
              className={`rounded-full px-4 py-2.5 ${numericAmount === choice ? "bg-green" : "bg-gray-light"}`}
            >
              <Text
                className={`font-msbold text-xs ${numericAmount === choice ? "text-white" : "text-gray"}`}
              >
                ₦{choice.toLocaleString()}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text className="mb-2 mt-3 font-msbold text-sm text-gray">
          Payment method
        </Text>
        <View className="mb-7 flex-row items-center rounded-2xl bg-gray-light p-4">
          <View className="size-10 items-center justify-center rounded-full bg-white">
            <Ionicons name="card-outline" size={20} color="#008751" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-msbold text-sm text-gray">
              Debit or credit card
            </Text>
            <Text className="mt-0.5 font-mregular text-[9px] text-gray-300">
              Secure payment checkout
            </Text>
          </View>
          <Ionicons name="checkmark-circle" size={22} color="#008751" />
        </View>
        <CustomButton
          title={
            numericAmount
              ? `Continue with ₦${numericAmount.toLocaleString()}`
              : "Continue"
          }
          handlePress={submit}
          disableButton={!numericAmount || numericAmount < 100}
          containerStyles="rounded-2xl"
          textStyles="text-white text-sm"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
