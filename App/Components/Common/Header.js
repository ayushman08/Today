import React from 'react';
import { Text, View } from 'react-native';


const Header = (props) => {
  const { textStyle, viewStyle,textStyle1 } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle1}>{props.screenCount}</Text>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection:'row',
    backgroundColor: '#F8F8F8',
    
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    textColor:'black'
  },
  textStyle1: {
    flex:0.5,
    marginLeft: 10,
    fontSize: 20,
    textColor:'black',
    fontWeight:"800"
  }
};

// Make the component available to other parts of the app
export default Header;