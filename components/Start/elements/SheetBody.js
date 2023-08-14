import { View, Text, TextInput, Image } from "react-native";
import Colors from "../../../settings/Colors";
import STYLES from "../styles/Styles";
import _Button from "./_Button";
import { useState } from "react";

const RequestSubmitted = (props) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        marginVertical: 40,
      }}
    >
      <Image source={require("../../../assets/checked.png")} />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          lineHeight: 28.8,
          color: Colors.primary1_100,
          marginTop: 40,
        }}
      >
        Thank you for your request!
      </Text>
      <Text style={{ color: Colors.gray1_100, marginTop: 30 }}>
        Our Team Will Review Your Submission And Work On Creating A New Group
        For Your Interest Soon.
      </Text>
    </View>
  );
};

const SheetBody = (props) => {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { search } = props;
  return (
    <View>
      {!requestSubmitted ? (
        <View>
          <Text style={{ fontWeight: "bold", marginVertical: 40 }}>
            Not Seeing A Group For Your Interest? No Worries! Enter Your Desired
            Interest Below For Our Team To Review.
          </Text>
          <TextInput
            placeholder={search}
            style={{
              borderWidth: 1,
              borderColor: Colors.primary1_100,
              borderRadius: 5,
              height: 56,
            }}
          />
          <_Button
            action={() => setRequestSubmitted(true)}
            text={"Submit"}
            color={"primary1_100"}
            textColor={"white_100"}
            style={{ marginTop: 40 }}
            borderColor={"light_grey"}
          >
            Submit
          </_Button>
        </View>
      ) : (
        <RequestSubmitted />
      )}
    </View>
  );
};
export default SheetBody;
