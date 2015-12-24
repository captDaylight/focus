import shortid from 'shortid';
import findIndex from 'lodash/array/findIndex';
import {
	ADD_TODO,
	REMOVE_TODO,
	TOGGLE_TODO_COMPLETION,
} from '../actions/todos';

const initialState = {
	todos: [],
	completed: false;
};

export default function todos(state=initialState, action) {
	switch(action.type) {
		case ADD_TODO:
			const todo = {
				todo: action.todo,
				id: shortid.generate(),
			};
			return {...state, todos: [...state.todos, todo]};

		case REMOVE_TODO:
			const id = action.id;
			return {...state, todos: state.todos.filter(item => item.id !== id)};

		case TOGGLE_TODO_COMPLETION: 
			// const id = action.id;
			const idx = _.findIndex(state.todos, todo => todo.id === action.id);
			const	todoPrevious = state.todos[idx];
			const todoUpdate = {...todoPrevious, completed: !todoPrevious.completed}
			return {...state, todos: state.todos.filter(item => item.id !== id)};

		default:
			return state;
	}
}