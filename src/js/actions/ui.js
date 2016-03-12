export const DONE_ADDING_COMMON_SITES = 'DONE_ADDING_COMMON_SITES';
export function doneAddingCommonSites(bool=true) {
	return {
		type: DONE_ADDING_COMMON_SITES,
		bool,
	}
}