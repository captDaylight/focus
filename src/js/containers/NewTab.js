import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

export default class NewTab extends Component {
	componentWillMount() {
		const { date } = this.props.timer;
		const { clearTimer, countDown } = this.props.actions;
		
		if (date > Date.now()) {
		// 	clearTimer();
		// } else {
			countDown(date);
		}
	}
	handleSetTimer() {
		const { setTimer, countDown } = this.props.actions;
		const countDownTil = Date.now() + 120000;

		setTimer(countDownTil);
		countDown(countDownTil);
	}
	render() {
		const { date, minutes, seconds } = this.props.timer;
		const { addWebsite, removeWebsite } = this.props.actions;
		const { items } = this.props.websites;
		
		return (
			<section>
				<h1>FOCUS</h1>
				{
					date && date > Date.now()
					? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
					: <button onClick={this.handleSetTimer.bind(this)}>Set Timer</button>
				}
				<WebsiteForm addWebsite={addWebsite} />
				<WebsiteList websites={items} removeWebsite={removeWebsite} />
			</section>
		);
	}
}

function mapStateToProps(state) {
  return {
    timer: state.timer,
    websites: state.websites,
  }
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({
    	setTimer,
    	clearTimer,
    	countDown,
    	addWebsite,
    	removeWebsite,
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(NewTab);
