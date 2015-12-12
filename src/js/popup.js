import React from 'react';
import ReactDOM from 'react-dom';
import url from 'url';
import takeRight from 'lodash/array/takeright';
import wrapActionsWithMessanger from './utils/wrapActionsWithMessanger';

const actions = wrapActionsWithMessanger([
	'countDown',
	'addWebsite',
]);

function processSiteInfo(siteURL, faviconURL) {
	const urlParse = url.parse(siteURL);
	const hostname = urlParse.hostname ? urlParse.hostname : urlParse.pathname;
	// turn www.facebook.com into facebook.com
	// TODO: a website like google.co.uk won't work with this solution, it'll return co.uk
	const parsedHostname = takeRight(hostname.split('.'), 2).join('.');

	actions.addWebsite(parsedHostname, faviconURL);
}

chrome.tabs.query(
	{currentWindow: true, active : true},
	tab => {
		if (tab.length !== 0) {
			const { url, favIconUrl } = tab[0];
			const { countDown } = actions; 
			
			chrome.storage.sync.get('state', data => {
				chrome.extension.getBackgroundPage().console.log('from the popup',data);
				ReactDOM.render(
					<section id="popup">
						<div className="popup-section">
							<button 
								className="focus-button smaller" 
								onClick={() => processSiteInfo(url, favIconUrl)}
							>
								block this site
							</button>
						</div>
						<div className="popup-section">
							<button 
								className="focus-button smaller" 
								onClick={() => countDown(Date.now() + 30000)}
							>
								Start Working
							</button>
						</div>
					</section>,
					document.getElementById('mount-point')
				);
			});      
		}
	}
)

// how to console.log
// chrome.extension.getBackgroundPage().console.log('popup currentTab', tab);