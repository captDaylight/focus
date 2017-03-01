import React, { Component } from 'react';
import { findIndex } from 'lodash';
import classnames from 'classnames';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      websites,
      addWebsite,
      websitesData,
      removeWebsite,
      setNextIntroStep
    } = this.props;

    return (
      <div>
        <div className="intro-text">
          <h5>Step 1 <br/>Add websites to block</h5>
          <h6>When you start a focus session, any site on your list will be blocked. You'll see how to add others later.</h6>
        </div>
        <ul className="website-intro-list">
          {
            websitesData.map((website, idx) => {
              const {url, favicon} = website;
              const blocked = findIndex(websites, (w) => {
                  return w.url === website.url;
                }) >= 0;

              return (
                <li key={idx} className={classnames('website-item-wrapper', {blocked: blocked})}>
                  <div className="website-item">
                    <div className="website-item-container">
                      <div className="left">
                        <img src={favicon} />
                        <span>{url}</span>
                      </div>

                      {
                        blocked
                        ? (
                          <button onClick={() => {removeWebsite(url)}}>
                            un-block
                          </button>
                        ) : (
                          <button  onClick={() => {addWebsite(url, favicon)}}>
                            block
                          </button>
                        )
                      }
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="intro-next">
          <button className="popup" onClick={() => {setNextIntroStep()}}>next</button>
        </div>
      </div>
    );
  }
}
