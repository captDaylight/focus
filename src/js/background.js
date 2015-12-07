import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import createStorageSync from './utils/storageSync';
import * as timer from './actions/timer';
import * as websites from './actions/websites';

var port = chrome.runtime.connect({name: 'focus'});
port.postMessage({test:'test'});
console.log('port', port);
const createAndComposeStore = compose(
	applyMiddleware(thunkMiddleware)
)(createStore);

const store = createAndComposeStore(rootReducer);
const storageSync = createStorageSync(store.getState());

store.dispatch(websites.addWebsite('read.com'));

// on init, sync state
storageSync(store.getState());
// subscribe to store and sync chrome state
store.subscribe(() => {
	// const port = chrome.runtime.connect({name: 'focus'});
	const state = store.getState();
	storageSync(state);
	console.log(port);
	console.log(port.postMessage);
	port.postMessage({ type: 'STATE_UPDATE', data: state });
});

// TODO: switch this to long-lived connection
// https://developer.chrome.com/extensions/messaging#connect
// chrome.extension.onMessage.addListener((req, sender, sendRes) => {
// 	const actions = {...timer, ...websites};
// 	if (req.type === 'ACTION') {
// 		store.dispatch(actions[req.action](...req.data));
// 	}
// 	return true;
// });



chrome.runtime.onConnect.addListener(function(port) {
  if(port.name === "focus") {
    port.onMessage.addListener(function(msg) {
    	console.log('called', msg);
    	if (msg.type === 'ACTION') {
    		const actions = {...timer, ...websites};
    		console.log('dispatchign');
    		store.dispatch(actions[msg.action](...msg.data));
    	}
    });
  }
});