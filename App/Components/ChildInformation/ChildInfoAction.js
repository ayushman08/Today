import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const childNameChanged = (text) => {
  return {
    type: ACTION_TYPES.CHILD_NAME_CHANGED,
    payload: text
  };
};


  export const clearResponse = () => {
    return {
      type: ACTION_TYPES.CLEAR_RESPONSE,
     
    }
  };


// export const showLoading = () => {
//     return {
//       type: ACTION_TYPES.FETCH_SIGNUP_RESPONSE_DATA,
     
//     }
//   };
  




