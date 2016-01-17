import React, { Component } from 'react';
import classnames from 'classnames';
import formatAMPM from '../utils/formatAMPM';
import filter from 'lodash/collection/filter';

function isTodayOrDate(time) {
	const date = new Date(time);
	// const day = new Date(date.getYear(), date.getMonth(), date.getDay());
	const now = new Date();
	if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDay() === now.getDay()) {
		return 'Today';
	} else {
		return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getDay()}, ${date.getFullYear()}`;
	}
}

function betweenDates(begin, end) {
	return date => date > begin && date < end;
}

export default function SessionsList(props) {
	const { sessions, todos } = props;
	const startedTodos = filter(todos, todo => todo.workingOn || todo.completed);
	const now = Date.now();

	return (
		<div id="sessions-container">
			<h5>WORK SESSIONS</h5>
			<ul id="sessions-list">
				{
					sessions.reverse().map((session, idx) => {
						const { date, duration } = session;
						const dateEnd = date + duration;
						const sessionCheck = betweenDates(date, dateEnd);
						
						const working = filter(startedTodos, todo => {
							const { workingOn, completed } = todo;
							console.log(`${formatAMPM(date, true)}`, completed, !sessionCheck(completed));
							return (
								workingOn < dateEnd 
								&& (completed ? completed > dateEnd: true ));
						});
						const finished = filter(startedTodos, todo => {
							const { completed } = todo;
							return sessionCheck(completed);
						});
						
						return (
							<li key={idx} className={classnames({current: sessionCheck(now)})}>
								<h5>
									{`${formatAMPM(date, true)}`} 
									--
									{`${formatAMPM(dateEnd, true)}`} 
									::
									{isTodayOrDate(date)}
									
									{sessionCheck(now) ? ' CURRENT': null}
								</h5>
								{
									working.length === 0 && finished.length === 0 ? null : 
									(
										<div>
											<ul className="completed-todos">
												{
													finished.map((todo, idx) => {
														return (
															<li key={`${idx}-completed`}><b>- {todo.todo}</b></li>
														);
													})
												}
											</ul>
											<ul className="completed-todos">
												{
													working.map((todo, idx) => {
														return (
															<li key={`${idx}-completed`}><b>- {todo.todo} (Working on)</b></li>
														);
													})
												}
											</ul>
										</div>
									)
								}
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}