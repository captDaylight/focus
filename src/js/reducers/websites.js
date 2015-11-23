import { 
	ADD_WEBSITE,
	REMOVE_WEBSITE,
} from '../actions/websites';

const initialState = {
	items: [],
};

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_WEBSITE:
			const website = {
				name: action.website,
				id: Date.now(),
			};
			return {...state, items: [...state.items, website]};

		case REMOVE_WEBSITE:
			const id = action.id;
			return {...state, items: state.items.filter(item => item.id !== id)};

		default:
			return state;
	}
}