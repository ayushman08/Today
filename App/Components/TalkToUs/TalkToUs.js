import React, { Component } from 'react';

import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import {Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from "../Common/Header"
import MaterialTextInput from 'react-native-material-textinput';
const { width, height } = Dimensions.get('window');
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import style from '../SizeAndProportionComponent/SizeAndProportionStyle';

export default class TalkToUs extends Component {
     constructor() {
        super();
        this.state = {
     };
    }

    goToIntroScreen(){
        Actions.appIntro({type:'reset'})
     }

    render() {
        return (
          <View style={style.mainContainer}>
         <Header headerText={Strings.TALK_TO_US_HEADER_TITLE} screenCount="05" />
         <View>
         <Text style={[style.titleStyle,{textAlign:'center',margin:30}]}>{Strings.TALK_TO_US_DESCRIPTION}</Text>
         <View style={{margin:30}}>
                     <MaterialTextInput
                            label={Strings.HINT_TEXT_TALK}
                            labelColor={Colors.LABEL_TEXT_COLOR}
                            activeColor={Colors.LABEL_TEXT_COLOR}
                            color={Colors.TEXT_COLOR}
                            fontSize={15}
                            labelActiveTop={-30}
                            underlineColor={Colors.TEXT_COLOR}
                            underlineActiveColor={Colors.TEXT_COLOR}
                            underlineHeight={0.7}
                            underlineActiveHeight={0.7}
                            autoCapitalize='none'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                          
                            //onSubmitEditing={(event)=>{this.refs.lastname.focus()}}
                           
                        />

            </View>
            <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:20,marginLeft:100}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:10,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=> this.sendData()}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
            
             </View> 
             <TouchableWithoutFeedback onPress={() => this.goToIntroScreen()}>
             <View>
             <Text style={{textAlign:"center",marginTop:10}}>{Strings.CAN_DO_THIS_LATER_NEW}</Text></View>
             </TouchableWithoutFeedback>
         
         </View>  
        
               
         </View>  

         
        );
    }

}


const styles = {

  
  };