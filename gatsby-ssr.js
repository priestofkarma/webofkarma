import React from 'react';
import { createElement } from 'react';

const applyModeClass = `
	(function() {
	try {
		const mode = (localStorage.theme === 'dark') || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
		document.documentElement.classList.add(mode);
		localStorage.setItem('theme', mode);
		/* if (('isPreloaderShown' in localStorage)) {
			document.getElementById('preloader').remove()
		} */
	} catch (e) {}
	})();
`;

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<script 
		key='remove-fouc-script'
		dangerouslySetInnerHTML={{ __html: applyModeClass }}></script>,
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