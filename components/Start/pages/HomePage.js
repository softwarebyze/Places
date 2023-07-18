import { Text, Button, View, TouchableOpacity } from "react-native";
import TERMS from "../../../settings/Terms";
const terms = TERMS["English"];
import _Button from "../elements/_Button";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../../settings/Colors";
import Styles from "../styles/Styles";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../settings/Colors";
import { Feather } from "@expo/vector-icons";

const DropdownItem = ({ label, onPress, icon }) => (
  <TouchableOpacity
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.white_100,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    }}
    onPress={onPress}
  >
    <View style={{ margin: 16 }}>{icon}</View>
    <Text style={{ fontSize: 14 }}>{label}</Text>
  </TouchableOpacity>
);

const Dropdown = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigation = useNavigation();

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary1_100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 6,
        }}
        onPress={toggleDropdown}
      >
        <Text
          style={[
            Styles.whiteText,
            Styles.blueDropdownHeader,
            { fontWeight: "bold" },
          ]}
        >
          {props.heading}
        </Text>
        {isCollapsed ? (
          <Ionicons name="chevron-down-outline" size={24} color="white" />
        ) : (
          <Ionicons name="chevron-up-outline" size={24} color="white" />
        )}
      </TouchableOpacity>

      <Collapsible collapsed={isCollapsed} containerStyle={{ borderRadius: 0 }}>
        <DropdownItem
          icon={<Ionicons name="baseball-outline" size={24} color="red" />}
          label="Baseball / New York City"
          onPress={() => console.log("Option 1 selected")}
        />
        <DropdownItem
          icon={<Ionicons name="american-football" size={24} color="brown" />}
          label="American Football / New York City"
          onPress={() => console.log("Option 2 selected")}
        />
        {/* Add more dropdown items/components as needed */}
        <TouchableOpacity
          onPress={() => navigation.navigate("JoinPlace")}
          style={{
            backgroundColor: Colors.white_100,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="add" size={24} color={Colors.orange} />
            <Text
              style={{
                color: Colors.orange,
                fontWeight: "600",
                fontSize: 16,
                paddingStart: 4,
              }}
            >
              {terms["0026"]}
            </Text>
          </View>
        </TouchableOpacity>
      </Collapsible>
    </View>
  );
};

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[Styles.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={Styles.groupLabelText}>Your Places</Text>
      <Dropdown heading={"New York City, NY"} />
    </SafeAreaView>
  );
};
export default HomePage;
