export const ADD_WEBSITE = 'ADD_WEBSITE';
export function addWebsite(website, favicon) {
	return {
		type: ADD_WEBSITE,
		website,
		favicon,
	}
}

export const REMOVE_WEBSITE = 'REMOVE_WEBSITE';
export function removeWebsite(id) {
	return {
		type: REMOVE_WEBSITE,
		id
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
				console.log('timeout', count);
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