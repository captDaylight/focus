// happens on every page
console.log('content');
console.log('PAUL ');
let count = 0;
window.addEventListener("load", function() {
		chrome.extension.sendMessage({
				type: "dom-loaded", 
				data: {
						myProperty: "value"
				}
		});
}, true);
// setInterval(() => {
// 	console.log(count + 1);
// 	chrome.extension.sendMessage({
// 		type: "dom-loaded", 
// 		data: {
// 			myProperty: ++count
// 		}
// 	});
// }, 2000);