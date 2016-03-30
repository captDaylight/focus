import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
	handleSubmit(data) {
		const { editTodo, todo } = this.props;

		editTodo(todo.created, data.todoedit);
		this.refs.form.reset();
	}
	render() {
		const { 
			todo,
			persistTodoCompletion, 
			deleteTodo, 
			toggleTodoEdit 
		} = this.props;
		
		return (
			<li
				className={classnames('todo', {
					completed: todo.completed,
				})} >
				{
					todo.editing 
					?
					(<Form ref="form" onSubmit={this.handleSubmit.bind(this)}>
						<FocusInput name="todoedit" placeholder="todoedit" value={todo.todo} autoFocus={true} />
					</Form>)
					:
					(<div className="todo-container">
						<div 
							className="todo-content"
							onClick={() => {
								if (!todo.completed) {
									persistTodoCompletion(todo.created);	
								}
							}} >
							{todo.text}
						</div>
						<div className="todo-actions">
							{
								!todo.completed 
								? (
									<button 
										className="button-small" 
										onClick={() => persistTodoCompletion(todo.created)}
									>
										Finish
									</button>
								) : null
							}
							<div 
								className="todo-icon icon-pencil" 
								onClick={() => toggleTodoEdit(todo.created)}
							></div>
							<div 
								className="todo-icon icon-bin" 
								onClick={() => deleteTodo(todo.created)}
							></div>
						</div>

					</div>
					)
				}
			</li>
		);
	}
}

