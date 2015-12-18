import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default function SessionsList(props) {
	return (
		<div>
			<h5>TODOS</h5>
			<Form ref="form">
				<FocusInput name="website" placeholder="Add a Todo" />
				<button>Submit</button>
			</Form>
			
			<ul>

			</ul>
		</div>
	);
}