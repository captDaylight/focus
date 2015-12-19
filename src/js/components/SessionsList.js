import React, { Component } from 'react';
import classnames from 'classnames';
import formatAMPM from '../utils/formatAMPM';

function isTodayOrDate(time) {
	const date = new Date(time);
	const day = new Date(date.getYear(), date.getMonth(), date.getDay());
	const now = Date.now();
	return 
}

export default function SessionsList(props) {
	const { sessions } = props;
	return (
		<div>
			<h5>WORK SESSIONS</h5>
			<ul id="sessions-list">
				{
					sessions.reverse().map((session, idx) => {
						const isCurrent = (Date.now() < session.date);

						return (
							<li key={idx} className={classnames({current: isCurrent})}>
								{`${formatAMPM(session.date, true)}`} 
								--
								{`${formatAMPM(session.date + session.duration, true)}`} 
								::
								{isToday()}
								
								{isCurrent ? ' CURRENT': null}
							</li>
						)
					})
				}
			</ul>
		</div>
	);
}