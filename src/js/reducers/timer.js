import { 
	SET_TIMER,
	CLEAR_TIMER,
	SET_TIME_LEFT,
	SET_COUNTDOWN_INTERVAL,
	CLEAR_COUNTDOWN_INTERVAL,
} from '../actions/timer';

// timer data gets cleared
const timerInitial = {
	date: null,
	timeRemaining: null,
	minutes: null,
	seconds: null,
	countdownInterval: null,	
}

// meta data does not get cleared
const metaInitial = {
	sessions: [],
	duration: 20000, // 30 secs
	ampm: true, // am pm OR military time
}

// combine timerInitial and metaInitial to form initialstate
const initialState = {...timerInitial, ...metaInitial};

export default function timer(state=initialState, action) {
	switch(action.type) {
		case SET_TIMER:
			const session = {
				date: action.date,
				duration: state.duration,
			};
			return {
				...state, 
				date: action.date, 
				sessions: [...state.sessions, session]
			};

		case SET_TIME_LEFT:
			const { minutes, seconds } = action;
			return {...state, minutes, seconds };

		case SET_COUNTDOWN_INTERVAL:
			return {...state, interval: action.interval};

		case CLEAR_COUNTDOWN_INTERVAL:
			return {...state, timerInitial};

		default:
			return state;
	}
}