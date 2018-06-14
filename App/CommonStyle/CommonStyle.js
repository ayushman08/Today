import {
    StyleSheet,
    Platform,
    Dimensions
  } from 'react-native';
  import Colors from '../Constants/Colors';
  const window = Dimensions.get('window');
  export default StyleSheet.create({
  
    mainContainer: {
      position: 'absolute',
      flex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: null,
      height: null,
  
    }
  });