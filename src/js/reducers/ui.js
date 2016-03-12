import {
	DONE_ADDING_COMMON_SITES
} from '../actions/ui';

const initialState = {
	doneCommonSites: false
}

export default function ui(state=initialState, action) {
	switch(action.type) {
		case DONE_ADDING_COMMON_SITES:
			return {...state, }
		default: 
			return state;
	}
}