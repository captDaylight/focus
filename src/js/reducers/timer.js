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
	sessions: [],
	duration: 40000, // 30 secs
};

export default function timer(state=initialState, action) {
	switch(action.type) {
		case SET_TIMER:
			const session = {
				date: action.date,
				duration: action.duration,
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
			return initialState;

		default:
			return state;
	}
}