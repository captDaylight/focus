import formatAMPM from '../utils/formatAMPM';
import doubleDigit from '../utils/doubleDigit';

let countdownInterval;
const tickingSound = new Audio('dist/sound/tick.mp3');
const audio = new Audio('dist/sound/chime.mp3');
tickingSound.loop = true;

export const SET_TIMER = 'SET_TIMER';
export function setTimer(date) {
  return {
    type: SET_TIMER,
    date,
  };
}

export const CLEAR_TIMER = 'CLEAR_TIMER';
export function reduxClearTimer() {
  clearInterval(countdownInterval);
  tickingSound.pause();
  return {
    type: CLEAR_TIMER,
  };
}

export function clearTimer() {
  return (dispatch, getState) => {
    const { timer: { sessions }, user: { id } } = getState();
    const currentSession = sessions[sessions.length - 1];
    dispatch(reduxClearTimer());

    fetch(`${process.env.API_URL}api/session/${currentSession.date}`, {
      body: JSON.stringify({
        UserId: parseInt(id, 10),
      }),
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  }
}

export const SET_TIME_LEFT = 'SET_TIME_LEFT';
export function setTimeLeft(minutes, seconds) {
  return {
    type: SET_TIME_LEFT,
    minutes,
    seconds,
  };
}

export const SET_COUNTDOWN_INTERVAL = 'SET_COUNTDOWN_INTERVAL';
export function setCountdownInterval(interval) {
  return {
    type: SET_COUNTDOWN_INTERVAL,
    interval,
  };
}

export const CLEAR_COUNTDOWN_INTERVAL = 'CLEAR_COUNTDOWN_INTERVAL';
export function clearCountdownInterval() {
  return {
    type: CLEAR_COUNTDOWN_INTERVAL,
  };
}

export const UPDATE_SESSIONS = 'UPDATE_SESSIONS';
export function updateSessions(sessions) {
  return {
    type: UPDATE_SESSIONS,
    sessions,
  };
}

const MINUTE = 60000;
const SECOND = 1000;

export function startCountDown(date, duration, notification, ticking) {
  if (ticking) {
    // play ticking sound on loop
    tickingSound.play();
  }
  return (dispatch) => {
    const dateEnd = date + duration;
    const setTime = (interval) => {
      const fromNow = dateEnd - Date.now();
      if (fromNow >= 0) {
        const minutes = doubleDigit(Math.floor(fromNow / MINUTE));
        const seconds = doubleDigit(Math.floor(fromNow / SECOND) % 60);
        dispatch(setTimeLeft(minutes, seconds));
      } else {
        clearInterval(interval);
        dispatch(clearCountdownInterval());
        chrome.notifications.create({
          title: 'SESSION DONE',
          message: `Finished at ${formatAMPM(Date.now(), true)}`,
          type: 'basic',
          iconUrl: 'dist/img/logo-lg-blue.png',
        });
        tickingSound.pause();
        if (notification) {
          audio.play();
        }
      }
    };

    // start interval when you are on top of a second, otherwise you might
    // open the browser mid second and have timers that are out of sync
    setTimeout(() => {
      // set time everysecond
      countdownInterval = setInterval(() => {
        setTime(countdownInterval); // set times each interval
      }, 1000);

      // set time first after timeout
      setTime(countdownInterval);
      dispatch(setCountdownInterval(countdownInterval));
    }, (dateEnd - Date.now()) % SECOND);

    chrome.browserAction.setIcon({path: 'dist/img/logo-sm-red.png'});
    setTime(); // initial time before timeout
  };
}

export function countDown(date, duration, notification, ticking = false) {
  return (dispatch, getState) => {
    const { user: { id } } = getState();
    fetch(`${process.env.API_URL}api/session`, {
      body: JSON.stringify({
        UserId: id,
        date,
        duration,
      }),
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    dispatch(setTimer(date));
    dispatch(startCountDown(date, duration, notification, ticking));
  };
}

export const TOGGLE_ASK_CANCEL_TIME = 'TOGGLE_ASK_CANCEL_TIME';
export function toggleAskCancelTimer() {
  return {
    type: TOGGLE_ASK_CANCEL_TIME,
  };
}

export const SET_TIMER_LENGTH = 'SET_TIMER_LENGTH';
export function setTimerLength(incOrDec = 'INCREMENT') {
  return {
    type: SET_TIMER_LENGTH,
    incOrDec,
  };
}
export const TOGGLE_NOTIFICATION_SOUND = 'TOGGLE_NOTIFICATION_SOUND';
export function toggleNotificationSound() {
  return {
    type: TOGGLE_NOTIFICATION_SOUND,
  };
}

export const TOGGLE_TICKING = 'TOGGLE_TICKING';
export function toggleTicking() {
  return {
    type: TOGGLE_TICKING,
  };
}
