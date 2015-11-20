import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import {addAWebsite} from './actions/websites';
import NewTab from './containers/NewTab'

// chrome.storage.sync.set({state: store.getState()});

// store.dispatch(addAWebsite('www.google.com'));

chrome.storage.sync.get('state', state => {
	const store = createStore(rootReducer, state.state);

	ReactDOM.render(
		<Provider store={store}>
			<NewTab /> 
		</Provider>,
	  document.getElementById('mount-point')
	);

	store.subscribe(() =>
		console.log('store updated',store.getState())
	)
});


