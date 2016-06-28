import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import filter from 'lodash/collection/filter';
import Todo from './Todo';
import FocusInput from './FocusInput';

function orderTodos(todos) {
  // set date's time to 0:00 of today
  const date = new Date();
  const midnight = date.setHours(0,0,0,0);
  const workingOn = filter(todos, todo => todo.workingOn && !todo.completed);
  const notStarted = filter(todos, todo => !todo.workingOn && !todo.completed)
    .reverse();
  const completed = filter(todos, todo => {
    return todo.completed && todo.completed > midnight
  });

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
  shouldComponentUpdate(nextProps) {
    return this.props.todos !== nextProps.todos;
  }
  render() {
    const { todos, toggleTodoCompletion, removeTodo, toggleTodoEdit } = this.props;

    const orderedTodos = orderTodos(todos);
    return (
      <div id="todos-container">
        <h5>TODOS</h5>

        <Form onSubmit={this.handleSubmit.bind(this)} ref="form">
          <FocusInput name="todo" placeholder="Add a Todo" />
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
