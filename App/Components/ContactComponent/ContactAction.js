import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const firstNameChanged = (text) => {
  return {
    type: ACTION_TYPES.FIRST_NAME_CHANGED,
    payload: text
  };
};

// Password TextField Value Change
export const lastNameChanged = (text) => {
  return {
    type: ACTION_TYPES.LAST_NAME_CHANGED,
    payload: text
  }
};

export const emailChanged = (text) => {
    return {
      type: ACTION_TYPES.EMAIL_CHANGED,
      payload: text
    }
  };

  
  export const passwordChanged = (text) => {
    return {
      type: ACTION_TYPES.PASSWORD_CHANGED,
      payload: text
    }
  };

  export const clearResponse = () => {
    return {
      type: ACTION_TYPES.CLEAR_RESPONSE,
     
    }
  };


  export const showLoading = () => {
    return {
      type: ACTION_TYPES.FETCH_SIGNUP_RESPONSE_DATA,
     
    }
  };
  
