import shortid from 'shortid';
import find from 'lodash/collection/find';
import { 
	ADD_WEBSITE,
	REMOVE_WEBSITE,
	TOGGLE_SHOW_SITES,
} from '../actions/websites';
import { websitesData } from '../websitesData';

const initialState = {
	showSites: false,
	websites: websitesData,
};

function indexPop(arr, idx) {
	const beginning = arr.slice(0, idx); 
	const end = arr.slice(idx + 1);
	return [...beginning, ...end];
}

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_WEBSITE:
			const siteIdx = state.websites.findIndex(item => item.name === action.website);
			const website = {
				name: action.website,
				favicon: action.favicon,
				id: shortid.generate(),
			};
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

		case REMOVE_WEBSITE:
			const id = action.id;
			return {...state, websites: state.websites.filter(item => item.id !== id)};

		case TOGGLE_SHOW_SITES:
			return {...state, showSites: !state.showSites};

		default:
			return state;
	}
}