export const ADD_USER = 'ADD_USER';
export function addUser(userId) {
  return {
    type: ADD_USER,
    userId,
  };
}
