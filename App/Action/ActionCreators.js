import API_CONST from '../Constants/APIConstants';

//For user login
export const userSignup = (data) => {
    console.log(data)
  return {
    type: API_CONST.N_USER_SIGNUP,
    data
  };
};

export const sendServicePreference = (data) => {
  console.log(data)
return {
  type: API_CONST.N_SERVICE_PREF,
  data
};
};

export const selectKids = (data) => {
  console.log(data)
return {
  type: API_CONST.N_SELECT_KIDS,
  data
};
};

export const getBrands = () => {
  
return {
  type: API_CONST.N_GET_BRANDS_LIST,
};
};

export const selectWhoWillDecide = (data) => {
  
  return {
    type: API_CONST.N_SELECT_WHO_WILL_DECIDE,
    data
  };
  };

  export const getSizes = () => {
  
    return {
      type: API_CONST.N_GET_SIZES,
    };
    };

    export const sendSizeAndProportion = (data) => {
  
      return {
        type: API_CONST.N_SELECT_SIZE_AND_PROPORTION,
        data
      };
      };

      export const sendBrandsData = (data) => {
  
        return {
          type: API_CONST.N_SEND_BRANDS_DATA,
          data
        };
        };

        export const userDOBSignUp = (data) => {
          console.log(data)
          return {
            type: API_CONST.N_DOB_SELECT,
            data
          };
          };
          
          
          export const pregnancyDOBSignUp = (data) => {
            console.log(data)
            return {
              type: API_CONST.N_DUEDATE_SELECT,
              data
            };
            };

            
            export const getStyleList = (data) => {
              console.log(data)
              return {
                type: API_CONST.N_GET_STYLE_LIST,
                data
              };
              };        

 
              
              export const billingSignup = (data) => {
                console.log(data)
                return {
                  type: API_CONST.N_BILLING_INFO_SELECT,
                  data
                };
                };  

                export const billingshipmentSignup = (data) => {
                  console.log(data)
                  return {
                    type: API_CONST.N_BILLING_SHIPPING_INFO_SELECT,
                    data
                  };
                  };  


                  export const styleSignup = (data) => {
                    console.log(data)
                    return {
                      type: API_CONST.N_STYLE_INFO_SELECT,
                      data
                    };
                    };  

                    export const checkSignup = (data) => {
                      console.log(data)
                      return {
                        type: API_CONST.N_CHECK_INFO_SELECT,
                        data
                      };
                      };  
  