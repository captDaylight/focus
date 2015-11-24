import url from 'url';
import findIndex from 'lodash/array/findIndex';

const urlData = url.parse(window.location.href);

chrome.storage.sync.get('state', state => {
	const blockedSites = state.state.websites.items;
	const idxOfSite = findIndex(blockedSites, site => urlData.href.indexOf(site.name));

	if (idxOfSite >= 0) {
		console.log('index found');
	} else {
		console.log('index not found');
	}
});