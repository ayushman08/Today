import React, { Component } from 'react';
import { View, Text,TouchableWithoutFeedback ,Dimensions,FlatList,TouchableHighlight,Image,AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Common/Header';
import Card from '../Common/Card';
import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import ClothesBrandStyle from './ClothesBrandStyle';
import { Actions } from 'react-native-router-flux';
import MaterialTextInput from 'react-native-material-textinput';
import {Button } from 'native-base';
import {
    brandNameChanged,
    clearResponse
} from "./ClothesBrandAction";
import {
    getBrands,
    sendBrandsData
} from "../../Action/ActionCreators";
import Spinner from 'react-native-spinkit';
const window = Dimensions.get('window');
const BASE_URL = 'http://52.34.207.5:5032/';
let brand_ids =[];
class ClothesBrandComponent extends Component {
    constructor(){
        super();
        this.state ={
            onPressed:false,
            selectedIndex:'',
            brandList:[],
            isSpinnerVisible:false,
            kidsData:[],
            selectedIndexes:[],
            onPressedOne:false,
            onPressedTwo:false,
            onPressedThree:false,
            selectedOption:'',
            isSpinnerVisible:false
        }
    }

    

    componentWillMount(){
        this.getUserData();
       this.getBrandList();
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

    

    getBrandList(){
       // this.setState({isSpinnerVisible:true})
        this.props.getBrands();
    }

    componentDidUpdate(){
        if(this.props.clothesBrandReducer.brandDataRes!=''){
            this.setState({isSpinnerVisible:false})
            if(this.props.clothesBrandReducer.brandDataRes.status==='success'){

            }
            this.props.clearResponse()
        }
    }

    sendBrandSelection(){
        let kidsData =[]
        if(this.state.selectedOption===''){
            alert("Please select one option")
        }else if(this.state.brandList.length<0){
            if(this.props.clothesBrandReducer.brand_name===''){
                alert("Please select any brand or enter brand name")
            }
        }else{
            postData ={
                name:this.state.kidsData[0].name,
                dob:this.state.kidsData[0].dob,
                gender:this.state.kidsData[0].gender,
                size:this.state.kidsData[0].size,
                _id:this.state.kidsData[0]._id,
                proportion:this.state.kidsData[0].proportion,
                fit_size:this.state.selectedOption,
                other_brand:this.props.clothesBrandReducer.brand_name,
                brand:this.state.brandList
               
             }
             kidsData.push(postData)

             postDataKids ={
                _id:this.state.userInfo._id,
                 kids:kidsData,
                 savedScreen:"5a"
             }
             this.setState({isSpinnerVisible:true})
             console.log("Postdata>>>"+JSON.stringify(postDataKids));
             this.props.sendBrandsData(postDataKids);
        }
    }

    componentWillReceiveProps(newProps){
        console.log("New props>>>"+JSON.stringify(newProps))
        this.setState({kidsData:newProps.kids})
     }

    

     _renderItem(item,index){
        
        return (
            <TouchableWithoutFeedback onPress={() => this.selectBrand(item,index)} >
            <View style={[ClothesBrandStyle.itemContainer,(this.state.onPressed && this.state.selectedIndexes.indexOf(index)!=-1)?{backgroundColor:Colors.BACKGROUND_COLOR}:null]}>
            <Image style={ClothesBrandStyle.image} source={{uri:BASE_URL + item.logo_path}} />
            </View>
            </TouchableWithoutFeedback>
        )
    }

   
    selectBrand(item, index){
        this.setState({onPressed:true})
        this.state.brandList.push(item._id)
        this.state.selectedIndexes.push(index)
       
     }

     onBrandNameChanged(text){
        this.props.brandNameChanged(text);
     }

     goBack(){
         Actions.sizeandproportion({type:'reset'})
     }
     selectOption(option){
        
        switch(option){
            case Strings.CHILD_FIT_OPTION_ONE:
            this.setState({onPressedOne:true,onPressedTwo:false,onPressedThree:false,selectedOption:0})
            break;
            case Strings.CHILD_FIT_OPTION_TWO:
            this.setState({onPressedOne:false,onPressedTwo:true,onPressedThree:false,selectedOption:1})
            break;
            case Strings.CHILD_FIT_OPTION_THREE:
            this.setState({onPressedOne:false,onPressedTwo:false,onPressedThree:true,selectedOption:2})
            break;
        }
    }
    

    render() {
        console.log("Brands list>>"+this.state.brandList);
        return (
            <View style={ClothesBrandStyle.mainContainer}>
                <Header headerText={Strings.CHILD_INFORMATION} screenCount="03" />
                <View style={ClothesBrandStyle.subContainer}>
                    <Text style={ClothesBrandStyle.titleStyle}>{Strings.CHILD_BRAND_TITLE_ONE}</Text>
                    <TouchableWithoutFeedback
                    style={{marginTop:20}}
                        onPress={() => this.selectOption(Strings.CHILD_FIT_OPTION_ONE)}
                    >
                        <View style={this.state.onPressedOne?{backgroundColor:Colors.BACKGROUND_COLOR_GENERAL}:null}>
                            <Card>
                                <Text>
                                    {Strings.CHILD_FIT_OPTION_ONE}
                                </Text>
                            </Card>
                            
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => this.selectOption(Strings.CHILD_FIT_OPTION_TWO)}
                    >
                        <View style={this.state.onPressedTwo?{backgroundColor:Colors.BACKGROUND_COLOR_GENERAL}:null}>
                            <Card>
                                <Text>
                                    {Strings.CHILD_FIT_OPTION_TWO}
                                </Text>
                            </Card>
                            
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => this.selectOption(Strings.CHILD_FIT_OPTION_THREE)}
                    >
                        <View style={this.state.onPressedThree?{backgroundColor:Colors.BACKGROUND_COLOR_GENERAL}:null}>
                            <Card>
                                <Text>
                                    {Strings.CHILD_FIT_OPTION_THREE}
                                </Text>
                            </Card>
                            
                        </View>
                    </TouchableWithoutFeedback>

                    <Text style={ClothesBrandStyle.titleStyle}>{Strings.CHILD_BRAND_TITLE_TWO}</Text>
                    <Text style={[ClothesBrandStyle.titleStyle,{alignSelf:'flex-start',fontSize:14,marginLeft:10,color:Colors.LABEL_TEXT_COLOR}]}>{Strings.OTHERS}</Text>
                  
                   

           
                </View>
                <View style={{margin:20}}>
                     <MaterialTextInput
                            label={Strings.HINT_TEXT}
                            labelColor={Colors.LABEL_TEXT_COLOR}
                            activeColor={Colors.LABEL_TEXT_COLOR}
                            color={Colors.TEXT_COLOR}
                            fontSize={15}
                            labelActiveTop={-30}
                            underlineColor={Colors.TEXT_COLOR}
                            underlineActiveColor={Colors.TEXT_COLOR}
                            underlineHeight={0.7}
                            underlineActiveHeight={0.7}
                            autoCapitalize='none'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            returnKeyType='next'
                            onChangeText={this.onBrandNameChanged.bind(this)}
                            value={this.props.clothesBrandReducer.brand_name}
                            //onSubmitEditing={(event)=>{this.refs.lastname.focus()}}
                           
                        />

            </View>

            <Spinner
            isVisible={this.state.isSpinnerVisible}
            style={{position:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
          
                <FlatList 
                data={this.props.clothesBrandReducer.brandListRes.data}
                numColumns={3}
                contentContainerStyle={ClothesBrandStyle.list}
                renderItem={({item,index}) => this._renderItem(item,index)}
            />
             <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
             <Button rounded  style={{width:window.width/2.4,justifyContent:"center",margin:15,alignItems:"center",backgroundColor:Colors.BUTTON_COLOR}} onPress={()=>this.sendBrandSelection()}>
             <Text style={{color:"white",textAlign:"center",fontWeight:"400", fontSize: 16}}>NEXT</Text>
             </Button>
             </View>
             <TouchableWithoutFeedback onPress={() => this.goBack()}>
             <View>
             <Text style={{textAlign:"center"}}>{Strings.CAN_DO_THIS_LATER}</Text></View>
             </TouchableWithoutFeedback>
             
             <Spinner
            isVisible={this.state.isSpinnerVisible}
            style={{position:'absolute',alignSelf:'center',top:window.height/2}} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}
           
            />
            </View>
        );

    }
}


function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        clothesBrandReducer: state.clothesBrandReducer
    }
}


export default connect(
    mapStateToProps,
    {
    sendBrandsData,
    getBrands,
    brandNameChanged,
    clearResponse
    }

)(ClothesBrandComponent)