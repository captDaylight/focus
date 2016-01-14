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
				<div id="main-action">
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
				<div id="spread">
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
