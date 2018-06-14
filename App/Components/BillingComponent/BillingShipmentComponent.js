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

import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from "../Common/Header"
import MaterialTextInput from 'react-native-material-textinput';

import Strings from '../../Constants/Strings';
import Colors from '../../Constants/Colors';
import Spinner from 'react-native-spinkit';
import {
    addressshipmentChanged,
    cityshipmentChanged,
    stateshipmentChanged,
    emailChanged,
    zipcodeshipmentChanged,
    showLoading,
    resetState,
    clearResponse,
    phoneNumbershipmentChanged
} from "./BillingShipmentAction";

import {
    billingshipmentSignup,
} from "../../Action/ActionCreators";
import CheckBox from 'react-native-checkbox';


const { width, height } = Dimensions.get('window');

const validateNumber = (number) => {
    var re = /^[0-9]*$/;
    return re.test(number);
  };



class BillingShipmenttInformation extends Component {
    constructor() {
        super();
        this.state = {
            address: "",
            city: "",
            state: "",
            zipcode: "",
            country: "",
            phonenumber: {
                type: Number,
                required: true
            },
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            signUpData: {},
            isFirstName: true,
            isLastName: true,
            isEmail: true,
            isSpinnerVisible: false,
            emailValidated: false,
            isPassword: true,
            isAddress: true,
            isCityName: true,
            isState: true,
            isZipcode: true,
            isPhoneNumber: true,
            checked: false,
            userInfo:{},

        };
    }


    componentWillMount() {
    AsyncStorage.getItem("UserInfo").then((value) => {
            console.log(value);
    
          if (value) {
              var userData = JSON.parse(value);
              this.setState({userInfo:userData});
             
          }
      }).done();
    }


    onAddressChanged(text) {
        this.props.addressshipmentChanged(text);
        this.setState({ isAddress: true });
        // this.setState({ errorOnTextField: '' });
    }

    onCityChanged(text) {
        this.setState({ isCityName: true });
        this.props.cityshipmentChanged(text);

    }

    onStateChanged(text) {
        this.setState({ isState: true });
        this.props.stateshipmentChanged(text);
    }


    onZipcodeChanged(text) {
        this.setState({ isZipcode: true });
        this.props.zipcodeshipmentChanged(text);
    }

    onphoneNumberChanged(text) {
        this.setState({ isPhoneNumber: true });

        this.props.phoneNumbershipmentChanged(text);
    }



       componentDidUpdate(){
        console.log("Response>>>>"+JSON.stringify(this.props.billingInfoshipmentReducer.billingRes));
         if(this.props.billingInfoshipmentReducer.billingRes!=''){
           this.setState({isSpinnerVisible:false})
           if(this.props.billingInfoshipmentReducer.billingRes.status==="success"){
                   this.setState({signUpData:this.props.billingInfoshipmentReducer.billingRes.data})
                  
                //    AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.billingInfoReducer.billingRes.data));
                //    console.log("BillingINfoResponse"+ this.props.billingInfoReducer.billingRes.data)
                //    Actions.servicePreferences({type:"reset"})
                alert("result")
                
                  
           }
           else{
               alert(this.props.billingInfoshipmentReducer.billingRes.message);
           }
            this.props.clearResponse();
       }
       
   }
  


    submit() {
        if (this.props.billingInfoshipmentReducer.address.trim() == '') {
            this.setState({ isAddress: false });
          


        } else if (this.props.billingInfoshipmentReducer.city.trim() == '') {
            this.setState({ isCityName: false });
          

        } else if (this.props.billingInfoshipmentReducer.state.trim() == '') {
            this.setState({ isState: false });
           

        } else if (this.props.billingInfoshipmentReducer.zipcode.trim() == '') {
            this.setState({ isZipcode: false });
          
          } 
        //   else if (this.props.billingInfoshipmentReducer.zipcode.trim()<6) {
        //     alert("Enter correct zipcode")
        //    }

        //    else if (this.props.billingInfoshipmentReducer.zipcode.trim()>6) {
        //     alert("Enter correct zipcode")
        //    }

          else if (!validateNumber(this.props.billingInfoshipmentReducer.zipcode.trim())) {
            alert("Enter correct zipcode")
           }

     
          else if (this.props.billingInfoshipmentReducer.phonenumber == '') {
            this.setState({ isPhoneNumber: false });
          
          } 

         else if (!validateNumber(this.props.billingInfoshipmentReducer.phonenumber.trim())) {
            alert("Enter correct phonenumber")
         }

        //  else if (this.props.billingInfoshipmentReducer.phonenumber.length<10) {
        //     alert("Enter 10 digit phonenumber")
        //  }

         else if (this.props.billingInfoshipmentReducer.phonenumber.length>10) {
            alert("Enter 10 digit phonenumber")
         }
        
        
        //    else if (this.props.billingshipmentInfoReducer.phonenumber == '') {
        //     this.setState({ isPhoneNumber: false });
     
        //   } 
         
        //  else if (!validateNumber(this.props.billingshipmentInfoReducer.phonenumber)) {
        //             alert("Enter correct number")
        //         }
                
             
       
                else {
            
                  postData = {
                    _id:this.state.userInfo._id,
                    shipping_address: this.props.billingInfoshipmentReducer.address,
                    shipping_state: this.props.billingInfoshipmentReducer.state,
                    shipping_zipcode: this.props.billingInfoshipmentReducer.zipcode,
                    shipping_city: this.props.billingInfoshipmentReducer.city,
                    contact_no: parseInt(this.props.billingInfoshipmentReducer.phonenumber),
                    savedScreen: "BILLINGSHIPMENTTINFORMATION"
                       
                    }
                    console.log("POSTSELECTEDDATE"+ postData)

                
           

     
            this.setState({ isSpinnerVisible: true })
            this.props.billingshipmentSignup(postData);

       }

    }




    goBack() {
        // Actions.pop()
    }

    render() {
        // alert(this.state.checked)
        return (
            <View style={{ flex: 1 }}>
                <Header headerText={"BILLING & SHIPPING"} />
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center", fontSize: 20, color: "black", fontWeight: "600", marginTop: 50, marginBottom: 30 }}>CONTACT INFORMATION
          </Text>


                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                            <MaterialTextInput
                                label={Strings.ADDRESS}
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
                                onChangeText={this.onAddressChanged.bind(this)}
                                value={this.props.billingInfoshipmentReducer.address}


                            />


                        </View>

                        {
                            (!this.state.isAddress) ? <View style={{ flex: 0.1 }}>
                                <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                            </View> : <View style={{ flex: 0.1 }} />
                        }
                    </View>






                    {/* <View style={{flex:1,marginLeft:20,marginRight:20,marginBottom:10}}>

      <MaterialTextInput
                   label={Strings.CITY}
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
                   onChangeText={this.onFirstNameChanged.bind(this)}
                   value={this.props.contactreducer.first_name.toUpperCase()}
                onChangeText={null}
                value={null}
                  
                  
               /> </View> */}




                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flex: 1, marginLeft: 20, marginBottom: 20 }}>

                                <MaterialTextInput
                                    label={Strings.CITY}
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
                                    onChangeText={this.onCityChanged.bind(this)}
                                    value={this.props.billingInfoshipmentReducer.city}
                                // onChangeText={null}
                                // value={null}

                                />

                            </View>
                            {
                                (!this.state.isCityName) ? <View style={{ flex: 0.1 }}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                                </View> : <View style={{ flex: 0.1 }} />
                            }


                        </View>


                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                <MaterialTextInput

                                    label={Strings.STATE}
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
                                    onChangeText={this.onStateChanged.bind(this)}
                                    value={this.props.billingInfoshipmentReducer.state}
                                // onSubmitEditing={(event)=>{this.refs.email.focus()}}
                                //    onChangeText={null}
                                //    value={null}


                                />
                            </View>
                            {

                                (!this.state.isState) ? <View style={{ flex: 0.1 }}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                                </View> : <View style={{ flex: 0.1 }} />
                            }

                        </View>
                    </View>


                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flex: 1, marginLeft: 20, marginBottom: 20 }}>

                                <MaterialTextInput
                                    label={Strings.ZIP_CODE}
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
                                    onChangeText={this.onZipcodeChanged.bind(this)}
                                    value={this.props.billingInfoshipmentReducer.zipcode}
                                // onChangeText={null}
                                // value={null}

                                />

                            </View>
                            {
                                (!this.state.isZipcode) ? <View style={{ flex: 0.1 }}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                                </View> : <View style={{ flex: 0.1 }} />
                            }


                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, marginBottom: 20 }}>
                                <MaterialTextInput
                                    label={Strings.PHONE_NUMBER}
                                    labelColor={Colors.LABEL_TEXT_COLOR}
                                    activeColor={Colors.LABEL_TEXT_COLOR}
                                    color={Colors.TEXT_COLOR}
                                    fontSize={15}
                                    keyboardType={'phone-pad'}
                                    labelActiveTop={-30}
                                    underlineColor={Colors.TEXT_COLOR}
                                    underlineActiveColor={Colors.TEXT_COLOR}
                                    underlineHeight={0.7}
                                    underlineActiveHeight={0.7}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    underlineColorAndroid='transparent'
                                    returnKeyType='next'
                                    onChangeText={this.onphoneNumberChanged.bind(this)}
                                    value={this.props.billingInfoshipmentReducer.phonenumber}
                                    // onChangeText={null}
                                    // value={null}

                                />
                            </View>
                            {

                                (!this.state.isPhoneNumber) ? <View style={{ flex: 0.1 }}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                                </View> : <View style={{ flex: 0.1 }} />
                            }

                        </View>
                    </View>

                    {/* // <View style={{ padding: 20 }}>
                    //     <CheckBox
                    //         label='USE THIS ADDRESS FOR SHIPMENT'
                    //         checked={this.state.checked}
                    //         onChange={(checked) => this.saveForShipmentCheckBox(checked)}
                    //     />

                    // </View> */}



                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Button rounded style={{ width: width / 2.4, justifyContent: "center", margin: 15, alignItems: "center", backgroundColor: Colors.BUTTON_COLOR, padding: 0 }} onPress={() => { this.submit() }}>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "800", fontSize: 16, fontFamily: "Roboto" }}>{Strings.NEXT}</Text>
                        </Button>
                    </View>

                    <TouchableWithoutFeedback onPress={() => this.goBack()}>
                        <View>
                            <Text style={{ textAlign: "center" }}>{Strings.HOME}</Text></View>
                    </TouchableWithoutFeedback>







                </ScrollView>

                {
                    this.state.isSpinnerVisible ? <Spinner
                        isVisible={this.state.isSpinnerVisible}
                        style={{ position: 'absolute', alignSelf: 'center', top: window.height / 2 }} type="FadingCircleAlt" color={Colors.BUTTON_COLOR}

                    /> : null
                }

            </View>


        );
    }

}
function mapStateToProps(state) {
    console.log('mapStateToProps= ', JSON.stringify(state));
    return {
        billingInfoshipmentReducer: state.billingInfoshipmentReducer
    }
}


export default connect(
    mapStateToProps,
    {
        billingshipmentSignup,
        addressshipmentChanged,
        cityshipmentChanged,
        stateshipmentChanged,
        emailChanged,
        zipcodeshipmentChanged,
        showLoading,
        resetState,
        clearResponse,
        phoneNumbershipmentChanged
    }

)(BillingShipmenttInformation)

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 70,
        width: width / 3.8,
        marginLeft: 10,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'

    }

};