import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import {addAWebsite} from './actions/websites';
const store = createStore(rootReducer);

store.subscribe(() =>
	console.log(store.getState())
)

chrome.storage.sync.set({store: store});

store.dispatch(addAWebsite('www.google.com'));
// store.dispatch(addAWebsite('www.test.com'));



// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
// 	switch(request.type) {
// 		case "dom-loaded":
// 			console.log(request.data.myProperty);
// 		break;
// 	}
// 	return true;
// });