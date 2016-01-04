import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

// function wrapSubmit(action) {
// 	return function handleSubmit(e) {
// 		console.log(e, action, 'yup');
// 	}
// }

export default class SessionsList extends Component {
	handleSubmit(e) {
		const { addTodo } = this.props;
		if (e.todo) {
			addTodo(e.todo);
			this.refs.form.reset();
		}
	}
	render() {
		const { todos, toggleTodoCompletion, removeTodo } = this.props;
		return (
			<div>
				<h5>TODOS</h5>
				
				<Form onSubmit={this.handleSubmit.bind(this)} ref="form">
					<FocusInput name="todo" placeholder="Add a Todo" />
					<button>Submit</button>
				</Form>

				<ul id="todos">
					{todos.map((todo, idx)=> {
						return (
							<li 
								key={idx} 
								onClick={() => toggleTodoCompletion(todo.id)}
								className={classnames('todo', {completed: todo.completed})}>
								{todo.todo} <button onClick={() => removeTodo(todo.id)}>X</button>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}