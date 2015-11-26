import url from 'url';
import findIndex from 'lodash/array/findIndex';
import $ from 'jquery';
const urlData = url.parse(window.location.href);

chrome.storage.sync.get('state', state => {
	const blockedSites = state.state.websites.items;
	const idxOfSite = findIndex(blockedSites, site => urlData.href.indexOf(site.name));
	console.log(blockedSites);
	console.log(idxOfSite);
	if (idxOfSite >= 0) {
		// console.log('in here');
		// console.log(document.getElementsByTagName('body'));
		// console.log(document.getElementsByTagName('div'));
		document.getElementsByTagName('html').innerHTML = '<body><div style="height:100%;width:100%;position:fixed;background-color:green;"></div></body>';

		// $('html').html('<div style="height:100%;width:100%;position:fixed;background-color:green;"></div>');
	}
});

		// window.onload = () => {
		// 	console.log('page loaded');
		// 	console.log($('html').html());
		// 	$('body').html('<div style="height:100%;width:100%;position:fixed;background-color:green;"></div>');			
		// };