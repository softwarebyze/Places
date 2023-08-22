import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import _Button from "../elements/_Button";
import _Header from "../elements/_Header";
import Styles from "../styles/Styles";

const ChannelInfoPage = (props) => {
  const route = useRoute();
  const { channelInfo } = route.params;
  return (
    <View style={Styles.page}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
          {channelInfo.data.interest}
        </Text>
        <Text style={{ color: "gray" }}>
          {channelInfo.data.member_count || 0} members
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          This is the beginning of
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {" "}
            {channelInfo.data.name}{" "}
          </Text>
          place
        </Text>
        <_Button
          style={{
            marginTop: 23,
            borderRadius: 18,
            height: 65,
            width: 330,
            marginLeft: 30,
          }}
          text={"Join"}
          color={"primary1_100"}
          borderColor={"light_grey"}
          textColor="white_100"
          underline={false}
        />
      </View>
    </View>
  );
};

export default ChannelInfoPage;
