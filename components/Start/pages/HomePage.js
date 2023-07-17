import { Text, Button } from "react-native";
import TERMS from "../../../settings/Terms";
const terms = TERMS["English"];
import _Button from "../elements/_Button";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../settings/Colors";
import Styles from "../styles/Styles";

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={Styles.page}>
      <Text style={Styles.groupLabelText}>Your Places</Text>
      <Button
        title={terms["0027"]}
        onPress={() => navigation.navigate("JoinPlace")}
        color={COLORS.orange}
      />
    </SafeAreaView>
  );
};
export default HomePage;
