import { 
	SET_TIMER,
	CLEAR_TIMER,
	SET_TIME_LEFT,
	SET_COUNTDOWN_INTERVAL,
	CLEAR_COUNTDOWN_INTERVAL,
} from '../actions/timer';

const initialState = {
	date: null,
	timeRemaining: null,
	minutes: null,
	seconds: null,
	countdownInterval: null,
};

export default function timer(state=initialState, action) {
	console.log(action);
	switch(action.type) {
		case SET_TIMER:
			return {...state, date: action.date};

		case CLEAR_TIMER:
			return {...state, date: null};

		case SET_TIME_LEFT:
			const { minutes, seconds } = action;
			console.log('setting time left', minutes, seconds);
			console.log({...state, minutes, seconds });
			return {...state, minutes, seconds };

		case SET_COUNTDOWN_INTERVAL:
			return {...state, interval: action.interval};

		case CLEAR_COUNTDOWN_INTERVAL:
			return initialState;
			
		default:
			return state;
	}
}