export const SET_TIMER = 'SET_TIMER';
export function setTimer(date) {
	return {
		type: SET_TIMER,
		date
	}
}