import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export type CustomBottomSheetRef = BottomSheetModal;

export type CustomBottomSheetProps = {
  children: ReactNode;
  snapPoints?: (string | number)[];
  dynamicSizing?: boolean;
  scrollable?: boolean;
  enablePenDown?: boolean;
  onDismiss?: () => void;
};

export type TextAreaProps = TextInputProps & {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (value: string) => void;
  labelStyle?: string;
  otherStyles?: string;
  inputBg?: string;
  inputContainerStyles?: string;
  inputStyles?: string;
};
