import React, { Component } from 'react';
import classnames from 'classnames';
import formatAMPM from '../utils/formatAMPM';

function isTodayOrDate(time) {
	const date = new Date(time);
	const now = new Date();
	if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDay() === now.getDay()) {
		return 'Today';
	} else {
		return `${date.toLocaleString('en-us', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
	}
}

export default class SessionsList extends Component {
	render() {
		const { 
			current,
			date,
			dateEnd,
			working,
			finished,
			id,
		} = this.props;

		return (
			<li className={classnames('session', {current: current})}>
				<div className="session-header">
					<div>
						<h5>
							{`${formatAMPM(date, true)}`} 
							 -  
							{`${formatAMPM(dateEnd, true)}`} : {id || 'nope'}
						</h5>
					</div>
					<div className="session-date">									
						{current ? ' CURRENT SESSION': isTodayOrDate(date)}
					</div>
				</div>
				{
					working.length === 0 && finished.length === 0 ? null : 
					(
						<ul className="session-todos">
							{
								finished.map((todo, idx) => {
									return (
										<li key={`${idx}-completed`}>- {todo.todo}</li>
									);
								})
							}
							{
								working.map((todo, idx) => {
									return (
										<li key={`${idx}-completed`}>- {todo.todo} (Working on)</li>
									);
								})
							}
						</ul>
					)
				}
			</li>
		);
	}
}

