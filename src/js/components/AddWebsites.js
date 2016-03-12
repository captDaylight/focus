import React, { Component } from 'react';
import findIndex from 'lodash/array/findIndex';
export default class Login extends Component {
	constructor(props) {
		super(props);
		props.fetchCommonWebsites();
		props.fetchWebsites();
	}
	render() {
		const {
			websites: {commonWebsites, websites}, 
			postWebsite,
			doneAddingCommonSites,
		} = this.props;

		return (
			<div>
				to block
				<ul>
					{
						commonWebsites.map((website, idx) => {
							const {url, favicon} = website;

							return (
								<li key={idx}>
									<img src={favicon} />
									{website.url} 
									{
										findIndex(websites, (w) => w.url === website.url ) >= 0
										? (
											<button onClick={() => {postWebsite(url, favicon)}}>
												un-block 
											</button>
										) : (
											<button onClick={() => {postWebsite(url, favicon)}}>
												block
											</button>
										)
									}
								</li>
							)
						})
					}
				</ul>
				<button onClick={() => {doneAddingCommonSites()}}>next</button>
			</div>
		);
	}
}