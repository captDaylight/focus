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
		const { countDown, addWebsite, removeWebsite } = actions;
		const { date, minutes, seconds } = this.state.timer;
		const { items } = this.state.websites;
		console.log(date);
		return (
			<section>
				<h1>FOCUS</h1>
				{
					minutes
					? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
					: <button onClick={() => countDown(Date.now() + 30000)}>Set Timer</button>
				}
				<WebsiteForm addWebsite={addWebsite} />
				<WebsiteList websites={items} removeWebsite={removeWebsite} />
			</section>
		);
	}
}