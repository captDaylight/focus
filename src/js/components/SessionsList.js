import React, { Component } from 'react';
import { filter, groupBy } from 'lodash';
import SessionItem from './SessionItem';

function betweenDates(begin, end) {
  return date => date > begin && date < end;
}

export default class SessionsList extends Component {
  shouldComponentUpdate(nextProps) {
    const { todos, sessions } = this.props;
    return todos !== nextProps.todos || sessions !== nextProps.sessions;
  }
  render() {
    const { sessions, todos } = this.props;
    const startedTodos = filter(todos, todo => todo.workingOn || todo.completed);
    const now = Date.now();

    const dateNow = new Date();
    const midnight = dateNow.setHours(0, 0, 0, 0);

    const sessionDays = groupBy(sessions, (session) => {
      const dateDayRoundDown = new Date(session.date);
      return dateDayRoundDown.setHours(0, 0, 0, 0);
    });

    const sessionDayKeys = Object.keys(sessionDays);

    return (
      <div id="sessions-container">
        <h5>
          WORK LOG {
            sessionDayKeys.length > 0
            && parseInt(sessionDayKeys[sessionDayKeys.length - 1]) === midnight
            && sessionDays[sessionDayKeys[sessionDayKeys.length - 1]].length > 0
            && `(${sessionDays[sessionDayKeys[sessionDayKeys.length - 1]].length})`
          }
        </h5>
        <ul id="sessions-list">
          {
            sessionDayKeys.reverse().map((day) => {
              const sessionsItems = sessionDays[day].reverse().map((session) => {
                const { date, duration } = session;
                const dateEnd = date + duration;
                const sessionCheck = betweenDates(date, dateEnd);
                const current = sessionCheck(now);

                const working = filter(startedTodos, (todo) => {
                  const { workingOn, completed } = todo;

                  return (
                    !!workingOn
                    && workingOn < dateEnd
                    && (completed ? completed > dateEnd : true));
                });

                const finished = filter(startedTodos, (todo) => {
                  const { completed } = todo;
                  return sessionCheck(completed);
                });

                return (
                  <SessionItem
                    key={date}
                    current={current}
                    date={date}
                    dateEnd={dateEnd}
                    working={working}
                    finished={finished}
                  />
                );
              });

              if (parseInt(day) === midnight) {
                return [...sessionsItems];
              }
            })
          }
        </ul>
      </div>
    );
  }
}
