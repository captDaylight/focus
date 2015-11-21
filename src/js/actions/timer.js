export const SET_TIMER = 'SET_TIMER';
export function setTimer(date) {
	return {
		type: SET_TIMER,
		date
	}
}

export const CLEAR_TIMER = 'CLEAR_TIMER';
export function clearTimer() {
	return {
		type: CLEAR_TIMER,
	}
}

export const SET_TIME_LEFT = 'SET_TIME_LEFT';
export function setTimeLeft(minutes, seconds) {
	return {
		type: SET_TIME_LEFT,
		minutes,
		seconds,
	}
}

export const SET_COUNTDOWN_INTERVAL = 'SET_COUNTDOWN_INTERVAL';
export function setCountdownInterval(interval) {
	return {
		type: SET_COUNTDOWN_INTERVAL,
		interval
	}
}

export const CLEAR_COUNTDOWN_INTERVAL = 'CLEAR_COUNTDOWN_INTERVAL';
export function clearCountdownInterval() {
	return {
		type: CLEAR_COUNTDOWN_INTERVAL,
	}
}


const MINUTE = 60000;
const SECOND = 1000;

function doubleDigit(amount) {
	return amount < 10 ? `0${amount}` : `${amount}`;
}

export function countDown(date) {
	return dispatch => {
		const setTime = () => {
			const fromNow = date - Date.now();
			if (fromNow >= 0) {
				const minutes = doubleDigit(Math.floor(fromNow / MINUTE));
				const seconds = doubleDigit(Math.floor(fromNow / SECOND) % 60);
				dispatch(setTimeLeft(minutes, seconds));				
			} else {
				dispatch(clearCountdownInterval())
			}
		};

		setTime();

		const countdownInterval = setInterval(() => {
			setTime();
		}, 1000);

		dispatch(setCountdownInterval(countdownInterval));
	}
}