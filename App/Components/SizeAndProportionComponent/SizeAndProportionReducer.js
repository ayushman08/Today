import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

    sizeAndProportionRes:'',
    sendDataRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {
		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

        case ACTION_TYPES.SIZE_AND_PROPORTION_RES:
            return { ...state, sizeAndProportionRes: action.payload}
            case ACTION_TYPES.SEND_DATA_RES:
			return { ...state, sendDataRes: action.payload}
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, sendDataRes: ''}
        default:
			return state;
	}

};
