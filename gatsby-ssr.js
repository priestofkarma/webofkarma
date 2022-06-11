import React from 'react';
import { createElement } from 'react';

const applyDarkModeClass = `
	(function() {
	try {
		let mode = localStorage.getItem('theme');
		if (mode === 'dark') {
			document.documentElement.classList.add("dark");
		}
	} catch (e) {}
	})();
`;

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
	const script = createElement('script', {
		dangerouslySetInnerHTML: {
			__html: applyDarkModeClass,
		},
	});
	setPreBodyComponents([script]);
	setHeadComponents([
		<link
			key="mariupol-regular"
			rel="preload"
			href="/fonts/Mariupol/Mariupol-Regular.woff"
			as="font"
			type="font/woff"
			crossOrigin="anonymous"
		/>,
		<link
			key="mariupol-medium"
			rel="preload"
			href="/fonts/Mariupol/Mariupol-Medium.woff"
			as="font"
			type="font/woff"
			crossOrigin="anonymous"
		/>,
		<link
			key="mariupol-bold"
			rel="preload"
			href="/fonts/Mariupol/Mariupol-Bold.woff"
			as="font"
			type="font/woff"
			crossOrigin="anonymous"
		/>
	]);
};