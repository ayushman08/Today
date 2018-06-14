import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {
	userName: '',
	password: '',
	loginRes: '',
	userEmail:'',
	forgotPassRes:'',
	isScreenLoading:false
}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.FETCHING_DATA:
			return { ...state, isScreenLoading: true }

		case ACTION_TYPES.RESET_DATA:
      		return INITIAL_STATE;
		
		case ACTION_TYPES.USER_NAME_CHANGED:
			return { ...state, userName: action.payload }
			case ACTION_TYPES.FORGOT_PASS_EMAIL_CHANGED:
			return { ...state, userEmail: action.payload }

		case ACTION_TYPES.PASSWORD_CHANGED:
			return { ...state, password: action.payload }
		
		case ACTION_TYPES.LOGIN_USER_RES:
			return { ...state, loginRes: action.payload,isScreenLoading:false }
		case ACTION_TYPES.FORGOT_PASS_RES:
			return { ...state, forgotPassRes: action.payload,isScreenLoading:false }

	
		default:
			return state;
	}

};
