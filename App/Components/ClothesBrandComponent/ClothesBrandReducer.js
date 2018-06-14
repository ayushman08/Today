import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	brand_name: '',
	brandListRes:'',
	brandDataRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {


		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

		case ACTION_TYPES.BRAND_NAME_CHANGED:
			return { ...state, brand_name: action.payload, isHomeScreenLoading: false }
        case ACTION_TYPES.BRAND_LIST_RES:
			return { ...state, brandListRes: action.payload, isHomeScreenLoading: false }
		case ACTION_TYPES.SEND_BRAND_DATA_RES:
			return { ...state, brandDataRes: action.payload, isHomeScreenLoading: false }
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, brandDataRes: '', isHomeScreenLoading: false }

		


		default:
			return state;
	}

};
