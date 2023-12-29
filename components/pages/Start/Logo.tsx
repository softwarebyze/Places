import { Image } from "react-native";

export const Logo = () => (
  <Image
    style={{
      width: 375,
      height: 370,
    }}
    source={require("../../../assets/logo.png")}
  />
);
