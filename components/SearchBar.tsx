import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
}: Props) {
  return (
    <View className="mx-4 mb-4 flex-row items-center rounded-2xl border border-gray-100 bg-gray-light px-4">
      <Ionicons name="search" size={20} color="#787878" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#787878"
        className="h-12 flex-1 px-3 font-mregular text-sm text-gray"
      />
      {value ? (
        <Ionicons
          name="close-circle"
          size={18}
          color="#C3C3C3"
          onPress={() => onChangeText("")}
        />
      ) : null}
    </View>
  );
}
