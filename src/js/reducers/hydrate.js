import {
	HYDRATE_STATE,
	UNFLAG_HYDRATE,
} from '../actions/hydrate';

const initialState = {
	flag: false,
};

export default function hydrate(state=initialState, action) {
	switch(action.type) {
		case HYDRATE_STATE:
			return { flag: true };

		case UNFLAG_HYDRATE:
			return { flag: false };

		default: 
			return state;
	}
}