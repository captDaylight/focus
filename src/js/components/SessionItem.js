import React, { Component } from 'react';
import classnames from 'classnames';
import formatAMPM from '../utils/formatAMPM';
import TwitterSvg from './TwitterSvg';

function isTodayOrDate(time) {
  const date = new Date(time);
  const now = new Date();
  if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDay() === now.getDay()) {
    return 'Today';
  } else {
    return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
  }
}

export default class SessionsList extends Component {
  render() {
    const {
      current,
      date,
      dateEnd,
      working,
      finished,
      distractions,
    } = this.props;

    return (
      <li className={classnames('session social-outer', { current })}>
        <div className="session-header">
          <div>
            <h5>
              {`${formatAMPM(date, true)}`}
               -
              {`${formatAMPM(dateEnd, true)}`}
            </h5>
          </div>
          <div className="session-date">
            {/*blocked &#10005; 3 */}
            {
              distractions > 0
              && (
                <span className="flex flex-end align-center">
                  <span className="social-icon margin-right-sm">
                    <TwitterSvg text={`Just stopped from being distracted${distractions === 1 ? '' : ` ${distractions} times`} when my mind wandered with this chrome extension!`} />
                  </span>
                  <span className="small-text">
                    blocked <span className="session-block-number">{distractions}</span> time{distractions > 1 ? 's' : ''}
                  </span>
                </span>
              )
            }
          </div>
        </div>
        {
          working.length === 0 && finished.length === 0 ? null :
          (
            <ul className="session-todos">
              {
                finished.map((todo, idx) => {
                  return (
                    <li key={`${idx}-completed`}>- {todo.todo}</li>
                  );
                })
              }
              {
                working.map((todo, idx) => {
                  return (
                    <li key={`${idx}-completed`}>- {todo.todo} (Working on)</li>
                  );
                })
              }
            </ul>
          )
        }
      </li>
    );
  }
}
