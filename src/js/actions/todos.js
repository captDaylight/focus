import qwest from 'qwest';

export const ADD_TODO = 'ADD_TODO';
export function addTodo(text, created) {
	return {
		type: ADD_TODO,
		text,
		created
	}
}

export function postTodo(text, token) {
	return dispatch => {
		const created = Date.now();
		dispatch(addTodo(text, created));
		qwest.post('http://localhost:3000/api/todos/', {
			text,
			created,
		}, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				// Make some useful actions 
				console.log('success post todo', res);
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});		
	}
}

export const REMOVE_TODO = 'REMOVE_TODO';
export function removeTodo(created) {
	return {
		type: REMOVE_TODO,
		created,
	}
}

export function deleteTodo(created, token) {
	return dispatch => {
		dispatch(removeTodo(created));
		qwest.delete(`http://localhost:3000/api/todos/${created}`, null, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				// Make some useful actions 
				console.log('success delete Todo', res);
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});
	}
}

export function persistTodoCompletion(created, token) {
	return dispatch => {
		const completed = Date.now();
		dispatch(toggleTodoCompletion(created, completed))
		qwest.put(`http://localhost:3000/api/todos/${created}`, {
				completed
			}, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				// Make some useful actions 
				console.log('success update complete todo', res);
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});
	}
}

export const TOGGLE_TODO_COMPLETION = 'TOGGLE_TODO_COMPLETION';
export function toggleTodoCompletion(created, completed) {
	return {
		type: TOGGLE_TODO_COMPLETION,
		created,
		completed,
	}
}

export const TOGGLE_TODO_EDIT = 'TOGGLE_TODO_EDIT';
export function toggleTodoEdit(created) {
	return {
		type: TOGGLE_TODO_EDIT,
		created,
	}
}

export const EDIT_TODO = 'EDIT_TODO';
export function editTodo(created, text) {
	return {
		type: EDIT_TODO,
		created,
		text,
	}
}

export function updateTodo(created, text, token) {
	return dispatch => {
		dispatch(editTodo(created, text));
		qwest.put(`http://localhost:3000/api/todos/${created}`, {
				text
			}, {
				headers: {
					'x-access-token': token
				}
			})
			.then(function(xhr, res) {
				// Make some useful actions 
				console.log('success update text todo', res);
			})
			.catch(function(e, xhr, res) {
				// Process the error 
				console.log('error',response);
			});
	}
}

export const UPDATE_TODOS = 'UPDATE_TODOS';
export function updateTodos(todos) {
	return {
		type: UPDATE_TODOS,
		todos,
	}
}