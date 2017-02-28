import React, { Component } from 'react';

export default class SessionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { newTodoValue: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addTodo } = this.props;
    const { newTodoValue } = this.state;
    if (newTodoValue.length > 0) {
      addTodo(newTodoValue);
      this.setState({ newTodoValue: '' });
    }
  }

  handleChange(e) {
    this.setState({ newTodoValue: e.target.value });
  }

  render() {
    const { newTodoValue } = this.state;
    const { placeholder } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          placeholder={placeholder}
          type="text"
          value={newTodoValue}
        />
      </form>
    );
  }
}
