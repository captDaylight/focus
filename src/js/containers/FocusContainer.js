import React, { Component } from 'react';
import classnames from 'classnames';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger';
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
		
		return (
			<section id="focus-container" className={classnames({focusing: minutes})}>
				
					{
						minutes
						? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
						: (
								<div>
									<div id="main-action">
										<button className="start-focusing" onClick={() => countDown(Date.now() + 30000)}>Set Timer</button>
									</div>
									<WebsiteList websites={items} removeWebsite={removeWebsite} />
								</div> 
							)
					}
				
			</section>
		);
	}
}
