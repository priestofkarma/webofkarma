import './src/styles/fonts.css'
import './src/styles/global.css'
import React from 'react';
import ThemeContextProvider from './src/context/themeContext';
// import './src/styles/github-theme-hightlight.scss'

export const wrapRootElement = ({ element }) => {
	return <ThemeContextProvider>{element}</ThemeContextProvider>;
};
