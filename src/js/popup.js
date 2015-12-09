import React from 'react';
import ReactDOM from 'react-dom';
import url from 'url';
import takeRight from 'lodash/array/takeright';
import wrapActionsWithMessanger from './utils/wrapActionsWithMessanger';

const actions = wrapActionsWithMessanger([
  'countDown',
  'addWebsite',
]);

function processSiteInfo(siteURL, faviconURL) {
  chrome.extension.getBackgroundPage().console.log('da fuck??', siteURL, faviconURL);
  const urlParse = url.parse(siteURL);
  chrome.extension.getBackgroundPage().console.log(urlParse);
  const hostname = urlParse.hostname ? urlParse.hostname : urlParse.pathname;
  chrome.extension.getBackgroundPage().console.log('hostname');
  // turn www.facebook.com into facebook.com
  // TODO: a website like google.co.uk won't work with this solution, it'll return co.uk
  const parsedHostname = takeRight(hostname.split('.'), 2).join('.');
  
  chrome.extension.getBackgroundPage().console.log('attempting to add site', parsedHostname, faviconURL);
  actions.addWebsite(parsedHostname, faviconURL);
}

chrome.tabs.query(
  {currentWindow: true, active : true},
  tab => {
    if (tab.length !== 0) {
      const { url, favIconUrl } = tab[0];
      const { countDown } = actions; 
      chrome.extension.getBackgroundPage().console.log('popup currentTab', tab);
      chrome.storage.sync.get('state', data => {
        chrome.extension.getBackgroundPage().console.log('from the popup',data);
        ReactDOM.render(
          <div>
            <h1>Focus what...</h1>
            {data.state.websites.items.map((site) => {
              return <li>{site.name}</li>
            })}
            <button onClick={() => processSiteInfo(url, favIconUrl)}>
              Add site to block list
            </button>
            <button onClick={() => countDown(Date.now() + 30000)}>
              Start Working
            </button>
          </div>,
          document.getElementById('mount-point')
        );
      });      
    }
  }
)


