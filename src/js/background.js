import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import addWebsite from './actions/websites';

const store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch(addAWebsite('salon.com'));

chrome.storage.sync.set({state: store.getState()});