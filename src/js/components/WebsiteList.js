import React, { Component } from 'react';

export default function WebsiteList(props) {
	const { websites, removeWebsite } = props;

	return (
		<ul id="website-list">
		{
			websites.map((website, idx) => {
				return (
					<li className="website-item" key={idx}>
						<img src={website.favicon} />
						<span>{website.name}</span>
						<button onClick={() => removeWebsite(website.id)}>
							Remove Website
						</button>
					</li>
				);
			})
		}
		</ul>
	);
}