import { useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAddUserDetails } from "../../firebase/hooks/useAddUserDetails";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import CitiesDropdown from "../elements/CitiesDropdown";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";
const terms = TERMS["English"];

const LocationPage = () => {
  const [location, setLocation] = useState("");
  const { mutateAsync: saveUserDetails, isPending } = useAddUserDetails();

  const disabled = location.length === 0;

  const handleSubmitLocation = async () => {
    await saveUserDetails({ cities: [location] });
  };

  return (
    <SafeAreaView style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={[STYLES.descriptionText, { marginHorizontal: 30 }]}>
        {terms["0020"]}
      </Text>
      <CitiesDropdown onSelect={setLocation} />
      {isPending ? (
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
