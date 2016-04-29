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
      removeWebsite
    } = this.props;

    return (
      <div>
        to block

        <ul>
          {
            websitesData.map((website, idx) => {
              const {name, favicon} = website;

              return (
                <li key={idx}>
                  <img src={favicon} />
                  {
                    findIndex(websites, (w) => {
                      console.log(website);
                      return w.name === website.name;

                    } ) >= 0
                    ? (
                      <button onClick={() => {removeWebsite(name, favicon)}}>
                        un-block
                      </button>
                    ) : (
                      <button onClick={() => {addWebsite(name, favicon)}}>
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
