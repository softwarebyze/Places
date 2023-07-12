import React, { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import _Header from '../elements/_Header';
import _Navigator from '../elements/_Navigator';
import STYLES from '../styles/Styles';
import TERMS from '../../../settings/Terms';
import EmailPassword from './EmailPassword';
import Google from './Google';
import Facebook from './Facebook';

const terms = TERMS['English'];

export default SignUpPage = props => {
  const [mainScreenState, setMainScreenState] = useState('EmailPassword');
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={STYLES.page}>
         
        <TouchableWithoutFeedback onPress={() => props.setPageScreenState('StartPage')}>
          <View style={STYLES.modalPadding} />
        </TouchableWithoutFeedback>

        <View style={STYLES.modalPadding}>
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

<_Button
            text={terms['0017']}
            action={() => props.setPageScreenState('LocationPage')}
            color='just_blue'
            borderColor='primary1_030'
            textColor='white_100'
            underline={true}
            
            
         />

        </View>

     
      </View>
    </Modal>
  );
};
