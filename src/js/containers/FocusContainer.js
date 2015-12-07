import React, { Component } from 'react';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger'
import MinutesAndSeconds from '../components/MinutesAndSeconds';
import WebsiteForm from '../components/WebsiteForm';
import WebsiteList from '../components/WebsiteList';



export default class FocusContainer extends Component {
	constructor(props) {
		super(props);
		const actions = wrapActionsWithMessanger([
			'clearTimer',
			'countDown',
			'addWebsite',
			'removeWebsite',
		], this.props.port);
		this.state = {...props.state, actions};
	}
	updateState(newState) {
		this.setState(newState);
	}
	componentWillMount() {
		const { updateState } = this;
		
		this.props.port.onMessage.addListener(msg => {
			if (msg.type === 'STATE_UPDATE') {
				updateState.call(this, msg.data);
			}
			return true;
		});
	}
	render() {
		const { countDown, addWebsite, removeWebsite } = this.state.actions;
		const { date, minutes, seconds } = this.state.timer;
		const { items } = this.state.websites;

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