import React, { Component } from 'react';
import classnames from 'classnames';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger';
import MinutesAndSeconds from '../components/MinutesAndSeconds';
import WebsiteForm from '../components/WebsiteForm';
import WebsiteList from '../components/WebsiteList';
import SessionsList from '../components/SessionsList';
import Todos from '../components/Todos';

const actions = wrapActionsWithMessanger([
	'clearTimer',
	'countDown',
	'addWebsite',
	'toggleShowSites',
	'removeWebsite',
	'addTodo',
	'toggleTodoCompletion',
	'removeTodo',
	'toggleTodoEdit',
	'editTodo',
	'toggleTodoWorking',
]);

let oldState = {};

export default class FocusContainer extends Component {
	constructor(props) {
		super(props);
		oldState = props.state;
		this.state = props.state;
	}
	updateState(newState) {
		const { seconds } = newState.timer;
		console.log(seconds, seconds !== oldState.timer.seconds);
		if (seconds && seconds !== oldState.timer.seconds) {
			console.log('--timer');
			this.setState(newState);
		} else {
			console.log('--');
			this.setState(newState);
		}
		oldState = newState;
	}
	componentWillMount() {
		const { updateState } = this;
		chrome.extension.onMessage.addListener((req, sender, sendRes) => {
			console.log(req);
			if (req.type === 'STATE_UPDATE') {
				updateState.call(this, req.data);
			}
			return true;
		});
	}
	render() {
		const { 
			countDown,
			addWebsite,
			removeWebsite,
			addTodo,
			toggleTodoCompletion,
			toggleTodoWorking,
			removeTodo,
			toggleShowSites,
			toggleTodoEdit,
			editTodo,
		} = actions;
		const { 
			date, 
			minutes, 
			seconds, 
			duration,
			sessions,
			ampm,
			sound,
		} = this.state.timer;
		const { websites, showSites } = this.state.websites;
		const { todos } = this.state.todos;
		
		return (
			<section 
				id="focus-container" 
				className={classnames({focusing: minutes})}>
				<div id="main-action" className={classnames({blurring: showSites})}>
					{
						minutes
						? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
						: (
							<button 
								className="focus-button" 
								onClick={() => countDown(Date.now(), duration, sound)}>
								Start Working
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
				<div id="spread" className={classnames({blurring: showSites})}>
					<Todos 
						addTodo={addTodo} 
						toggleTodoWorking={toggleTodoWorking}
						toggleTodoCompletion={toggleTodoCompletion} 
						removeTodo={removeTodo}
						todos={todos}
						toggleTodoEdit={toggleTodoEdit}
						editTodo={editTodo} />
					<SessionsList 
						sessions={sessions} 
						ampm={ampm} 
						todos={todos} />
				</div>

			</section>
		);
	}
}
