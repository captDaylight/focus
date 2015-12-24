import 'drop' from 'lodash/array/drop';
import 'dropRight' from 'lodash/array/dropRight';

export default function split(arr, idx) {
	return [dropRight(arr, arr.length - idx), drop(arr, idx + 1)];
}