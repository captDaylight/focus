export const SET_NEXT_INTRO_STEP = 'SET_NEXT_INTRO_STEP';
export function setNextIntroStep() {
  return {
    type: SET_NEXT_INTRO_STEP,
  };
}

export const TOGGLE_NIGHT_MODE = 'TOGGLE_NIGHT_MODE';
export function toggleNightMode() {
  return {
    type: TOGGLE_NIGHT_MODE,
  };
}

export const ADD_VERSION = 'ADD_VERSION';
export function addVersion(version) {
  return {
    type: ADD_VERSION,
    version,
  }
}
