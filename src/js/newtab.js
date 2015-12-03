import React from 'react';
import ReactDOM from 'react-dom';
import FocusContainer from './containers/FocusContainer';

import { setTimer } from './actions/timer';

// chrome.runtime.sendMessage({ type: 'ACTION', data: setTimer(Date.now()) });

console.log('new tab');

chrome.storage.sync.get('state', data => {
	console.log('initial storage sync', data);
	ReactDOM.render(
		<FocusContainer state={data.state} />,
		document.getElementById('mount-point')
	);
});