import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    BackHandler
} from 'react-native';
import Header from "../Common/Header"
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import {Button } from 'native-base';
const { width, height } = Dimensions.get('window');
import Colors from  "../../Constants/Colors";
import STRINGS from '../../Constants/Strings';
import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');

var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');

import {
  // showLoading,
  // resetState,
  clearResponse
} from "./PreganancyDueDateAction";

import {
  pregnancyDOBSignUp,
} from "../../Action/ActionCreators";


 var today ;
 var oneYearAfterDate;

 var tenYearAfterDate;
 class PregnancyDueDateComponent extends Component {
 constructor() {
        super();
        this.state = {
             date:"",
             todayDate:"",
             preg_date:"",
             expected_box_date:"",
             isSpinnerVisible:false,
             pregnancySignupdata:{},
             userData:{},
             userInfo:{},
             oneYearAfterDate:"",
             tenYearAfterDate:""


        };
    }

  componentWillMount() {
      today = new Date();

     
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      
      if(dd<10) {
          dd = '0'+dd
      } 
      
      if(mm<10) {
          mm = '0'+mm
      }
      
      today =  yyyy+ '-' + mm + '-' + dd ;
      oneYearAfterDate= yyyy+1+"-"+ mm +"-" + dd;

      tenYearAfterDate=yyyy+10+"-"+mm+"-"+dd;
      
     this.setState({todayDate:today,oneYearAfterDate:oneYearAfterDate,tenYearAfterDate:tenYearAfterDate})
    // alert(oneYearAfterDate)
     this.getUserData();
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
      
    Actions.pregnancyselection({type:"reset"})
    }


  componentDidUpdate(){
    console.log("Response>>>>"+JSON.stringify(this.props.pregnancyreducer.pregnancyDuedateRes));
     if(this.props.pregnancyreducer.pregnancyDuedateRes!=''){
       this.setState({isSpinnerVisible:false})
       if(this.props.pregnancyreducer.pregnancyDuedateRes.status==="success"){
               this.setState({pregnancySignupdata:this.props.pregnancyreducer.pregnancyDuedateRes.data})
               console.log(this.state.pregnancySignupdata)
              //  AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.contactreducer.signupRes.data));
                Actions.kidsselection({type:'reset'})
       }else{
           alert(this.props.pregnancyreducer.pregnancyDuedateRes.message);
       }
        this.props.clearResponse();
   }
   
}

goToIntroScreen(){
  Actions.appIntro({type:'reset'})
}

submit(){
  var ageFromString = new AgeFromDateString(this.state.preg_date).age;

  if(ageFromString>1){ 
  alert("Enter the correct pregnancy date")
  }
  else if (this.state.preg_date=="") {alert("Enter Due Date")}

  else if(this.state.expected_box_date==""){alert("Enter Expected Date")} 
   

  else {

  postData = {
          _id:this.state.userInfo._id,
          preg_date: this.state.preg_date,
          expected_box_date:this.state.expected_box_date,
           savedScreen:"PREGNANCYDUEDATE"
      };
   
        this.setState({isSpinnerVisible:true})
        this.props.pregnancyDOBSignUp(postData);
 }
  
}
   
    render() {
      return (
       <View style ={{flex:1}}> 
       <Header headerText={"SERVICE PREFERENCES"}/>
       <Text style={{textAlign:"center",color:'black',fontWeight:"600",marginTop:40,marginBottom:20,fontSize:18}}>{STRINGS.WHEN_YOUR_DUE_DATE} </Text>
        
       <View style={{justifyContent:"center",alignItems:"center",marginTop:20,marginBottom:50}}>
       <DatePicker
        style={{width: 200}}
        date={this.state.preg_date}
        mode="date"
        placeholder="Select delivery date"
        format="YYYY-MM-DD"
        minDate={this.state.todayDate}
        maxDate={this.state.oneYearAfterDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          // dateIcon: {
          //   position: 'absolute',
          //   left: 0,
          //   top: 4,
          //   marginLeft: 0
          // }
          
          dateInput: {
            marginLeft: 0
          }
        }}
        onDateChange={(preg_date) => {this.setState({preg_date})}}
      />
      </View>
      <Text style={{textAlign:"center",color:'black',fontWeight:"600",marginTop:40,marginBottom:20,fontSize:18,marginLeft:20,marginRight:20}}>{STRINGS.WHEN_YOU_EXPECT_FIRST_BOX}</Text>

       <View style={{justifyContent:"center",alignItems:"center",marginTop:20,marginBottom:50}}>
       <DatePicker
        style={{width: 200}}
        date={this.state.expected_box_date}
        mode="date"
        placeholder="Select delivery date"
        format="YYYY-MM-DD"
        minDate={this.state.todayDate}
        maxDate={this.state.tenYearAfterDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          // dateIcon: {
          //   position: 'absolute',
          //   left: 0,
          //   top: 4,
          //   marginLeft: 0
          // }
          
          dateInput: {
            marginLeft: 0
          }
        }}
        onDateChange={(expected_box_date) => {this.setState({expected_box_date})}}
      />
      </View>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:40}}>
             <Button rounded  style={{width:width/1.6,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>{this.submit()}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             
             <TouchableWithoutFeedback onPress={() => this.goBack()}>
             <View>
             <Text style={{textAlign:"center"}}>Previous</Text></View>
             </TouchableWithoutFeedback>
         

             <TouchableWithoutFeedback onPress={() => this.goToIntroScreen()}>
             <View>
             <Text style={{textAlign:"center",marginTop:10}}>{STRINGS.CAN_DO_THIS_LATER_NEW}</Text></View>
             </TouchableWithoutFeedback>
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
    pregnancyreducer:state.pregnancyDueDateReducer
      // contactreducer: state.Pregnan
  }
}



export default connect(
  mapStateToProps,
  {
   pregnancyDOBSignUp,
  //  showLoading,
  //  resetState,
   clearResponse
  }

)(PregnancyDueDateComponent)


