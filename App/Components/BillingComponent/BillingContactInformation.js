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
    addressChanged,
    cityChanged,
    stateChanged,
    emailChanged,
    zipcodeChanged,
    showLoading,
    resetState,
    clearResponse,
    phoneNumberChanged
} from "./BilingContactAction";

import {
    billingSignup,
} from "../../Action/ActionCreators";
import CheckBox from 'react-native-checkbox';


const { width, height } = Dimensions.get('window');


const validateNumber = (number) => {
    var re = /^[0-9]*$/;
    return re.test(number);
  };


class BillingContactInformation extends Component {
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
        this.props.addressChanged(text);
        this.setState({ isAddress: true });
        // this.setState({ errorOnTextField: '' });
    }

    onCityChanged(text) {
        this.setState({ isCityName: true });
        this.props.cityChanged(text);

    }

    onStateChanged(text) {
        this.setState({ isState: true });
        this.props.stateChanged(text);
    }


    onZipcodeChanged(text) {
        this.setState({ isZipcode: true });
        this.props.zipcodeChanged(text);
    }

    onphoneNumberChanged(text) {
        this.setState({ isPhoneNumber: true });

        this.props.phoneNumberChanged(text);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("====== Billing Response ========" + JSON.stringify(nextProps.billingInfoReducer.billingRes));

    //     if(nextProps.billingInfoReducer.billingRes!=''){
    //                    this.setState({isSpinnerVisible:false})
        
    //                    //alert(this.props.billingInfoReducer.billingRes)
    //                 if(nextProps.billingInfoReducer.billingRes.status==="success"){
    //                           // this.setState({signUpData:this.props.contactreducer.signupRes.data})
        
    //                      AsyncStorage.setItem("UserInfo", JSON.stringify(nextProps.billingInfoReducer.billingRes));
    //                      console.log("HelloResponse"+nextProps.billingInfoReducer.billingRes)
    //                       Actions.servicePreferences({type:"reset"})
    //                    }else{
    //                        alert(nextProps.billingInfoReducer.billingRes.message);
    //                    }
    //                     this.props.clearResponse();
    //                }
    // }



      componentDidUpdate(){
        console.log("Response>>>>"+JSON.stringify(this.props.billingInfoReducer.billingRes));
         if(this.props.billingInfoReducer.billingRes!=''){
           this.setState({isSpinnerVisible:false})
           if(this.props.billingInfoReducer.billingRes.status==="success"){
                   this.setState({signUpData:this.props.billingInfoReducer.billingRes.data})
                  
            AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.billingInfoReducer.billingRes.data));
            console.log("BillingINfoResponse====================================="+ this.props.billingInfoReducer.billingRes.data)
            if(this.state.checked){
                Actions.servicePreferences({type:"reset"})
            }

            else if(!this.state.checked){
            
             Actions.billingshipmentInformation({type:"reset"})
            }
            
           
                
                  
           }
           else{
               alert(this.props.billingInfoReducer.billingRes.message);
           }
            this.props.clearResponse();
       }
       
   }
  


    //  componentDidUpdate(){
    //         console.log("====== Billing Response ========"+JSON.stringify(this.props.billingInfoReducer.billingRes));
    //          if(this.props.billingInfoReducer.billingRes!=''){
    //            this.setState({isSpinnerVisible:false})

    //            alert(this.props.billingInfoReducer.billingRes)
    //            if(this.props.billingInfoReducer.billingRes.status==="success"){
    //                 //    this.setState({signUpData:this.props.contactreducer.signupRes.data})

    //                 //    AsyncStorage.setItem("UserInfo", JSON.stringify(this.props.contactreducer.signupRes.data));
    //                 //    Actions.servicePreferences({type:"reset"})
    //            }else{
    //                alert(this.props.billingInfoReducer.billingRes.message);
    //            }
    //             this.props.clearResponse();
    //        }

    //    }


    submit() {
        if (this.props.billingInfoReducer.address.trim() == '') {
            this.setState({ isAddress: false });
         


        } else if (this.props.billingInfoReducer.city.trim() == '') {
            this.setState({ isCityName: false });
       

        } else if (this.props.billingInfoReducer.state.trim() == '') {
            this.setState({ isState: false });
       

        }
         else if (this.props.billingInfoReducer.zipcode.trim() == '') {
            this.setState({ isZipcode: false });

    
} 
    else if (!validateNumber(this.props.billingInfoReducer.zipcode.trim())) {
    alert("Enter correct zipcode")
    }
        
        else if (this.props.billingInfoReducer.zipcode.trim()<6) {
        alert("Enter correct zipcode")
        }

        // else if (this.props.billingInfoReducer.zipcode.trim()>6) {
        //     alert("Enter correct zipcode")
        // }

        else if (this.props.billingInfoReducer.phonenumber == '') {
            this.setState({ isPhoneNumber: false });
            // alert("Please enter phonenumber")
        } 
      

        else if (!validateNumber(this.props.billingInfoReducer.phonenumber)) {
            alert("Enter correct number")
        }
        else if (this.props.billingInfoReducer.phonenumber.trim().length<10) {
            alert("Enter 10 digit phone number")
        }
        
        else if (this.props.billingInfoReducer.phonenumber.trim().length>10) {
            alert("Enter 10 digit phone number")
        }


        else {

            if (this.state.checked) {
    
                postData = {
                    _id:this.state.userInfo._id,
                    billing_address: this.props.billingInfoReducer.address,
                    billing_state: this.props.billingInfoReducer.state,
                    billing_city: this.props.billingInfoReducer.city,
                    billing_zipcode: this.props.billingInfoReducer.zipcode,
                    shipping_address: this.props.billingInfoReducer.address,
                    shipping_state: this.props.billingInfoReducer.state,
                    shipping_zipcode: this.props.billingInfoReducer.zipcode,
                    shipping_city: this.props.billingInfoReducer.city,
                    contact_no: parseInt(this.props.billingInfoReducer.phonenumber),
                    savedScreen: "BILLINGCONTACTINFORMATIONWITHSHIPPING"
                }

    
                

            this.setState({ isSpinnerVisible: true })
            this.props.billingSignup(postData);
}
           
      else if(!this.state.checked) {

        postData = {
            _id:this.state.userInfo._id,
            billing_address: this.props.billingInfoReducer.address,
            billing_state: this.props.billingInfoReducer.state,
            billing_city: this.props.billingInfoReducer.city,
            billing_zipcode: this.props.billingInfoReducer.zipcode,
            contact_no: parseInt(this.props.billingInfoReducer.phonenumber),
            savedScreen: "BILLINGCONTACTINFORMATION"
        }


        

    this.setState({ isSpinnerVisible: true })
    this.props.billingSignup(postData);
            }
  }

    }



    saveForShipmentCheckBox(checked) {
        if (checked == false) { this.setState({ checked: true }) }
        else if (checked == true) { this.setState({ checked: false }) }
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
                                value={this.props.billingInfoReducer.address}


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
                                    value={this.props.billingInfoReducer.city}
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
                                    value={this.props.billingInfoReducer.state}
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
                                    value={this.props.billingInfoReducer.zipcode}
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
                                    value={this.props.billingInfoReducer.phonenumber}
                                    // onChangeText={null}
                                    value={null}

                                />
                            </View>
                            {

                                (!this.state.isPhoneNumber) ? <View style={{ flex: 0.1 }}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                                </View> : <View style={{ flex: 0.1 }} />
                            }

                        </View>
                    </View>

                    <View style={{ padding: 20 }}>
                        <CheckBox
                            label='USE THIS ADDRESS FOR SHIPMENT'
                            checked={this.state.checked}
                            onChange={(checked) => this.saveForShipmentCheckBox(checked)}
                        />

                    </View>



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
        billingInfoReducer: state.billingInfoReducer
    }
}


export default connect(
    mapStateToProps,
    {
        billingSignup,
        addressChanged,
        cityChanged,
        stateChanged,
        emailChanged,
        zipcodeChanged,
        showLoading,
        resetState,
        clearResponse,
        phoneNumberChanged
    }

)(BillingContactInformation)

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