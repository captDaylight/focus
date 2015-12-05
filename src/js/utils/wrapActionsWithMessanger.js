export default function wrapActionsWithMessanger(actions) {
	console.log('actions',actions);
	return actions.reduce((prev, key) => {
		prev[key] = (...args) => {
			console.log('args', args);
			console.log('message', { 
				type: 'ACTION', 
				action: key,
				data: args,
			});
			return chrome.runtime.sendMessage({ 
				type: 'ACTION', 
				action: key,
				data: args,
			});
		};
		return prev;
	}, {});
}