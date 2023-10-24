import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";

import { db, getStreamUserToken } from "../../firebaseConfig";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import CitiesDropdown from "../elements/CitiesDropdown";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";
const terms = TERMS["English"];

const LocationPage = () => {
  const navigator = useNavigation();
  const { client } = useChatContext();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = location.length === 0;

  const getUserData = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("No user ID found!");

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No data for user!");
      return null;
    }
  };

  const handleSubmitLocation = async () => {
    setLoading(true);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { cities: [location] }, { merge: true });
    if (!client?.user) {
      const userData = await getUserData();
      await client.connectUser(
        { id: userId, name: `${userData.first_name} ${userData.last_name}` },
        async () => {
          const tokenResponse = await getStreamUserToken();
          const token = tokenResponse.data.toString();
          return token;
        },
      );
    }
    setLoading(false);
    navigator.navigate("ChooseInterests", { location });
  };

  return (
    <SafeAreaView style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={[STYLES.descriptionText, { marginHorizontal: 30 }]}>
        {terms["0020"]}
      </Text>
      <CitiesDropdown onSelect={setLocation} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <_Button
          text={terms["0008"]}
          action={handleSubmitLocation}
          disabled={disabled}
        />
      )}
    </SafeAreaView>
  );
};
export default LocationPage;
