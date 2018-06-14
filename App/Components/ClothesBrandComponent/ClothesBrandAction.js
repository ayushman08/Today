import ACTION_TYPES from '../../Action/ActionTypes';

// Email Or Username TextField Value Change
export const brandNameChanged = (text) => {
  return {
    type: ACTION_TYPES.BRAND_NAME_CHANGED,
    payload: text
  };
};


  export const clearResponse = () => {
    return {
      type: ACTION_TYPES.CLEAR_RESPONSE,
     
    }
  };


 
  
