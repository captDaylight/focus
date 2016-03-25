import shortid from 'shortid';
import findIndex from 'lodash/array/findIndex';
import split from '../utils/split';
import {
	ADD_TODO,
	REMOVE_TODO,
	TOGGLE_TODO_WORKING,
	TOGGLE_TODO_COMPLETION,
	TOGGLE_TODO_EDIT,
	EDIT_TODO,
	UPDATE_TODOS,
} from '../actions/todos';

const initialState = {
	todos: [],
};

function updateInArray(items, created, keysAndFns) {
	const idx = findIndex(items, item => item.created === created);
	const splitItems = split(items, idx);
	const	itemPrevious = items[idx];
	const itemUpdate = {...itemPrevious};
	keysAndFns.map(obj => itemUpdate[obj.key] = obj.fn(itemPrevious[obj.key]));
	return [...splitItems[0], itemUpdate, ...splitItems[1]];
}

const dateOrNull = value => value ? null : Date.now();

export default function todos(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			const todo = {
				text: action.text,
				created: action.created,
				completed: null,
				editing: false,
			};
			return {...state, todos: [...state.todos, todo]};

		case REMOVE_TODO:
			const created = action.created;
			return {...state, todos: state.todos.filter(item => item.created !== created)};

		case TOGGLE_TODO_COMPLETION: 
			return {
				...state,
				todos: updateInArray(state.todos, action.created, [{
					key: 'completed', 
					fn: dateOrNull,
				}])
			};

		case TOGGLE_TODO_EDIT:
			return {
				...state,
				todos: updateInArray(state.todos, action.created, [{
					key: 'editing', 
					fn: value => !value,
				}])
			};

		case EDIT_TODO:
			return {
				...state,
				todos: updateInArray(state.todos, action.created, [{
					key: 'todo',
					fn: value => action.todo
				}, {
					key: 'editing', 
					fn: value => !value,
				}])
			};

		case UPDATE_TODOS:
			return {...state, todos: action.todos};

		default:
			return state;
	}
}