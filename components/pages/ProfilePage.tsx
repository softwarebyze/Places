import auth from "@react-native-firebase/auth";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StreamChat } from "stream-chat";

import { useUserData } from "../../firebase/hooks/useUserData";
import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const getAge = (date: Date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const ProfilePage = () => {
  const navigator = useNavigation();

  const {
    data: {
      birth_date,
      cities,
      details_completed,
      first_name,
      gender,
      interests,
      last_name,
      phone,
    },
  } = useUserData();

  const logout = () => {
    auth().signOut();
    client.disconnectUser();
    navigator.navigate("Start");
  };

  return (
    <View style={STYLES.page}>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 18,
          marginVertical: 20,
        }}
      >
        {client?.user.name}, {getAge(birth_date.toDate())}
      </Text>
      <_Button text={terms["0034"]} action={logout} />
    </View>
  );
};
export default ProfilePage;
