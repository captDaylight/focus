import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
	// handleSubmit(e) {
	// 	const { addTodo } = this.props;
	// 	if (e.todo) {
	// 		addTodo(e.todo);
	// 		this.refs.form.reset();
	// 	}
	// }
	render() {
		const { todo, toggleTodoCompletion, removeTodo, toggleTodoEdit } = this.props;
		
		return (
			<li
				className={classnames('todo', {completed: todo.completed})} >
				{
					todo.editing 
					?
					(<div
						onDoubleClick={() => toggleTodoEdit(todo.id)}>
						k for real editing
					</div>)
					:
					(<div 
						onClick={() => toggleTodoCompletion(todo.id)} 
						onDoubleClick={() => toggleTodoEdit(todo.id)} >
						{todo.todo}
					</div>)
				}

				<button onClick={() => removeTodo(todo.id)}>X</button>
			</li>
		);
	}
}

