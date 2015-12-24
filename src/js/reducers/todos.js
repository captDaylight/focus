import {
	ADD_TODO,
} from '../actions/todos';

const initialState = {
	todos: [],
};

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			return {...state, todos: [...state.todos, action.todo]};

		default:
			return state;
	}
}