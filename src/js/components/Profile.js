import React, { Component } from 'react';
import classnames from 'classnames';
import WebsiteList from './WebsiteList';

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
      <div>
				<div className={classnames({blurring: showSites})}>
					<b className="pointer" onClick={() => toggleShowSites()}>View Profile</b>
				</div>
				<div className={classnames('profile-wrapper', {display: showSites})}>
					<div className="profile">
						<div className="margin-bottom">
							<h5>FOCUS LENGTH</h5>
							<h1 className="flex flex-center">
								<button className="margin-right-sm">-</button> 25 Min <button className="margin-left-sm">+</button>
							</h1>
						</div>

						<WebsiteList
							websites={websites}
				      removeWebsite={removeWebsite}
				      disabled={disabled}
				      toggleShowSites={toggleShowSites}
						/>
					</div>

	        <div id="hide-sites">
	          <b className="pointer icon-cross" onClick={() => toggleShowSites()}></b>
	        </div>

				</div>
      </div>
    );
  }
}
