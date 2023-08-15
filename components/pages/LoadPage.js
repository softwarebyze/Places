import { View } from "react-native";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";

export default LoadPage = (props) => {
  return (
    <View style={STYLES.page}>
      <_Logo style={STYLES.fullLogo} />
    </View>
  );
};
