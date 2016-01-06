import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import createStorageSync from './utils/storageSync';
import * as timer from './actions/timer';
import * as websites from './actions/websites';
import * as todos from './actions/todos';

const createAndComposeStore = compose(
	applyMiddleware(thunkMiddleware)
)(createStore);

const store = createAndComposeStore(rootReducer);
const storageSync = createStorageSync(store.getState());

// store.dispatch(websites.addWebsite('read.com'));


// on init, sync state
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
		console.log('----------------');
		console.log('----------------');
		console.log('action coming in', req);
		store.dispatch(actions[req.action](...req.data));
	}
	return true;
});
console.log('notifications');
chrome.notifications.create('123',{title:'TEST', message: 'HERRO there', type:'basic', iconUrl: 'dist/img/focus.png'});

