import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import createStorageSync from './utils/storageSync';
import * as timer from './actions/timer';
import * as websites from './actions/websites';
import * as todos from './actions/todos';
import * as user from './actions/user';

function sessionCheck(sessions, duration){
	console.log(sessions[sessions.length - 1].date, Date.now(), sessions[sessions.length - 1].date > Date.now());
	const { date } =  sessions[sessions.length - 1];
	return (date + duration) > Date.now();
}

const init = initState => {
	const createAndComposeStore = compose(
		applyMiddleware(thunkMiddleware)
	)(createStore);

	const store = initState 
		? createAndComposeStore(rootReducer, initState)
		: createAndComposeStore(rootReducer);

	const storageSync = createStorageSync(store.getState());

	const { sessions, duration, sound } = store.getState().timer;
	if (sessions.length > 0) {
		if (sessionCheck(sessions, duration)) {
			// if timer is still going on init, restart countdown
			const state = store.getState();
			const { date } = sessions[sessions.length - 1]; 
			store.dispatch(timer.startCountDown(date, (date + duration) - Date.now(), sound));
		} else {
			// clear timer info
			store.dispatch(timer.clearCountdownInterval());
			chrome.storage.sync.set(store.getState());
		}
	} else {
		storageSync(store.getState());
	}

	
	// subscribe to store and sync chrome state
	store.subscribe(() => {
		const state = store.getState();
		const statePayload = { type: 'STATE_UPDATE', data: state };
		console.log('STATE CHANGE');
		if (state.timer.date) {
			const {duration, date} = state.timer;
			const timeLeft = (date + duration) - Date.now();
			if (timeLeft > 60000) {
				const minutesLeft = Math.floor((timeLeft) / 60000).toString();
				chrome.browserAction.setBadgeText({text: `${minutesLeft}m`}); 
			} else {
				const secondsLeft = Math.floor((timeLeft) / 1000).toString();	
				chrome.browserAction.setBadgeText({text: `${secondsLeft}s`}); 
			}
			// chrome.browserAction.setIcon({path: icon});
			// suchrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		} else {
			chrome.browserAction.setBadgeText({text: ''});
		}
		storageSync(state);
		
		// for the popup
		chrome.runtime.sendMessage(statePayload);

		// for the blocker
		chrome.tabs.query(
			{currentWindow: true, active : true},
			tab => {
				if (tab.length !== 0) {
					console.log('sending message');
					chrome.tabs.sendMessage(tab[0].id, {...statePayload, dest: 'BLOCKER'})
				}
			}
		)
	});

	chrome.tabs.onActivated.addListener((info) => {
		const state = store.getState();
		const statePayload = { type: 'STATE_UPDATE', data: state };
		const tabId = info.tabId;
		const windowId = info.windowId;
		chrome.tabs.sendMessage(tabId, statePayload);
	});

	// TODO: switch this to long-lived connection
	// https://developer.chrome.com/extensions/messaging#connect
	chrome.extension.onMessage.addListener((req, sender, sendRes) => {
		const actions = {...timer, ...websites, ...todos, ...user};

		if (req.type === 'ACTION') {
			console.log('req action');
			store.dispatch(actions[req.action](...req.data));
		}
		return true;
	});
};
// console.log(chrome.storage.sync.clear());
chrome.storage.sync.get(null, data => {
	init(Object.keys(data).length !== 0 ? data : false);
});