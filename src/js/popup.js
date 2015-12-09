import React from 'react';
import ReactDOM from 'react-dom';
import wrapActionsWithMessanger from './utils/wrapActionsWithMessanger';

const actions = wrapActionsWithMessanger([
  'countDown',
  'addWebsite',
]);

chrome.storage.sync.get('state', data => {
  chrome.extension.getBackgroundPage().console.log('from the popup',data);
  ReactDOM.render(
    <div>
      <h1>Focus what??</h1>
      {data.state.websites.items.map((site) => {
        return <li>{site.name}</li>
      })}
      <button>Add site to block list</button>
      <button onClick={() => actions.countDown(Date.now() + 30000)}>Start Working</button>
    </div>,
    document.getElementById('mount-point')
  );
});
