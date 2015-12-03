import { HYDRATE_STATE, unflagHydrate } from '../actions/hydrate';
import { countDown } from '../actions/timer';

export default function createStorageListener(store, issuerID) {
	return data => {
		// each sync is sent with the id combined with a current time
		// stamp, this ensures that there is always a new issuer value
		const eventIssuerID = data.issuer.newValue.split('-')[0];
	
		// check if issuer id matches this instance
		if (eventIssuerID !== issuerID && 'state' in data) {
			const { newValue, oldValue } = data.state;
			console.log('event', newValue.timer.date);
			debugger;
			store.dispatch({
				type: HYDRATE_STATE,
				state: newValue,
			});

			// if the time has changed, kickstart the countdown
			if (newValue.timer.date !== oldValue.timer.date) {
				store.dispatch(countDown(store.getState().timer.date));
			}
		}
	};
}