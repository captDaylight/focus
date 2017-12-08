import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { groupBy } from 'lodash';
import rootReducer from './reducers';
import createStorageSync from './utils/storageSync';
import * as timerActions from './actions/timer';
import * as websiteActions from './actions/websites';
import * as todoActions from './actions/todos';
import * as uiActions from './actions/ui';
import * as userActions from './actions/user';
import cleanUp from './utils/cleanUp';

function sessionCheck(sessions, duration){
  // console.log(sessions[sessions.length - 1].date, Date.now(), sessions[sessions.length - 1].date > Date.now());
  const { date } =  sessions[sessions.length - 1];
  return (date + duration) > Date.now();
}

const init = (initState) => {
  const createAndComposeStore = compose(
    applyMiddleware(thunkMiddleware)
  )(createStore);

  // adding new values to timer, should figure out a better way to do this
  if (initState) {
    initState.timer.sessions = initState.timer.sessions.map((s) => {
      if ('distractions' in s) {
        return s;
      }
      return { ...s, distractions: 0 };
    });
  }
  if (initState && !('notification' in initState.timer)) {
    initState.timer.notification = true;
  }
  if (initState && !('ticking' in initState.timer)) {
    initState.timer.ticking = false;
  }
  if (initState && !('nightMode' in initState.ui)) {
    initState.ui.nightMode = false;
  }

  // * if new user, add current version, thus don't show popup
  // * if not new user and current version isn't in list add "__ADD_VERSION__"
  // if starting app and you see "__ADD_VERSION__", then show popup if there is corresponding info
  // if not add version number to the seen list
  // when user is done with popup, remove "__ADD_VERSION__" and add the current version to the list
  if (initState && !('newVersions' in initState.ui)) {
    // situation where they are updating from previous versions
    // but they have never had any versions added before, aka this feature
    // is brand new, add the flag, and they are shown the popup

    initState.ui.newVersions = ['__ADD_VERSION__']; // add current version
  } else {
    // this is the situation where they have the newVersions in redux,
    // and they just got the latest and greatest

    const version = chrome.runtime.getManifest().version;
    const idx = initState.ui.newVersions.indexOf(version);

    if (initState.ui.newVersions.length === 0) {
      // this is the situation where it's a BRAND new user, don't show them the new features list
      initState.ui.newVersions.push(version);
    } else if (idx < 0) {
      // they aren't a new user and if you can't find the version set the flag
      initState.ui.newVersions.push('__ADD_VERSION__');
    }
  }

  if (initState && initState.todos && initState.todos.todos.length > 0) {
    if (!initState.todos.todos[0].hasOwnProperty('order')) {
      // people with todos that haven't been ordered yet
      const groupedByCompleted = groupBy(initState.todos.todos, todo => !!todo.completed);
      const groupedByStarted = groupBy(groupedByCompleted.false, todo => !!todo.workingOn);
      const completed = Boolean(groupedByCompleted.true)
        ? groupedByCompleted.true.map((todo, idx) => ({ ...todo, order: idx }))
        : [];
      const started = Boolean(groupedByStarted.true)
        ? groupedByStarted.true.map((todo, idx) => ({ ...todo, order: idx }))
        : [];
      const notStarted = Boolean(groupedByStarted.false)
        ? groupedByStarted.false.map((todo, idx) => ({ ...todo, order: idx }))
        : [];
      initState.todos.todos = [...completed, ...started, ...notStarted];
    }
  }

  const store = initState
    ? createAndComposeStore(rootReducer, initState)
    : createAndComposeStore(rootReducer);

  const storageSync = createStorageSync(store.getState());

  const { timer: { sessions, duration, sound }, user, websites } = store.getState();

  // if (user && (!('id' in user) || user.id.length > 6 || user.id.length === 0)) {
  //   // TODO remove the < 10 check once enough people have signed up
  //   fetch(`${process.env.API_URL}api/user`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: new Headers({
  //       'Content-Type': 'application/json'
  //     }),
  //   })
  //   .then(res => res.json())
  //   .then((res) => {
  //     store.dispatch(userActions.addUser(res.data.user.id))
  //     // add websites to server
  //     fetch(`${process.env.API_URL}api/website`, {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: new Headers({
  //         'Content-Type': 'application/json'
  //       }),
  //       body: JSON.stringify({
  //         UserId: res.data.user.id,
  //         urls: websites.websites.map((w) => w.url),
  //       }),
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log('websites',res);
  //     })
  //   });
  // }

  if (sessions.length > 0) {
    if (sessionCheck(sessions, duration)) {
      // if timer is still going on init, restart countdown
      const { date } = sessions[sessions.length - 1];
      store.dispatch(timerActions.startCountDown(date, (date + duration) - Date.now(), sound));
    } else {
      // clear timer info
      store.dispatch(timerActions.clearCountdownInterval());
      chrome.storage.sync.set(store.getState());
    }
  } else {
    storageSync(store.getState());
  }

  // subscribe to store and sync chrome state
  store.subscribe(() => {
    const state = store.getState();
    const statePayload = { type: 'STATE_UPDATE', data: state };

    if (state.timer.date) {
      const {duration, date} = state.timer;
      const timeLeft = (date + duration) - Date.now();
      if (timeLeft >= 59000) {
        const minutesLeft = Math.floor((timeLeft) / 60000).toString();
        chrome.browserAction.setBadgeText({text: `${minutesLeft}m`});
      } else {
        const secondsLeft = Math.floor((timeLeft) / 1000).toString();
        chrome.browserAction.setBadgeText({text: `${secondsLeft}s`});
      }
    } else {
      chrome.browserAction.setIcon({path: 'dist/img/logo-sm-blue.png'});
      chrome.browserAction.setBadgeText({text: ''});
    }

    storageSync(state);

    // for the popup
    chrome.runtime.sendMessage(statePayload);

    // for the blocker
    chrome.tabs.query(
      {currentWindow: true, active : true},
      tab => {
        if (tab.length !== 0) {
          // console.log('sending message');
          chrome.tabs.sendMessage(tab[0].id, {...statePayload, dest: 'BLOCKER'})
        }
      }
    )
  });

  chrome.tabs.onActivated.addListener((info) => {
    const state = store.getState();
    const statePayload = { type: 'STATE_UPDATE', data: state };
    const tabId = info.tabId;
    const windowId = info.windowId;
    chrome.tabs.sendMessage(tabId, statePayload);
  });

  // TODO: switch this to long-lived connection
  // https://developer.chrome.com/extensions/messaging#connect
  chrome.extension.onMessage.addListener((req, sender, sendRes) => {
    const actions = { ...timerActions, ...websiteActions, ...todoActions, ...uiActions };
    // console.log('STATE', req.action, req.data);
    // const {token} = store.getState().user;
    if (req.type === 'ACTION') {
      // console.log('req action');
      store.dispatch(actions[req.action](...req.data));
    }
    return true;
  });

  // CLEAN UP
  // create alarm
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  chrome.alarms.create('DAILY_CLEANUP', {
    when: midnight.getTime(),
    periodInMinutes: 1440,
  });

  // clean store on init
  cleanUp(store);

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'DAILY_CLEANUP') {
      // clean store everyday at midnight
      cleanUp(store);
    }
  });
};

// console.log(chrome.storage.sync.clear());
chrome.storage.sync.get(null, (data) => {
  init(Object.keys(data).length !== 0 ? data : false);
});
