import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	kidsSelectionRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.KIDS_SELECTION_RES:
			return { ...state, kidsSelectionRes: action.payload}
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, kidsSelectionRes: ''}
        default:
			return state;
	}

};
