export default function wrapActionsWithMessanger(actions) {
	return actions.reduce((prev, key) => {
		prev[key] = (...args) => {
			return chrome.runtime.sendMessage({ 
				type: 'ACTION', 
				action: key,
				data: args,
			});
		};
		return prev;
	}, {});
}