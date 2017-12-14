import {
  SET_NEXT_INTRO_STEP,
  TOGGLE_NIGHT_MODE,
  ADD_VERSION,
} from '../actions/ui';

const initialState = {
  introStep: 0,
  nightMode: false,
  newVersions: [],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_INTRO_STEP:
      return { ...state, introStep: state.introStep + 1 };

    case TOGGLE_NIGHT_MODE:
      return { ...state, nightMode: !state.nightMode };

    case ADD_VERSION:
      console.log('aadding version!!!', action.version, [action.version, ...state.newVersions]);
      // return {
      //   ...state,
      //   newVersions: [action.version, ...state.newVersions],
      // };
      return state;

    default:
      return state;
  }
}
