import { combineReducers } from 'redux';
import websites from './websites';
import timer from './timer';
import hydrate from './hydrate';
import { HYDRATE_STATE } from '../actions/hydrate';

// this was pulled directly from https://github.com/rackt/redux/pull/658
// ability to hydrate the state at anypoint, ie when changes com in on storage
// on change listener
function makeHydratable(reducer, hydrateActionType) {
	return function (state, action) {
		switch (action.type) {
		case hydrateActionType:
			return reducer(action.state, action);
		default:
			return reducer(state, action);
		} 
	}
}

const rootReducer = combineReducers({
	websites,
	timer, 
	hydrate,
});

export default makeHydratable(rootReducer, HYDRATE_STATE);