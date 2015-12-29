import shortid from 'shortid';
import find from 'lodash/collection/find';
import { 
	ADD_WEBSITE,
	REMOVE_WEBSITE,
} from '../actions/websites';

const initialState = {
	websites: [
	{favicon: 'https://s.ytimg.com/yts/img/favicon_32-vfl8NGn4k.png',
	id: 'NJbXqZhIe',
	name: 'youtube.com'},

	{favicon: 'https://assets.guim.co.uk/images/favicons/79d7ab5a729562cebca9c6a13c324f0e/32x32.ico',
	id: 'VyX4q-3Ie',
	name: 'theguardian.com'},

	{favicon: 'http://static01.nyt.com/favicon.ico',
	id: 'E1nE9WnIl',
	name: 'nytimes.com'},

	{favicon: 'http://gothamist.com/favicon.ico',
	id: 'NklL5-nLl',
	name: 'gothamist.com'},

	{favicon: 'https://news.ycombinator.com/favicon.ico',
	id: '4krPq-28l',
	name: 'ycombinator.com'},

	{favicon: 'http://www.trulia.com/favicon.ico',
	id: 'VkJ_9-n8e',
	name: 'trulia.com'},

	{favicon: 'https://abs.twimg.com/favicons/favicon.ico',
	id: '4y2uqW3Ig',
	name: 'twitter.com'},

	{favicon: 'https://cdn-static-1.medium.com/_/fp/icons/favicon-new.TAS6uQ-Y7kcKgi0xjcYHXw.ico',
	id: '4JYKcZhIg',
	name: 'medium.com'}],
};

function indexPop(arr, idx) {
	const beginning = arr.slice(0, idx); 
	const end = arr.slice(idx + 1);
	return [...beginning, ...end];
}

export default function websites(state=initialState, action) {
	switch(action.type) {
		case ADD_WEBSITE:
			const siteIdx = state.websites.findIndex(item => item.name === action.website);
			const website = {
				name: action.website,
				favicon: action.favicon,
				id: shortid.generate(),
			};
			if (siteIdx >= 0) {
				if (state.websites[siteIdx].favicon) {
					return state;	
				} else {
					const websites = indexPop(state.websites, siteIdx);
					return {...state, websites: [...websites, website]};
				}
			} else {
				return {...state, websites: [...state.websites, website]};
			}

		case REMOVE_WEBSITE:
			const id = action.id;
			return {...state, websites: state.websites.filter(item => item.id !== id)};

		default:
			return state;
	}
}