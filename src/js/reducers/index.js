import { combineReducers } from 'redux';
import websites from './websites';
import timer from './timer';
import todos from './todos';

// this was pulled directly from https://github.com/rackt/redux/pull/658
// ability to hydrate the state at anypoint, ie when changes com in on storage
// on change listener

const rootReducer = combineReducers({
  websites,
  timer, 
  todos,
});

export default rootReducer;