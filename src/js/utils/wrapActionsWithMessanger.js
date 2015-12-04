export default function wrapActionsWithMessanger(actions) {
	return Object.keys(actions).reduce((prev, key) => {
		prev[key] = (...args) => {
			return chrome.runtime.sendMessage({ 
				type: 'ACTION', 
				data: actions[key](...args), 
			});
		};
		return prev;
	}, {});
}