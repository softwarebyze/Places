import { View } from 'react-native';
import { useState } from 'react';
import _Button from '../elements/_Button';
import _Input from '../elements/_Input';
import _Header from '../elements/_Header';
import _Divider from '../elements/_Divider';
import STYLES from '../styles/Styles';
import TERMS from '../../../settings/Terms'
terms = TERMS['English']

export default EmailPassword = props => {
   return (
      <View
         style={STYLES.suliContinues}
      >
         <_Input
            labelText={'Phone Number'}
            onFocus={() => setPasswordFocusState(true)}
            onBlur={() => setPasswordFocusState(false)}
            borderColor={'primary1_100'}
            style={STYLES.signUpInput}
         />
         <_Input
            labelText={'Gender'}
            onFocus={() => setPasswordFocusState(true)}
            onBlur={() => setPasswordFocusState(false)}
            borderColor={'primary1_100'}
            style={STYLES.signUpInput}
         />
         <_Input
            labelText={'Date'}
            onFocus={() => setPasswordFocusState(true)}
            onBlur={() => setPasswordFocusState(false)}
            borderColor={'primary1_100'}
            style={STYLES.signUpInput}
         />
      </View>
   );
};
