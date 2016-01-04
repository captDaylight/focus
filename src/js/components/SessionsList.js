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
						const { date, duration } = session;
						const now = Date.now();
						const dateEnd = date + duration;
						const isCurrent = (now > date && now < dateEnd);
						const sessionTodos = todos.filter(todo => {
							const { completed } = todo;
							return completed > date && completed < dateEnd;
						});

						return (
							<li key={idx} className={classnames({current: isCurrent})}>
								<h5>
									{`${formatAMPM(date, true)}`} 
									--
									{`${formatAMPM(dateEnd, true)}`} 
									::
									{isTodayOrDate(date)}
									
									{isCurrent ? ' CURRENT': null}
								</h5>
								{
									sessionTodos.length === 0 ? null : 
									(
										<div>
											<div>Finished Todos</div>
											<ul className="completed-todos">
												{
													sessionTodos.map((todo, idx) => {
														return (
															<li key={`${idx}-completed`}><b>- {todo.todo}</b></li>
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