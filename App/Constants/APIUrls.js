const BASE_URL = 'http://52.34.207.5:5032/';
const URL = 'http://52.34.207.5:5095';
const CHAT_CONNECTION_URL='http://52.34.207.5:5094';
//const BASE_URL = 'http://172.10.56.36:5095/api/';//ankur
//const BASE_URL = 'http://172.10.55.104:5095/api/';//LL


const API = {

	SIGNUP_USER							: 	BASE_URL + 'api/signup',
	BRANDS_LIST							:	BASE_URL + 'api/getBrand',
	GET_SIZES							:   BASE_URL + 'api/getSize',
	GET_STYLE_LIST						:   BASE_URL + 'api/getStyle',

}

export default API