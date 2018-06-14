import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	whatToBuyRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.WHAT_TO_BUY_RES:
			return { ...state, whatToBuyRes: action.payload, isHomeScreenLoading: false }
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, whatToBuyRes: '', isHomeScreenLoading: false }

		


		default:
			return state;
	}

};
