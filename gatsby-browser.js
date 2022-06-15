import './src/styles/global.css'
import './src/styles/fonts.css'

import React from 'react';
import ThemeContextProvider from './src/context/themeContext';

export const wrapRootElement = ({ element }) => {
  return <ThemeContextProvider>{element}</ThemeContextProvider>;
};