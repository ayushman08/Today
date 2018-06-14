import React, { Component } from 'react';
import { connect } from 'react-redux';
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
}  from 'react-native';
import {Button } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
import Header from "../Common/Header"
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import MaterialTextInput from 'react-native-material-textinput';
import Spinner from 'react-native-spinkit';


import {
  childNameChanged,
  // showLoading,
  resetState,
  clearResponse
 } from "./ChildInfoAction";

import {
  userDOBSignUp,
} from "../../Action/ActionCreators";
import STRINGS from '../../Constants/Strings';
import COLORS from '../../Constants/Colors';

var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');


const validate = (childname) => {
  var re = /^[a-zA-Z ]*$/;
  return re.test(childname);
};
var today;
var sevenYearBeforeDate;
var sevenYearBeforeDate2;

class  ChildInformationDob  extends Component {
constructor() {
        super();
        this.state = {
          userInfo:{},
            date:"",
            age:"",
            todayDate:"",
            pickedDate:"",
            childname:"",
            isChildName:true,
            genderSelected:"",
            isSpinnerVisible:false,
            sevenYearBeforeDate:"",
            isBoy:false,
            isGirl:false,
            kidsDataRecieved:[],
            title:Strings.ENTER_CHILD_NAME
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
    sevenYearBeforeDate= yyyy-7+""
    sevenYearBeforeDate2=sevenYearBeforeDate+"-"+mm+"-"+dd;

    this.setState({todayDate:today,sevenYearBeforeDate:sevenYearBeforeDate2})
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


  onChildNameChanged(text) { 
  this.props.childNameChanged(text);
  this.setState({ isChildName: true });
   // this.setState({ errorOnTextField: '' });
  }

  componentWillReceiveProps(newProps){
   
  if("childData" in newProps ){
    this.setState({kidsDataRecieved:newProps.childData.kids})
    this.setState({title:Strings.ENTER_OTHER_CHILD_INFO})
   }
   else{
    console.log("Key not found")
  }
   
 }

 goBack(){
   Actions.whattobuy({type:'reset'})
 }


  componentDidUpdate(){
     console.log("Response>>>>"+JSON.stringify(this.props.childInfoReducer.childInfoRes));
     if(this.props.childInfoReducer.childInfoRes!=''){
         this.setState({isSpinnerVisible:false})
         if(this.props.childInfoReducer.childInfoRes.status==="success"){
                 this.setState({signUpData:this.props.childInfoReducer.childInfoRes.data})
               
                //  AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.contactreducer.signupRes.data));
                  Actions.sizeandproportion({type:'reset',kids:this.props.childInfoReducer.childInfoRes.data.kids})
         }
        else{
             alert(this.props.childInfoReducer.childInfoRes.message);
         }
         this.props.clearResponse();
     }
     
 }
 

 goToIntroScreen(){
  Actions.appIntro({type:'reset'})
}
 
 submit(){
   var ageFromString = new AgeFromDateString(this.state.pickedDate).age;
   if (this.props.childInfoReducer.child_name.trim() == '') {
         this.setState({ isChildName: false });
       }

   else if(!validate(this.props.childInfoReducer.child_name)){
     alert("Please enter correct name")
      }

    else if(this.state.genderSelected==""){
     alert("Please select Gender")
      }
     else if(this.state.pickedDate==""){
      alert("Please select Date of Birth")
     }
    else if(ageFromString > 6)
     { alert("Please select Correct date")}
    
     else {

       var genderSelection;
       if(this.state.isBoy==true){
        genderSelection=1
       }
      else if(this.state.isGirl==true){
        genderSelection=2
      }

      var kids=[]
      if(this.state.kidsDataRecieved.length>0 && this.state.kidsDataRecieved!=''){
        this.state.kidsDataRecieved.map((item)=>{
          kids.push(item)
        })
        
        console.log("Kids data to be posted>>>"+JSON.stringify(kids))
      }
       
    var data={
    name:this.props.childInfoReducer.child_name,
    gender:genderSelection,
    dob:this.state.pickedDate
  }
    kids.push(data)
         
      
    postData =
          {  _id:this.state.userInfo._id,
             savedScrren:"ChILDDOBINFORMATION",
             kids:kids
           
         };
        // kids.push(postData)
          this.setState({isSpinnerVisible:true})
          console.log("Kids data to be posted>>>"+JSON.stringify(postData))
           this.props.userDOBSignUp(postData);
           this.props.childInfoReducer.child_name = ""
   
        }
     {

}
 }
  
 render() {
  
    return (
         <View style={{flex:1}}>
          <Header headerText={"CHILD INFORMATION"}/>
          
            <Text style={{textAlign:"center",color:'black',fontWeight:"600",marginTop:40,marginBottom:20,fontSize:18}}>{this.state.title} </Text>:
            <View style={{flex:1}}>

            <View style={{margin:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:0.8}}>
            <MaterialTextInput
                            ref='childname'
                            label={Strings.CHILD_NAME}
                            labelColor={Colors.LABEL_TEXT_COLOR}
                            activeColor={Colors.LABEL_TEXT_COLOR}
                            color={Colors.TEXT_COLOR}
                            fontSize={15}
                            underlineColor={Colors.TEXT_COLOR}
                            underlineActiveColor={Colors.TEXT_COLOR}
                            underlineHeight={0.7}
                            underlineActiveHeight={0.7}
                            autoCapitalize='none'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onChangeText={this.onChildNameChanged.bind(this)}
                            value={this.props.childInfoReducer.child_name}
                           // onSubmitEditing={(event)=>{this.refs.email.focus()}}
                           
                           
                        />
            </View>
            {
      
        (!this.state.isChildName) ?  <View style={{flex:0.3}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.3}}/>
            }
           </View>


           <View style ={{flexDirection:"row"}}>
           <Text style={{margin:20,
            fontSize:22,margin:20}}> is a</Text>

           <TouchableWithoutFeedback onPress={()=>this.setState({isBoy:true,isGirl:false,genderSelected:true})}>
           <View style={[styles.viewStyle,this.state.isBoy?{backgroundColor:COLORS.BACKGROUND_COLOR}:null ]}>
           <Image source={require('../../Assets/Boy.png')}/>
           </View>
           </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={()=>this.setState({isBoy:false,isGirl:true,genderSelected:true})}>
          <View style={[styles.viewStyle,this.state.isGirl?{backgroundColor:COLORS.BACKGROUND_COLOR}:null]}>
          <Image source={require('../../Assets/girl.png')}/>
          </View>
         </TouchableWithoutFeedback>
          </View>

         <View style={{marginTop:20,flexDirection:"row"}}>
         <Text style={{color:"black",marginTop:30,marginLeft:20,fontSize:18}} >Date of Birth </Text>
         <Text style={{color:"grey",marginTop:30,fontSize:18}}>( DD/MM/YYYY )</Text>
         </View>

        <View style={{marginLeft:20,marginRight:20}}>
        <DatePicker
         style={{width: 100}}
        date={this.state.pickedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={this.state.sevenYearBeforeDate}
        maxDate={this.state.todayDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          }
          ,
          dateInput: {
            marginLeft: 0
          }
        }}
        onDateChange={(date) => {this.setState({pickedDate:date})}}
 />
      </View>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:40}}>
             <Button rounded  style={{width:width/1.8,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>{this.submit()}}>
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
         
             <Spinner
             isVisible={this.state.isSpinnerVisible}
             style={{flexposition:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
          </View>

          
          </View>
    
         
        );
    }

}

  function mapStateToProps(state) {
  console.log('mapStateToProps= ', JSON.stringify(state));
  return {
    childInfoReducer : state.childInfoReducer
  }
}



export default connect(
  mapStateToProps,
  {
  userDOBSignUp,
  childNameChanged,
  // showLoading,
  // resetState,
  clearResponse
  }

)(ChildInformationDob)


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
     marginLeft:20,
    padding:18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
  });