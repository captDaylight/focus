import React, { Component } from 'react';
import classnames from 'classnames';
import doubleDigit from '../utils/doubleDigit';

export default function SessionsList(props) {
	const { sessions } = props;
	console.log(sessions);
	return (
		<ul id="sessions-list">
			{
				sessions.reverse().map((session, idx) => {
					const date = new Date(session.date);
					const hours = doubleDigit(date.getHours());
					const minutes = doubleDigit(date.getMinutes());
					const isCurrent = (Date.now() < date);
					return (
						<li key={idx} className={classnames({current: isCurrent})}>
							{`${hours}:${minutes} `}
							{session.duration}
							{isCurrent ? ' CURRENT': null}
						</li>
					)
				})
			}
		</ul>
	);
}