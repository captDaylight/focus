import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {addAWebsite} from './actions/websites';
import NewTab from './containers/NewTab'

// chrome.storage.sync.set({state: store.getState()});

// store.dispatch(addAWebsite('www.google.com'));

chrome.storage.sync.get('state', state => {
	const createAndComposeStore = compose(
		applyMiddleware(thunkMiddleware)
	)(createStore);

	const store = createAndComposeStore(rootReducer, state.state);

	ReactDOM.render(
		<Provider store={store}>
			<NewTab /> 
		</Provider>,
	  document.getElementById('mount-point')
	);

	store.subscribe(() => {
		console.log('store updated',store.getState());
		// should not be deing this every second like I was...
		// chrome.storage.sync.set({state: store.getState()});
	})
});


