import { Image } from "react-native";

const Logo = (props) => {
  return (
    <Image source={require("../../assets/logo.png")} style={props.style} />
  );
};

export default Logo;
