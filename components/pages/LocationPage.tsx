import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";

import { getUserData, saveUserDetails } from "../../firebase/users";
import { getStreamUserToken } from "../../firebaseConfig";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import CitiesDropdown from "../elements/CitiesDropdown";
import { Page } from "../elements/Page";
import { PButton } from "../elements/Button";
import STYLES from "../styles/Styles";
const terms = TERMS["English"];

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const LocationPage = () => {
  const navigator = useNavigation();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = location.length === 0;

  const handleSubmitLocation = async () => {
    setLoading(true);
    const userId = auth().currentUser.uid;
    await saveUserDetails({ cities: [location] });
    if (!client?.user) {
      const userData = await getUserData();
      const tokenResponse = await getStreamUserToken();
      const token = tokenResponse.data.toString();
      await client.connectUser(
        { id: userId, name: `${userData.first_name} ${userData.last_name}` },
        token,
      );
    }
    setLoading(false);
    navigator.navigate("ChooseInterests", { location });
  };

  return (
    <Page style={{ backgroundColor: Colors.light_grey }}>
      <Text style={[STYLES.descriptionText, { marginHorizontal: 30 }]}>
        {terms["0020"]}
      </Text>
      <CitiesDropdown onSelect={setLocation} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <PButton
          text={terms["0008"]}
          action={handleSubmitLocation}
          disabled={disabled}
        />
      )}
    </Page>
  );
};
export default LocationPage;
