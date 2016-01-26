
// TODO REMOVE THIS 
import $ from 'jquery';

export default function storageSync(initState) {
	let prevState = initState;
	return state => {
		const objSync = {
			state,
		};

		// hourly max set quota is 1800, or once every 2 seconds
		// have to make sure not to overpost, ie, each second with the timer
		if (objSync.state.timer !== prevState.timer) {
			if (objSync.state.timer.date !== prevState.timer.date) {
				console.log('Should Storage 1', state);
				$.post('http://localhost:8080/api/events', {type:'syncing 1', data: objSync}, () => {});
				chrome.storage.sync.set(objSync);
			}
		} else {
			console.log('Should Storage 2', state);
			$.post('http://localhost:8080/api/events', {
				type:'syncing 2',
				data: {new: objSync, old: prevState}}, () => {});
			chrome.storage.sync.set(objSync);
		}

		// set previous state
		prevState = objSync.state;
	}
};
