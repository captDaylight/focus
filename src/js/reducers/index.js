import { combineReducers } from 'redux';

// content
import websites from './websites';

const rootReducer = combineReducers({
	websites,
});

export default rootReducer;