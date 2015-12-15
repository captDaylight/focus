import React, { Component } from 'react';

export default function SessionsList(props) {
	const { sessions } = props;
	console.log(sessions);
	return (
		<ul id="sessions-list">
			{
				sessions.reverse().map((session, idx) => {
					const date = new Date(session.date);
					return (
						<li key={idx}>
							{`${date.getHours()}:${date.getMinutes()} `}
							{session.duration}
						</li>
					)
				})
			}
		</ul>
	);
}