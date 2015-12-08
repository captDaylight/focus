import React from 'react';
import ReactDOM from 'react-dom';

chrome.storage.sync.get('state', data => {
  console.log(data);
  ReactDOM.render(
    <div>
      <h1>Focus what??</h1>
      {data.state.websites.items.map((site) => {
        return <li>{site.name}</li>
      })}
      <button>Add site to block list</button>
      <button>Start Working</button>
    </div>,
    document.getElementById('mount-point')
  );
});
