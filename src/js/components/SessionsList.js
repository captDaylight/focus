import React, { Component } from 'react';
import classnames from 'classnames';
import filter from 'lodash/collection/filter';
import SessionItem from './SessionItem';
import groupBy from 'lodash/collection/groupBy';

const DAY = 86400000;

function betweenDates(begin, end) {
	return date => date > begin && date < end;
}

export default function SessionsList(props) {
	const { sessions, todos } = props;
	const startedTodos = filter(todos, todo => todo.workingOn || todo.completed);
	const now = Date.now();

	const date = new Date();
	const midnight = date.setHours(0,0,0,0);

	const sessionDays = groupBy(sessions.reverse(), session => {
		return Math.floor(session.date / DAY)
	});
	
	console.log(Object.keys(sessionDays).map(time => time * DAY));



	return (
		<div id="sessions-container">
			<h5>WORK LOG</h5>
			<ul id="sessions-list">
				{

					Object.keys(sessionDays).reverse().map((day, idx) => {
						const sessions = sessionDays[day].map((session, idx) => {
							const { date, duration } = session;
							const dateEnd = date + duration;
							const sessionCheck = betweenDates(date, dateEnd);
							const current = sessionCheck(now);

							const working = filter(startedTodos, todo => {
								const { workingOn, completed } = todo;
								return (
									workingOn < dateEnd 
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
						})
						
						return [(
							<li>----------- {day}</li>
						), ...sessions];
					})

				}
			</ul>
		</div>
	);
}