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

export function checkForTab(website, id, favicon) {
	return dispatch => {
		dispatch(addWebsite(website, favicon));	
		if (!favicon) {
			setTimeout(() => {
				chrome.tabs.get(id, tab => {
					const { favIconUrl } = tab;
					if (favIconUrl) {
						dispatch(addWebsite(website, favIconUrl));
					}
				});
			}, 5000);
		}
	}
}