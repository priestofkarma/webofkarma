import './src/styles/global.css'
import './src/styles/fonts.css'
import './src/styles/github-theme-hightlight.scss'
import React from 'react';
import ThemeContextProvider from './src/context/themeContext';
// require('prismjs/plugins/line-numbers/prism-line-numbers.css')
// require("prismjs/themes/prism-solarizedlight.css")

export const wrapRootElement = ({ element }) => {
	return <ThemeContextProvider>{element}</ThemeContextProvider>;
};
