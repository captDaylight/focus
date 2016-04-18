import {
	ADD_USER,
	LOGOUT,
	LOGIN_ERROR,
	REGISTER_ERROR,
} from '../actions/user';

const initialState = {
	token: '',
	email: '',
	loginError: '',
	registerError: '',
}

export default function user(state=initialState, action) {
	switch(action.type) {
		case ADD_USER:
			console.log('adding user', action);
			return {...state, token: action.token, ...action.userData};

		case LOGOUT: 
			return {...initialState}

		case LOGIN_ERROR:
			return {...state, loginError: action.message}

		case REGISTER_ERROR: 
			return {...state, registerError: action.message}

		default: 
			return state;
	}
}