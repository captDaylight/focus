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
		const now = Date.now();

		const date = new Date();
		const midnight = date.setHours(0,0,0,0);

		const sessionDays = groupBy(sessions, session => {
			const dateDayRoundDown = new Date(session.start);
			return dateDayRoundDown.setHours(0,0,0,0);
		});

		return (
			<div id="sessions-container">
				<h5>WORK LOG</h5>
				<ul id="sessions-list">
					{

						Object.keys(sessionDays).reverse().map((day, idx) => {
							// console.log('----day', (new Date(parseInt(day))).toDateString());
							const sessions = sessionDays[day].reverse().map((session, idx) => {
								// console.log('session');
								const { start, end } = session;
								
								const sessionCheck = betweenDates(start, end);
								const current = sessionCheck(now);

								return (
									<SessionItem 
										key={idx}
										current={current}
										date={start}
										dateEnd={end}
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
								// today's sessions
								console.log('sessions', sessionDays[day]);
								return [...sessions];
							} else {
								return [(
									<li className="session-day-header">
										<button>
											<div>{(new Date(parseInt(day))).toDateString()}</div>
											<div className="icon-enlarge2"></div>
										</button>
									</li>
								)];
							}
						})
					}
				</ul>
			</div>
		);
	}
}