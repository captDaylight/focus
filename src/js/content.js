import $ from 'jquery';
import url from 'url';
import template from 'lodash/string/template';
import filter from 'lodash/collection/filter';
import FocusContainer from './containers/FocusContainer';
import checkShouldBlock from './utils/checkShouldBlock';

let mounted = false;

const centerStyling = 'display: -webkit-box;display: -moz-box;display: box;display: -webkit-flex;display: -moz-flex;\
    display: -ms-flexbox;display: flex;-webkit-box-align: center;-moz-box-align: center;box-align: center;\
    -webkit-align-items: center;-moz-align-items: center; -ms-align-items: center;-o-align-items: center;\
    align-items: center;-ms-flex-align: center;'

const timeTpl = template('<%= minutes %> : <%= seconds%>');
const todosTpl = template(' \
	<% todos.map(function (todo) {%> \
		<li class="focus-content-todo"><%= todo.todo %></li> \
	<% }); %> \
');

const mountTemplate = template(' \
	<style> \
		#focus-content-container {background-color:white;border: 40px #F44336 solid;box-sizing: border-box;height:100%;text-align:center;' + centerStyling + '} \
		#focus-content-time {font-size: 40px; margin-bottom:20px;} \
		#focus-content-todos {margin: 0px; padding:0px;} \
		.focus-content-todo {margin:10px 0px;font-size:20px; list-style: none} \
	</style> \
	<div id="focus-content-container"> \
		<div style="width:100%;"> \
			<div id="focus-content-time"></div> \
			<div> \
				<ul id="focus-content-todos"> \
				</ul> \
			</div> \
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

chrome.storage.sync.get(null, data => {
	const { websites, timer } = data;
	
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
	$(body).append('<link href="https://fonts.googleapis.com/css?family=Poppins:500" rel="stylesheet" type="text/css">');
	mountPoint.id = 'mount-point-focus';
	mountPoint.style.cssText = ' \
		font-family: \'Poppins\', sans-serif; letter-spacing: 0.07em; \
		color:#ea1c0d; position:fixed; width:100%; height:100%; \
		background-color:#white; top:0px; left:0px; z-index:10000;';
	body.appendChild(mountPoint);
	document.getElementsByTagName('html')[0].appendChild(body);
	
	$('#mount-point-focus').html(mountTemplate());
	
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
	const todos = filter(data.todos.todos, todo => todo.workingOn && !todo.completed);
	$('#focus-content-time').html(timeTpl({minutes,seconds}));
	$('#focus-content-todos').html(todosTpl({todos}));
}