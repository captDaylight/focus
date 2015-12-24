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
	'removeWebsite',
	'addTodo',
	'toggleTodoCompletion',
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
			toggleTodoCompletion
		} = actions;
		const { 
			date, 
			minutes, 
			seconds, 
			duration,
			sessions,
			ampm,
		} = this.state.timer;
		const { websites } = this.state.websites;
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
								onClick={() => countDown(Date.now() + duration)}>
								Start Working
							</button>
						)
					}
				</div>

				<div id="spread">
					<WebsiteList 
						websites={websites} 
						removeWebsite={removeWebsite} 
						disabled={minutes ? true : false} />
					<SessionsList sessions={sessions} ampm={ampm}/>
					<Todos 
						addTodo={addTodo} 
						toggleTodoCompletion={toggleTodoCompletion} 
						todos={todos} />
				</div>

			</section>
		);
	}
}
