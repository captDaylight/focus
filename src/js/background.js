import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import createStorageSync from './utils/storageSync';
import * as timer from './actions/timer';
import * as websites from './actions/websites';
import * as todos from './actions/todos';

// TODO REMOVE THIS 
import $ from 'jquery';

const createAndComposeStore = compose(
	applyMiddleware(thunkMiddleware)
)(createStore);

const store = createAndComposeStore(rootReducer);
const storageSync = createStorageSync(store.getState());

// store.dispatch(websites.addWebsite('read.com'));


// on init, sync state
$.post('http://localhost:8080/api/events', {type:'INIT SYNC', data:{message: 'none'}}, () => {});
storageSync(store.getState());
// subscribe to store and sync chrome state
store.subscribe(() => {
	const state = store.getState();
	const statePayload = { type: 'STATE_UPDATE', data: state };
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
	chrome.runtime.sendMessage(statePayload);
	chrome.tabs.query(
		{currentWindow: true, active : true},
		tab => {
			if (tab.length !== 0) {
				chrome.tabs.sendMessage(tab[0].id, statePayload)
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
	const actions = {...timer, ...websites, ...todos};
	if (req.type === 'ACTION') {		
		$.post('http://localhost:8080/api/events', {type:'action', data: req}, () => {});

		store.dispatch(actions[req.action](...req.data));
	}
	return true;
});

function preHandleCountdown() {
	let dateEnd = 0;
	return () => {
		const now = Date.now();
		if (dateEnd < now) {
			// call getState, get a new end date
			dateEnd = store.getState().timer.dateEnd || 0;
		}

		const fromNow = dateEnd - now;
		if (fromNow >= 0) {
			store.dispatch(timer.calcTime(dateEnd));
		} else {
			console.log('sound', timer.clearCountdown(store.getState().timer.sound));
			store.dispatch( timer.clearCountdown(store.getState().timer.sound) );
			chrome.alarms.clear('COUNTDOWN_TIMER');
		}		
	};
}

chrome.alarms.onAlarm.addListener(alarm => {
	const SECS_IN_MINUTE = 1 / 60;
	const handleCountdown = preHandleCountdown();
	switch (alarm.name) {
		case 'TIME_TIL_TIMER_START':
			chrome.alarms.clear('TIME_TIL_TIMER_START');
			chrome.alarms.create('COUNTDOWN_TIMER', {
				delayInMinutes: 0,
				periodInMinutes: SECS_IN_MINUTE,
			});

		case 'COUNTDOWN_TIMER':
			handleCountdown();

		default:
			return false;
	}
});
