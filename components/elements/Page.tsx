import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

import Colors from "../../settings/Colors";

interface PageProps extends SafeAreaViewProps {
  backgroundColor?: string;
}

export const Page = ({
  children,
  backgroundColor = Colors.white_100,
  ...props
}: PageProps) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor,
        ...styles.page,
      }}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};

export const ModalPage = (props: PageProps) => (
  <Page edges={["left", "right", "bottom"]} {...props} />
);

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
});
