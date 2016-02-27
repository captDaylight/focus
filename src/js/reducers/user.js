import {} from '../actions/user';

const initialState = {
	token: '',
	email: '',
}

export default function user(state=initialState, action) {
	switch(action.type) {
		default: 
			return state;
	}
}