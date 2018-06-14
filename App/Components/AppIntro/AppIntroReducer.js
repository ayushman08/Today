import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	checkprefRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.HOME_PROPERTY_LIST_FETCHING_DATA:
			return { ...state, isHomeScreenLoading: true }

		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.CHECK_SCREEN_RES:
            return { ...state, checkprefRes: action.payload, isHomeScreenLoading: false }
            
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, checkprefRes: '', isHomeScreenLoading: false }

		default:
			return state;
	}

};