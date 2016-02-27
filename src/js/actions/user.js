import qwest from 'qwest';

export const ADD_USER = 'ADD_USER';
export function addUser(token, userData) {
	console.log('add user reducer');
	return {
		type: ADD_USER,
		token,
		userData
	}
}

export const REMOVE_USER = 'REMOVE_USER';
export function removeUser() {
	return {
		type: REMOVE_USER,
	}
}

export function register(email, password) {
	return dispatch => {
		qwest.post('http://localhost:3000/api/user',{
			email,
			password,
		})
		.then((xhr, res) => {
			console.log('succesful register', xhr, res);
			dispatch(addUser(res.token, res.user));
		})
		.catch((err, xhr, res) => {
			console.log('whoops no register', e, res);
		});
	}
}

export function login(email, password) {
	return dispatch => {
		qwest.post('http://localhost:3000/api/authenticate',{
			email,
			password,
		})
		.then((xhr, res) => {
			console.log('succesful auth', xhr, res);
			dispatch(addUser(res.token, res.user));
		})
		.catch((err, xhr, res) => {
			console.log('whoops no auth', e, res);
		});
	}
}

export const LOGOUT = 'LOGOUT';
export function logout() {
	return {
		type: LOGOUT,
	}
}