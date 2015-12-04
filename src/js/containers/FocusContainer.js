import React, { Component } from 'react';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger'
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
console.log(wrapActionsWithMessanger);
const actions = wrapActionsWithMessanger({
	setTimer,
	clearTimer,
	countDown,
	addWebsite,
	removeWebsite,
});
console.log(actions);
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
	render() {
		const { setTimer } = actions;

		return (
			<section>
				<h1>FOCUS</h1>
				{this.state.timer.date}
				<button onClick={setTimer.bind(null, Date.now())}>click me</button>
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