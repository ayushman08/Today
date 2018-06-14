import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	child_name: '',
	
    isHomeScreenLoading: false,
    childInfoRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.HOME_PROPERTY_LIST_FETCHING_DATA:
			return { ...state, isHomeScreenLoading: true }

		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

		case ACTION_TYPES.CHILD_NAME_CHANGED:
			return { ...state, child_name: action.payload, isHomeScreenLoading: false }


        case ACTION_TYPES.CHILD_INFO_RESPONSE:
			return { ...state, childInfoRes: action.payload, isHomeScreenLoading: false }
			
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, childInfoRes: '', isHomeScreenLoading: false }

	   default:
			return state;
	}

};
