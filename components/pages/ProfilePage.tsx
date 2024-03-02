import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text } from "react-native";
import { StreamChat } from "stream-chat";

import { getStreamUserToken } from "../../firebaseConfig";
import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const ProfilePage = () => {
  const navigator = useNavigation();
  const [newDisplayName, setNewDisplayName] = useState("");

  const logout = () => {
    auth().signOut();
    client.disconnectUser();
    navigator.navigate("Start");
  };

  const changeUsername = async () => {
    await client.disconnectUser();
    const tokenResponse = await getStreamUserToken();
    const token = tokenResponse.data.toString();
    await client.connectUser(
      {
        id: auth().currentUser.uid,
        name: `${newDisplayName}`,
      },
      token,
    );
  };

  return (
    <View style={STYLES.page}>
      <Text>Email: {auth().currentUser.email}</Text>
      <Text>Client name: {client?.user.name}</Text>
      <_Input
        labelText="Display Name"
        placeholder={client?.user.name}
        value={newDisplayName}
        onChangeText={setNewDisplayName}
      />
      <_Button
        style={{ marginVertical: 8 }}
        text="Save Display Name"
        action={changeUsername}
      />
      <_Button text={terms["0034"]} action={logout} />
    </View>
  );
};
export default ProfilePage;
