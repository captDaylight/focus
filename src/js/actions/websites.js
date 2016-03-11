import qwest from 'qwest';

export const ADD_WEBSITE = 'ADD_WEBSITE';
export function addWebsite(website, favicon) {
	return {
		type: ADD_WEBSITE,
		website,
		favicon,
	}
}

export function postWebsite(url, favicon, token) {
	return dispatch => {
		console.log('TRYING TO POST', name, favicon, token);
		qwest.post('http://localhost:3000/api/websites', {
			url,
			favicon,
		 }, {
		 	headers: {
		 		'x-access-token': token
		 	}
		 })
		 .then(function(xhr, res) {
			// Make some useful actions 
			const {url, favicon} = res.website;
			dispatch(addWebsite(url, favicon));
		 })
		 .catch(function(e, xhr, res) {
			// Process the error 
			console.log('error',response);
		 });
	}
}

export const REMOVE_WEBSITE = 'REMOVE_WEBSITE';
export function removeWebsite(id) {
	return {
		type: REMOVE_WEBSITE,
		id
	}
}

export const TOGGLE_SHOW_SITES = 'TOGGLE_SHOW_SITES';
export function toggleShowSites() {
	return {
		type: TOGGLE_SHOW_SITES,
	}
}

function times(fn, timesLeft) {
	if (timesLeft > 0) {
		return fn(timesLeft);
	} else {
		return;
	}
}

export function checkForTab(website, id, favicon, token) {
	return dispatch => {
		dispatch(postWebsite(website, favicon, token));	
		if (!favicon) {
			const timeOut = count => {
				setTimeout(() => {
					chrome.tabs.get(id, tab => {
						const { favIconUrl } = tab;
						if (favIconUrl) {
							dispatch(postWebsite(website, favIconUrl, token));
						} else {
							times(timeOut, count - 1);
						}
					});
				}, 500);
			};

			times(timeOut, 10);
		}
	}
}

// ADD most common websites for users on to look through and block, mostly on init
export const ADD_COMMON_WEBSITES = 'ADD_COMMON_WEBSITES';
export function addCommonWebsites(websites) {
	return {
		type: 'ADD_COMMON_WEBSITES',
		websites
	}
}

export function FetchCommonWebsites() {
	return dispatch => {
		qwest.get('http://localhost:3000/api/websites', null, {
		 	headers: {
		 		'x-access-token': token
		 	}
		 })
		 .then(function(xhr, res) {
			// Make some useful actions 
			console.log('fetch common websites');
		 })
		 .catch(function(e, xhr, res) {
			// Process the error 
			console.log('error',response);
		 });
	}
}