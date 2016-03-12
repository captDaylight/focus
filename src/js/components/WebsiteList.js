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
			showSites,
			toggleShowSites,
		} = this.props;
		// console.log('rendering websites');
		return (
			<div>

				<div id="website-list-wrapper" className={classnames({display: showSites})}>
					<div id="hide-sites">
						<b className="pointer icon-cross" onClick={() => toggleShowSites()}></b>
					</div>
					<ul id="website-list">
					{
						websites.map((website, idx) => {
							return (
								<li className="website-item" key={idx}>
									<div className="left">
										<img src={website.favicon} />
										<span>{website.url}</span>
									</div>

									<div 
										className={classnames('icon-bin', {disabled})} 
										onClick={() => {
											if (!disabled) {
												removeWebsite(website.id)	
											}
										}}>
									</div>
								</li>
							);
						})
					}
					</ul>
				</div>

				<div className={classnames({blurring: showSites})}>
					You're blocking {websites.length} sites. 
					<b className="pointer" onClick={() => toggleShowSites()}> See Sites</b>
				</div>

			</div>
		);
	}
}