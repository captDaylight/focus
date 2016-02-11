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
						<b className="pointer" onClick={() => toggleShowSites()}>X</b>
					</div>
					<ul id="website-list">
					{
						websites.map((website, idx) => {
							return (
								<li className="website-item" key={idx}>
									<img src={website.favicon} />
									<span>{website.name}</span>
									{
										disabled ? null : (						
											<button onClick={() => removeWebsite(website.id)}>
												Remove Website
											</button>
										)
									}
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