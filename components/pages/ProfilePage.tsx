import { View, Text } from "react-native";
import { useChatContext } from "stream-chat-expo";

import { useUserData } from "../../firebase/hooks/useUserData";
import TERMS from "../../settings/Terms";
import { useAuth } from "../contexts/AuthContext";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];

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
  const {
    data: { birth_date },
  } = useUserData();
  const { logout } = useAuth();

  const { client } = useChatContext();

  return (
    <View style={STYLES.page}>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 18,
          marginVertical: 20,
        }}
      >
        {client?.user?.name}, {getAge(birth_date.toDate())}
      </Text>
      <_Button text={terms["0034"]} action={logout} />
    </View>
  );
};
export default ProfilePage;
