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
		const currentState = store.getState();

		// hourly max set quota is 1800, or once every 2 seconds
		// have to make sure not to overpost, ie, each second with the timer
		if (currentState.timer !== prevState.timer) {
			if (currentState.timer.date !== prevState.timer.date) {
				// should not be deing this every second like I was...
				chrome.storage.sync.set({
					state: store.getState(),
					issuer: `${ISSUER_ID}-${Date.now()}`,
				});
			}
		} else {
			// adding current time at the end of issuer so that it updates if issued 
			// from the same issuer, otherwise multiple from the same issuer won't 
			// come through
			chrome.storage.sync.set({
				state: store.getState(),
				issuer: `${ISSUER_ID}-${Date.now()}`,
			});
		}

		// set previous state
		prevState = currentState;
	})

	// update state when a change comes through that was 
	// not issued by this instance
	chrome.storage.onChanged.addListener(storageListener(store, ISSUER_ID));
});

