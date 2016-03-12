import qwest from 'qwest';

export const TOGGLE_FETCH = 'TOGGLE_FETCH';
export function toggleFetch(bool=false) {
	return { type: 'TOGGLE_FETCH', bool	}
}

export const ADD_WEBSITE = 'ADD_WEBSITE';
export function addWebsite(website) {
	console.log('adding website!!', website);
	return {
		type: ADD_WEBSITE,
		website
	}
}

export function postWebsite(url, favicon, token) {
	return dispatch => {
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
				console.log('success post website', res);
				dispatch(addWebsite(res.data.website));
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});
	}
}

// remove the website from the client side
export const REMOVE_WEBSITE = 'REMOVE_WEBSITE';
export function removeWebsite(id) {
	return {
		type: REMOVE_WEBSITE,
		id
	}
}
// delete from user on the server
export function deleteWebsite() {
	return dispatch => {

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

export const ADD_WEBSITES = 'ADD_WEBSITES';
export function addWebsites(websites) {
	return {
		type: 'ADD_WEBSITES',
		websites
	}
}

export function fetchWebsites(token) {
	return dispatch => {
		qwest.get('http://localhost:3000/api/websites', null, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				// Make some useful actions 
				console.log('fetch common websites', res);
				if (res.status) {
					dispatch(addWebsites(res.data.websites));
				}
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});
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

export function fetchCommonWebsites(token) {
	return dispatch => {
		qwest.get('http://localhost:3000/api/websites/common', null, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				// Make some useful actions 
				if (res.status) {
					dispatch(addCommonWebsites(res.data.websites));
				}
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});
	}
}

