import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import {Button } from 'native-base';

import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
// import AppIntro from "../AppIntro/AppIntro"


export default  class ServiceComponentDecided extends Component {
  constructor() {
        super();
        this.state = {
         
        };
    }

componentWillMount() {
 }
 goBack(){
     Actions.pop()
 }

  render() {
        return (
            <View style={{flex:1}}>
           <View style={styles.viewStyle}>
           <Text style={{fontSize: 18}}>  SERVICE PREFERENCES</Text>
           </View>
           <ScrollView style={{flex:1}}>

           <Text style={{textAlign:"center",color:"black",fontWeight:"600",marginTop:50,marginBottom:20}}>WHO IS DECIDING WHAT TO BUY ?</Text>
          

           <View style={{justifyContent:"center",alignItems:"center",margin:20}}>
           <Image source={require('../../Assets/Buy.png')}/>
           </View>

          
           <Text style={{color:"black",fontWeight:"600",marginLeft:30,marginTop:16,marginBottom:16}}>Select who decide :</Text>
           

           <View style={{justifyContent:"center",alignItems:"center"}}>
          <View style={styles.cardStyle}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/mother.png')}/>
          </View>
          <View style={{marginRight:50}}>
          <Text style={{color:"black",fontWeight:"100",paddingRight:50}}>They picked their clothing based on style they want</Text>
          </View>
          </View> 

          <View style={styles.cardStyle}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/kids.png')}/>
          </View>
          <View>
          <View style={{marginRight:50}}>
          <Text style={{color:"black",fontWeight:"100",paddingRight:50}}>I picked their clothing based on style they want.</Text>
          </View>
          </View>
          </View>
          </View>

             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/1.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:"#84432d"}} onPress={()=> Actions.childSizeInformation()}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             
             <TouchableWithoutFeedback onPress={this.goBack}>
             <View>
             <Text style={{textAlign:"center"}}>Home</Text></View>
             </TouchableWithoutFeedback>
           </ScrollView>
            </View>
    
         
        );
    }

}



const styles = StyleSheet.create({

   imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  viewStyle: {
    backgroundColor: '#F8F8F8',
     justifyContent: 'center',
  //   alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },

  cardStyle: {
    backgroundColor: '#F8F8F8',
    // justifyContent: 'center',
    alignItems: 'center',

   
    flexDirection: "row",
    paddingTop:20,
    paddingBottom:20,
    width:"85%",
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  
  }
  });