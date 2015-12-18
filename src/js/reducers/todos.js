import {
	ADD_TODO,
} from '../actions/todos';

const initialState = {
	items: [],
};

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			return [...state, items: [...state.items, action.todo]];

		default:
			return state;
	}
}