import { HYDRATE_STATE, unflagHydrate } from '../actions/hydrate';
import { countDown } from '../actions/timer';

export default function createStorageListener(store) {
	return data => {
		if ('state' in data) {
			const { newValue, oldValue } = data.state;

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