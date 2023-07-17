import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import TERMS from "../../../settings/Terms";
import STYLES from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";

const terms = TERMS["English"];
const ProfilePage = () => {
  const navigator = useNavigation();
  return (
    <View style={STYLES.page}>
      <_Button
        text={terms["0034"]}
        action={() => navigator.navigate("Start")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
    </View>
  );
};
export default ProfilePage;
