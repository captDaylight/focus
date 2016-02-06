import React from 'react';
import ReactDOM from 'react-dom';
import PopupContainer from './containers/PopupContainer';

chrome.tabs.query(
	{currentWindow: true, active : true},
	tab => {
		if (tab.length !== 0) {
			chrome.storage.sync.get(null, data => {
				ReactDOM.render(
					<PopupContainer state={data} url={tab[0].url}/>,
					document.getElementById('mount-point')
				);
			});      
		}
	}
)

// how to console.log
// chrome.extension.getBackgroundPage().console.log('popup currentTab', tab);