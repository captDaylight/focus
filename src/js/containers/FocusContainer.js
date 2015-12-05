import React, { Component } from 'react';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger'
import MinutesAndSeconds from '../components/MinutesAndSeconds';
import WebsiteForm from '../components/WebsiteForm';
import WebsiteList from '../components/WebsiteList';

const actions = wrapActionsWithMessanger([
	'clearTimer',
	'countDown',
	'addWebsite',
	'removeWebsite',
]);

export default class FocusContainer extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}
	updateState(newState) {
		this.setState(newState);
	}
	componentWillMount() {
		const { updateState } = this;
		chrome.extension.onMessage.addListener((req, sender, sendRes) => {
			if (req.type === 'STATE_UPDATE') {
				updateState.call(this, req.data);
			}
			return true;
		});
	}
	render() {
		const { countDown } = actions;
		const { date, minutes, seconds } = this.state.timer;
		console.log(actions);
		return (
			<section>
				<h1>FOCUS</h1>
				{ date } 
				{ minutes ? `${minutes} : ${seconds}` : null }
				
				<button onClick={() => countDown(Date.now())}>click me</button>
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