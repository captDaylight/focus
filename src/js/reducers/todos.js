import shortid from 'shortid';
import findIndex from 'lodash/array/findIndex';
import split from '../utils/split';
import {
	ADD_TODO,
	REMOVE_TODO,
	TOGGLE_TODO_COMPLETION,
} from '../actions/todos';

const initialState = {
	todos: [],
};

export default function todos(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			const todo = {
				todo: action.todo,
				id: shortid.generate(),
				created: Date.now(),
				completed: null,
			};
			return {...state, todos: [...state.todos, todo]};

		case REMOVE_TODO:
			const id = action.id;
			return {...state, todos: state.todos.filter(item => item.id !== id)};

		case TOGGLE_TODO_COMPLETION: 
			// const id = action.id;
			const idx = findIndex(state.todos, todo => todo.id === action.id);
			const splitTodos = split(state.todos, idx);
			const	todoPrevious = state.todos[idx];
			const todoUpdate = {
				...todoPrevious, 
				completed: todoPrevious.completed ? null : Date.now(),
			};
			return {...state, todos: [...splitTodos[0], todoUpdate, ...splitTodos[1]]};

		default:
			return state;
	}
}