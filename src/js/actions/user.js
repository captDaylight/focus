import qwest from 'qwest';

export const ADD_USER = 'ADD_USER';
export function addUser(token, userData) {
  return {
    type: ADD_USER,
    token,
    userData
  }
}

export const REMOVE_USER = 'REMOVE_USER';
export function removeUser() {
  return {
    type: REMOVE_USER,
  }
}

export function register(email, password) {
  return dispatch => {
    qwest.post('http://localhost:3000/api/user',{
      email,
      password,
    })
    .then((xhr, res) => {
      dispatch(addUser(res.token, res.user));
    })
    .catch((err, xhr, res) => {
    });
  }
}

export function login(email, password) {
  return dispatch => {
    qwest.post('http://localhost:3000/api/authenticate',{
      email,
      password,
    })
    .then((xhr, res) => {
      dispatch(addUser(res.token, res.user));
    })
    .catch((err, xhr, res) => {
    });
  }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
  }
}
