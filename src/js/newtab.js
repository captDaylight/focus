import React from 'react';
import ReactDOM from 'react-dom';
import FocusContainer from './containers/FocusContainer';

chrome.storage.sync.get('state', data => {
	ReactDOM.render(
		<FocusContainer state={data.state} />,
		document.getElementById('mount-point')
	);
});