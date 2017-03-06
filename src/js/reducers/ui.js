import {
  SET_NEXT_INTRO_STEP,
  TOGGLE_NIGHT_MODE,
} from '../actions/ui';

const initialState = {
  introStep: 0,
  nightMode: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_INTRO_STEP:
      return { ...state, introStep: state.introStep + 1 };

    case TOGGLE_NIGHT_MODE:
      return { ...state, nightMode: !state.nightMode };

    default:
      return state;
  }
}
