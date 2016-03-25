import {updateTodos} from '../actions/todos';
import {updateSessions} from '../actions/timer';

const DAY = 86400000;

export default function cleanUp(store) {
	const state = store.getState();
	const morning = new Date();
	morning.setHours(0, 0, 0, 0);

	const morningUTC = morning.getTime();

	const todaysTodos = state.todos.todos.filter(todo => {
		return !todo.completed || todo.completed > morningUTC;
	});

	const threeDaysOfSessions = state.timer.sessions.filter(session => {
		return session.start > (morningUTC - (DAY * 2))
	})

	store.dispatch(updateTodos(todaysTodos));
	store.dispatch(updateSessions(threeDaysOfSessions));

	chrome.storage.sync.set(store.getState());
}