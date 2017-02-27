import React, { Component } from 'react';
import classnames from 'classnames';

export default class WebsiteList extends Component {
  shouldComponentUpdate(nextProps) {
    const { websites, showSites, disabled } = this.props;
    return ( websites !== nextProps.websites
      || showSites !== nextProps.showSites
      || disabled !== nextProps.disabled );
  }
  render() {
    const {
      websites,
      removeWebsite,
      disabled,
      toggleShowSites,
    } = this.props;

    return (
      <div>
        <h5>{`BLOCKED SITES (${websites.length})`}</h5>
        <ul className="website-list">
        {
          websites.map((website, idx) => {
            return (
              <li className="website-item" key={idx}>
                <div className="website-item-container">
                  <div className="left">
                    <img src={website.favicon} />
                    <span>{website.url}</span>
                  </div>

                  <div
                    className={classnames('icon-bin', {disabled})}
                    onClick={() => {
                      if (!disabled) {
                        removeWebsite(website.url)
                      }
                    }}>
                  </div>
                </div>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}
