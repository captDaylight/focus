import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
	handleSubmit(data) {			
		console.log(data.todoedit);
		const { editTodo, id } = this.props;
		// console.log(this);
		// editTodo(this);
		editTodo(id, data.todoedit);
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

