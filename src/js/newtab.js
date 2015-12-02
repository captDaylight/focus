import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import FocusContainer from './containers/FocusContainer';
import storageListener from './utils/storageListener';

// each element that is updated will have an issuer id
// this way, any thing that makes a change can be tested 
// so that the storage listener doesn't trigger an update on the issuer
const ISSUER_ID = `${Date.now()}`;

chrome.storage.sync.get('state', data => {
	const createAndComposeStore = compose(
		applyMiddleware(thunkMiddleware)
	)(createStore);
	
	const store = createAndComposeStore(rootReducer, data.state);
	
	ReactDOM.render(
		<Provider store={store}>
			<FocusContainer />
		</Provider>,
	  document.getElementById('mount-point')
	);
	
	let prevState = store.getState();
	store.subscribe(() => {
		// issuer appended with current time stamp, so that issuer key is 
		// always passed as new value
		const objSync = {
			state: store.getState(),
			issuer: `${ISSUER_ID}-${Date.now()}`,
		};

		// hourly max set quota is 1800, or once every 2 seconds
		// have to make sure not to overpost, ie, each second with the timer
		if (objSync.state.timer !== prevState.timer) {
			if (objSync.state.timer.date !== prevState.timer.date) {
				chrome.storage.sync.set(objSync);
			}
		} else {
			chrome.storage.sync.set(objSync);
		}

		// set previous state
		prevState = objSync.state;
	})

	// update state when a change comes through that was 
	// not issued by this instance
	chrome.storage.onChanged.addListener(storageListener(store, ISSUER_ID));
});