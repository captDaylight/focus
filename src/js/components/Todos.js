import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import Todo from './Todo';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
	handleSubmit(e) {
		const { addTodo } = this.props;
		if (e.todo) {
			addTodo(e.todo);
			this.refs.form.reset();
		}
	}
	render() {
		const { todos, toggleTodoCompletion, removeTodo, toggleTodoEdit } = this.props;
		return (
			<div>
				<h5>TODOS</h5>
				
				<Form onSubmit={this.handleSubmit.bind(this)} ref="form">
					<FocusInput name="todo" placeholder="Add a Todo" />
					<button>Submit</button>
				</Form>

				<ul id="todos">
					{todos.map((todo, idx) => {
						return <Todo key={idx} todo={todo} {...this.props} />;
					})}
				</ul>
			</div>
		);
	}
}