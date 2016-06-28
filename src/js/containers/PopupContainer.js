import React, { Component } from 'react';
import classnames from 'classnames';
import url from 'url';
import takeRight from 'lodash/array/takeright';
import wrapActionsWithMessanger from '../utils/wrapActionsWithMessanger';
import MinutesAndSeconds from '../components/MinutesAndSeconds';

const actions = wrapActionsWithMessanger([
	'countDown',
	'checkForTab',
]);

function processSiteInfo(siteURL, id, faviconURL) {
	const urlParse = url.parse(siteURL);
	const hostname = urlParse.hostname ? urlParse.hostname : urlParse.pathname;
	// turn www.facebook.com into facebook.com
	// TODO: a website like google.co.uk won't work with this solution, it'll return co.uk
	const parsedHostname = takeRight(hostname.split('.'), 2).join('.');

	actions.checkForTab(parsedHostname, id, faviconURL);
}

function urlIsInList(url, list) {
	return list.filter(site => url.indexOf(site.url) >= 0).length > 0;
}

export default class FocusContainer extends Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}
	updateState(newState) {
		console.log('in update state');
		this.setState(newState);
	}
	componentWillMount() {
		const { updateState } = this;
		chrome.extension.onMessage.addListener((req, sender, sendRes) => {
			if (req.type === 'STATE_UPDATE') {
				updateState.call(this, req.data);
			}
			return true;
		});
	}
	handleAddWebsite() {
		chrome.tabs.query(
			{currentWindow: true, active : true},
			tab => {
				if (tab.length !== 0) {
					const { url, id, favIconUrl } = tab[0];

					processSiteInfo(url, id, favIconUrl)
				}
			}
		)
	}
	render() {
		const { countDown, addWebsite } = actions;
		const { date, minutes, seconds, duration, sound } = this.state.timer;
		const { websites } = this.state.websites;
    const { ui } = this.state;

		return (
			<section id="popup" className={classnames({focusing: minutes})}>
        {
          ui.introStep < 5 ?
          (
            <div className="popup-section">
              Open a new tab to get started!
            </div>
          ) : (
            <div>
              {
                minutes
                ? <MinutesAndSeconds minutes={minutes} seconds={seconds} />
                : (
                  <div className="popup-section">
                    <button
                      className="popup"
                      onClick={() => countDown(Date.now(), duration, sound)}
                    >
                      Start Working
                    </button>
                  </div>
                )
              }

              <div className="popup-section">
                {
                  this.props.url.indexOf('chrome://newtab') >= 0
                  ?
                  <span>You don't want to block the new tab</span>
                  :
                    (urlIsInList(this.props.url, websites)
                    ?
                    <span>Site is on the blocked list</span>
                    : (
                        <button
                          className="popup"
                          onClick={this.handleAddWebsite}
                        >
                          block this site
                        </button>
                      )
                    )
                }
              </div>
            </div>
          )
        }


			</section>
		);
	}
}



