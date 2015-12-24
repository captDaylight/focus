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
		}
	}
	render() {
		return (
			<div>
				<h5>TODOS</h5>
				
				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FocusInput name="todo" placeholder="Add a Todo" />
					<button>Submit</button>
				</Form>

				<ul>

				</ul>
			</div>
		);
	}
}