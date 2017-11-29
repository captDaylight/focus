import React from 'react';

export default function AskCancel(props) {
  const { toggleAskCancelTimer, askCancelTimer, clearTimer } = props;

  return (
    <div>
      {
        askCancelTimer
        ? (
          <div>
            Are you sure you want to cancel the timer?
            <button
              className="button-small margin-left-sm"
              onClick={() => toggleAskCancelTimer()}
            >
              no
            </button>
            <button
              className="button-small margin-left-sm"
              onClick={() => clearTimer()}
            >
              yes
            </button>
          </div>
        )
        : (
          <span>
            <button
              className="button-small"
              onClick={() => toggleAskCancelTimer()}
            >
              Cancel Session
            </button>
            <button className="button-small margin-left-sm">+ 5 minutes</button>
          </span>

        )
      }
    </div>
  )
}
