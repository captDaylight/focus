export default function storageSync(initState) {
  let prevState = initState;
  return (state) => {
    // hourly max set quota is 1800, or once every 2 seconds
    // have to make sure not to overpost, ie, each second with the timer
    if (state.timer !== prevState.timer) {
      if (state.timer.date !== prevState.timer.date) {
        // console.log('Should Storage 1', state);
        chrome.storage.sync.set(state);
      }
    } else {
      // console.log('Should Storage 2', state);
      chrome.storage.sync.set(state);
    }

    // between tabs the timer state was not being maintained if you have the settings opened
    if (state.timer.duration !== prevState.timer.duration) {
      // console.log('SHOULD STORAGE here');
      chrome.storage.sync.set(state);
    }

    if (state.timer.sessions.length !== 0) {
      const currentLast = state.timer.sessions[state.timer.sessions.length - 1]
      const previousLast = prevState.timer.sessions[prevState.timer.sessions.length - 1]
      if (currentLast.distractions !== previousLast.distractions) {
        chrome.storage.sync.set(state);
      }
    }

    // set previous state
    prevState = state;
  }
}
