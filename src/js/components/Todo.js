import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
	handleSubmit(data) {
		const { editTodo, todo } = this.props;

		editTodo(todo.id, data.todoedit);
		this.refs.form.reset();
	}
	render() {
		const { todo, toggleTodoCompletion, removeTodo, toggleTodoEdit } = this.props;
		
		return (
			<li
				className={classnames('todo', {completed: todo.completed})} >
				{
					todo.editing 
					?
					(<Form ref="form" onSubmit={this.handleSubmit.bind(this)}>
						<FocusInput name="todoedit" placeholder="todoedit" value={todo.todo} />
					</Form>)
					:
					(<div className="todo-container">
						<div 
							className="todo-content"
							onClick={() => toggleTodoCompletion(todo.id)} 
							onDoubleClick={() => toggleTodoEdit(todo.id)} >
							{todo.todo}
						</div>
						<button onClick={() => removeTodo(todo.id)}>X</button>
					</div>
					)
				}

				
			</li>
		);
	}
}

