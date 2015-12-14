import find from 'lodash/collection/find';
import { 
	ADD_WEBSITE,
	REMOVE_WEBSITE,
} from '../actions/websites';

const initialState = {
	items: [],
};

function indexPop(arr, idx) {
	const beginning = arr.slice(0, idx); 
	const end = arr.slice(idx + 1);
	return [...beginning, ...end];
}

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_WEBSITE:
			const siteIdx = state.items.findIndex(item => item.name === action.website);
			const website = {
				name: action.website,
				favicon: action.favicon,
				id: Date.now(),
			};
			if (siteIdx >= 0) {
				if (state.items[siteIdx].favicon) {
					return state;	
				} else {
					const items = indexPop(state.items, siteIdx);
					return {...state, items: [...items, website]};
				}
			} else {
				return {...state, items: [...state.items, website]};
			}

		case REMOVE_WEBSITE:
			const id = action.id;
			return {...state, items: state.items.filter(item => item.id !== id)};

		default:
			return state;
	}
}