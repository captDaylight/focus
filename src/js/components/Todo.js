import React, { Component } from 'react';
import Formsy, { Form } from 'formsy-react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
  handleSubmit(data) {
    const { editTodo, todo } = this.props;

    editTodo(todo.id, data.todoedit);
    this.refs.form.reset();
  }
  render() {
    const {
      todo,
      toggleTodoCompletion,
      toggleTodoWorking,
      removeTodo,
      toggleTodoEdit
    } = this.props;

    return (
      <li
        className={classnames('todo', {
          working: todo.workingOn && !todo.completed,
          completed: todo.completed,
        })} >
        {
          todo.editing
          ?
          (<Form ref="form" onSubmit={this.handleSubmit.bind(this)}>
            <FocusInput name="todoedit" placeholder="todoedit" value={todo.todo} autoFocus={true} />
          </Form>)
          :
          (<div className="todo-container">
            <div className={`todo-grip ${!!todo.completed ? 'no-grip' : ''}`}>&#9776;</div>
            <div className="todo-controls left-right">
              <div
                className="todo-content"
                onClick={() => {
                  if (todo.workingOn) {
                    toggleTodoCompletion(todo.id);
                  } else {
                    toggleTodoWorking(todo.id);
                  }
                }} >
                {todo.todo}
              </div>
              <div className="todo-actions">
                {
                  !todo.completed
                  ? (
                    <button
                      className="button-small"
                      onClick={() => toggleTodoCompletion(todo.id)}
                    >
                      Finish
                    </button>
                  ) : null
                }
                {
                  !todo.workingOn && !todo.completed
                  ? (
                    <button
                      className="button-small"
                      onClick={() => toggleTodoWorking(todo.id)}
                    >
                      Start
                    </button>
                  ) : null
                }
                {
                  todo.workingOn && !todo.completed
                  ? (
                    <button
                      className="button-small"
                      onClick={() => toggleTodoWorking(todo.id)}
                    >
                      Cancel
                    </button>
                  )  : null
                }
                <div
                  className="todo-icon icon-pencil"
                  onClick={() => toggleTodoEdit(todo.id)}
                ></div>
                <div
                  className="todo-icon icon-bin"
                  onClick={() => removeTodo(todo.id)}
                ></div>
              </div>
            </div>
          </div>
          )
        }


      </li>
    );
  }
}
