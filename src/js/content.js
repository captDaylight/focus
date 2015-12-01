import url from 'url';
import findIndex from 'lodash/array/findIndex';
import React from 'react';
import ReactDOM from 'react-dom';

const urlData = url.parse(window.location.href);

chrome.storage.sync.get('state', data => {
	const blockedSites = data.state.websites.items;
	const checkIfIsSite = site => urlData.href.indexOf(site.name) > -1;
	const idxOfSite = findIndex(blockedSites, checkIfIsSite);
	const date = data.state.timer.date;

	if (date) {
		if (date > Date.now() && idxOfSite >= 0) {
			const body = document.createElement('body');
			const mountPoint = document.createElement('div');
			mountPoint.id = 'mount-point';
			mountPoint.style.cssText = 'color:black;position:fixed;width:100%;height:100%;background-color:green;top:0px;left:0px;z-index:10000;'
			body.appendChild(mountPoint);
			document.getElementsByTagName('html')[0].appendChild(body);

			ReactDOM.render(
				<div>
					Focus
					{data.state.timer.date}
				</div>,
			  document.getElementById('mount-point')
			);
		}
	}
});