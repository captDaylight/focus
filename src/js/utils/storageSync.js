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
				chrome.storage.sync.set(objSync);
			}
		} else {
			console.log('Should Storage 2', state);
			chrome.storage.sync.set(objSync);
		}

		// set previous state
		prevState = objSync.state;
	}
};
