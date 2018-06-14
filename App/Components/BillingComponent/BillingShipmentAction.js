import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const addressshipmentChanged = (text) => {
  return {
    type: ACTION_TYPES.ADRESS_SHIPMENT_CHANGED,
    payload: text
  };
};

// Password TextField Value Change
export const cityshipmentChanged = (text) => {
  return {
    type: ACTION_TYPES.CITY_SHIPMENT_CHANGED,
    payload: text
  }
};

export const stateshipmentChanged = (text) => {
    return {
      type: ACTION_TYPES.STATE_SHIPMENT_CHANGED,
      payload: text
    }
  };

  
  export const zipcodeshipmentChanged = (text) => {
    return {
      type: ACTION_TYPES.ZIPCODE_SHIPMENT_CHANGED,
      payload: text
    }
  };

  export const phoneNumbershipmentChanged = (text) => {
    return {
      type: ACTION_TYPES.PHONE_NUMBER_SHIPMENT_CHANGED,
      payload: text
    }
  };

  export const clearResponse = () => {
    return {
      type: ACTION_TYPES.CLEAR_RESPONSE,
     
    }
  };


  // export const showLoading = () => {
  //   return {
  //     type: ACTION_TYPES.FETCH_SIGNUP_RESPONSE_DATA,
     
  //   }
  // };
  
