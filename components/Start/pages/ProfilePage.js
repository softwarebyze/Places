import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import TERMS from "../../../settings/Terms";
import STYLES from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const terms = TERMS["English"];
const ProfilePage = () => {
  const navigator = useNavigation();
  const auth = getAuth();
  return (
    <View style={STYLES.page}>
      <Text>Display Name: {auth.currentUser.displayName}</Text>
      <Text>Email: {auth.currentUser.email}</Text>
      <_Button
        text={terms["0034"]}
        action={() => {
          const auth = getAuth();
          signOut(auth);
          navigator.navigate("Start");
        }}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
    </View>
  );
};
export default ProfilePage;
