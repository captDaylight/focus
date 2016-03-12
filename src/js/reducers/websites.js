import shortid from 'shortid';
import find from 'lodash/collection/find';
import { 
	ADD_WEBSITE,
	REMOVE_WEBSITE,
	TOGGLE_SHOW_SITES,
	TOGGLE_FETCH,
	ADD_WEBSITES,
	ADD_COMMON_WEBSITES,
	DONE_ADDING_COMMON_SITES,
} from '../actions/websites';

const initialState = {
	showSites: false,
	websites: [],
	commonWebsites: [],
	fetching: false,
	doneCommonSites: false,
};

function indexPop(arr, idx) {
	const beginning = arr.slice(0, idx); 
	const end = arr.slice(idx + 1);
	return [...beginning, ...end];
}

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_WEBSITE:
			const siteIdx = state.websites.findIndex(item => item.url === action.website.url);
			const {website} = action;

			if (siteIdx >= 0) {
				if (state.websites[siteIdx].favicon) {
					return state;	
				} else {
					const websites = indexPop(state.websites, siteIdx);
					return {...state, websites: [...websites, website]};
				}
			} else {
				return {...state, websites: [...state.websites, website]};
			}

		case TOGGLE_FETCH:
			return {...state, fetching: action.bool}

		case REMOVE_WEBSITE:
			const id = action.id;
			return {...state, websites: state.websites.filter(item => item.id !== id)};

		case TOGGLE_SHOW_SITES:
			return {...state, showSites: !state.showSites};

		case ADD_WEBSITES:
			return {...state, websites: action.websites};

		case ADD_COMMON_WEBSITES:
			return {...state, commonWebsites: action.websites};

		case DONE_ADDING_COMMON_SITES:
			console.log('adding to state', action.bool);
			return {...state, doneCommonSites: action.bool};

		default:
			return state;
	}
}