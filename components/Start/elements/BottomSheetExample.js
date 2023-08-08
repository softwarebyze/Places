import React, { useMemo, useRef } from "react";
import { View, Text } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const BottomSheetExample = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetExample;
