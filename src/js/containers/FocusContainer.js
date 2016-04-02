import React, { Component } from 'react';
import classnames from 'classnames';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger';
import Register from '../components/Register';
import Login from '../components/Login';
import MinutesAndSeconds from '../components/MinutesAndSeconds';
import WebsiteForm from '../components/WebsiteForm';
import WebsiteList from '../components/WebsiteList';
import SessionsList from '../components/SessionsList';
import AddWebsites from '../components/AddWebsites';
import Todos from '../components/Todos';

const actions = wrapActionsWithMessanger([
	//timer
	'clearTimer','countDown',
	// websites
	'addWebsite','toggleShowSites', 'removeWebsite', 'fetchWebsites',
	'fetchCommonWebsites', 'postWebsite', 'doneAddingCommonSites',
	// todo
	'postTodo', 'persistTodoCompletion', 'deleteTodo', 'toggleTodoEdit', 'updateTodo',
	// user
	'register', 'login', 'logout',
]);

let oldState = {};

export default class FocusContainer extends Component {
	constructor(props) {
		super(props);
		oldState = props.state;
		this.state = props.state;
	}

	updateState(newState) {
		const { seconds, minutes } = newState.timer;
		if (seconds && seconds !== oldState.timer.seconds) {
			let stateNewTime = oldState;
			stateNewTime.timer.seconds = seconds;
			stateNewTime.timer.minutes = minutes;
			this.setState(stateNewTime);
			oldState = stateNewTime;
		} else {
			this.setState(newState);
			oldState = newState;
		}
	}

	componentWillMount() {
		const { updateState } = this;
		chrome.extension.onMessage.addListener((req, sender, sendRes) => {
			if (req.type === 'STATE_UPDATE' && req.dest !== 'BLOCKER') {
				updateState.call(this, req.data);
			}
			return true;
		});
	}

	render() {
		const { user, websites, ui } = this.state;
		if (user.token === '') {
			const { register, login } = actions;
			return (
				<div id="auth">
					<Register register={register} />
					<Login login={login} />
				</div>
			)
		} else if (!this.state.websites.doneCommonSites) {
			return (
				<AddWebsites 
					fetchCommonWebsites={actions.fetchCommonWebsites}
					fetchWebsites={actions.fetchWebsites} 
					doneAddingCommonSites={actions.doneAddingCommonSites}
					postWebsite={actions.postWebsite}
					websites={websites} />
			)
		} else {
			const { 
				countDown, addWebsite, removeWebsite, postTodo, persistTodoCompletion,
				deleteTodo, toggleShowSites, toggleTodoEdit, updateTodo, logout
			} = actions;
			const { 
				date, minutes, seconds, duration, sessions, ampm, sound,
			} = this.state.timer;
			const { websites, showSites } = this.state.websites;
			const { todos } = this.state.todos;
			
			return (
				<section 
					id="focus-container" 
					className={classnames({focusing: !!minutes})}>

					<div id="header">
						<div id="main-action" className={classnames({blurring: showSites})}>
							{
								minutes
								? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
								: (
									<button 
										className="focus-button" 
										onClick={() => countDown(Date.now(), duration, sound)}>
										start focusing
									</button>
								)
							}
						</div>
						<WebsiteList 
							websites={websites}
							showSites={showSites}
							toggleShowSites={toggleShowSites}
							removeWebsite={removeWebsite} 
							disabled={minutes ? true : false} />
						<div onClick={() => {logout()}} className="pointer">LOGOUT</div>
					</div>

					<div id="spread" className={classnames({blurring: showSites})}>
						<Todos 
							postTodo={postTodo} 
							persistTodoCompletion={persistTodoCompletion} 
							deleteTodo={deleteTodo}
							todos={todos}
							toggleTodoEdit={toggleTodoEdit}
							updateTodo={updateTodo} />
						<SessionsList 
							sessions={sessions} 
							ampm={ampm} 
							todos={todos} />
					</div>
				</section>
			);
		}
	}
}
