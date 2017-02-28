import React, { Component } from 'react';
import { Form } from 'formsy-react';
import Dragula from 'react-dragula';
import { filter, groupBy } from 'lodash';
import Todo from './Todo';
import FocusInput from './FocusInput';

function dragulaDecorator(node) {
  if (node) {
    const options = { };
    Dragula([node], options);
  }
}

export default class SessionsList extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, toggleTodoCompletion, removeTodo, toggleTodoEdit, addTodo } = this.props;
    const groupedByCompleted = groupBy(todos, todo => !!todo.completed);
    const groupedByStarted = groupBy(groupedByCompleted.false, todo => !!todo.workingOn);

    return (
      <div id="todos-container">
        <h5>TODOS</h5>

        <FocusInput addTodo={addTodo} placeholder="Add a Todo" />

        {groupedByStarted.true && <ul className="todos" ref={dragulaDecorator}>
          {groupedByStarted.true.map(todo =>
            <Todo key={todo.id} todo={todo} {...this.props} />)
          }
        </ul>}

        {groupedByStarted.false && <ul className="todos" ref={dragulaDecorator}>
          {groupedByStarted.false.map(todo =>
            <Todo key={todo.id} todo={todo} {...this.props} />)
          }
        </ul>}

        {groupedByCompleted.true && <ul className="todos">
          {groupedByCompleted.true.map(todo =>
            <Todo key={todo.id} todo={todo} {...this.props} />)
          }
        </ul>}
      </div>
    );
  }
}
