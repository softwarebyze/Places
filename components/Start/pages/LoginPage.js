import React, { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import _Header from '../elements/_Header';
import _Navigator from '../elements/_Navigator';
import STYLES from '../styles/Styles';
import TERMS from '../../../settings/Terms';
import EmailPassword from './EmailPassword';  // make sure this handles sign-in
import Google from './Google';  // make sure this handles sign-in
import Facebook from './Facebook';  // make sure this handles sign-in

const terms = TERMS['English'];

export default LoginPage = props => {
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
            text={terms['0016']}  // change this to "Login" or similar
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
    </Modal>
  );
};
