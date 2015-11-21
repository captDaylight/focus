import React, { Component } from 'react';

const MINUTE = 60000;
const SECOND = 1000;

function doubleDigit(amount) {
	return amount < 10 ? `0${amount}` : amount;
}

export default function MinutesAndSeconds(props) {
	const { date } = props;
	const fromNow = date - Date.now();
	const minutesRemaining = Math.floor(fromNow / MINUTE);
	const secondsRemaining = Math.floor(fromNow / SECOND) % 60;

	return (
		<div>
			<span>{doubleDigit(minutesRemaining)}</span>
			<span> : </span> 
			<span>{doubleDigit(secondsRemaining)}</span>
		</div>
	)	
}

