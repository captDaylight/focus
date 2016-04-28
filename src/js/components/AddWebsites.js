import React, { Component } from 'react';
import findIndex from 'lodash/array/findIndex';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      websites,
      addWebsite,
      websitesData,
    } = this.props;

    return (
      <div>
        to block
        <ul>
          {
            websitesData.map((website, idx) => {
              const {url, favicon} = website;

              return (
                <li key={idx}>
                  <img src={favicon} />
                  {website.url}
                  {
                    findIndex(websites, (w) => w.url === website.url ) >= 0
                    ? (
                      <button onClick={() => {addWebsite(url, favicon)}}>
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
