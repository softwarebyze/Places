import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { db } from "../../firebaseConfig";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import CitiesDropdown from "../elements/CitiesDropdown";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";
const terms = TERMS["English"];

const LocationPage = () => {
  const navigator = useNavigation();
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = location.length === 0;

  const handleSubmitLocation = async () => {
    setLoading(true);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { cities: [location] }, { merge: true });
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
