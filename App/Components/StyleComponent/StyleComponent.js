// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import {
//     Image,
//     View,
//     Text,
//     AsyncStorage,
//     StyleSheet,
//     ImageBackground,
//     ScrollView,
//     Dimensions,
//     TouchableWithoutFeedback,
//     Modal,
//     FlatList
// }  from 'react-native';
// import {
//     clearResponse
// } from "./StyleAction";
// import {
//     getStyleList
// } from "../../Action/ActionCreators";
// const window = Dimensions.get('window');
// import Header from '../Common/Header';
// import style from '../SizeAndProportionComponent/SizeAndProportionStyle'
// import Colors from '../../Constants/Colors';
// import Strings from '../../Constants/Strings';
// const {height,width}= Dimensions.get('window');
// const BASE_URL = 'http://52.34.207.5:5032/';

// class StyleComponent extends Component{
//     constructor(){
//         super();
//         this.state ={
//             userInfo:{},
//             styleRes:{},

//         }
//     }

//     componentWillMount(){
//        this.getUserData();
//        this.getStyleListChild();
       
//     }

//      componentWillReceiveProps(nextProps) {
//         // console.log("====== Billing Response ========" + JSON.stringify(nextProps.billingInfoReducer.billingRes));

//         if(nextProps.billingInfoReducer.billingRes!=''){
//                        this.setState({isSpinnerVisible:false})
        
//                        //alert(this.props.billingInfoReducer.billingRes)
//                     if(nextProps.billingInfoReducer.billingRes.status==="success"){
//                               // this.setState({signUpData:this.props.contactreducer.signupRes.data})
        
//                          AsyncStorage.setItem("UserInfo", JSON.stringify(nextProps.billingInfoReducer.billingRes));
//                          console.log("HelloResponse"+nextProps.billingInfoReducer.billingRes)
//                           Actions.servicePreferences({type:"reset"})
//                        }else{
//                            alert(nextProps.billingInfoReducer.billingRes.message);
//                        }
//                         this.props.clearResponse();
//                    }
//     }

//     getUserData(){
//         AsyncStorage.getItem("UserInfo").then((value) => {
//             console.log(value);
    
//           if (value) {
//               var userData = JSON.parse(value);
//               this.setState({userInfo:userData});
             
             
//           }
//       }).done();
//     }


//       getStyleListChild(){
//         postData = {
//                  userId:this.state.userInfo._id,
//                  kid_no:1
//         }
//         this.props.getStyleList(postData)
//     }


//     _renderItem(item,index){
        
//         return (
//             <TouchableWithoutFeedback onPress={() => this.selectSize(item,index)} >
           
//             <View style={[{height:300,width: width/2.3},(this.state.onPressedBrand && this.state.selectedIndexes.indexOf(index)!=-1)?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
//             <Image style={{height:280,width:200}} source={{uri:BASE_URL+item.image_path}} />
//             </View>
           
//             </TouchableWithoutFeedback>
//         )
//     }

 
//     selectSize(item, index){
//     //  this.setState({})
   
//     }

//     render(){
        
        
//         return(
//             <View style={style.mainContainer}>
//             <Header headerText={Strings.STYLE_INFORMATION} screenCount="03" />
//             <View style={style.subContainer}>
//             <Text style={style.titleStyle}>{Strings.STYLE_INFO_TITLE}</Text>
//             </View>    
        

//             <View style={{flex:1}}>
//              <FlatList
//                 style ={{marginTop:20}} 
//                 data={this.props.styleReducer.styleListRes.data}
//                 numColumns={2}
//                 contentContainerStyle={style.list}
//                 renderItem={({item,index}) => this._renderItem(item,index)}/>

//                 </View>
         
//             </View>    

//         );
//     }

// }

// function mapStateToProps(state) {
//     console.log('mapStateToProps= ', JSON.stringify(state));
//     return {
//         styleReducer: state.styleReducer
//     }
// }


// export default connect(
//     mapStateToProps,
//     {
//     getStyleList,
//     clearResponse,
//     }

// )(StyleComponent)

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
    Modal,
    FlatList
}  from 'react-native';
import {Button } from 'native-base';
import {
    clearResponse
} from "./StyleAction";
import {
    styleSignup,
    getStyleList
} from "../../Action/ActionCreators";
const {height,width} = Dimensions.get('window');
import Header from '../Common/Header';
import style from '../SizeAndProportionComponent/SizeAndProportionStyle'
import Colors from '../../Constants/Colors';
import Strings from '../../Constants/Strings';
import Spinner from 'react-native-spinkit';
import axios from "axios";
const BASE_URL = 'http://52.34.207.5:5032/';

class StyleComponent extends Component{
    constructor(){
        super();
        this.state ={
            userInfo:{},
            styleRes:{},
            onPressedBrand:false,
            selectedSize:'',
            selectedIndex:'',
            selectedIndexes:[],
            imageList:[],
            brandList:[],
            itemObjectSelected:[],
            isSpinnerVisible:false,
            
        }
    }

    componentWillMount(){
       this.getUserData();
       this.getStyleListChild()


    }

    componentWillReceiveProps(nextProps){
     console.log(nextProps)
    }

    getUserData(){
        AsyncStorage.getItem("UserInfo").then((value) => {
            console.log(value);
    
          if (value) {
              var userData = JSON.parse(value);
              this.setState({userInfo:userData});
            //   this.getStyleListChild();
          }
      }).done();
    }



    getStyleListChild(){
        postData = {
                // userId:this.state.userInfo._id,
                 userId:"5b1e3e5aa97a5c420319b07b",
                 kid_no:1
        }
        this.props.getStyleList(postData)
    }

  





    componentDidUpdate(){
        if(this.props.styleReducer.styleListRes!=''){
            if(this.props.styleReducer.styleListRes.status==="success"){
                // this.setState({isSpinnerVisible: false})
                console.log("RESPONSE......"+this.props.styleReducer.styleListRes.data)

        
            }
            else(
             alert(this.props.styleReducer.styleListRes.data.message)
            )
        
        }

        else if(this.props.styleReducer.selectedstyleListRes!=''){
            if(this.props.styleReducer.selectedstyleListRes.status==="success"){
                this.setState({isSpinnerVisible: false})
                console.log("RESPONSE......"+this.props.styleReducer.selectedstyleListRes.data)
                alert("Success")
              

            //    if(this.state.enrolledKids!='' && this.state.enrolledKids>=1){
            //         console.log("enrolled kids 1>>>"+this.state.enrolledKids);
            //         if(this.props.clothesBrandReducer.brandDataRes.data.kids.length!=this.state.enrolledKids){
            //             console.log("enrolled kids 2>>>"+this.state.enrolledKids);
            //             // Actions.childDobInformation({type:'reset',childData:this.props.clothesBrandReducer.brandDataRes.data})
            //         }else{
            //             console.log("enrolled kids 3>>>"+this.state.enrolledKids);
            //            Actions.talktoUs({type:'reset'})
            //         }
                    
            //     }
               
                //this.setState({styleRes:this.props.styleReducer.styleListRes.data})
            }
            else(
             alert(this.props.styleReducer.selectedstyleListRes.data.message)
            )

        }
    }

    _renderItem(item,index){
        
        return (

            <TouchableWithoutFeedback onPress={() => this.selectSize(item,index)} >
            {/* <View style={[{height:280,width:width/2.3},(this.state.onPressedBrand && this.state.selectedIndexes.indexOf(index)!=-1)?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>  */}
            <View style={{height:280,width:width/2.3,marginLeft:10,marginBottom:10,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
            <Image style={{height:220,width:width/2.5}} source={{uri:BASE_URL + item.image_path}} /> 
            <View style={{flexDirection:"row",paddingLeft:width/3,paddingTop:10}}>
            <Image source={(this.state.selectedIndexes.indexOf(index)!=-1)?require('../../Assets/heartena.png'):require('../../Assets/heartdis.png')}/>
            {/* </View> */}
            </View>
             </View> 
            </TouchableWithoutFeedback>
        )
    }

    
      selectSize(item, index){
        var selctedIndex=this.state.selectedIndexes.indexOf(index)
        if(selctedIndex!=-1){
    
        this.state.selectedIndexes.splice(selctedIndex)
        this.state.itemObjectSelected.splice(selctedIndex,1);
        // this.state.itemObjectSelected.splice(selctedIndex,1)

        }
      else {
        //  this.setState({onPressed:this.state.onPressed})
        //<item.Image source={require('../../Assets/heartena.png')}/>
         this.state.selectedIndexes.push(index)
         this.state.itemObjectSelected.push(item);

      
        // this.state.imageList.push(item.image_path)
   
       }

     console.log("SelectedObJECTDATA" + JSON.stringify(this.state.itemObjectSelected))
     console.log("SELECTED INDEXES"+this.state.selectedIndexes)
         }


         submit(){

        //  if(this.props.styleReducer.styleListRes.data)
        //         this.props.styleReducer.styleListRes.data.map((item) => {
        //         if (item.index === this.state.selectedIndexes) {
                  
        //                 this.state.itemObjectSelected.push(item);
        //                 //   console.log('selected:' + item.givenName);
        //               }
                  
        //           })
        //           this.setState({itemObjectSelected: this.state.itemObjectSelected})
            
        //           console.log("ITEMOBJECTSELECTED>>>>>>>>>>>>>>>>>>>>>."+ JSON.stringify(this.state.itemObjectSelected))
                
    
               if(!this.state.selectedIndexes){
                   alert("Please select style")
               }
 

        




             postData = {
                  _id:this.state.userInfo._id,
                   style:this.state.itemObjectSelected ,
                   savedScreen:"STYLECOMPONENT"
                   };

        console.log("POST DATA++++++++++++"+JSON.stringify(postData))
                
                   this.setState({isSpinnerVisible:true})
                   this.props.styleSignup(postData);
               }
               
           


    
 

    render(){

     
         return(
            <View style={style.mainContainer}>
            <Header headerText={Strings.STYLE_INFORMATION} screenCount="03" />
            <View>
            <Text style={style.titleStyle}>{Strings.STYLE_INFO_TITLE}</Text>
            </View>    
            <ScrollView style={{flex:1}}>
             <FlatList
                style ={{marginTop:20}} 
                data={this.props.styleReducer.styleListRes.data}
                 numColumns={2}
                 contentContainerStyle={style.list}
                renderItem={({item,index}) => this._renderItem(item,index)}/>

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


function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        styleReducer: state.styleReducer
    }
}


export default connect(
    mapStateToProps,
    {
    styleSignup,
    getStyleList,
    clearResponse,
    }

)(StyleComponent)