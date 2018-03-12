import React, { Component } from 'react';
import classnames from 'classnames';
import WebsiteList from './WebsiteList';

const MINUTE = 60000;

const displayTime = (duration) => {
  if (duration < (MINUTE * 60)) {
    const minutes = duration / MINUTE;
    return <span>{minutes.toString().length < 2 ? `0${minutes}` : minutes}<span className="smaller">m</span></span>;
  }

  const hours = Math.floor(duration / (MINUTE * 60));
  const minutes = (duration % (MINUTE * 60)) / MINUTE;
  return <span>{hours}<span className="smaller">h</span> {minutes.toString().length < 2 ? `0${minutes}` : minutes}<span className="smaller">m</span></span>;
};

export default class Profile extends Component {
  render() {
    const {
      showSites,
      websites,
      removeWebsite,
      disabled,
      toggleShowSites,
      setTimerLength,
      duration,
      toggleTicking,
      toggleNotificationSound,
      ticking,
      notification,
      toggleNightMode,
      ui,
    } = this.props;

    return (
      <div>
        <div className={classnames({blurring: showSites})}>
          <b className="pointer" onClick={() => toggleShowSites()}>Settings</b>
          <div className="night-mode-toggle">
            {
              ui.nightMode
              ? <span onClick={() => toggleNightMode()}><i className="material-icons">wb_sunny</i></span>
              : <span onClick={() => toggleNightMode()}><i className="material-icons">brightness_2</i></span>
            }
          </div>
        </div>
        <div className={classnames('profile-wrapper', {display: showSites})}>
          <div className="profile">
            <div className="margin-bottom">
              <h5>FOCUS LENGTH</h5>
              <div className="flex flex-center">
                <h1
                  className="margin-right-sm pointer no-select"
                  onClick={() => setTimerLength('DECREMENT')}
                >
                  -
                </h1>
                <h1
                  className="margin-right-sm pointer no-select"
                  onClick={() => setTimerLength('INCREMENT')}
                >
                  +
                </h1>
                <h1 className="margin-left-sm">{displayTime(duration)}</h1>
              </div>
            </div>

            <div className="margin-bottom">
              <h5>SOUNDS</h5>
              {
                notification
                ? (
                  <div className="margin-bottom-sm">
                    <span className="margin-right-sm">Notification sound is ON.</span>
                    <button className="button-small" onClick={() => toggleNotificationSound()}>Turn notification sound <b>OFF</b></button>
                  </div>
                )
                : (
                  <div className="margin-bottom-sm">
                    <span className="margin-right-sm">Notification sound is OFF.</span>
                    <button className="button-small" onClick={() => toggleNotificationSound()}>Turn notification sound <b>ON</b></button>
                  </div>
                )
              }

              {
                ticking
                ? (
                  <div>
                    <span className="margin-right-sm">Ticking sound during timer is ON.</span>
                    <button className="button-small" onClick={() => toggleTicking()}>Turn ticking <b>OFF</b></button>
                  </div>
                )
                : (
                  <div>
                    <span className="margin-right-sm">Ticking sound during timer is OFF.</span>
                    <button className="button-small" onClick={() => toggleTicking()}>Turn ticking <b>ON</b></button>
                  </div>
                )
              }
            </div>

            <WebsiteList
              websites={websites}
              removeWebsite={removeWebsite}
              disabled={disabled}
              toggleShowSites={toggleShowSites}
            />
          </div>

          <div id="hide-sites">
            <b className="pointer icon-cross" onClick={() => toggleShowSites()}></b>
          </div>

        </div>
      </div>
    );
  }
}
