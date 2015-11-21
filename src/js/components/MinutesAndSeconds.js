import React, { Component } from 'react';

export default function MinutesAndSeconds(props) {
	const { minutes, seconds } = props;

	return (
		<div>
			<span>{minutes}</span>
			<span> : </span> 
			<span>{seconds}</span>
		</div>
	)	
}

