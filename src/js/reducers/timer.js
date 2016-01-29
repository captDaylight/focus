import { 
	SET_TIMER,
	CLEAR_TIMER,
	SET_TIME_LEFT,
	CLEAR_COUNTDOWN,
} from '../actions/timer';

// timer data gets cleared
const timerInitial = {
	date: null,
	dateEnd: null,
	timeRemaining: null,
	minutes: null,
	seconds: null,
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
			const session = {
				date: action.date,
				duration: state.duration,
				dateEnd: action.date + state.duration,
			};
			return {
				...state, 
				date: action.date, 
				dateEnd: action.date + state.duration,
				sessions: [...state.sessions, session]
			};

		case SET_TIME_LEFT:
			const { minutes, seconds } = action;
			return {...state, minutes, seconds };

		case CLEAR_COUNTDOWN:
			return {...state, ...timerInitial};

		default:
			return state;
	}
}