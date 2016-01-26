import formatAMPM from '../utils/formatAMPM';
const { alarms } = chrome;

const MINUTE = 60000;
const SECOND = 1000;

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

export const CLEAR_COUNTDOWN = 'CLEAR_COUNTDOWN';
export function clearCountdown() {
	return { type: CLEAR_COUNTDOWN };
}

export const STOP_COUNTDOWN = 'STOP_COUNTDOWN';
export function stopCountdown(sound) {
	var audio = new Audio(`dist/sound/${sound}.mp3`);
	dispatch => {
		dispatch(clearCountdown());
		audio.play();
		chrome.notifications.create({
			title:'SESSION DONE',
			message: `Finished at ${formatAMPM(Date.now(), true)}`,
			type:'basic',
			iconUrl: 'dist/img/focus.png',
		});
	}
}

import doubleDigit from '../utils/doubleDigit';
export function calcTime(dateEnd) {
	return dispatch => {
		const fromNow = dateEnd - Date.now();
		const minutes = doubleDigit(Math.floor(fromNow / MINUTE));
		const seconds = doubleDigit(Math.floor(fromNow / SECOND) % 60);
		dispatch(setTimeLeft(minutes, seconds));
	}
}

export function countDown(date, duration) {
	
	return dispatch => {
		dispatch(setTimer(date));
		const dateEnd = date + duration;
		// const setTime = (interval) => {
		// 	const fromNow = dateEnd - Date.now();
		// 	if (fromNow >= 0) {
		// 		const minutes = doubleDigit(Math.floor(fromNow / MINUTE));
		// 		const seconds = doubleDigit(Math.floor(fromNow / SECOND) % 60);
		// 		dispatch(setTimeLeft(minutes, seconds));				
		// 	} else {
		// 		clearInterval(interval);

		// 		dispatch(clearCountdownInterval())
		// 	}
		// };

		// start interval when you are on top of a second, otherwise you might
		// open the browser mid second and have timers that are out of sync
		const timeTilNext = ((dateEnd - Date.now()) % SECOND) / MINUTE;
		alarms.create('TIME_TIL_TIMER_START', { delayInMinutes: timeTilNext });

		// setTimeout(() => {
		// 	// set time everysecond
		// 	const countdownInterval = setInterval(() => {
		// 		setTime(countdownInterval); // set times each interval
		// 	}, 1000);			
			
		// 	setTime(countdownInterval); // set time first after timeout
		// 	dispatch(setCountdownInterval(countdownInterval));
		// }, (dateEnd - Date.now()) % SECOND);

		calcTime(); // initial time before timeout
	}
}

