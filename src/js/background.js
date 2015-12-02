import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import addWebsite from './actions/websites';
import storageSync from './utils/storageSync';

const createAndComposeStore = compose(
	applyMiddleware(thunkMiddleware)
)(createStore);

const store = createAndComposeStore(rootReducer);

store.subscribe(() => {
	console.log('store updated',store.getState());
	storageSync(store);
});

chrome.extension.onMessage.addListener(function(req, sender, sendRes) {
	store.dispatch(req);
	return true;
});