import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

function wrapSubmit(action) {
	return function handleSubmit(e) {
		console.log(e, action, 'yup');
	}
}

export default function SessionsList(props) {
	const { addTodo } = props;
	return (
		<div>
			<h5>TODOS</h5>
			
			<Form onSubmit={wrapSubmit(addTodo)}>
				<FocusInput name="website" placeholder="Add a Todo" />
				<button>Submit</button>
			</Form>

			<ul>

			</ul>
		</div>
	);
}

