import {
    StyleSheet,
    Platform,
  } from 'react-native';
  import Colors from '../../Constants/Colors';
  export default StyleSheet.create({
  
  mainContainer:{
      flex:1,
      backgroundColor:Colors.BACKGROUND_COLOR_GENERAL
    
  },
  subContainer:{
      flex:1,
      marginLeft:20,
      marginRight:20,
      marginTop:20,
      alignItems:'center'
  },
  titleStyle:{
      marginTop:20,
     fontSize:18,
     fontWeight:'600',
     textAlign:'center'
  },
  list: {
    justifyContent:'center',
     flexDirection: 'row',
     flexWrap: 'wrap',
   },
   image: {
     width: 100,
     height: 100,
    
     
    
 },
 itemContainer:{
     borderBottomWidth: 1,
     padding: 5,
     margin:5,
     backgroundColor: '#fff',
     justifyContent: 'flex-start',
     flexDirection: 'row',
     borderColor: '#ddd',
     position: 'relative'
 },
 proportionContainer:{
     flexDirection:'row',
     marginTop: 20
 },
 proportionImage:{
    margin:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
   
 }

  });