import { Image } from 'react-native';

export default Logo = props => {
  return (
   <Image source={require('../../../assets/logo.png')} style={props.style}/>
  );
};
