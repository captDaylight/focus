import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import {addAWebsite} from './actions/websites';
const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
)

const test = [];
console.log(test);
const test2 = [...test, 2];
console.log(test2);

store.dispatch(addAWebsite('www.google.com'));
// store.dispatch(addAWebsite('www.test.com'));