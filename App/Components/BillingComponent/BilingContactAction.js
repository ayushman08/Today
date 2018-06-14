import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const addressChanged = (text) => {
  return {
    type: ACTION_TYPES.ADRESS_CHANGED,
    payload: text
  };
};

// Password TextField Value Change
export const cityChanged = (text) => {
  return {
    type: ACTION_TYPES.CITY_CHANGED,
    payload: text
  }
};

export const stateChanged = (text) => {
    return {
      type: ACTION_TYPES.STATE_CHANGED,
      payload: text
    }
  };

  
  export const zipcodeChanged = (text) => {
    return {
      type: ACTION_TYPES.ZIPCODE_CHANGED,
      payload: text
    }
  };

  export const phoneNumberChanged = (text) => {
    return {
      type: ACTION_TYPES.PHONE_NUMBER_CHANGED,
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
  
