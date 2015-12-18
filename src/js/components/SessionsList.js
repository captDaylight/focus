import React, { Component } from 'react';
import classnames from 'classnames';
import formatAMPM from '../utils/formatAMPM';

export default function SessionsList(props) {
	const { sessions } = props;
	console.log(sessions);
	return (
		<ul id="sessions-list">
			{

				sessions.reverse().map((session, idx) => {
					const date = new Date(session.date);
					const isCurrent = (Date.now() < session.date);

					return (
						<li key={idx} className={classnames({current: isCurrent})}>
							{`${formatAMPM(date, true)}`}
							{session.duration}
							{isCurrent ? ' CURRENT': null}
						</li>
					)
				})
			}
		</ul>
	);
}