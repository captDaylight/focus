import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
	setTimer,
	clearTimer,
	countDown,
} from '../actions/timer';
import {
	addWebsite,
	removeWebsite,
} from '../actions/websites';

export default class Content extends Component {
	render() {
		return (
			<section>
				CONTENT
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
)(Content);