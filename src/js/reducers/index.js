import { combineReducers } from 'redux';

// content
import websites from './websites';
import timer from './timer';

const rootReducer = combineReducers({
	websites,
	timer, 
});

export default rootReducer;