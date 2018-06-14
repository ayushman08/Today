import { put, call, takeEvery, takeLatest, select, cps } from 'redux-saga/effects';
import API from '../Constants/APIUrls';
import API_CONST from '../Constants/APIConstants';
import ACTION_TYPES from '../Action/ActionTypes';



//Call for fetching data from api
const _apiCall = (url, data) => {
	console.log('Api request',data);
	return fetch(url, data)
		.then((res) => {
			console.log('Api response',res);
			return { res: res, res_json: res.json() };
		})
		.catch((e) => {
			throw e;
		});
};

const _woocomerce = (url) => {
	console.log('Api request',url);
	return Api.get(url)
	.then((data) => {
		console.log("DATA>>>>> "+JSON.stringify(data));
		return data;
	})
	.catch((e) => {
		throw e;
	});
}

//get response json
const _extJSON = (p) => {
	return p.then((res) => res);
};

function* userSignup(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.SIGNUP_USER_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}

function* sendServicePreference(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.SERVICE_PREF_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* selectKids(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.KIDS_SELECTION_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* selectWhoWillDecide(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.WHAT_TO_BUY_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}

function* getBrands() {
   
	try {
		let response = yield call(_apiCall, API.BRANDS_LIST, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.BRAND_LIST_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* getSizes() {
   
	try {
		let response = yield call(_apiCall, API.GET_SIZES, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.SIZE_AND_PROPORTION_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}

function* sendSizeAndProportion(action) {
	var postData = action.data;
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
			
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.SEND_DATA_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}

function* sendBrandsData(action) {
	var postData = action.data;
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
			
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.SEND_BRAND_DATA_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* userDOBSignUp(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.CHILD_INFO_RESPONSE,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* pregnancyDOBSignUp(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log(responseJSON)
		yield put({
			type: ACTION_TYPES.PREGNANCY_DUEDATE_RESPONSE,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* getStyleList(action) {
    var postData = action.data;
    console.log("Post data>>>>"+postData)
	try {
		let response = yield call(_apiCall, API.GET_STYLE_LIST, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log("Response>>>>"+responseJSON)
		yield put({
			type: ACTION_TYPES.STYLE_LIST_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}



function* billingSignup(action) {
    var postData = action.data;
    console.log("========= Post data billingSignup ==========",postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
		console.log("Response>>>>"+responseJSON)
		console.log("BillingINfoResponse=====================================FROM SAGA"+responseJSON)
		yield put({

			
			type: ACTION_TYPES.BILLING_ADDRESS_RES,
			payload: responseJSON

		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}



function* billingshipmentSignup(action) {
    var postData = action.data;
    console.log("========= Post data billingSignup ==========",postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log("Response>>>>"+responseJSON)
		yield put({
			type: ACTION_TYPES.BILLING_SHIPMENT_ADDRESS_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}

function* styleSignup(action) {
    var postData = action.data;
    console.log("========= Post data billingSignup ==========",postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log("Response>>>>"+responseJSON)
		yield put({
			type: ACTION_TYPES.SELECTED_STYLE_LIST_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}


function* checkSignup(action) {
    var postData = action.data;
    // console.log("========= Post data billingSignup ==========",postData)
	try {
		let response = yield call(_apiCall, API.SIGNUP_USER, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		});
        var responseJSON = yield call(_extJSON, response.res_json);
        console.log("Response>>>>"+responseJSON)
		yield put({
			type: ACTION_TYPES.CHECK_SCREEN_RES,
			payload: responseJSON
		});
	} catch (e) {
		console.log('Error: ' + e);
	}
}



function* rootSaga() {


	//Login
	yield takeLatest(API_CONST.N_USER_SIGNUP, userSignup);
	yield takeLatest(API_CONST.N_SERVICE_PREF, sendServicePreference);
	yield takeLatest(API_CONST.N_SELECT_KIDS, selectKids);
	yield takeLatest(API_CONST.N_GET_BRANDS_LIST, getBrands);
	yield takeLatest(API_CONST.N_SELECT_WHO_WILL_DECIDE, selectWhoWillDecide);
	yield takeLatest(API_CONST.N_GET_SIZES, getSizes);
	yield takeLatest(API_CONST.N_SELECT_SIZE_AND_PROPORTION, sendSizeAndProportion);
	yield takeLatest(API_CONST.N_SEND_BRANDS_DATA, sendBrandsData);
	yield takeLatest(API_CONST.N_DOB_SELECT, userDOBSignUp);
	yield takeLatest(API_CONST.N_DUEDATE_SELECT, pregnancyDOBSignUp);
	yield takeLatest(API_CONST.N_GET_STYLE_LIST, getStyleList);
	yield takeLatest(API_CONST.N_BILLING_INFO_SELECT, billingSignup);
	yield takeLatest(API_CONST.N_BILLING_SHIPPING_INFO_SELECT, billingshipmentSignup);
	yield takeLatest(API_CONST.N_STYLE_INFO_SELECT, styleSignup);
	yield takeLatest(API_CONST.N_CHECK_INFO_SELECT, checkSignup);
}

export default rootSaga;
