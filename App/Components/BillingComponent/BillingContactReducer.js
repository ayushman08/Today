import ACTION_TYPES from '../../Action/ActionTypes';
const INITIAL_STATE = {

	address: '',
	city: '',
	state: '',
	zipcode: '',
	country:"",
	phonenumber:"",
    isHomeScreenLoading: false,
    billingRes:''
	

}

export default (state = INITIAL_STATE, action) => {

	switch (action.type) {

		case ACTION_TYPES.HOME_PROPERTY_LIST_FETCHING_DATA:
			return { ...state, isHomeScreenLoading: true }

		case ACTION_TYPES.RESET_DATA:
			return INITIAL_STATE;

		case ACTION_TYPES.ADRESS_CHANGED:
			return { ...state, address: action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.CITY_CHANGED:
			return { ...state, city : action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.STATE_CHANGED:
			return { ...state, state : action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.ZIPCODE_CHANGED:
			return { ...state, zipcode: action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.PHONE_NUMBER_CHANGED:
			return { ...state, phonenumber: action.payload, isHomeScreenLoading: false }
			 
		case ACTION_TYPES.BILLING_ADDRESS_RES:
		
			return { ...state,  billingRes : action.payload, isHomeScreenLoading: false }

		case ACTION_TYPES.CLEAR_RESPONSE:
			return { ...state, billingRes: '', isHomeScreenLoading: false }


		default:
			return state;
	}

};
