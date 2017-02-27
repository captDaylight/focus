import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import FocusInput from './FocusInput';

export default class Register extends Component {
  handleSubmit(e) {
    const { register } = this.props;
    if (e.email && e.password) {
      register(e.email, e.password);
      this.refs.form.reset();
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} ref="form">
        <div>REGISTER</div>
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
        <button>SUBMIT</button>
      </Form>
    );
  }
}