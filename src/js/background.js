import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import addWebsite from './actions/websites';
import createStorageSync from './utils/storageSync';
import * as timer from './actions/timer';

console.log(timer);

const createAndComposeStore = compose(
	applyMiddleware(thunkMiddleware)
)(createStore);
const store = createAndComposeStore(rootReducer);
const storageSync = createStorageSync(store.getState());

// on init, sync state
storageSync(store.getState());
// subscribe to store and sync chrome state
store.subscribe(() => {
	const state = store.getState();
	storageSync(state);
	chrome.runtime.sendMessage({ type: 'STATE_UPDATE', data: state });
});

chrome.extension.onMessage.addListener((req, sender, sendRes) => {
	console.log('background listener', req);
	if (req.type === 'ACTION') {
		console.log(timer[req.action]);
		console.log(...req.data);
		
		store.dispatch(timer[req.action](...req.data));
	}
	
	return true;
});