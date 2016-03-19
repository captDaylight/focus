import update from 'react/lib/update';
import findIndex from 'lodash/array/findIndex';
import { 
	SET_TIMER,
	CLEAR_TIMER,
	SET_TIME_LEFT,
	SET_COUNTDOWN_INTERVAL,
	CLEAR_COUNTDOWN_INTERVAL,
	UPDATE_SESSIONS,
	UPDATE_SESSION,
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

function updateSession(state, action) {
	const sIdx = findIndex(state.sessions, s => {
		console.log(s, action.session);
		return s.start.toString() === action.session.start
	});
	console.log('INDEX',sIdx);
	console.log(update(state, {
		sessions: {
			[sIdx]: {
				$merge: action.session
			}
		}
	}));
	return update(state, {
		sessions: {
			[sIdx]: {
				$merge: action.session
			}
		}
	});
}

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

		case UPDATE_SESSION:
			return updateSession(state, action);

		default:
			return state;
	}
}