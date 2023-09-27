import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";
import { View, Text } from "react-native";

const BottomSheetExample = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetExample;
