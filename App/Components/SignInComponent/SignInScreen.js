import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
    TextInput,
    ScrollView,
    AsyncStorage,
    ImageEditor,
} from 'react-native';
import Modal from 'react-native-modal';
import {
    userLogin,
    forgotPassword
} from "../../../Action/ActionCreators";

import {
    loginUserNameChanged,
    loginPasswordChanged,
    forgotEmailChanged,
    clearForgotResponse,
    showLoading,
    resetState,
    clearResponse
} from "./SignInAction";

import { Actions } from 'react-native-router-flux';
import CommonStyles from '../../../CommonStyle/CommonStyle';
import Colors from '../../../Constants/Colors';
import Strings from '../../../Constants/Strings';
import ImagePath from '../../../Constants/ImagesPath';
import SignInStyle from './SignInScreenStyle';
import MaterialTextInput from 'react-native-material-textinput';
import { View,Container, Header, Content, Tab, Tabs  } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { validateEmail } from '../../../Constants/CommonFunctions';
import * as Progress from 'react-native-progress';
import Api from "../../../WooCommerce/Api";
var postData = {};
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import SignInScreenStyle from './SignInScreenStyle';


class SignInScreen extends Component {

    constructor() {
        super();
        this.state = {
            isKeepSignedIn: false,
            isPasswordVisible: true,
            errorMsg: '',
            errorOnTextField: '',
            signIn:true,
            user: null,
            isModalVisible: false

        };
    }

    // _toggleModal = () =>
    // this.setState({ isModalVisible: !this.state.isModalVisible });

    // _passwordVisibility = () =>
    // this.setState({ isPasswordVisible: !this.state.isPasswordVisible });

    componentDidMount(){
      
       
    }

    componentDidUpdate() {
        this.onLoginSuccess();
     
      
    }

 
    onLoginSuccess() {

        if (this.props.signInReducer.loginRes != '') {

            if (this.props.signInReducer.loginRes.success) {

                if (this.props.signInReducer.loginRes.data.token != '') {

                     console.log('userinfo : ' + JSON.stringify(this.props.signInReducer.loginRes));
                    AsyncStorage.setItem("LaundryCustomerInfo", JSON.stringify(this.props.signInReducer.loginRes));
                   // AsyncStorage.setItem("userid", this.props.signInReducer.loginRes.data.user.id);
                   // AsyncStorage.setItem("KeepSignedIn", this.state.isKeepSignedIn + '');
                   Actions.dashboardScreen({type:'reset'});
                  //  this.props.resetState();

                }

            }
            else {
                
         alert(this.props.signInReducer.loginRes.error);
                 this.props.clearResponse();   
            }
        }
        
    }

    // onForgotPassResponse(){
        
       
    //     if(this.props.signInReducer.forgotPassRes!=''){
    //         if(this.props.signInReducer.forgotPassRes.success){
    //             Alert.alert(
    //                 Strings.APP_NAME,
    //                 this.props.signInReducer.forgotPassRes.data.message,
    //                 [
    //                     { text: Strings.OK, onPress: () => console.log("OK") },
                    
    //                 ],
    //                 { cancelable: false }
    //             )
    //             this.props.clearForgotResponse();   
    //         }
            
           
           
    //     }
    // }

    

    // async _setupGoogleSignin() {
    //     try {
    //       await GoogleSignin.hasPlayServices({ autoResolve: true });
    //       await GoogleSignin.configure({
    //         iosClientId: '38136900378-qubhecb9h6fpfdvp97ubn1evh65sa7av.apps.googleusercontent.com',
    //         webClientId: '38136900378-qubhecb9h6fpfdvp97ubn1evh65sa7av.apps.googleusercontent.com',
    //         offlineAccess: false
    //       });
    
    //       const user = await GoogleSignin.currentUserAsync();
    //       console.log(user);
    //       this.setState({user});
    //     }
    //     catch(err) {
    //       console.log("Google signin error", err.code, err.message);
    //     }
    // }

    

    

   

  signIn(){
  //  Actions.dashboardScreen({type:'reset'});
    if (this.props.signInReducer.userName.trim() == '') {

        this.setState({ errorMsg: Strings.ERROR_EMPTY_EMAIL });
        // this.setState({ errorOnTextField: 0 });
    }
    
    else if (this.props.signInReducer.password.trim() == '') {

        this.setState({ errorMsg: Strings.ERROR_EMPTY_PASSWORD });
        // this.setState({ errorOnTextField: 0 });
    } else {

        postData = {
            username: this.props.signInReducer.userName,
            password: this.props.signInReducer.password,
        };
        this.props.showLoading();
        this.props.userLogin(postData);
    }
  }


  signInWithFacebook(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login cancelled');
          } else {
              Actions.dashboardScreen({type:'reset'});
            alert('Login success with permissions: '
              +result.grantedPermissions.toString());
          }
        },
        function(error) {
          alert('Login fail with error: ' + error);
        }
      );
}

// signInWithGooglePlus(){
//     GoogleSignin.signIn()
//     .then((user) => {
//       console.log(user);
//       this.setState({user: user});
//       console.log(user);
//     })
//     .catch((err) => {
//       console.log('WRONG SIGNIN', err);
//     })
// .done();
// }

onUserNameChange(text) {

    this.props.loginUserNameChanged(text);
    this.setState({ errorMsg: '' });
    this.setState({ errorOnTextField: '' });
}

onPasswordChange(text) {

    this.props.loginPasswordChanged(text);
    this.setState({ errorMsg: '' });
    this.setState({ errorOnTextField: '' });
}

onForgotEmailChanged(text) {

    this.props.forgotEmailChanged(text);
    this.setState({ errorMsg: '' });
    this.setState({ errorOnTextField: '' });
}


// forgotPasswordDialog(){
//     postData = {
//         email: this.props.signInReducer.userEmail,
//     };
//     this.props.showLoading();
//     this.props.forgotPassword(postData);
//     this.setState({isModalVisible:false})
    
// }


    

    

    
    render() {
        return (
            <View style={SignInStyle.signInContainer}>
            <View>
            {
                            this.state.errorMsg != '' && this.state.errorOnTextField == 0 ? <Text style={CommonStyles.errorText}>{this.state.errorMsg}</Text> : null
            }
             <View style={styles.searchSection}>
                <Icon name="user" size={20} color={Colors.THEME_COLOR}/>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    underlineColorAndroid='transparent'
                    returnKeyType='next'
                    placeholder={Strings.EMAIL_ADDRESS}
                    onChangeText={this.onUserNameChange.bind(this)}
                    value={this.props.signInReducer.userName}
                    onSubmitEditing={(event)=>{this.refs.password.focus()}}
                  />
                </View>
                
                <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="key" size={20} color={Colors.THEME_COLOR}/>
                <TextInput
                    ref='password'
                    style={styles.input}
                    placeholder={Strings.PASSWORD}
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                    secureTextEntry={this.state.isPasswordVisible ? true : false}
                    onChangeText={this.onPasswordChange.bind(this)}
                    onSubmitEditing={(event) => this.signIn(event)}
                    value={this.props.signInReducer.password}
                  />
                  <TouchableOpacity onPress={() => this._passwordVisibility()} >
                  {this.state.isPasswordVisible ?  <Icon name="eye" size={20} color={Colors.THEME_COLOR}/> : <Icon name="eye-slash" size={20} color={Colors.THEME_COLOR}/>}
                 
                   </TouchableOpacity>
                </View>
               
                        
            </View>
            <TouchableOpacity onPress={() => this._toggleModal()} style={SignInStyle.forgotPasswordContainer}>
            <Text style={SignInStyle.forgotTextStyle}>{Strings.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.isModalVisible}>
            <View style={{backgroundColor:'white',height:200,elevation:10 ,alignItems:'center'}}>
            <Text style={{alignSelf:'center',marginTop:20,fontSize:20}}>{Strings.FORGOT_PASSWORD}</Text>
            <View style={[styles.searchSection,{marginTop:40,marginLeft:40}]}>
                <Icon name="user" size={20} color={Colors.THEME_COLOR}/>
                <TextInput
                    style={[styles.input,{marginLeft:20}]}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    underlineColorAndroid='transparent'
                    returnKeyType='done'
                    placeholder={Strings.EMAIL_ADDRESS}
                    onChangeText={this.onForgotEmailChanged.bind(this)}
                    value={this.props.signInReducer.userEmail}
                    
                  />
                </View>
                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
                <TouchableOpacity style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={this.forgotPasswordDialog.bind(this)}>
                 <Text style={{color:Colors.DARK_BLUE,fontWeight:'500'}}>{Strings.OK}</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={this._toggleModal}>
                 <Text style={{color:Colors.DARK_BLUE,fontWeight:'500'}}>{Strings.CANCEL}</Text>
                </TouchableOpacity>
                </View>
            
          </View>
        </Modal>
            <View style={SignInStyle.buttonContainer}>
            <TouchableOpacity onPress={() => this.signIn()} style={SignInStyle.buttonStyle}>
                    <Text style={SignInStyle.textStyle}>{Strings.SIGNIN}</Text>
                </TouchableOpacity>
            <TouchableOpacity onPress={() => this.signInWithFacebook()} style={SignInStyle.facebookbuttonStyle}>
                    <Icon size={15} color='white' name="facebook" style={SignInStyle.iconStyle}/>
                    <Text style={SignInStyle.textStyle}>{Strings.SIGNIN_WITH_FACEBOOK}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.signInWithGooglePlus()} style={SignInStyle.googlebuttonStyle}>
                    <Icon size={15} color='white' name="google" style={SignInStyle.iconStyle} />
                    <Text style={SignInStyle.textStyle}>{Strings.SIGNIN_WITH_GOOGLE}</Text>
            </TouchableOpacity>
             
          
            </View>
            {
                    this.props.signInReducer.isScreenLoading ?
        
                        <View style={CommonStyles.circles}>
                            <Progress.CircleSnail color={[Colors.DARK_BLUE, Colors.DARK_BLUE, Colors.DARK_BLUE]} />
                        </View>
                        : null
                    //
            }
            </View>
        );      
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
      },

      imageContainer: {
         flex:0.5,
        alignItems: 'center',
        justifyContent:'center',
      },

      image:{
        height:50,
        width:50,
      },
      headerContainer:{
        flex: 1,
        flexDirection: 'row',
      },
      searchSection:{
          flexDirection: 'row',
          alignItems:'center',
          margin: Platform.OS  === "ios" ? 15 : 5,
      },
      input:{
          flex:1,
          width: null,
          marginLeft:20,
          fontSize:15
          
      },
      inputBox:{
        flex:1,
        width: null,
        margin:10,
        fontSize:20
      }
});

function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        signInReducer: state.signInReducer
    }
}


export default connect(
    mapStateToProps,
    {
        userLogin,
        forgotPassword,
        loginUserNameChanged,
        loginPasswordChanged,
        forgotEmailChanged,
        clearForgotResponse,
        showLoading,
        resetState,
        clearResponse
    }

)(SignInScreen)



