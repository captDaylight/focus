import $ from 'jquery';
import url from 'url';
import template from 'lodash/string/template';
import filter from 'lodash/collection/filter';
import FocusContainer from './containers/FocusContainer';
import checkShouldBlock from './utils/checkShouldBlock';

let mounted = false;

const todoItem = template('<li>{todo}</li>');
const mountTemplate = template(' \
	<div id="content-container"> \
		<div id="content-time"><%= minutes %> : <%= seconds%></div> \
		<div id="content-todo"> \
			<ul> \
				<% todos.map(function (todo) {%> <li><%= todo.todo %></li><% }); %> \
			</ul> \
		</div> \
	</div> \
');

function mountOrNot(siteChecker) {
	return (siteList, date, state) => {
		const shouldBlockSite = siteChecker(siteList);

		if (date && date < Date.now()) {
			if (shouldBlockSite && !mounted) {
				mountBlocker(state);	
			}
		} else if (mounted) {
			dismountBlocker();
		}
	};
}

const urlData = url.parse(window.location.href);
const checkShouldMountOrNot = mountOrNot(checkShouldBlock(urlData));

chrome.storage.sync.get('state', data => {
	const { websites, timer } = data.state;
	
	checkShouldMountOrNot(websites.websites, timer.date, data.state);

	chrome.extension.onMessage.addListener(function(msg) {	// Listen for results
		if (msg.type === 'STATE_UPDATE') {
			const { websites, timer } = msg.data;
			checkShouldMountOrNot(websites.websites, timer.date, msg.data);
			if (mounted) {
				updateBlocker(msg.data);	
			}
		}
	});
});

function mountBlocker(state) {
	// set up mount point
	const body = document.body ? document.body : document.createElement('body');
	const mountPoint = document.createElement('div');
	mountPoint.id = 'mount-point-focus';
	mountPoint.style.cssText = ' \
		color:black; position:fixed; width:100%; height:100%; \
		background-color:green; top:0px; left:0px; z-index:10000;';
	body.appendChild(mountPoint);
	document.getElementsByTagName('html')[0].appendChild(body);
	
	updateBlocker(state);

	mounted = true;
}

function dismountBlocker() {
	// const body = document.body ? document.body : document.createElement('body');
	const mountPoint = document.getElementById('mount-point-focus');

	mountPoint.parentNode.removeChild(mountPoint);
	mounted = false;
}

function updateBlocker(data) {
	const {minutes, seconds} = data.timer;
		const todos = filter(data.todos.todos, todo => todo.workingOn );
		console.log(todos);
	$('#mount-point-focus').html(mountTemplate({minutes, seconds, todos}));
}