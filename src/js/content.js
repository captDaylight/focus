import url from 'url';
import findIndex from 'lodash/array/findIndex';

const urlData = url.parse(window.location.href);

chrome.storage.sync.get('state', state => {
	const blockedSites = state.state.websites.items;
	const idxOfSite = findIndex(blockedSites, site => urlData.href.indexOf(site.name));
	if (idxOfSite >= 0) {
		const body = document.createElement('body');
		const mountPoint = document.createElement('div');
		mountPoint.id = 'mount-point';
		body.appendChild(mountPoint);
		document.getElementsByTagName('html')[0].appendChild(body);
	}
});