import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StreamChat } from "stream-chat";

import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ProfilePage = () => {
  const navigator = useNavigation();

  const logout = () => {
    auth().signOut();
    client.disconnectUser();
    navigator.navigate("Start");
  };

  return (
    <View style={STYLES.page}>
      <Text>Display Name: {auth().currentUser.displayName}</Text>
      <Text>Email: {auth().currentUser.email}</Text>
      <Text>Client name: {client?.user.name}</Text>
      <_Button text={terms["0034"]} action={logout} />
    </View>
  );
};
export default ProfilePage;
