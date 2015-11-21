import { 
	SET_TIMER,
	CLEAR_TIMER,
} from '../actions/timer';

const initialState = {
	date: null,
	timeRemaining: null,
};

export default function timer(state=initialState, action) {
	console.log(action);
	switch(action.type) {
		case SET_TIMER:
			return {...state, date: action.date};

		case CLEAR_TIMER:
			return {...state, date: null};

		default:
			return state;
	}
}