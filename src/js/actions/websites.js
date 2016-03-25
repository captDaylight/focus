import qwest from 'qwest';

export const TOGGLE_FETCH = 'TOGGLE_FETCH';
export function toggleFetch(bool=false) {
	return { type: 'TOGGLE_FETCH', bool	}
}

export const ADD_WEBSITE = 'ADD_WEBSITE';
export function addWebsite(website) {
	return {
		type: ADD_WEBSITE,
		website
	}
}

// remove the website from the client side
export const CLEAR_WEBSITE = 'CLEAR_WEBSITE';
export function clearWebsite(id) {
	return {
		type: CLEAR_WEBSITE,
		id
	}
}

export function removeWebsite(id, token) {
	return dispatch => {
		qwest.delete(`http://localhost:3000/api/websites/${id}`, null, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				if (res.status) {
					console.log('success remove website', res);
					dispatch(clearWebsite(id));	
				}
				
			})
			.catch(function(e, xhr, res) {
				console.log('error',response);
			});
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

export function postWebsite(parsedURL, rawURL, token) {
	return dispatch => {
		qwest.post('http://localhost:3000/api/websites/', {
					parsedURL,
					rawURL
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

export const ADD_WEBSITES = 'ADD_WEBSITES';
export function addWebsites(websites) {
	console.log('WEBSITES BEING ADDED');
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

export const DONE_ADDING_COMMON_SITES = 'DONE_ADDING_COMMON_SITES';
export function doneAddingCommonSites(bool=true) {
	console.log('done action', bool);
	return {
		type: DONE_ADDING_COMMON_SITES,
		bool,
	}
}

