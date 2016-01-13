import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import filter from 'lodash/collection/filter';
import Todo from './Todo';
import FocusInput from './FocusInput';

function orderTodos(todos) {
	const workingOn = filter(todos, todo => todo.workingOn && !todo.completed);
	const notStarted = filter(todos, todo => !todo.workingOn && !todo.completed);
	const completed = filter(todos, todo => todo.completed);
	return [...workingOn, ...notStarted, ...completed];
}

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
		console.log(todos);
		const orderedTodos = orderTodos(todos);
		return (
			<div>
				<h5>TODOS</h5>
				
				<Form onSubmit={this.handleSubmit.bind(this)} ref="form">
					<FocusInput name="todo" placeholder="Add a Todo" />
					<button>Submit</button>
				</Form>

				<ul id="todos">
					{orderedTodos.map((todo, idx) => {
						return <Todo key={idx} todo={todo} {...this.props} />;
					})}
				</ul>
			</div>
		);
	}
}