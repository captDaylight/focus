export default function doubleDigit(amount) {
  return amount < 10 ? `0${amount}` : `${amount}`;
}