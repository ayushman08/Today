import React from 'react';
import { View , Dimensions} from 'react-native';
const window = Dimensions.get('window');

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    width:window.width/1.2,
    marginTop:10,
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default Card;