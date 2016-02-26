import qwest from 'qwest';

// export const ADD_WEBSITE = 'ADD_WEBSITE';
// export function addWebsite(website, favicon) {
// 	return {
// 		type: ADD_WEBSITE,
// 		website,
// 		favicon,
// 	}
// }

export function addWebsite(name, favicon) {
	return dispatch => {
		console.log('TRYING TO POST');
		qwest.post('http://localhost:3000/api/websites', {
			name,
			favicon,
		 }, {
		 	headers: {
		 		'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU2Y2U1MzYxMDEzZTlmMWExMDY5MzZiYSIsImVtYWlsIjoicGF1bEBwYXVsLnBhdWwiLCJpYXQiOjE0NTYzNjIzMzgsImV4cCI6MTQ1NjQ0ODczOH0.7gHQb5bFHP0LV_ie_IsInyszYFEZ7KR3qlWqPj9MC9Y'
		 	}
		 })
		 .then(function(xhr, response) {
			// Make some useful actions 
			console.log('success',response);
		 })
		 .catch(function(e, xhr, response) {
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

export function checkForTab(website, id, favicon) {
	return dispatch => {
		dispatch(addWebsite(website, favicon));	
		if (!favicon) {

			const timeOut = count => {
				setTimeout(() => {
					chrome.tabs.get(id, tab => {
						const { favIconUrl } = tab;
						if (favIconUrl) {
							dispatch(addWebsite(website, favIconUrl));
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