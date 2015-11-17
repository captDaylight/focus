export const ADD_A_WEBSITE = 'ADD_A_WEBSITE';
export function addAWebsite(website) {
	return {
		type: ADD_A_WEBSITE,
		website,
	}
}