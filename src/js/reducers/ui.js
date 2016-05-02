import {
	SET_NEXT_INTRO_STEP
} from '../actions/ui';

const initialState = {
	introStep: 0
};

export default function user(state=initialState, action) {
	switch(action.type) {
		case SET_NEXT_INTRO_STEP:
    console.log('here---');
			return {...state, introStep: ++state.introStep};

		default:
			return state;
	}
}
