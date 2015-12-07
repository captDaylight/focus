export default function wrapActionsWithMessanger(actions, port) {
	return actions.reduce((prev, key) => {
		prev[key] = (...args) => {
			console.log('callled?');
			return port.postMessage({ 
				type: 'ACTION', 
				action: key,
				data: args,
			});
		};
		return prev;
	}, {});
}