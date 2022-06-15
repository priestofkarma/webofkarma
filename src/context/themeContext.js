import React, { useState, useEffect } from 'react';

export const ThemeContext = React.createContext({
	theme: '',
	setTheme: () => { },
});

const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');
	const isWindow = typeof window !== `undefined`;

	useEffect(() => {
		function loadTheme() {
			return (isWindow && localStorage.theme === 'dark') || (isWindow && !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
			// return theme || 'light';
		}
		setTheme(loadTheme());
	}, []);

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;