import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  bottomSheet?: boolean;
  containerStyles?: string;
  inputStyles?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
  bottomSheet = false,
  containerStyles,
  inputStyles,
}: Props) {
  const Input = bottomSheet ? BottomSheetTextInput : TextInput;

  return (
    <View
      className={`mx-4 mb-4 flex-row items-center rounded-2xl border border-gray-100 bg-gray-light px-4 ${containerStyles ?? ""}`}
    >
      <Ionicons name="search" size={20} color="#787878" />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#787878"
        className={`h-12 flex-1 px-3 font-mregular text-sm text-gray ${inputStyles ?? ""}`}
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
