import React from 'react';
import Formsy from 'formsy-react';

const FocusInput = React.createClass({

  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },

  render() {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.getErrorMessage();

    const { type, name, placeholder } = this.props;
    return (
      <div className='form-group'>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type={type || 'text'}
          name={name}
          placeholder={placeholder}
          onChange={this.changeValue}
          value={this.getValue()}
          autoComplete="off"
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          autoFocus={this.props.autoFocus}
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

export default FocusInput;