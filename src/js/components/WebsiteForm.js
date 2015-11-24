import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import url from 'url';
import takeRight from 'lodash/array/takeRight';
import FocusInput from './FocusInput';

export default class WebsiteForm extends Component {
	handleSubmit(data) {	
		const { addWebsite } = this.props;
		const urlParse = url.parse(data.website);
		const hostname = urlParse.hostname ? urlParse.hostname : urlParse.pathname;
		// turn www.facebook.com into facebook.com
		const parsedHostname = takeRight(hostname.split('.'), 2).join('.');

		addWebsite(parsedHostname);
		this.refs.form.reset();
	}
	render() {
		return (
			<Form ref="form" onSubmit={this.handleSubmit.bind(this)}>
				<FocusInput name="website" placeholder="Website" />
				<button>Submit</button>
			</Form>
		)
	}
}