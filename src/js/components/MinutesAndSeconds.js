import React from 'react';

const MINUTE = 60000;

function displayHoursAndMinutes(minutes) {
  if (minutes < 60) {
    return (<span>{minutes}</span>);
  }

  const hours = Math.floor(minutes / 60);
  const newMinutes = (minutes % 60);
  return (<span>{hours} : {newMinutes.toString().length < 2 ? `0${newMinutes}` : newMinutes}</span>);
}

export default function MinutesAndSeconds(props) {
  const { minutes, seconds, toggleAskCancelTimer, askCancelTimer, clearTimer } = props;

  return (
    <div id="clock">
      {
        displayHoursAndMinutes(minutes)
      }
      <span> : </span>
      <span>{seconds}</span>
    </div>
  )
}
