import { View } from "react-native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
terms = TERMS["English"];

export default InterestsPage = (props) => {
  return (
    <View>
<_Button
          text={terms['0019']}
          action={() => props.setPageScreenState('LocationPage')}
          color='primary1_100'
          borderColor='primary1_100'
          textColor='white_100'
          style={STYLES.startButton}
        />
 <Text
          style={STYLES.welcomeText}
        >
          {terms['0021']}
        </Text>
        <_Button
          text={terms['0022']}
          action={() => props.setPageScreenState('NavigatorPage')}
          color='primary1_100'
          borderColor='primary1_100'
          textColor='white_100'
          style={STYLES.startButton}
        />

<Text
        >
          {terms['0024']}
        </Text>

        <Text
        >
          {terms['0025']}
        </Text>


    
    </View>
  );
};
