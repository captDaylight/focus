import React, { Component } from 'react';

export default function MinutesAndSeconds(props) {
	const { date } = props;
	const fromNow = date - Date.now();
	return (
		<div>
			<span>Minutes {Math.floor(fromNow / 60000)}</span>
			<span>Seconds {Math.floor(fromNow / 1000)}</span>
		</div>
	)	
}

