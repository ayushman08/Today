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
} from 'react-native';

import {
    firstNameChanged,
    lastNameChanged,
    passwordChanged,
    emailChanged,
    showLoading,
    resetState,
    clearResponse
} from "./ContactAction";

import {
    userSignup,
} from "../../Action/ActionCreators";
import {Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from "../Common/Header"
import MaterialTextInput from 'react-native-material-textinput';
const { width, height } = Dimensions.get('window');
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import Spinner from 'react-native-spinkit';
{/* <script crossorigin src="https://js.braintreegateway.com/web/dropin/1.11.0/js/dropin.min.js"></script> */}

const window = Dimensions.get('window');





const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

 const validateFirst = (firstname) => {
    var re = /^[a-zA-Z ]*$/;
    return re.test(firstname);
  };



class ContactComponent extends Component {
     constructor() {
        super();
        this.state = {
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            signUpData:{},
            isFirstName:true,
            isLastName:true,
            isEmail:true,
            isSpinnerVisible:false,
            emailValidated: false,
            isPassword:true
     };
    }

   
   componentWillMount(){

     }
    
   
    onFirstNameChanged(text) { 
         this.props.firstNameChanged(text);
         this.setState({ isFirstName: true });
        // this.setState({ errorOnTextField: '' });
    }

    onLastNameChanged(text){
        this.setState({ isLastName: true });
        this.props.lastNameChanged(text);
        
    }

    onEmailChanged(text){
        this.setState({ isEmail: true });
        this.props.emailChanged(text);
    }


    onPasswordChanged(text){
        this.setState({ isPassword: true });
        this.props.passwordChanged(text);
    }


  componentDidUpdate(){
         console.log("Response>>>>"+JSON.stringify(this.props.contactreducer.signupRes));
          if(this.props.contactreducer.signupRes!=''){
            this.setState({isSpinnerVisible:false})
            if(this.props.contactreducer.signupRes.status==="success"){
                    this.setState({signUpData:this.props.contactreducer.signupRes.data})
                   
                    AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.contactreducer.signupRes.data));
                    AsyncStorage.setItem("EmailInfo", JSON.stringify(this.props.contactreducer.email));
                   
                    Actions.servicePreferences({type:"reset"})
            }else{
                alert(this.props.contactreducer.signupRes.message);
            }
             this.props.clearResponse();
        }
        
    }
   
    
    submit(){
        if (this.props.contactreducer.first_name.trim() == '') {
            this.setState({ isFirstName: false });
            // this.setState({ errorMsg: Strings.ERROR_EMPTY_EMAIL });
            // this.setState({ errorOnTextField: 0 });
         }

         else if(this.props.contactreducer.first_name.length<3){
          alert("Please enter correct name ")
         }

    

         else if (this.props.contactreducer.last_name.trim() == '') {
            this.setState({ isLastName: false });
            // this.setState({ errorMsg: Strings.ERROR_EMPTY_PASSWORD });
            // this.setState({ errorOnTextField: 0 });
        } 
        else if(this.props.contactreducer.last_name.length<3){
            alert("Please enter correct last name ")
            }
        
        else if (this.props.contactreducer.email.trim() == '') {
            this.setState({ isEmail: false });
            // this.setState({ errorMsg: Strings.ERROR_EMPTY_PASSWORD });
            // this.setState({ errorOnTextField: 0 });
        } 
         else if (this.props.contactreducer.password.trim() == '') {
            this.setState({ isPassword: false });
         }

        else if (!validateFirst(this.props.contactreducer.first_name)) {
            alert("Enter Correct FirstName")
         }
         else if (!validateFirst(this.props.contactreducer.last_name)) {
            alert("Enter Correct Last Name")
         }
         else if (!validateEmail(this.props.contactreducer.email)) {
            alert("Enter Correct Email")
         }

 

        
     
       else {
       postData = {
                first_name: this.props.contactreducer.first_name,
                last_name: this.props.contactreducer.last_name,
                email:this.props.contactreducer.email,
                password:this.props.contactreducer.password,
                savedScreen:"1"
            };
         
            this.setState({isSpinnerVisible:true})
            this.props.userSignup(postData);
        }
        
    }
    
    goBack(){

    Actions.appIntro({type:'reset'})
    }
   
    render() {
  
                    
        return (
         <View style={{flex:1}}>
        

          <View style={styles.viewStyle}>
          <Text style={{fontSize: 18,marginRight:10}}>01</Text>
          
          <Text style={{fontSize: 18,textAlign:'center'}}>CONTACT INFORMATION</Text>
          </View>
          <ScrollView style={{flex:1,backgroundColor:Colors.BACKGROUND_COLOR_GENERAL}}>
          <Text style={{textAlign:"center",color:'black',fontWeight:"600",marginTop:40,marginBottom:20,fontSize:18}}>{Strings.WHATS_YOUR_NAME}</Text>
          <View style={{justifyContent:"center",alignItems:"center",margin:20}}>
          <Image source={require('../../Assets/email.png')}/>
          </View>

          <View style={{flexDirection:"row",flex:1}}>
          <View style={{flex:1,margin:10,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

         <View style={{flex:1,marginLeft:10}}>

         <MaterialTextInput
                            label={Strings.FIRST_NAME}
                            labelColor={Colors.LABEL_TEXT_COLOR}
                            activeColor={Colors.LABEL_TEXT_COLOR}
                            color={Colors.TEXT_COLOR}   
                            // fontSize={15}
                            
                            labelActiveTop={-30}
                            underlineColor={Colors.TEXT_COLOR}
                            underlineActiveColor={Colors.TEXT_COLOR}
                            underlineHeight={0.7}
                            underlineActiveHeight={0.7}
                            autoCapitalize='none'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onChangeText={this.onFirstNameChanged.bind(this)}
                            value={this.props.contactreducer.first_name.toUpperCase()}
                           
                           
                        />

            </View>
            {
            (!this.state.isFirstName) ?  <View style={{flex:0.1}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.1}}/>
            }
           
                    
            </View>

             <View style={{flex:1,margin:10,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             <View style={{flex:1}}>
             <MaterialTextInput
                
                            label={Strings.LAST_NAME}
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
                            onChangeText={this.onLastNameChanged.bind(this)}
                            value={this.props.contactreducer.last_name.toUpperCase()}
                           // onSubmitEditing={(event)=>{this.refs.email.focus()}}
                           
                           
                        />
            </View>
            {

            (!this.state.isLastName) ?  <View style={{flex:0.1}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.1}}/>
            }
           
            </View>

            </View>

           <View style={{flex:1,margin:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <View style={{flex:0.9}}>
            <MaterialTextInput
                            ref='email'
                            label={Strings.EMAIL}
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
                            keyboardType='email-address'
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onChangeText={this.onEmailChanged.bind(this)}
                            value={this.props.contactreducer.email.toUpperCase()}
                           
                        />
            </View>
            {
            (!this.state.isEmail) ?  <View style={{flex:0.1}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.1}}/>
            }
            </View>

             
             <View style={{flex:1,margin:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <View style={{flex:0.9}}>
            <MaterialTextInput
                            label={Strings.PASSWORD}
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
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onChangeText={this.onPasswordChanged.bind(this)}
                            value={this.props.contactreducer.password}
                        />
            </View>
            {
            (!this.state.isPassword) ?  <View style={{flex:0.1}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.1}}/>
            }
            </View>

            
            
         
            
             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR,padding:0}} onPress={()=>{this.submit()}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"800", fontSize: 16,fontFamily:"Roboto"}}>{Strings.NEXT}</Text>
             </Button>
             </View>
             
             <TouchableWithoutFeedback onPress={() => this.goBack()}>
             <View>
             <Text style={{textAlign:"center"}}>{Strings.HOME}</Text></View>
             </TouchableWithoutFeedback>

             
             
             <Spinner
             isVisible={this.state.isSpinnerVisible}
             style={{position:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
            </ScrollView>
         
         </View>  

         
        );
    }

}


const styles = {
    viewStyle: {
      backgroundColor: 'white',
      justifyContent:"center",
      //   alignItems: 'center',
      height: 60,
      paddingTop:30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      elevation: 5,
      flexDirection:'row'

    }
  
  };

  function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        contactreducer: state.contactReducer
    }
}


export default connect(
    mapStateToProps,
    {
    userSignup,
    firstNameChanged,
    lastNameChanged,
    passwordChanged,
    emailChanged,
    showLoading,
    resetState,
    clearResponse
    }

)(ContactComponent)