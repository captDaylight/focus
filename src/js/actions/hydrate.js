export const HYDRATE_STATE = 'HYDRATE_STATE';

export const UNFLAG_HYDRATE = 'UNFLAG_HYDRATE';
export function unflagHydrate() {
	return {
		type: UNFLAG_HYDRATE,
	}
}