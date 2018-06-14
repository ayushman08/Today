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
        marginLeft:20,
        marginRight:20,
        marginTop:10,
        justifyContent:'center',
        alignItems:'center'
    },

    titleStyle:{
        margin:15,
        textAlign:'center',
        fontSize:17,
        fontFamily:'Roboto',
        fontWeight:"600"
    },
    list: {
       justifyContent:'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      image: {
        width: 80,
        height: 50,
       
        
       
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
      
    },
    cardStyle: {
        marginTop:5,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        padding:15,
        flexDirection: "row",
        width:"85%",
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
      
      }
  
  });