import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	first_name: '',
	last_name: '',
	email: '',
    password: '',
    isHomeScreenLoading: false,
    signupRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.HOME_PROPERTY_LIST_FETCHING_DATA:
			return { ...state, isHomeScreenLoading: true }

		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

		case ACTION_TYPES.FIRST_NAME_CHANGED:
			return { ...state, first_name: action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.LAST_NAME_CHANGED:
			return { ...state, last_name: action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.EMAIL_CHANGED:
			return { ...state, email: action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.PASSWORD_CHANGED:
            return { ...state, password: action.payload, isHomeScreenLoading: false }
        case ACTION_TYPES.SIGNUP_USER_RES:
			return { ...state, signupRes: action.payload, isHomeScreenLoading: false }
		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, signupRes: '', isHomeScreenLoading: false }

		


		default:
			return state;
	}

};
