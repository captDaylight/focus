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