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
	console.log('INIT',state.state);
	ReactDOM.render(
		<Provider store={store}>
			<NewTab /> 
		</Provider>,
	  document.getElementById('mount-point')
	);

	let date = state.state.timer.date;
	store.subscribe(() => {
		// only update each time a new time is set
		// hourly max set quota is 1800, or once every 2 seconds
		if (date !== store.getState().timer.date) {
			// should not be deing this every second like I was...
			chrome.storage.sync.set({state: store.getState()});
			date = store.getState().timer.date;
		}
	})
});


