import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import FocusContainer from './containers/FocusContainer';
import storageSync from './utils/storageSync';
import storageListener from './utils/storageListener';

// each element that is updated will have an issuer id
// this way, any thing that makes a change can be tested 
// so that the storage listener doesn't trigger an update on the issuer
const ISSUER_ID = `${Date.now()}`;

chrome.storage.sync.get('state', data => {
	const createAndComposeStore = compose(
		applyMiddleware(thunkMiddleware)
	)(createStore);
	console.log(data.state);
	const store = createAndComposeStore(rootReducer, data.state);
	
	ReactDOM.render(
		<Provider store={store}>
			<FocusContainer />
		</Provider>,
		document.getElementById('mount-point')
	);
	
	// sync storage
	store.subscribe(storageSync(store, ISSUER_ID));
	// listen for changes on store
	chrome.storage.onChanged.addListener(storageListener(store, ISSUER_ID));
});