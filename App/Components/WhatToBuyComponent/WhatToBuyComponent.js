import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import {
    clearResponse
} from "./WhatToBuyAction";
import {
    selectWhoWillDecide,
} from "../../Action/ActionCreators";

import { Actions } from 'react-native-router-flux';
import Header from '../../Components/Common/Header';
const { width, height } = Dimensions.get('window');
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');
// import AppIntro from "../AppIntro/AppIntro"

 class WhatToBuyComponent extends Component {
  constructor() {
        super();
        this.state = {
            isSpinnerVisible:false,
            cloth_selector:'',
            onPressedParent:false,
            onPressedChild:false
         
        };
    }

componentWillMount() {
    this.getUserData()
 }

 getUserData(){
    AsyncStorage.getItem("UserInfo").then((value) => {
        console.log(value);

      if (value) {
          var userData = JSON.parse(value);
          this.setState({userInfo:userData});
      }
  }).done();

}
 goBack(){
     Actions.kidsselection({type:'reset'})
 }

 sendWhoWillDecide(){
     if(this.state.cloth_selector===''){
         alert("Please select one option");
     }else{
        postData ={
            _id:this.state.userInfo._id,
            cloth_selector:this.state.cloth_selector,
            savedScreen:"4a"
    
         }
       
         this.setState({isSpinnerVisible:true})
         this.props.selectWhoWillDecide(postData);
     }
   
}

componentDidUpdate(){
    if(this.props.whatToBuyReducer.whatToBuyRes!=''){
        this.setState({isSpinnerVisible:false})
        if(this.props.whatToBuyReducer.whatToBuyRes.status === 'success'){
            Actions.childDobInformation({type:'reset'})
        }
        this.props.clearResponse();
    }
}

 selectTheOption(option){
     if(option==='parent'){
         this.setState({onPressedParent:true,onPressedChild:false})
     }
     if(option==='kid'){
        this.setState({onPressedParent:false,onPressedChild:true})
    }

     this.setState({cloth_selector:option})

 }

 goToIntroScreen(){
    Actions.appIntro({type:'reset'})
 }

  render() {
        return (
            <View style={{flex:1}}>
            <Header headerText={Strings.SERVICE_PREFERENCE} screenCount="02" />
           <ScrollView style={{flex:1}}>

           <Text style={{textAlign:"center",color:"black",fontWeight:"600",marginTop:50,marginBottom:20,fontFamily:'Roboto',fontSize:18}}>WHO IS DECIDING WHAT TO BUY ?</Text>
          

           <View style={{justifyContent:"center",alignItems:"center",margin:20}}>
           <Image source={require('../../Assets/Buy.png')}/>
           </View>

          
           <Text style={{color:"black",fontFamily:'Roboto',fontSize:18,marginLeft:30,marginTop:16,marginBottom:16}}>Select who decide :</Text>
           

           <View style={{justifyContent:"center",alignItems:"center"}}>
        
           <TouchableWithoutFeedback onPress={() => this.selectTheOption('parent')}>
          <View style={[styles.cardStyle,this.state.onPressedParent?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/clothing.png')}/>
          </View>
          <View>
          <View style={{marginRight:50}}>
          <Text style={{color:"black",fontWeight:"100",paddingRight:50}}>I picked their clothing based on style they want.</Text>
          </View>
          </View>
          </View>
          </TouchableWithoutFeedback>

         <TouchableWithoutFeedback onPress={() => this.selectTheOption('kid')}>
         <View style={[styles.cardStyle,this.state.onPressedChild?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/mother.png')}/>
          </View>
          <View style={{marginRight:50}}>
          <Text style={{color:"black",fontWeight:"100",paddingRight:50}}>They picked their clothing based on style they want</Text>
          </View>
          </View> 
          </TouchableWithoutFeedback>

          </View>

             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>this.sendWhoWillDecide()}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             
             <TouchableWithoutFeedback onPress={this.goBack}>
             <View>
             <Text style={{textAlign:"center"}}>{Strings.CAN_DO_THIS_LATER}</Text></View>
             </TouchableWithoutFeedback>

             <TouchableWithoutFeedback onPress={() => this.goToIntroScreen()}>
             <View>
             <Text style={{textAlign:"center",marginTop:10}}>{Strings.CAN_DO_THIS_LATER_NEW}</Text></View>
             </TouchableWithoutFeedback>
           </ScrollView>
           <Spinner
            isVisible={this.state.isSpinnerVisible}
            style={{position:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
            </View>
    
         
        );
    }

}

function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        whatToBuyReducer: state.whatToBuyReducer
    }
}


export default connect(
    mapStateToProps,
    {
    selectWhoWillDecide,
    clearResponse
    }

)(WhatToBuyComponent)

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