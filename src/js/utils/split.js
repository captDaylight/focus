import { drop, dropRight } from 'lodash';

export default function split(arr, idx) {
  return [dropRight(arr, arr.length - idx), drop(arr, idx + 1)];
}
