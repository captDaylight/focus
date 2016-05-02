import React, { Component } from 'react';
import findIndex from 'lodash/array/findIndex';
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
          <h5>Add sites to your block list!</h5>
          <h6>You'll see how to add others later.</h6>
        </div>
        <ul className="website-intro-list">
          {
            websitesData.map((website, idx) => {
              const {url, favicon} = website;
              const blocked = findIndex(websites, (w) => {
                  return w.url === website.url;
                }) >= 0;

              return (
                <li key={idx} className={classnames('website-item', {blocked: blocked})}>
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
