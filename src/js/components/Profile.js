import React, { Component } from 'react';
import classnames from 'classnames';

export default class Profile extends Component {
	render() {
    const {
      showSites,
      websites,
      removeWebsite,
      disabled,
      toggleShowSites,
    } = this.props;

    return (
      <div className={classnames('profile', {display: showSites})}>
        profile
        <div id="hide-sites">
          <b className="pointer icon-cross" onClick={() => toggleShowSites()}></b>
        </div>
      </div>
    );
  }
}
