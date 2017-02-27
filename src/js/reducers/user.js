import {
  ADD_USER,
  LOGOUT,
} from '../actions/user';

const initialState = {
  token: '',
  email: '',
}

export default function user(state=initialState, action) {
  switch(action.type) {
    case ADD_USER:
      return {...state, token: action.token, ...action.userData};

    case LOGOUT: 
      return {...initialState}

    default: 
      return state;
  }
}