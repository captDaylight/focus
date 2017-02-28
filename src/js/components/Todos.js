import React, { Component } from 'react';
import Dragula from 'react-dragula';
import { filter, groupBy } from 'lodash';
import Todo from './Todo';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
  constructor(props) {
    super(props)
    this.dragulaDecorator = this.dragulaDecorator.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.todos !== nextProps.todos;
  }

  dragulaDecorator(node) {
    if (node) {
      const options = { };
      Dragula([node], options).on('drop', (el, target) => {
        const listItems = target.getElementsByTagName('li');
        let listIds = [];
        for (let i = 0; i < listItems.length; i++) {
          listIds.push(listItems[i].id);
        }
        console.log(listIds);
      });
    }
  }

  render() {
    const { todos, toggleTodoCompletion, removeTodo, toggleTodoEdit, addTodo } = this.props;
    const groupedByCompleted = groupBy(todos, todo => !!todo.completed);
    const groupedByStarted = groupBy(groupedByCompleted.false, todo => !!todo.workingOn);

    return (
      <div id="todos-container">
        <h5>TODOS</h5>

        <FocusInput addTodo={addTodo} placeholder="Add a Todo" />

        {groupedByStarted.true && <ul className="todos" ref={this.dragulaDecorator}>
          {groupedByStarted.true.map(todo =>
            <Todo key={todo.id} todo={todo} {...this.props} />)
          }
        </ul>}

        {groupedByStarted.false && <ul className="todos" ref={this.dragulaDecorator}>
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
