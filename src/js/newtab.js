import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import NewTab from './containers/NewTab'
import { HYDRATE_STATE } from './actions/hydrate';
import { countDown } from './actions/timer';

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
	
	let prevState = store.getState();
	store.subscribe(() => {
		const currentState = store.getState();

		// hourly max set quota is 1800, or once every 2 seconds
		// have to make sure not to overpost, ie, each second with the timer
		if (currentState.timer !== prevState.timer) {
			if (currentState.timer.date !== prevState.timer.date) {
				// should not be deing this every second like I was...
				chrome.storage.sync.set({state: store.getState()});
			}
		} else {
			chrome.storage.sync.set({state: store.getState()});
		}

		// set previous state
		prevState = currentState;
	})

	chrome.storage.onChanged.addListener(data => {
		const { newValue, oldValue } = data.state;
		store.dispatch({
			type: HYDRATE_STATE,
			state: newValue,
		});

		if (newValue.timer.date !== oldValue.timer.date) {
			console.log('countDown',store.getState().timer.date);
			store.dispatch(countDown(store.getState().timer.date));
		}
	});
});

