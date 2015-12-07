import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import addWebsite from './actions/websites';
import createStorageSync from './utils/storageSync';
import * as timer from './actions/timer';
import * as websites from './actions/websites';

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

// TODO: switch this to long-lived connection
// https://developer.chrome.com/extensions/messaging#connect
chrome.extension.onMessage.addListener((req, sender, sendRes) => {
	const actions = {...timer, ...websites};
	if (req.type === 'ACTION') {
		store.dispatch(actions[req.action](...req.data));
	}
	return true;
});