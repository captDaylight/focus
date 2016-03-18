import { 
	SET_TIMER,
	CLEAR_TIMER,
	SET_TIME_LEFT,
	SET_COUNTDOWN_INTERVAL,
	CLEAR_COUNTDOWN_INTERVAL,
	UPDATE_SESSIONS,
} from '../actions/timer';

// timer data gets cleared
const timerInitial = {
	date: null,
	minutes: null,
	seconds: null,
	countdownInterval: null,
}

// meta data does not get cleared
const metaInitial = {
	sessions: [],
	duration: 1500000, 
	// duration: 70000,
	// duration: 20000,
	ampm: true, // am pm OR military time
	sound: 'chime'
}

// combine timerInitial and metaInitial to form initialstate
const initialState = {...timerInitial, ...metaInitial};

export default function timer(state=initialState, action) {
	switch(action.type) {
		case SET_TIMER:
			return {
				...state, 
				date: action.session.start, 
				sessions: [...state.sessions, action.session]
			};

		case SET_TIME_LEFT:
			const { minutes, seconds } = action;
			return {...state, minutes, seconds };

		case SET_COUNTDOWN_INTERVAL:
			return {...state, interval: action.interval};

		case CLEAR_COUNTDOWN_INTERVAL:
			return {...state, ...timerInitial};

		case UPDATE_SESSIONS:
			return {...state, sessions: action.sessions};

		default:
			return state;
	}
}