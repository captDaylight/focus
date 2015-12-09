import React, { Component } from 'react';

export default function WebsiteList(props) {
	const { websites, removeWebsite } = props;

	return (
		<ul>
		{
			websites.map((website, idx) => {
				return (
					<li key={idx}>
						<img src={website.favicon} />
						{website.name}
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