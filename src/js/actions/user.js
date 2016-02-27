import qwest from 'qwest';

export const ADD_USER = 'ADD_USER';
export function addUser() {
	console.log('add user reducer');
	return {
		type: ADD_USER,
	}
}

export const REMOVE_USER = 'REMOVE_USER';
export function removeUser() {
	return {
		type: REMOVE_USER,
	}
}

export function login(email, password) {
	return dispatch => {
		qwest.post('http://localhost:3000/api/user',{
			email,
			password,
		})
		.then((xhr, res) => {
			console.log('succesful login', xhr, res);
			// dispatch(addUser());
		})
		.catch((err, xhr, res) => {
			console.log('whoops no login', e, res);
		});
	}
}


export function logout() {
	return dispatch => {

	}
}