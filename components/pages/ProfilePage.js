import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import TERMS from "../../settings/Terms";
import STYLES from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { StreamChat } from "stream-chat";

const terms = TERMS["English"];
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ProfilePage = () => {
  const navigator = useNavigation();
  const auth = getAuth();

  const logout = () => {
    signOut(auth);
    client.disconnectUser();
    navigator.navigate("Start");
  };

  return (
    <View style={STYLES.page}>
      <Text>Display Name: {auth.currentUser.displayName}</Text>
      <Text>Email: {auth.currentUser.email}</Text>
      <_Button
        text={terms["0034"]}
        action={logout}
        borderColor="primary1_100"
      />
    </View>
  );
};
export default ProfilePage;
