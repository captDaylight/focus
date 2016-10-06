import React, { Component } from 'react';
import classnames from 'classnames';
import filter from 'lodash/collection/filter';
import SessionItem from './SessionItem';
import groupBy from 'lodash/collection/groupBy';

const DAY = 86400000;

function betweenDates(begin, end) {
  return date => {
    // console.log(date, begin, end, date - begin, date - end);
    return date > begin && date < end
  };
}
export default class SessionsList extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    const { todos, sessions } = this.props;
    return todos !== nextProps.todos || sessions !== nextProps.sessions;
  }
  render() {
    const { sessions, todos } = this.props;
    const startedTodos = filter(todos, todo => todo.workingOn || todo.completed);
    const now = Date.now();

    const date = new Date();
    const midnight = date.setHours(0,0,0,0);

    const sessionDays = groupBy(sessions, session => {
      const dateDayRoundDown = new Date(session.date);
      return dateDayRoundDown.setHours(0,0,0,0);
    });

    const sessionDayKeys = Object.keys(sessionDays);

    return (
      <div id="sessions-container">
        <h5>
          WORK LOG {
            sessionDayKeys.length === 1
            && sessionDays[sessionDayKeys[0]].length > 0
            && `(${sessionDays[sessionDayKeys[0]].length})`
          }
        </h5>
        <ul id="sessions-list">
          {
            sessionDayKeys.reverse().map((day, idx) => {
              const sessions = sessionDays[day].reverse().map((session, idx) => {
                const { date, duration } = session;
                const dateEnd = date + duration;
                const sessionCheck = betweenDates(date, dateEnd);
                const current = sessionCheck(now);

                const working = filter(startedTodos, todo => {
                  const { workingOn, completed } = todo;

                  return (
                    !!workingOn
                    && workingOn < dateEnd
                    && (completed ? completed > dateEnd: true ));
                });
                const finished = filter(startedTodos, todo => {
                  const { completed } = todo;
                  return sessionCheck(completed);
                });

                return (
                  <SessionItem
                    key={idx}
                    current={current}
                    date={date}
                    dateEnd={dateEnd}
                    working={working}
                    finished={finished}
                  />
                )
              });

              const headerListItem = (parseInt(day) === midnight)
                ? []
                : [(
                  <li className="session-day-header">
                    {(new Date(parseInt(day))).toDateString()}
                  </li>
                )];

              if (parseInt(day) === midnight) {
                return [...sessions];
              }
            })
          }
        </ul>
      </div>
    );
  }
}
