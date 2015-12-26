import React, { Component } from 'react';
import classnames from 'classnames';
import formatAMPM from '../utils/formatAMPM';

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

export default function SessionsList(props) {
	const { sessions, todos } = props;
	return (
		<div>
			<h5>WORK SESSIONS</h5>
			<ul id="sessions-list">
				{
					sessions.reverse().map((session, idx) => {
						const isCurrent = (Date.now() < session.date);
						const { date, duration } = session;
						return (
							<li key={idx} className={classnames({current: isCurrent})}>
								<div>
									{`${formatAMPM(date, true)}`} 
									--
									{`${formatAMPM(date + duration, true)}`} 
									::
									{isTodayOrDate(date)}
									
									{isCurrent ? ' CURRENT': null}
								</div>
								<ul className="completed-todos">
									{
										todos.map((todo, idx) => {
											const { completed } = todo;
			
											console.log(completed - date);
											if (completed > date && completed < date + duration) {
												return (
													<li key={`${idx}-completed`}>{todo.todo}</li>
												)
											}
										})
									}
								</ul>
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}