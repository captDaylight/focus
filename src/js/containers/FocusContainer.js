import React, { Component } from 'react';
import MinutesAndSeconds from '../components/MinutesAndSeconds';
import WebsiteForm from '../components/WebsiteForm';
import WebsiteList from '../components/WebsiteList';
import { 
	setTimer,
	clearTimer,
	countDown,
} from '../actions/timer';
import {
	addWebsite,
	removeWebsite,
} from '../actions/websites';

export default class FocusContainer extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}
	updateState(newState) {
		console.log('updatestate function', newState);
		console.log(this);
		console.log(this.setState);
		this.setState(newState);
	}
	componentWillMount() {
		const { updateState } = this;
		chrome.extension.onMessage.addListener((req, sender, sendRes) => {
			console.log('listener focus');
			if (req.type === 'STATE_UPDATE') {
				console.log('state update', req.data);
				updateState.call(this, req.data);
			}
			return true;
		});
		// const { date } = this.props.timer;
		// const { clearTimer, countDown } = this.props.actions;
		
		// if (date > Date.now()) {
		// 	countDown(date);
		// }
	}
	handleSetTimer() {
		// const { setTimer, countDown } = this.props.actions;
		// const countDownTil = Date.now() + 10000;

		// setTimer(countDownTil);
		// countDown(countDownTil);
	}
	sendMessage() {
		console.log('sending message');
		chrome.runtime.sendMessage({ type: 'ACTION', data: setTimer(Date.now()) });
	}
	render() {
		// const { date, minutes, seconds } = this.props.timer;
		// const { addWebsite, removeWebsite } = this.props.actions;
		// const { items } = this.props.websites;
		console.log('render', this.state);
		return (
			<section>
				<h1>FOCUS</h1>
				{this.state.timer.date}
				<button onClick={this.sendMessage}>click me</button>
			</section>
		);
	}
}

				// {
				// 	date && date > Date.now()
				// 	? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
				// 	: <button onClick={this.handleSetTimer.bind(this)}>Set Timer</button>
				// }
				// <WebsiteForm addWebsite={addWebsite} />
				// <WebsiteList websites={items} removeWebsite={removeWebsite} />