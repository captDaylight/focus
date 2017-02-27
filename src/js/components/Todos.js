import React, { Component } from 'react';
import { Form } from 'formsy-react';
import Dragula from 'react-dragula';
import filter from 'lodash/collection/filter';
import Todo from './Todo';
import FocusInput from './FocusInput';

function orderTodos(todos) {
  // set date's time to 0:00 of today
  const date = new Date();
  const midnight = date.setHours(0, 0, 0, 0);
  const workingOn = filter(todos, todo => todo.workingOn && !todo.completed);
  const notStarted = filter(todos, todo => !todo.workingOn && !todo.completed)
    .reverse();
  const completed = filter(todos, todo => todo.completed && todo.completed > midnight);

  return [...workingOn, ...notStarted, ...completed];
}

function dragulaDecorator(node) {
  if (node) {
    const options = { };
    Dragula([node], options);
  }
}

export default class SessionsList extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFormNode = (node) => {
      this.formNode = node;
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.todos !== nextProps.todos;
  }

  handleSubmit(e) {
    const { addTodo } = this.props;
    if (e.todo) {
      addTodo(e.todo);
      this.formNode.reset();
    }
  }

  render() {
    const { todos, toggleTodoCompletion, removeTodo, toggleTodoEdit } = this.props;
    const orderedTodos = orderTodos(todos);
    return (
      <div id="todos-container">
        <h5>TODOS</h5>

        <Form onSubmit={this.handleSubmit} ref={this.getFormNode}>
          <FocusInput name="todo" placeholder="Add a Todo" />
        </Form>

        <ul id="todos" ref={dragulaDecorator}>
          {orderedTodos.map(todo =>
            <Todo key={todo.id} todo={todo} {...this.props} />)
          }
        </ul>
      </div>
    );
  }
}
