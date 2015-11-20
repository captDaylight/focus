import { SET_TIMER } from '../actions/timer';

const initialState = {
	date: null,
};

export default function timer(state=initialState, action) {
	console.log(action);
	switch(action.type) {
		case SET_TIMER:
			console.log('reducer', action );
			return {...state, date: action.date};

		default:
			return state;
	}
}