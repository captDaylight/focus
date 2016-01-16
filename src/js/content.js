import React from 'react';
import ReactDOM from 'react-dom';
import url from 'url';
import FocusContainer from './containers/FocusContainer';
import checkShouldBlock from './utils/checkShouldBlock';

let mounted = false;

function mountOrNot(siteChecker) {
	return (siteList, date, state) => {
		const shouldBlockSite = siteChecker(siteList);

		if (date && date < Date.now()) {
			if (shouldBlockSite && !mounted) {
				mountBlocker(state);	
			}
		} else if (mounted) {
			dismountBlocker();
		}
	};
}

const urlData = url.parse(window.location.href);
const checkShouldMountOrNot = mountOrNot(checkShouldBlock(urlData));

chrome.storage.sync.get('state', data => {
	const { websites, timer } = data.state;
	
	checkShouldMountOrNot(websites.websites, timer.date, data.state);

	chrome.extension.onMessage.addListener(function(msg) {	// Listen for results
		if (msg.type === 'STATE_UPDATE') {
			const { websites, timer } = msg.data;
			checkShouldMountOrNot(websites.websites, timer.date, msg.data);
		}
	});
});

function mountBlocker(state) {
	// set up mount point
	const body = document.body ? document.body : document.createElement('body');
	const mountPoint = document.createElement('div');
	mountPoint.id = 'mount-point';
	mountPoint.style.cssText = 'color:black;position:fixed;width:100%;height:100%;background-color:green;top:0px;left:0px;z-index:10000;'
	body.appendChild(mountPoint);
	document.getElementsByTagName('html')[0].appendChild(body);

	ReactDOM.render(
		<FocusContainer state={state} />,
	  document.getElementById('mount-point')
	);

	mounted = true;
}

function dismountBlocker() {
	// const body = document.body ? document.body : document.createElement('body');
	const mountPoint = document.getElementById('mount-point');

	mountPoint.parentNode.removeChild(mountPoint);
	mounted = false;
}