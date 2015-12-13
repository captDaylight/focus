import React from 'react';
import ReactDOM from 'react-dom';
import PopupContainer from './containers/PopupContainer';

chrome.tabs.query(
	{currentWindow: true, active : true},
	tab => {
		if (tab.length !== 0) {
			chrome.storage.sync.get('state', data => {
				ReactDOM.render(
					<PopupContainer state={data.state} url={tab[0].url}/>,
					document.getElementById('mount-point')
				);
			});      
		}
	}
)

// how to console.log
// chrome.extension.getBackgroundPage().console.log('popup currentTab', tab);