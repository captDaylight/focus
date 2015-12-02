import React from 'react';
import ReactDOM from 'react-dom';
import FocusContainer from './containers/FocusContainer';

import { setTimer } from './actions/timer';

console.log('new tab');

chrome.storage.sync.get('state', data => {
	ReactDOM.render(
		<div>hello this is new tab</div>,
		document.getElementById('mount-point');
	);
});