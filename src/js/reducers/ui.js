import {
  SET_NEXT_INTRO_STEP,
  TOGGLE_NIGHT_MODE,
  ADD_VERSION,
} from '../actions/ui';

const initialState = {
  introStep: 0,
  nightMode: false,
  newVersions: [chrome.runtime.getManifest().version],
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_NEXT_INTRO_STEP:
      return { ...state, introStep: state.introStep + 1 };

    case TOGGLE_NIGHT_MODE:
      return { ...state, nightMode: !state.nightMode };

    case ADD_VERSION:
      return {
        ...state,
        newVersions: [action.version, ...state.newVersions.filter(v => ((v !== '__ADD_VERSION__') && (typeof v === 'string')))],
      };

    default:
      return state;
  }
}
