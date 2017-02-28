import React, { Component } from 'react';
import classnames from 'classnames';
import FocusInput from './FocusInput';

export default class SessionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { editTodoValue: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ editTodoValue: this.props.todo.todo });
  }

  handleChange(e) {
    this.setState({ editTodoValue: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { editTodo, todo } = this.props;
    const { editTodoValue } = this.state;

    editTodo(todo.id, editTodoValue);
  }

  render() {
    const {
      todo,
      toggleTodoCompletion,
      toggleTodoWorking,
      removeTodo,
      toggleTodoEdit,
    } = this.props;
    const {editTodoValue} = this.state;

    return (
      <li
        className={classnames('todo', {
          working: todo.workingOn && !todo.completed,
          completed: todo.completed,
        })}
        id={todo.id}
      >
        {
          todo.editing
          ?
          (<form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Edit Todo"
              value={editTodoValue}
            />
          </form>)
          :
          (<div className="todo-container">
            <div className={`todo-grip ${!todo.completed ? '' : 'no-grip'}`}>&#9776;</div>
            <div className="todo-controls left-right">
              <div
                className="todo-content"
                onClick={() => {
                  if (todo.workingOn) {
                    toggleTodoCompletion(todo.id);
                  } else {
                    toggleTodoWorking(todo.id);
                  }
                }}
              >
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
                  ) : null
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
