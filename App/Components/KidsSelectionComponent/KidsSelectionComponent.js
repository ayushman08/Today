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
    Modal
}  from 'react-native';
import Spinner from 'react-native-spinkit';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {
    clearResponse
} from "./KidsSelectionAction";
import {
    selectKids,
} from "../../Action/ActionCreators";
import {Button } from 'native-base';
import Header from "../Common/Header"
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';

import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
// import AppIntro from "../AppIntro/AppIntro"
var radio_props = [
    {label: '4', value: 4 },
    {label: '5', value: 5 },
    {label: '6', value: 6 },
  ];

class KidsSelectionComponent extends Component {

    constructor() {
        super();
        this.state = {
         countKids:0,
         enrolledKidsCount:0,
         isOneKidSelected: false,
         isTwoKidSelected: false,
         isThreeKidSelected: false,
         isPreganatSelected: false,
         isOneKidEnrolled:false,
         isTwoKidEnrolled:false,
         isThreeKidsEnrolled:false,
         userInfo:{},
         modalVisibleKids: false,
         modalVisibleEnrolled: false,
         isSpinnerVisible:false
        
         
        };
    }

componentWillMount() {
//     AsyncStorage.getItem("kidsselectiondata").then((value) => {
//         console.log(value);

//       if (value) {
//           var userData = JSON.parse(value);
//          console.log("kidsselectiondata>>>"+JSON.stringify(userData));
//          this.setState({countKids:userData.total_kids})
//          this.setState({enrolledKidsCount:userData.kids_enroll})
//       }else{
//         this.setState({countKids:1,isOneKidSelected:true})
       
//       }
//   }).done();
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

componentDidUpdate(){
    if(this.props.kidsSelectionReducer.kidsSelectionRes!=''){
        this.setState({isSpinnerVisible:false})
        if(this.props.kidsSelectionReducer.kidsSelectionRes.status==="success"){
            AsyncStorage.setItem("EnrolledKids", JSON.stringify(this.props.kidsSelectionReducer.kidsSelectionRes.data.kids_enroll));
            Actions.whattobuy({type:'reset'})
        }else{
            alert(this.props.kidsSelectionReducer.kidsSelectionRes.message)
        }

        this.props.clearResponse();
    }
}
 
 goBack(){
     Actions.pregnancyselection({type:'reset'})
 }

 selectPregnant(){
    this.setState({countKids:0})
    this.setState({isPreganatSelected:true,isOneKidSelected:false,isTwoKidSelected:false,isThreeKidSelected:false})
 }

 selectOneKid(){
    this.setState({countKids:0})
    this.setState(prevState => ({ countKids: prevState.countKids + 1 }));
    this.setState({isPreganatSelected:false,isOneKidSelected:true,isTwoKidSelected:false,isThreeKidSelected:false})
 }

 enrollOneKid(){
    this.setState({enrolledKidsCount:0})
    this.setState(prevState => ({ enrolledKidsCount: prevState.enrolledKidsCount + 1 }));
    this.setState({isOneKidEnrolled:true,isTwoKidEnrolled:false,isThreeKidsEnrolled:false})
 }

 selectTwoKid(){
    this.setState({countKids:0})
    this.setState(prevState => ({ countKids: prevState.countKids + 2 }));
    this.setState({isPreganatSelected:false,isOneKidSelected:false,isTwoKidSelected:true,isThreeKidSelected:false})
 }

 enrollTwoKid(){
    this.setState({enrolledKidsCount:0})
    this.setState(prevState => ({ enrolledKidsCount: prevState.enrolledKidsCount + 2 }));
    this.setState({isOneKidEnrolled:false,isTwoKidEnrolled:true,isThreeKidsEnrolled:false})
 }

 selectThreeKid(){
    this.setState({countKids:0})
    this.setState(prevState => ({ countKids: prevState.countKids + 3 }));
    this.setState({isPreganatSelected:false,isOneKidSelected:false,isTwoKidSelected:false,isThreeKidSelected:true})
 }

 enrollThreeKid(){
    this.setState({enrolledKidsCount:0})
    this.setState(prevState => ({ enrolledKidsCount: prevState.enrolledKidsCount + 3 }));
    this.setState({isOneKidEnrolled:false,isTwoKidEnrolled:false,isThreeKidsEnrolled:true})
 }

 selectKidsCount(){

    if(this.state.countKids==0){
        alert("Please select kids")
    }else
    if(this.state.enrolledKidsCount==0){
        alert("Please select number of kids to enroll")
    }else if(this.state.countKids<this.state.enrolledKidsCount){
        alert("Number of kids enrolled should not be more than total number of kids")
    }else{
        postData ={
            _id:this.state.userInfo._id,
            total_kids:this.state.countKids,
            kids_enroll:this.state.enrolledKidsCount,
            savedScreen:"3a"
         }
         AsyncStorage.setItem("kidsselectiondata", JSON.stringify(postData));
       //  Actions.whattobuy({type:'reset'})
       this.setState({isSpinnerVisible:true})
         console.log("Postdata>>>"+JSON.stringify(postData));
         this.props.selectKids(postData)
    
    }
   
    
 }

 selectMore(visible){
    this.setState({modalVisibleKids: visible});
 }

 setModalVisible(visible) {
    this.setState({modalVisibleKids: visible});
  }

  selectMoreEnrolled(visible){
    this.setState({modalVisibleEnrolled: visible});
 }

 setModalVisibleEnrolled(visible) {
    this.setState({modalVisibleEnrolled: visible});
  }

  setMoreKids(value){
      console.log("more kids>>"+value)
    this.setState({countKids:0,isOneKidSelected:false,isTwoKidSelected:false,isThreeKidSelected:false})
    this.setState(prevState => ({ countKids: prevState.countKids + value }));
  }

  setEnrolledKids(value){
    console.log("more kids enrolled>>"+value)
    this.setState({enrolledKidsCount:0,isOneKidEnrolled:false,isTwoKidEnrolled:false,isThreeKidsEnrolled:false})
    this.setState(prevState => ({ enrolledKidsCount: prevState.enrolledKidsCount + value }));
  }

  goToIntroScreen(){
    Actions.appIntro({type:'reset'})
 }


 renderEnrolledKids(){
     switch(this.state.countKids){
        case 1:
        return(
            <TouchableWithoutFeedback onPress={()=> this.enrollOneKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
            <Image source={(this.state.isOneKidEnrolled)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
            <Text style={{marginTop:5}}>1 kid</Text>
             </View>
             </TouchableWithoutFeedback>
        );
        case 2:
        return(
            <View style={{flexDirection:'row'}}>
          <TouchableWithoutFeedback onPress={()=> this.enrollOneKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
            <Image source={(this.state.isOneKidEnrolled)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
            <Text style={{marginTop:5}}>1 kid</Text>
             </View>
             </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={()=> this.enrollTwoKid()}>
              <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
              <Image source={(this.state.isTwoKidEnrolled)?require('../../Assets/2kidsel.png'):require('../../Assets/2kidUnsel.png')}/>
              <Text style={{marginTop:5}}>2 kid</Text>
            </View>
            </TouchableWithoutFeedback>
            </View>
        );
        case 3:
        return(
            <View style={{flexDirection:'row'}}>
             <TouchableWithoutFeedback onPress={()=> this.enrollOneKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
            <Image source={(this.state.isOneKidEnrolled)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
            <Text style={{marginTop:5}}>1 kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.enrollTwoKid()}>
              <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
              <Image source={(this.state.isTwoKidEnrolled)?require('../../Assets/2kidsel.png'):require('../../Assets/2kidUnsel.png')}/>
              <Text style={{marginTop:5}}>2 kid</Text>
            </View>
            </TouchableWithoutFeedback >
            <TouchableWithoutFeedback onPress={()=> this.enrollThreeKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isThreeKidsEnrolled)?require('../../Assets/3kidsel.png'):require('../../Assets/3kidUnsel.png')}/>
             <Text style={{marginTop:5}}>3 Kid</Text>
             </View>
             </TouchableWithoutFeedback>
            </View>
            
        );

        case 4:
        return(
            <View style={{flexDirection:'row'}}>
             <TouchableWithoutFeedback onPress={()=> this.enrollOneKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
            <Image source={(this.state.isOneKidEnrolled)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
            <Text style={{marginTop:5}}>1 kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.enrollTwoKid()}>
              <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
              <Image source={(this.state.isTwoKidEnrolled)?require('../../Assets/2kidsel.png'):require('../../Assets/2kidUnsel.png')}/>
              <Text style={{marginTop:5}}>2 kid</Text>
            </View>
            </TouchableWithoutFeedback >
            <TouchableWithoutFeedback onPress={()=> this.enrollThreeKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isThreeKidsEnrolled)?require('../../Assets/3kidsel.png'):require('../../Assets/3kidUnsel.png')}/>
             <Text style={{marginTop:5}}>3 Kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.selectMoreEnrolled(true)}>
             <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
             {/* {/ <Image source={require('../../Assets/3kidUnsel.png')}/> /} */}
             <Text>More</Text>
             </View>
             </TouchableWithoutFeedback>
            </View>
        );
        case 5:
        return(
            <View style={{flexDirection:'row'}}>
             <TouchableWithoutFeedback onPress={()=> this.enrollOneKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
            <Image source={(this.state.isOneKidEnrolled)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
            <Text style={{marginTop:5}}>1 kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.enrollTwoKid()}>
              <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
              <Image source={(this.state.isTwoKidEnrolled)?require('../../Assets/2kidsel.png'):require('../../Assets/2kidUnsel.png')}/>
              <Text style={{marginTop:5}}>2 kid</Text>
            </View>
            </TouchableWithoutFeedback >
            <TouchableWithoutFeedback onPress={()=> this.enrollThreeKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isThreeKidsEnrolled)?require('../../Assets/3kidsel.png'):require('../../Assets/3kidUnsel.png')}/>
             <Text style={{marginTop:5}}>3 Kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.selectMoreEnrolled(true)}>
             <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
             {/* {/ <Image source={require('../../Assets/3kidUnsel.png')}/> /} */}
             <Text>More</Text>
             </View>
             </TouchableWithoutFeedback>
            </View>
        );
        case 6:
        return(
            <View style={{flexDirection:'row'}}>
             <TouchableWithoutFeedback onPress={()=> this.enrollOneKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
            <Image source={(this.state.isOneKidEnrolled)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
            <Text style={{marginTop:5}}>1 kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.enrollTwoKid()}>
              <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
              <Image source={(this.state.isTwoKidEnrolled)?require('../../Assets/2kidsel.png'):require('../../Assets/2kidUnsel.png')}/>
              <Text style={{marginTop:5}}>2 kid</Text>
            </View>
            </TouchableWithoutFeedback >
            <TouchableWithoutFeedback onPress={()=> this.enrollThreeKid()}>
            <View style={{flexDirection:"column",margin:15,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isThreeKidsEnrolled)?require('../../Assets/3kidsel.png'):require('../../Assets/3kidUnsel.png')}/>
             <Text style={{marginTop:5}}>3 Kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.selectMoreEnrolled(true)}>
             <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
             {/* {/ <Image source={require('../../Assets/3kidUnsel.png')}/> /} */}
             <Text>More</Text>
             </View>
             </TouchableWithoutFeedback>
            </View>
        );
     }
 }

  render() {
console.log("Kids count>>"+this.state.countKids)
console.log("Kids count>>"+JSON.stringify(this.state.userInfo))
      return (
             <View style={{flex:1,backgroundColor:Colors.BACKGROUND_COLOR_GENERAL}}>
             <Header headerText={Strings.SERVICE_PREFERENCE} screenCount="02" />
             <ScrollView style={{flex:1}}>
             <Text style={{textAlign: "center",marginTop:40,marginBottom:40,fontSize:18,fontWeight:"600"}}>HOW MANY KIDS DO YOU HAVE ?</Text>
             <View style={{justifyContent:"center",alignItems:"center",margin:20}}>
             <Image  source={require('../../Assets/clothing.png')}/>
             </View>

             <View style={{flexDirection:"row",marginLeft:20,marginRight:20}}>
             {/* <TouchableWithoutFeedback onPress={()=> this.selectPregnant()}>
             <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isPreganatSelected)?require('../../Assets/pregnantsle.png'):require('../../Assets/pregnantUnsel.png')}/> 
             <Text style={{marginTop:5}}>Pregnant</Text>
             </View>
             </TouchableWithoutFeedback> */}
             <TouchableWithoutFeedback onPress={()=> this.selectOneKid()}>
              <View style={{flexDirection:"column",margin:20,justifyContent:"center",alignItems:"center"}}>
              <Image source={(this.state.isOneKidSelected)?require('../../Assets/1kidsel.png'):require('../../Assets/1kidsUnsel.png')}/>
              <Text style={{marginTop:5}}>1 kid</Text>
               </View>
               </TouchableWithoutFeedback>
               <TouchableWithoutFeedback onPress={()=> this.selectTwoKid()}>
             <View style={{flexDirection:"column",margin:20,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isTwoKidSelected)?require('../../Assets/2kidsel.png'):require('../../Assets/2kidUnsel.png')}/>
             <Text style={{marginTop:5}}>2 kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.selectThreeKid()}>
             <View style={{flexDirection:"column",margin:20,justifyContent:"center",alignItems:"center"}}>
             <Image source={(this.state.isThreeKidSelected)?require('../../Assets/3kidsel.png'):require('../../Assets/3kidUnsel.png')}/>
             <Text style={{marginTop:5}}>3 Kid</Text>
             </View>
             </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={()=> this.selectMore(true)}>
             <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
             {/* {/ <Image source={require('../../Assets/3kidUnsel.png')}/> /} */}
             <Text>More</Text>
             </View>
             </TouchableWithoutFeedback>
             
            </View>

            <Text style={{textAlign: "center",marginTop:40,marginBottom:40,fontSize:18,fontWeight:"600"}}>HOW MANY KIDS DO YOU WANT TO ENROLL ?</Text>
           
             <View style={{flexDirection:"row",marginLeft:20,marginRight:20}}>
             {/* <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
             <Image source={require('../../Assets/pregnantsle.png')}/> 
             <Text style={{marginTop:5}}>Pregnant</Text>
             </View> */}
             
            
             {
                this.renderEnrolledKids()
            }
             
             {/* <View style={{flexDirection:"column",margin:10,justifyContent:"center",alignItems:"center"}}>
          
             <Text>More</Text>
             </View> */}
             </View>

             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=> this.selectKidsCount()}>
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
             <Modal
          style={{flex:1}}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisibleKids}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>

          <View style={{marginTop: 200,justifyContent:"center",alignItems:"center"}}>
           <View style={{backgroundColor:"white",height:250,width:250,borderColor:"grey",borderWidth:1,borderRadius:5,justifyContent:"flex-start"}}>
           <View style={{marginTop:50}}> 
           <View  style={{height:1,backgroundColor:"grey"}} /> 
           <RadioForm
           style={{paddingRight:130,paddingTop:20,paddingBottom:10}}
           radio_props={radio_props}
           initial={-1}
           buttonColor={'black'}
           buttonOuterColor={"black"}
           onPress={(value) => {this.setMoreKids(value)}}
             />
            </View>
               <View  style={{height:1,backgroundColor:"grey"}} /> 
                <View style={{flexDirection:"row",paddingLeft:90,position:"absolute",bottom:20,justifyContent:"flex-end" }} >
                <TouchableWithoutFeedback
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisibleKids);
                }}>
                <View>
               <Text style={{paddingLeft:20,fontSize:20}}>CANCEL</Text>
                </View>
              </TouchableWithoutFeedback>

              {/* <TouchableWithoutFeedback
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                <View> */}

                <TouchableWithoutFeedback
                 onPress={() => {
                     this.setModalVisible(!this.state.modalVisibleKids);
                //  null
                this.setMoreKids(this.state.countKids);
                   }}>
                   <View>
                <Text style={{paddingLeft:20,paddingRight:30,fontSize:20}}>OK</Text></View></TouchableWithoutFeedback>
                {/* </View>
              </TouchableWithoutFeedback> */}
              </View>
             </View>

               
        
           
          </View>
        </Modal>
        <Modal
          style={{flex:1}}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisibleEnrolled}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>

          <View style={{marginTop: 200,justifyContent:"center",alignItems:"center"}}>
           <View style={{backgroundColor:"white",height:250,width:250,borderColor:"grey",borderWidth:1,borderRadius:5,justifyContent:"flex-start"}}>
           <View style={{marginTop:50}}> 
           <View  style={{height:1,backgroundColor:"grey"}} /> 
           <RadioForm
           style={{paddingRight:130,paddingTop:20,paddingBottom:10}}
           radio_props={radio_props}
           initial={-1}
           buttonColor={'black'}
           buttonOuterColor={"black"}
           onPress={(value) => {this.setEnrolledKids(value)}}
             />
            </View>
               <View  style={{height:1,backgroundColor:"grey"}} /> 
                <View style={{flexDirection:"row",paddingLeft:90,position:"absolute",bottom:20,justifyContent:"flex-end" }} >
                <TouchableWithoutFeedback
                onPress={() => {
                    this.setModalVisibleEnrolled(!this.state.modalVisibleEnrolled);
                }}>
                <View>
               <Text style={{paddingLeft:20,fontSize:20}}>CANCEL</Text>
                </View>
              </TouchableWithoutFeedback>

              {/* <TouchableWithoutFeedback
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                <View> */}

                <TouchableWithoutFeedback
                 onPress={() => {
                     this.setModalVisibleEnrolled(false);
                //  null
                this.setEnrolledKids(this.state.enrolledKidsCount);
                   }}>
                   <View>
                <Text style={{paddingLeft:20,paddingRight:30,fontSize:20}}>OK</Text></View></TouchableWithoutFeedback>


                {/* </View>
              </TouchableWithoutFeedback> */}
              </View>
             </View>

               
        
           
          </View>
        </Modal>
          <Spinner
            isVisible={this.state.isSpinnerVisible}
            style={{position:'absolute',alignSelf:'center',top:height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
            </ScrollView>
            </View>
    
         
        );
    }

}



 function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        kidsSelectionReducer: state.kidsSelectionReducer
    }
}


export default connect(
    mapStateToProps,
    {
    selectKids,
    clearResponse
    }

)(KidsSelectionComponent)