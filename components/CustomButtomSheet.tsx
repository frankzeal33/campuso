import type {
  CustomBottomSheetProps,
  CustomBottomSheetRef,
} from "@/types/components";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { View } from "react-native";

const CustomButtomSheet = forwardRef<
  CustomBottomSheetRef,
  CustomBottomSheetProps
>((props, ref) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      {...(!props.dynamicSizing && { snapPoints: props.snapPoints })}
      enablePanDownToClose={
        props.enablePenDown === undefined ? true : props.enablePenDown
      }
      handleIndicatorStyle={{
        width: 40,
        height: 4,
        borderRadius: 999,
        backgroundColor: "#C3C3C3",
      }}
      stackBehavior="push"
      backdropComponent={renderBackdrop}
      enableDynamicSizing={
        props.dynamicSizing === undefined ? true : props.dynamicSizing
      }
      onDismiss={props.onDismiss}
      backgroundStyle={{
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      {props.scrollable ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingBottom: 32,
          }}
        >
          {props.children}
        </View>
      ) : (
        <BottomSheetView
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingBottom: 32,
          }}
        >
          {props.children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
});

CustomButtomSheet.displayName = "CustomButtomSheet";

export type { CustomBottomSheetRef } from "@/types/components";
export default CustomButtomSheet;
