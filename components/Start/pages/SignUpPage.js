import { View } from 'react-native';
import { useState } from 'react';
import _Button from '../elements/_Button';
import _Input from '../elements/_Input';
import _Header from '../elements/_Header';
import _Divider from '../elements/_Divider';
import _Navigator from '../elements/_Navigator';
import STYLES from '../styles/Styles';
import TERMS from '../../../settings/Terms'
terms = TERMS['English']
import EmailPassword from './EmailPassword';
import Google from './Google';
import Facebook from './Facebook';


export default SignUpPage = props => {
   const [mainScreenState, setMainScreenState] = useState('EmailPassword');

   return (
      <View
      style={STYLES.page}
      >
         <View
            style={STYLES.suliSpacer}
         >
         </View>
         <View
            style={STYLES.suliContainer}
         >
            <_Header
               text={terms['0005']}
               action={() => props.setPageScreenState('StartPage')}
            />
            <_Navigator 
               screens={{
                  'EmailPassword': <EmailPassword
                     setPageScreenState={(_) => props.setPageScreenState(_)}
                     setMainScreenState={(_) => setMainScreenState(_)}
                  />,
                  'Google': <Google
                     setPageScreenState={(_) => props.setPageScreenState(_)}
                     setMainScreenState={(_) => setMainScreenState(_)}
                  />,
                  'Facebook': <Facebook
                     setPageScreenState={(_) => props.setPageScreenState(_)}
                     setMainScreenState={(_) => setMainScreenState(_)}
                  />,
               }}
               screen={mainScreenState}
            />
         </View>
      </View>
  );
};
