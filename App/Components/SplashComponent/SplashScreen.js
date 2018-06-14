import React, { Component } from 'react';

import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ImageBackground
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import AppIntro from "../AppIntro/AppIntro"
// import CommonStyles from '../../CommonStyle/CommonStyle';
// import Colors from '../../Constants/Colors';
// import Strings from '../../Constants/Strings';
// import ImagePath from '../../Constants/ImagesPath';

class SplashScreen extends Component {

    constructor() {
        super();
        this.state = {
           
        };
    }

componentWillMount() {
       setTimeout(() => {
           Actions.appIntro({type:'reset'});
           
        }, 2000);
    }

 render() {
        return (
             <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../../Assets/Splash2.png')}>
             </ImageBackground>
         
        );
    }

}

export default SplashScreen;

const styles = StyleSheet.create({

   imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  });