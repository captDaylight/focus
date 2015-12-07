import React from 'react';
import ReactDOM from 'react-dom';
import url from 'url';
import findIndex from 'lodash/array/findIndex';
import FocusContainer from './containers/FocusContainer';

const urlData = url.parse(window.location.href);

var port = chrome.runtime.connect({name: 'focus'});
port.postMessage({myProperty: 'value'});
port.onMessage.addListener(function(msg) {
    console.log('changed dectede on new tab', msg);
});
window.setTimeout(() => port.postMessage({myProperty: Date.now()}),5000);

chrome.storage.sync.get('state', data => {
	const blockedSites = data.state.websites.items;
	const checkIfIsSite = site => urlData.href.indexOf(site.name) > -1;
	const idxOfSite = findIndex(blockedSites, checkIfIsSite);
	const date = data.state.timer.date;


	if (date) {
		if (date > Date.now() && idxOfSite >= 0) {
			// set up mount point
			const body = document.createElement('body');
			const mountPoint = document.createElement('div');
			mountPoint.id = 'mount-point';
			mountPoint.style.cssText = 'color:black;position:fixed;width:100%;height:100%;background-color:green;top:0px;left:0px;z-index:10000;'
			body.appendChild(mountPoint);
			document.getElementsByTagName('html')[0].appendChild(body);
		
			ReactDOM.render(
				<FocusContainer 
					state={data.state} 
					listener={chrome.runtime} 
				/>,
			  document.getElementById('mount-point')
			);
		}
	}
});