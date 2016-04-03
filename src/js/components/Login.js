import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import FocusInput from './FocusInput';

export default class Login extends Component {
	handleSubmit(e) {
		const { login } = this.props;
		if (e.email && e.password) {
			login(e.email, e.password);
			this.refs.form.reset();
		}
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit.bind(this)} ref="form">
				<div className="label">LOGIN</div>
				<FocusInput 
					name="email" 
					placeholder="Email..." 
					autoFocus={true}
					type="text" />
				<FocusInput 
					name="password" 
					placeholder="Password..." 
					autoFocus={true}
					type="password" />
				<button className="button-regular">SUBMIT</button>
			</Form>
		);
	}
}