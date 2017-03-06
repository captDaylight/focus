import {
  ADD_USER,
} from '../actions/user';

const initialState = {
  id: '',
  email: '',
  token: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      console.log('adding user', action.userId);
      return { ...state, id: action.userId };

    default:
      return state;
  }
}
