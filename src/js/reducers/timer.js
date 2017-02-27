import {
  SET_TIMER,
  CLEAR_TIMER,
  SET_TIME_LEFT,
  SET_COUNTDOWN_INTERVAL,
  CLEAR_COUNTDOWN_INTERVAL,
  UPDATE_SESSIONS,
  TOGGLE_ASK_CANCEL_TIME,
  SET_TIMER_LENGTH,
  TOGGLE_NOTIFICATION_SOUND,
  TOGGLE_TICKING
} from '../actions/timer';

const MINUTE = 60000;

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
  ampm: true, // am pm OR military time
  sound: 'chime',
  notification: true,
  ticking: false,
  askCancelTimer: false
}

// combine timerInitial and metaInitial to form initialstate
const initialState = {...timerInitial, ...metaInitial};

const removeLast = array => {
  const newArray = [...array];
  newArray.pop();
  return newArray;
};

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
      return {...state, ...timerInitial};

    case UPDATE_SESSIONS:
      return {...state, sessions: action.sessions};

    case TOGGLE_ASK_CANCEL_TIME:
      return {...state, askCancelTimer: !state.askCancelTimer};

    case CLEAR_TIMER:
      return {
        ...state,
        ...timerInitial,
        sessions: removeLast(state.sessions),
        askCancelTimer: false
      };

    case SET_TIMER_LENGTH:
      const { incOrDec } = action;
      let newDuration;

      if (incOrDec === 'INCREMENT') {
        // can't be greater than 60 minutes
        newDuration = state.duration < 3600000
          ? state.duration + MINUTE : state.duration;
      } else {
        newDuration = state.duration > MINUTE
          ? state.duration - MINUTE : state.duration;
      }
      return {...state, duration: newDuration};

    case TOGGLE_NOTIFICATION_SOUND:
      console.log('toggling notification sound');
      return {...state, notification: !state.notification };

    case TOGGLE_TICKING:
      return {...state, ticking: !state.ticking};

    default:
      return state;
  }
}
