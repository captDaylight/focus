import React, { Component } from 'react';

export default function WebsiteList(props) {
	const { websites, removeWebsite } = props;

	return (
		<ul>
		{
			websites.map((website, idx) => {
				return (
					<li key={idx}>
						{website.name}
						<button onClick={removeWebsite.bind(null, website.id)}>
							Remove Website
						</button>
					</li>
				);
			})
		}
		</ul>
	);
}

