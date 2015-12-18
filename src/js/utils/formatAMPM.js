import doubleDigit from './doubleDigit';

export default function formatAMPM(date, ampm=true) {
	let hours = date.getHours();
	const minutes = doubleDigit(date.getMinutes());
	const amOrPm = hours >= 12 ? ' pm' : ' am';
	if (ampm) {
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12' 	
	}
	return `${hours}:${minutes}${ampm ? amOrPm : null}`;
}