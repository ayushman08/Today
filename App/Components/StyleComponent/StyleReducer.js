import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	styleListRes:'',
	selectedstyleListRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.STYLE_LIST_RES:
			return { ...state, styleListRes: action.payload}
			
	   case ACTION_TYPES.SELECTED_STYLE_LIST_RES:
			return { ...state, selectedstyleListRes: action.payload}

		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, styleListRes: ''}


        default:
			return state;
	}

};
