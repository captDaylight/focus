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
      removeWebsite
    } = this.props;

    return (
      <div>

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
                      <button onClick={() => {addWebsite(url, favicon)}}>
                        block
                      </button>
                    )
                  }
                </li>
              )
            })
          }
        </ul>
        <button onClick={() => {console.log('NEXT')}}>next</button>
      </div>
    );
  }
}
