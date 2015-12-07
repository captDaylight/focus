import React from 'react';
import ReactDOM from 'react-dom';
import FocusContainer from './containers/FocusContainer';

var port = chrome.runtime.connect({name: 'focus'});

chrome.storage.sync.get('state', data => {
	ReactDOM.render(
		<FocusContainer 
			state={data.state} 
			port={port}
		/>,
		document.getElementById('mount-point')
	);
});

// var port = chrome.runtime.connect({name: 'focus'});
// port.postMessage({myProperty: 'value'});
// port.onMessage.addListener(function(msg) {
//     console.log('changed dectede on new tab', msg);
// });
// window.setTimeout(() => port.postMessage({myProperty: Date.now()}),5000);