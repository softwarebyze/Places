import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import Collapsible from "react-native-collapsible";
import { ChannelList } from "stream-chat-expo";
import { HomePageProps } from "../navigation/types";
import { DropdownHeader } from "./DropdownHeader";
import { JoinANewPlace } from "./JoinANewPlace";

export const Dropdown = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const navigation = useNavigation<HomePageProps["navigation"]>();

  return (
    <View style={{ width: "100%" }}>
      <DropdownHeader
        onPress={toggleDropdown}
        heading={props.heading}
        isCollapsed={isCollapsed}
      />
      <Collapsible collapsed={isCollapsed}>
        <View style={{ flex: 1, maxHeight: 350 }}>
          <ChannelList
            filters={{
              type: "team",
              members: { $in: [auth().currentUser.uid] },
              location: { $in: [props.heading] },
            }}
            onSelect={(channel) => {
              navigation.navigate("PlacesChat", { channel });
            }}
          />
          <JoinANewPlace location={props.heading} />
        </View>
      </Collapsible>
    </View>
  );
};
