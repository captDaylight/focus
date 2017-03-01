import shortid from 'shortid';
import { findIndex } from 'lodash';
import split from '../utils/split';
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO_WORKING,
  TOGGLE_TODO_COMPLETION,
  TOGGLE_TODO_EDIT,
  EDIT_TODO,
  UPDATE_TODOS,
  UPDATE_TODO_ORDER,
} from '../actions/todos';

const initialState = {
  todos: [],
};

function updateInArray(items, id, keysAndFns) {
  const idx = findIndex(items, item => item.id === id);
  const splitItems = split(items, idx);
  const itemPrevious = items[idx];
  const itemUpdate = { ...itemPrevious };
  keysAndFns.forEach((obj) => {
    itemUpdate[obj.key] = obj.fn(itemPrevious[obj.key]);
  });
  return [...splitItems[0], itemUpdate, ...splitItems[1]];
}

const dateOrNull = value => (value ? null : Date.now());

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const todo = {
        todo: action.todo,
        id: shortid.generate(),
        created: Date.now(),
        completed: null,
        workingOn: null,
        editing: false,
      };
      return { ...state, todos: [...state.todos, todo] };
    }

    case REMOVE_TODO: {
      const id = action.id;
      return { ...state, todos: state.todos.filter(item => item.id !== id) };
    }

    case TOGGLE_TODO_COMPLETION:
      return {
        ...state,
        todos: updateInArray(state.todos, action.id, [{
          key: 'completed',
          fn: dateOrNull,
        }]),
      };

    case TOGGLE_TODO_WORKING:
      return {
        ...state,
        todos: updateInArray(state.todos, action.id, [{
          key: 'workingOn',
          fn: dateOrNull,
        }]),
      };

    case TOGGLE_TODO_EDIT:
      return {
        ...state,
        todos: updateInArray(state.todos, action.id, [{
          key: 'editing',
          fn: value => !value,
        }]),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: updateInArray(state.todos, action.id, [{
          key: 'todo',
          fn: () => action.todo,
        }, {
          key: 'editing',
          fn: value => !value,
        }]),
      };

    case UPDATE_TODOS:
      return { ...state, todos: action.todos };

    case UPDATE_TODO_ORDER:
      return state;

    default:
      return state;
  }
}
