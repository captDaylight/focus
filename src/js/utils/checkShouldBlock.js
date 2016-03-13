import findIndex from 'lodash/array/findIndex';

export default function checkShouldBlock(urlData) {
	return (sites) => {
		return findIndex(sites, site => urlData.href.indexOf(site.url) > -1) >= 0;
	};
}