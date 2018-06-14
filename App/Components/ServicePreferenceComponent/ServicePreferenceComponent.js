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
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import {
    clearResponse
} from "./ServicePrefAction";
import {
    sendServicePreference,
} from "../../Action/ActionCreators";
import {Button, Col } from 'native-base';

import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
import Header from '../Common/Header';
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import ServiceStyle from './ServicePrefStyle';
// import AppIntro from "../AppIntro/AppIntro"
import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');

 class ServicePreferences extends Component {

    constructor() {
        super();
        this.state = {
         userInfo:{},
         isSpinnerVisible:false,
         selectedoption:"",
         onPressedCon: false,
         onPressedstyle: false,
         onPressedgift:false,
         userData:{}
        };
    }

componentWillMount() {
    this.getUserData();
    
 }

 componentDidUpdate(){
    console.log("Response>>>>"+JSON.stringify(this.props.servivePreferenceReducer.serviceprefRes));
    if(this.props.servivePreferenceReducer.serviceprefRes!=''){
        this.setState({isSpinnerVisible:false})
        if(this.props.servivePreferenceReducer.serviceprefRes.status==="success"){
                this.setState({userData:this.props.servivePreferenceReducer.serviceprefRes.data})
                AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.servivePreferenceReducer.serviceprefRes.data));
               // Actions.pregnancyselection({type:'reset'})
            

            //  Actions.billingContactInformation({type:'reset'})

            // Actions.billingPaymentInformation({type:'reset'})
             Actions.stylecomponent({type:'reset'})

           
        }
        else{
            alert(this.props.contactreducer.serviceprefRes.message);
        }

        this.props.clearResponse();
        
    }
 }


 getUserData(){
    AsyncStorage.getItem("UserInfo").then((value) => {
        console.log(value);

      if (value) {
          var userData = JSON.parse(value);
          this.setState({userInfo:userData});
          this.selectOption(userData.service_pre)
      }
  }).done();

}

    goBack(){
    Actions.contact();
 }

 selectOption(option){
     switch(option){
         case Strings.CONVINENCE:
         this.setState({
            onPressedCon: true, onPressedstyle: false,    onPressedgift: false
         });
         break;
         case Strings.STYLE:
         this.setState({
            onPressedCon: false, onPressedstyle: true,    onPressedgift: false
         });
         break;
         case Strings.GIFT:
         this.setState({
            onPressedCon: false, onPressedstyle: false,    onPressedgift: true
         });
         break;

     }
   
    this.setState({selectedoption:option})
    
    
 }

 goToIntroScreen(){
    Actions.appIntro({type:'reset'})
 }

 sendPreference(){
   if(this.state.selectedoption===''){
        alert("Please select one option");
    }
    else{
        postData ={
            _id:this.state.userInfo._id,
            service_pre:this.state.selectedoption,
            savedScreen:"2a"
    
         }
         console.log("Postdata>>"+JSON.stringify(postData));
         this.setState({isSpinnerVisible:true})
         this.props.sendServicePreference(postData);
    }
   
   
 }

  render() {
    
        return (
            <View style={{flex:1,backgroundColor:Colors.BACKGROUND_COLOR_GENERAL}}>

           <Header headerText={Strings.SERVICE_PREFERENCE} screenCount="02" />
           <ScrollView style={{flex:1}}>

           <Text style={ServiceStyle.titleStyle}>{Strings.WHAT_KIND_OF_SERVICE}</Text>
          

           <View style={ServiceStyle.logoStyle}>
           <Image source={require('../../Assets/service.png')}/>
           </View>

          
           <Text style={ServiceStyle.subtitle}>{Strings.SELECT_SERVICE}</Text>
           

           <View style={{justifyContent:"center",alignItems:"center"}}>
           <TouchableHighlight onPress={()=>this.selectOption(Strings.CONVINENCE)} style={[styles.cardStyle,this.state.onPressedCon?{backgroundColor:Colors.BACKGROUND_COLOR}:null]} underlayColor={Colors.BACKGROUND_COLOR}>
          <View  style={{flexDirection:'row'}}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/convinience.png')}/>
          </View>
          <Text style={ServiceStyle.itemStyle}>{Strings.CONVINENCE}</Text>
          </View> 
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.selectOption(Strings.STYLE)} style={[styles.cardStyle,this.state.onPressedstyle?{backgroundColor:Colors.BACKGROUND_COLOR}:null]} underlayColor={Colors.BACKGROUND_COLOR}>
          <View style={{flexDirection:'row'}}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/style.png')}/>
          </View>
          <Text style={ServiceStyle.itemStyle}>{Strings.STYLE}</Text>
          </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>this.selectOption(Strings.GIFT)} style={[styles.cardStyle,this.state.onPressedgift?{backgroundColor:Colors.BACKGROUND_COLOR}:null]} underlayColor={Colors.BACKGROUND_COLOR}>
        <View style={{flexDirection:'row'}}>
        <View style={{paddingLeft:30,paddingRight:30}}>
        <Image source={require('../../Assets/giftable.png')}/>
        </View>
        <View>
         <Text style={ServiceStyle.itemStyle}>{Strings.GIFT}</Text></View>
        </View>
        </TouchableHighlight>
        </View>

             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>{this.sendPreference()}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             
             <TouchableWithoutFeedback onPress={() => this.goBack()}>
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
    // position: 'relative'
  }
  });

  function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        servivePreferenceReducer: state.servivePreferenceReducer
    }
}


export default connect(
    mapStateToProps,
    {
    sendServicePreference,
    clearResponse
    }

)(ServicePreferences)