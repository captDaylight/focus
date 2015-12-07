import React from 'react';
import ReactDOM from 'react-dom';
import FocusContainer from './containers/FocusContainer';

import { setTimer } from './actions/timer';

// chrome.runtime.sendMessage({ type: 'ACTION', data: setTimer(Date.now()) });

chrome.storage.sync.get('state', data => {
	ReactDOM.render(
		<FocusContainer state={data.state} />,
		document.getElementById('mount-point')
	);
});