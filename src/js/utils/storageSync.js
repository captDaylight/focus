import { unflagHydrate } from '../actions/hydrate';

export default function storageSync(store, issuerID) {
	let prevState = store.getState();
	return () => {
		// issuer appended with current time stamp, so that issuer key is 
		// always passed as new value

		const objSync = {
			state: store.getState(),
			issuer: `${issuerID}-${Date.now()}`,
		};
		console.log(objSync.state.hydrate.flag, prevState.hydrate.flag);
		debugger;
		// don't sync if state has been hydrated from storage listener
		if (objSync.state.hydrate.flag || prevState.hydrate.flag) {

			store.dispatch(unflagHydrate());
		} else {		
			// hourly max set quota is 1800, or once every 2 seconds
			// have to make sure not to overpost, ie, each second with the timer
			if (objSync.state.timer !== prevState.timer) {
				if (objSync.state.timer.date !== prevState.timer.date) {
					console.log('SYNCING 1');
					chrome.storage.sync.set(objSync);
				}
			} else {
				console.log('SYNCING 2');
				chrome.storage.sync.set(objSync);
			}
		}

		// set previous state
		prevState = objSync.state;
		console.log('setting prevState', prevState);
		debugger;
	}
};
