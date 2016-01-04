import React, { Component } from 'react';

export default function WebsiteList(props) {
	const { 
		websites,
		removeWebsite,
		disabled,
		showSites,
		toggleShowSites,
	} = props;
	console.log(toggleShowSites);
	return (
		<div>
			<h5>BLOCKED SITES</h5>
			
			{
				showSites ?
				(
					<div>
						<b onClick={() => toggleShowSites()}>Hide Sites</b>
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
					
				)
				: 
				(
					<div>
						You're blocking {websites.length} sites. 
						<b onClick={() => toggleShowSites()}> See Sites</b>
					</div>
				)
			}
			
		</div>
	);
}