import {
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from '../../../Constants/Colors';
import COLORS from '../../../Constants/Colors';
export default StyleSheet.create({


  textStyle: {
    color: Colors.WHITE,
    backgroundColor: Colors.TRANSPARENT,
    fontSize: 14,
    fontWeight: '500',

  },
  passwordVisibiltyViewStyle: {
    position: 'absolute',
    right: 10,
    paddingLeft: 10,
    paddingBottom: 30,
    paddingTop: 10,
    marginTop:5,
    marginLeft:5,
    marginBottom:5,
    bottom: 20
  },

  forgotTextStyle: {
    color: Colors.FONT_COLOR,
    backgroundColor: Colors.TRANSPARENT,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
    marginRight:10
  },

  headingTextstyle:{
    color: Colors.BLACK,
    backgroundColor: Colors.TRANSPARENT,
    fontSize: 20,
    fontWeight: '500',
  },

  forgotPasswordContainer:{
    marginBottom:20,
    alignItems: 'center'
  },


  scrollViewContainerStyle: {
    paddingBottom: 60
  },

  signedInCheckBoxViewStyle: {
    marginTop: 38,
    width: 150,
  },

  signInContainer: {
    flex:1,
  },
  textStyle:{
    fontSize: 15,
    fontWeight:'800',
    fontStyle: 'normal',
    color:'white'
    
},
buttonContainer:{
flex:1,
},

iconStyle:{
marginRight:5
},
buttonStyle:{
  marginTop:20,
  height:40,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth:0.5,
  borderRadius:20,
  borderColor:Colors.DARK_BLUE,
  backgroundColor:Colors.DARK_BLUE,

},

facebookbuttonStyle:{
  marginTop:15,
  height:40,
  flexDirection:'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth:0.5,
  borderRadius:20,
  padding:10,
  borderColor:'#3b5998',
  backgroundColor:'#3b5998',
},
googlebuttonStyle:{
  marginTop:10,
  marginBottom:10,
  height:40,
  flexDirection:'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth:0.5,
  borderRadius:20,
  borderColor:'#DD4B39',
  backgroundColor:'#DD4B39',
},

});