import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
	setTimer,
	clearTimer,
} from '../actions/timer';

export default class NewTab extends Component {
	componentWillMount() {
		const { date } = this.props.timer;
		const { clearTimer } = this.props.actions;
		console.log('hmm');
		if (date < Date.now()) {
			clearTimer();
		}
	}
	render() {
		const { date } = this.props.timer;
		const { setTimer } = this.props.actions;
		return (
			<section>
				<h1>FOCUS</h1>
				{
					date
					?
					date
					: 
					<button onClick={() => setTimer(Date.now())}>Set Timer</button>	
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
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(NewTab);
