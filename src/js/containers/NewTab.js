import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MinutesAndSeconds from '../components/MinutesAndSeconds'
import { 
	setTimer,
	clearTimer,
	countDown,
} from '../actions/timer';

export default class NewTab extends Component {
	componentWillMount() {
		const { date } = this.props.timer;
		const { clearTimer, countDown } = this.props.actions;
		
		if (date < Date.now()) {
			clearTimer();
		} else {
			countDown(date);
		}
	}
	handleSetTimer() {
		const { setTimer, countDown } = this.props.actions;
		const countDownTil = Date.now() + 70000;

		setTimer(countDownTil);
		countDown(countDownTil);
	}
	render() {
		const { date, minutes, seconds } = this.props.timer;
		
		return (
			<section>
				<h1>FOCUS</h1>
				{
					date
					?
						<MinutesAndSeconds minutes={minutes} seconds={seconds} />
					: (
						<button onClick={this.handleSetTimer.bind(this)}> 
							Set Timer
						</button>	
					)
				}
				
			</section>
		);
	}
}

function mapStateToProps(state) {
  return {
    timer: state.timer
  }
}

function mapActionsToProps(dispatch) {
  return {
    actions: bindActionCreators({
    	setTimer,
    	clearTimer,
    	countDown,
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(NewTab);
