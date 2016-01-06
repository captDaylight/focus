import shortid from 'shortid';
import findIndex from 'lodash/array/findIndex';
import split from '../utils/split';
import {
	ADD_TODO,
	REMOVE_TODO,
	TOGGLE_TODO_COMPLETION,
	TOGGLE_TODO_EDIT,
} from '../actions/todos';

const initialState = {
	todos: [],
};

function updateInArray(items, id, key, fn) {
	const idx = findIndex(items, item => item.id === id);
	const splitItems = split(items, idx);
	const	itemPrevious = items[idx];
	const itemUpdate = {...itemPrevious};
	itemUpdate[key] = fn(itemPrevious[key]);
	return [...splitItems[0], itemUpdate, ...splitItems[1]];
}

export default function todos(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			const todo = {
				todo: action.todo,
				id: shortid.generate(),
				created: Date.now(),
				completed: null,
				editing: false,
			};
			return {...state, todos: [...state.todos, todo]};

		case REMOVE_TODO:
			const id = action.id;
			return {...state, todos: state.todos.filter(item => item.id !== id)};

		case TOGGLE_TODO_COMPLETION: 
			return {
				...state,
				todos: updateInArray(state.todos, action.id, 'completed', value => {
					return value ? null : Date.now();
				})
			};

		case TOGGLE_TODO_EDIT:
			return {
				...state,
				todos: updateInArray(state.todos, action.id, 'editing', value => {
					return !value;
				})
			};

		default:
			return state;
	}
}