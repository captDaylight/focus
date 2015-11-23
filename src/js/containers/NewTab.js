import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Formsy, { Form } from 'formsy-react';
import FocusInput from '../components/FocusInput';
import MinutesAndSeconds from '../components/MinutesAndSeconds';
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
		
		if (date < Date.now()) {
			clearTimer();
		} else {
			countDown(date);
		}
	}
	handleSetTimer() {
		const { setTimer, countDown } = this.props.actions;
		const countDownTil = Date.now() + 5000;

		setTimer(countDownTil);
		countDown(countDownTil);
	}
	handleSubmit(data) {
		const { addWebsite } = this.props.actions;
		addWebsite(data.website);
	}
	render() {
		const { date, minutes, seconds } = this.props.timer;
		const { removeWebsite } = this.props.actions;
		const { items } = this.props.websites;
		
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

				<Form onSubmit={this.handleSubmit.bind(this)}>
					<FocusInput name="website" placeholder="Website" />
					<button>Submit</button>
				</Form>
				<ul>
				{
					items.map((website, idx) => {
						return (
							<li key={idx}>
								{website.name}
								<button onClick={removeWebsite.bind(null, website.id)}>
									Remove Website
								</button>
							</li>
						);
					})
				}
				</ul>
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
