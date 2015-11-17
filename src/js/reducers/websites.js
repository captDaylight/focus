import { ADD_A_WEBSITE } from '../actions/websites';

const initialState = {
	websites: [],
};

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_A_WEBSITE:
			return {...state, websites: [...state.websites, action.website]};

		default:
			return state;
	}
}