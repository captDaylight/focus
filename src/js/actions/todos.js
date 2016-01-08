export const ADD_TODO = 'ADD_TODO';
export function addTodo(todo) {
	return {
		type: ADD_TODO,
		todo,
	}
}

export const REMOVE_TODO = 'REMOVE_TODO';
export function removeTodo(id) {
	return {
		type: REMOVE_TODO,
		id,
	}
}

export const TOGGLE_TODO_COMPLETION = 'TOGGLE_TODO_COMPLETION';
export function toggleTodoCompletion(id) {
	return {
		type: TOGGLE_TODO_COMPLETION,
		id,
	}
}

export const TOGGLE_TODO_EDIT = 'TOGGLE_TODO_EDIT';
export function toggleTodoEdit(id) {
	return {
		type: TOGGLE_TODO_EDIT,
		id,
	}
}

export const EDIT_TODO = 'EDIT_TODO';
export function editTodo(id, todo) {
	return {
		type: EDIT_TODO,
		id,
		todo,
	}
}