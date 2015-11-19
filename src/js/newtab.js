import React from 'react';
import ReactDOM from 'react-dom';
import NewTab from './containers/NewTab'
import { Provider } from 'react-redux'

chrome.storage.sync.get('store', store => {
	ReactDOM.render(
		<Provider store={store.store}>
			<NewTab />
		</Provider>,
	  document.getElementById('mount-point')
	);
});




// import App from './containers/App'
// import configureStore from './store/configureStore'
// import 'todomvc-app-css/index.css'

// const store = configureStore()

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )