import React from "react";
import { Stylesheet, TextInput, View, Image } from "react-native";
import Colors from "../../../settings/Colors";

const Searchbar = (props) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: Colors.white_100,
        alignItems: "center",
        height: 72,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: Colors.light_grey,
          alignItems: "center",
          borderRadius: 6,
          height: 40,
          width: "90%",
          justifyContent: "space-around",
          borderWidth: 1,
        }}
      >
        <Image
          style={{
            marginHorizontal: 10,
          }}
          source={require("../../../assets/search-icon.png")}
        />
        <TextInput
          placeholder="search"
          style={{
            flex: 1,
            height: "100%",
          }}
        />
      </View>
    </View>
  );
};

export default Searchbar;
