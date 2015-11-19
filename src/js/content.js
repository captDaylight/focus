import url from 'url';

const urlData = url.parse(window.location.href);
console.log(urlData);
console.log(urlData.hostname);
console.log('paul');
// let count = 0;
// window.addEventListener("load", function() {
// 		chrome.extension.sendMessage({
// 				type: "hostname", 
// 				data: {
// 						myProperty: "value"
// 				}
// 		});
// }, true);

console.log(chrome);
console.log(chrome.storage);
chrome.storage.sync.get('store', store => {
	console.log(store);
});
