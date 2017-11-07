import React, { Component } from 'react';
import classnames from 'classnames';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger';
import AddWebsites from '../components/AddWebsites';
import MinutesAndSeconds from '../components/MinutesAndSeconds';
import AskCancel from '../components/AskCancel';
import Profile from '../components/Profile';
import SessionsList from '../components/SessionsList';
import Todos from '../components/Todos';
import { websitesData } from '../websitesData';

const actions = wrapActionsWithMessanger([
  'addWebsite',
  'clearTimer',
  'countDown',
  'toggleShowSites',
  'removeWebsite',
  'addTodo',
  'toggleTodoCompletion',
  'removeTodo',
  'toggleTodoEdit',
  'editTodo',
  'toggleTodoWorking',
  'register',
  'setNextIntroStep',
  'toggleAskCancelTimer',
  'setTimerLength',
  'toggleTicking',
  'toggleNotificationSound',
  'updateTodoOrder',
  'toggleNightMode',
]);

let oldState = {};

export default class FocusContainer extends Component {
  constructor(props) {
    super(props);
    oldState = props.state;
    this.state = props.state;
  }

  updateState(newState) {
    const { seconds, minutes } = newState.timer;
    if (seconds && seconds !== oldState.timer.seconds) {
      let stateNewTime = oldState;
      stateNewTime.timer.seconds = seconds;
      stateNewTime.timer.minutes = minutes;
      this.setState(stateNewTime);
      oldState = stateNewTime;
    } else {
      this.setState(newState);
      oldState = newState;
    }
  }

  componentWillMount() {
    const { updateState } = this;
    chrome.extension.onMessage.addListener((req, sender, sendRes) => {
      if (req.type === 'STATE_UPDATE' && req.dest !== 'BLOCKER') {
        updateState.call(this, req.data);
      }
      return true;
    });
  }

  render() {
    const {
      clearTimer, countDown, removeWebsite, addTodo, toggleTodoCompletion,
      toggleTodoWorking, removeTodo, toggleShowSites, toggleTodoEdit, toggleTicking,
      editTodo, setNextIntroStep, toggleAskCancelTimer, setTimerLength,
      toggleNotificationSound, updateTodoOrder, toggleNightMode,
    } = actions;
    const {
      date, minutes, seconds, duration, sessions, ampm, notification,
      askCancelTimer, ticking
    } = this.state.timer;
    const { websites, showSites } = this.state.websites;
    const { todos } = this.state.todos;
    const { ui } = this.state;

    return (
      <section
        id="focus-container"
        className={classnames({
          focusing: !!minutes,
          'night-blue': ui.nightMode && !minutes,
          'night-red': ui.nightMode && !!minutes,
        })}
      >
        {(() => {
          switch (ui.introStep) {
            case 0: return (
              <div>
                <AddWebsites
                  websitesData={websitesData}
                  addWebsite={actions.addWebsite}
                  removeWebsite={actions.removeWebsite}
                  websites={websites}
                  setNextIntroStep={setNextIntroStep}
                />
              </div>);
            case 1: return (
              <div>
                <div className="intro-text">
                  <h5>Step 2 <br /> Add Custom Sites to Block</h5>
                  <h6>
                    When you are on a site you want to block, click the drop down
                    and select &quot;Block This Site&quot;.
                    <br /><br />
                    You can also start a focus session from here.
                  </h6>
                </div>
                <img alt="" src="dist/img/block.png" />
                <div className="intro-next">
                  <button className="popup" onClick={() => setNextIntroStep()}>next</button>
                </div>
              </div>);
            case 2: return (
              <div>
                <div className="intro-text">
                  <h5>Step 3 <br /> Start Focusing</h5>
                  <h6>
                    Go to settings in the top right and set your focus time (default 25 minutes). Then click "Start Focusing".
                  </h6>
                </div>
                <img alt="" className="intro-image" src="dist/img/25m.png" />
                <div className="intro-next">
                  <button className="popup" onClick={() => setNextIntroStep()}>next</button>
                </div>
              </div>);
            case 3: return (
              <div>
                <div className="intro-text">
                  <h5>Step 3 <br /> Add Todos</h5>
                  <h6>
                    Break your task into small units list them.
                  </h6>
                </div>
                <img alt="" className="intro-image" src="dist/img/todo.png" />
                <div className="intro-next">
                  <button className="popup" onClick={() => setNextIntroStep()}>next</button>
                </div>
              </div>);
            case 4: return (
              <div>
                <div className="intro-text">
                  <h5>Step 4 <br /> Enjoy!</h5>
                  <h6>{'That\'s it, now give it spin!'}</h6>
                </div>
                <div className="intro-next">
                  <button className="popup" onClick={() => setNextIntroStep()}>next</button>
                </div>
              </div>);
            default: return (
              <div>
                <div id="header">
                  <div id="main-action" className={classnames({ blurring: showSites })}>
                    {
                      minutes
                      ? (<div>
                          <MinutesAndSeconds
                            minutes={minutes}
                            seconds={seconds}
                          />
                          <AskCancel
                            toggleAskCancelTimer={toggleAskCancelTimer}
                            askCancelTimer={askCancelTimer}
                            clearTimer={clearTimer}
                          />
                        </div>)
                      : (
                        <button
                          className="focus-button"
                          onClick={() => countDown(Date.now(), duration, notification, ticking)}
                        >
                          start focusing
                        </button>
                      )
                    }
                  </div>
                  <Profile
                    showSites={showSites}
                    websites={websites}
                    toggleShowSites={toggleShowSites}
                    removeWebsite={removeWebsite}
                    disabled={!!minutes}
                    setTimerLength={setTimerLength}
                    duration={duration}
                    toggleTicking={toggleTicking}
                    toggleNotificationSound={toggleNotificationSound}
                    notification={notification}
                    ticking={ticking}
                    toggleNightMode={toggleNightMode}
                    ui={ui}
                  />
                </div>

                <div id="spread" className={classnames({ blurring: showSites })}>
                  <Todos
                    addTodo={addTodo}
                    toggleTodoWorking={toggleTodoWorking}
                    toggleTodoCompletion={toggleTodoCompletion}
                    removeTodo={removeTodo}
                    todos={todos}
                    toggleTodoEdit={toggleTodoEdit}
                    editTodo={editTodo}
                    updateTodoOrder={updateTodoOrder}
                  />
                  <SessionsList
                    sessions={sessions}
                    ampm={ampm}
                    todos={todos}
                  />
                </div>
              </div>
            );
          }
        })()}
      </section>
    );
  }
}
