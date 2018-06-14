import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    FlatList
}  from 'react-native';
import {Button } from 'native-base';
//import axios from 'axios';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');



export default  class  ChildInformationSize  extends Component {
  constructor() {
        super();
        this.state = {
          data:"",
          sizeList:"",
          childProptionSelected:""
         };
     }


    componentWillMount() {
    axios.get('http://52.34.207.5:5032/api/getSize')
    .then(response => this.setState({ data: response.data.data }))
    .catch((e)=>{alert(e)})
    
   
    // console.log(this.state.data)
  //  .catch((e)=>{alert(e)})
 }


  
   render() {
        return (
            <View style={{flex:1}}>
            <View style={styles.viewStyle}>
            <Text style={{fontSize: 18}}>   CHILD INFORMATION</Text>
            </View>
            <ScrollView style={{flex:1}}>
           
            <Text style={{textAlign:"center",color:"black",fontWeight:"600",marginTop:50,marginBottom:20,marginRight:40,marginLeft:40}}>  SELECT SIZE CHILD IS CURRENTLY WEARING ?</Text>
           
            
            {/* <View style={{flexDirection:"row",alignItems:"center"}}>
            <View style={styles.viewStyle}><Text> 0-3 </Text></View>
            </View> */}
          
         {/* FlatList Use for Dyanamic size */}
     {/* <FlatList></FlatList> */}
        
             <FlatList 
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width: 5}} />}
                    ref={"flatList"}
                    data={this.state.data}
                    renderItem={({item, index})=>{
                    return (
                      <View style={{flexDirection:"row",alignItems:"center",marginLeft:10}}>
                      <View style={styles.viewStyle}><Text>{item.value}</Text></View>
                     </View>)
                      
                   
                }}
                ></FlatList>
                    

              

     


          
           <Text style={{textAlign:"center",color:"black",fontWeight:"600",marginLeft:30,marginTop:16,marginBottom:16}}>HOW WOULD YOU CHARACTERIZE YOUR CHILD PROPORTIONS ?</Text>
           

          {/* <View style={{justifyContent:"center",alignItems:"center"}}>
          <View style={styles.cardStyle}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image style={{height:42,width:20}} source={require('../../Assets/Average.png')}/>

          </View>
          <Text style={{color:"black",fontWeight:"100"}}>Average</Text>
          </View> 

          <View style={styles.cardStyle}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image source={require('../../Assets/mother.png')}/>
          </View>

          <View style={{marginRight:50}}>
          <Text style={{color:"black",fontWeight:"100",paddingRight:50}}>They picked their clothing based on style they want</Text>
          </View>
          </View> 


          <View style={styles.cardStyle}>
          <View style={{paddingLeft:30,paddingRight:30}}>
          <Image style={{height:42,width:20}} source={require('../../Assets/Pudgy.png')}/>
          </View>
          <Text style={{color:"black",fontWeight:"100"}}>Pudgy</Text>
          </View>

         <View style={styles.cardStyle}>
         <View style={{paddingLeft:30,paddingRight:30}}>
         <Image style={{height:42,width:20}} source={require('../../Assets/Petite.png')}/>
         </View>
         <View>
         <Text style={{color:"black",fontWeight:"100"}}>Petite</Text></View>
        </View>
        </View> */}

             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/1.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:"#84432d"}} onPress={()=>{null}}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             
             <TouchableWithoutFeedback onPress={this.goBack}>
             <View>
             <Text style={{textAlign:"center"}}>Home</Text></View>
             </TouchableWithoutFeedback>
            </ScrollView>
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
    //alignItems: 'center',
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
    height: 40,
    marginLeft:10,
   
    flexDirection: "row",
    paddingTop:20,
    paddingBottom:20,
    width:"85%",
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
  
  },
  cardageStyle: {
    backgroundColor: '#F8F8F8',
     justifyContent: 'center',
    //alignItems: 'center',
    height: 30,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  }
  });