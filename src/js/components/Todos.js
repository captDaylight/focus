import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

function handleSubmit(e) {
	console.log(e);
}

export default function SessionsList(props) {
	return (
		<div>
			<h5>TODOS</h5>
			
			<Form onSubmit={handleSubmit}>
				<FocusInput name="website" placeholder="Add a Todo" />
				<button>Submit</button>
			</Form>

			<ul>

			</ul>
		</div>
	);
}

