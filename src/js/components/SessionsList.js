import React, { Component } from 'react';

export default function SessionsList(props) {
	const { sessions } = props;
	return (
		<ul id="sessions-list">
			{
				sessions.map((session, idx) => {
					return <li key="idx">session</li>
				})
			}
		</ul>
	);
}