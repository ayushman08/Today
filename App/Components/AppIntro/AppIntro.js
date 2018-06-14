import React,{Component} from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
    ImageBackground,
    ScrollView,
    AsyncStorage,
    Image
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Button } from 'native-base';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
import Colors from '../../Constants/Colors';
import COLORS from '../../Constants/Colors';
import MaterialTextInput from 'react-native-material-textinput';



import Strings from '../../Constants/Strings';
import Spinner from 'react-native-spinkit';


import {
  checkSignup,
} from "../../Action/ActionCreators";

import {
  clearResponse
} from "./AppIntroAction";


const styles = StyleSheet.create({
  image: {
 
  // height: 200,
 },
 textStyle1:{
   fontWeight: "400",
   fontSize: 22,
   color:"black"
 },
 imgBackground: {
  width:width,
  height: height,
  flex: 1 
}
});
 
const slides = [
  {
    key: 'somethun',
    text1:'SIGN UP',
    textStyle1: styles.textStyle1,
    textStyle2:"",
    text:"\n\nComplete our style survey and you will receive a personal stylist",
    image: require('../../Assets/Intro1.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
  },
  {
    key: 'somethun-dos',
    text1:'TRY ON',
    textStyle1: styles.textStyle1,
    textStyle2:"",
    text: '\n\nReceive a selection of handpicked clothing for your child and take 7 days to try everything on.',
    image: require('../../Assets/Intro2.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
  },
  {
    key: 'somethun1',
    text1:'SIGN UP',
    textStyle1: styles.textStyle1,
    textStyle2:"",
    text: "\n\nLog in , Check out and leave feedback.Return the rest and that's it! ",
    image: require('../../Assets/Intro3.png'),
    imageStyle: styles.image,
    backgroundColor: 'white',
  }
];
 
class App extends Component {

  constructor(){
    super()
    Text.defaultProps.style = { fontFamily: 'Century Gothic' }
  }
   state = {
    modalVisible: false,
    password:"",
    email:"",
    passwordComponentVisible:false,
    isEmail:true,
    isPassword:true,
    emailInfo:{},
    userInfo:{},
    isLoaded:false
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
 
   _onDone = () => {

   Actions.contact();
  }


  onSkip(){

    this.setModalVisible(true);
  }

 
  componentWillMount(){
    
    this.setState({isLoaded:true})

    AsyncStorage.getItem("EmailInfo").then((value) => {
      console.log(value);

    if (value) {
        var userData = JSON.parse(value);
         this.setState({emailInfo:userData});
        // alert(userData)
  
    }
    }).done();

   AsyncStorage.getItem("UserInfo").then((value) => {
      console.log(value);

    if (value) {
        var userData = JSON.parse(value);
         this.setState({userInfo:userData});
    
  
    }
    }).done();

  this.checkUpdatedScreen()
}


 checkUpdatedScreen(){
  postdata= { 
    _id:this.state.userInfo._id,
    // email:this.state.emailInfo
    _id:"5b1f4ecfab179e31446715fe",
    email:"sdsads@gmail.com"
  }

   this.props.checkSignup(postdata)
  }


  componentDidUpdate(){
    console.log("Response>>>>"+JSON.stringify(this.props.appIntroReducer.checkprefRes));
     if(this.props.appIntroReducer.checkprefRes!=''){
       this.setState({isLoaded:false})
      //  this.setState({isSpinnerVisible:false})
       if(this.props.appIntroReducer.checkprefRes.status==="success"){
         console.log("Response+++++++++++++++ SCreen++++++"+JSON.stringify(this.props.appIntroReducer.checkprefRes.data.savedScreen))
         if(this.props.appIntroReducer.checkprefRes.data.savedScreen == "2a"){
          Actions.appIntro({type:'reset'}) }
         }
         else if(this.props.appIntroReducer.checkprefRes.data.savedScreen == "2a"){
           
         }
       
     
      else
       {
           alert(this.props.appIntroReducer.checkprefRes.message);
       }
        this.props.clearResponse();
   }
   
}




  render() {

    if(this.state.isLoaded){
    return(
      <Spinner
      isVisible={true}
      style={{position:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
  />
    ) }

    // if(this.state)


    return (

  
   // <ScrollView style={{flex:1}}>
       <View style={{flex:1}}>
       
       <AppIntroSlider
    
        slides={slides}
        onDone={this._onDone}
        showSkipButton
        onSkip={() => this.onSkip()}
        />
        <View  style={{position:"absolute",bottom:80,left:0,right:0,justifyContent:"center",alignItems:"center"}}>
         <TouchableWithoutFeedback   onPress={() => {null
               //changed
                  this.setState({modalVisible:true})
                }}>
              <View style={{flexDirection:"row"}}><Text style={{fontFamily:"Century Gothic"}}>Already have account ? </Text><Text style={{fontWeight:"bold",color:COLORS.TEXT_COLOR}}>Login</Text>  </View></TouchableWithoutFeedback>   
        </View>

        {/* Login Modal    */}
        
         <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>
           <ScrollView style={{flex:1}}>
           <ImageBackground style={ styles.imgBackground } 
                 resizeMode='stretch' 
                 source={require('../../Assets/bg_login.png')}>
              <View style={{flex:1}}>
              <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
              <Text style={{fontSize:20,margin:30}}>Welcome back to,</Text>
              </View>
              <View style={{justifyContent:"center",alignItems:"center"}}>
              <Image
               source={require('../../Assets/logo.png')} />
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
                            // onChangeText={this.onEmailChanged.bind(this)}
                            // value={this.props.contactreducer.email.toUpperCase()}
                           onChangeText={null}
                            value={null}
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
                            // onChangeText={this.onPasswordChanged.bind(this)}
                            // value={this.props.contactreducer.password}
                            onChangeText={null}
                            value={null}
                        />
            </View>
            {
            (!this.state.isPassword) ?  <View style={{flex:0.1}}>
            <Text style={{color:'red',fontSize:20}}>X</Text>
            </View>  : <View style={{flex:0.1}}/>
            }
            </View>



             {/* <View style={{margin:25}}>
            <TextField
            baseColor="#662200"
            tintColor="black"
            textColor="grey"
            label='EMAIL'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={(email)=>{this.setState({email})}} />
            </View> */}

            {/* <View style={{margin:25}}>
            <TextField
             fontWeight="100"
             secureTextEntry
             baseColor="#662200"
             tintColor="black"
             textColor="black"
             label='PASSWORD'
            // value={this.state.value}
            onChangeText={(password)=>{this.setState({password})}} />
            </View> */}
      
             <View style={{flexDirection:"row",justifyContent:"flex-end",marginRight:20,marginHorizontal:20}}>
             <TouchableWithoutFeedback onPress={() => {
                 this.setState({modalVisible:false, passwordComponentVisible:true})
                }}><View><Text style={{fontWeight:"400",color:Colors.LABEL_TEXT_COLOR}}>Forgot Password ?</Text></View></TouchableWithoutFeedback> 
             </View>
             <Button rounded  dark style={{width:width/1.1,justifyContent:"center",margin:15}} onPress={()=>{alert("Login")}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>LOGIN</Text>
             </Button>

             <Text style={{textAlign:"center",margin:7,fontWeight:"400"}}>or</Text>
        
              <Button rounded style={{width:width/1.1,justifyContent:"center",margin:15,backgroundColor:"#3b5998"}} onPress={()=>alert("facebook login")}> 
              <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>CONNECT WITH FACEBOOK</Text>
              </Button>
              
              <TouchableWithoutFeedback
                style={{flexDirection:"row"}}
                 onPress={() => {
                  null
                }}>
                <View style={{flexDirection:"row",justifyContent:"center"}}><Text style={{textAlign:"center",color:"black"}}>{"Don't have an account ? "}</Text><Text style={{fontWeight:"400",color:Colors.LABEL_TEXT_COLOR}}>Sign Up</Text></View>   
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                 onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
               <View style={{margin:20}}><Text style={{textAlign:"center",color:Colors.LABEL_TEXT_COLOR}}>Back</Text></View>
               </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
        </ScrollView>
        </Modal>

        {/* Forgot Password */}
         <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.passwordComponentVisible}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>
         
          <ImageBackground style={ styles.imgBackground } 
                 resizeMode='stretch' 
                 source={require('../../Assets/bg_login.png')}>
              <View style={{flex:1}}>
              <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
              <Text style={{fontSize:20,margin:30}}>Forgot Password</Text>
              </View>
              <View style={{justifyContent:"center",alignItems:"center"}}>
              <Image
               source={require('../../Assets/logo.png')} /></View>
             <View style={{margin:25}}>
            
            <TextField
            baseColor="#662200"
            tintColor="black"
            textColor="grey"
            label='EMAIL'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={(email)=>{this.setState({email})}} />
            </View>

  
             <Button rounded  dark style={{width:width/1.1,justifyContent:"center",margin:15}} onPress={()=>{alert("Login")}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>SUBMIT</Text>
             </Button>

            <TouchableWithoutFeedback
                 onPress={() => {
                 this.setState({passwordComponentVisible:false})
                 
                }}>
               <View style={{margin:20}}><Text style={{textAlign:"center",color:"#331100"}}>Back</Text></View>
               </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
        
        </Modal>
 </View>
   

    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps= ', JSON.stringify(state));
  return {
    appIntroReducer: state.appIntroReducer
  }
}



export default connect(
  mapStateToProps,
  {
    checkSignup,
    clearResponse



  }

)(App)