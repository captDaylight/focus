import find from 'lodash/collection/find';
import { 
	ADD_WEBSITE,
	REMOVE_WEBSITE,
} from '../actions/websites';

const initialState = {
	websites: [],
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
				id: Date.now(),
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

		default:
			return state;
	}
}