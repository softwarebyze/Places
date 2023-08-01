import React from "react";
import { Stylesheet, TextInput, View, Image } from "react-native";
import Colors from "../../../settings/Colors";
import { Feather, Entypo } from "@expo/vector-icons";

const Searchbar = (props) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: Colors.white_100,
        alignItems: "center",
        height: "10%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.light_grey,
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 5,
          height: "50%",
          width: "90%",
          marginTop: 15,
        }}
      >
        <Image source={require("../../../assets/search-icon.png")} />
        <TextInput placeholder="search" keyboard="default" />
      </View>
    </View>
  );
};

export default Searchbar;
