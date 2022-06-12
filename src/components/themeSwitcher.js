import React from 'react'
import { useIntl } from "gatsby-plugin-intl"

const ThemeSwitcher = ({theme, onToggleTheme}) => {
	const intl = useIntl()

	return (
		<div className='flex'>
			<button
				data-strength="10"
				onClick={() => onToggleTheme('light')}
				className={`${!theme ? 'text-orange-600 font-medium' : ''} magnetic transition-colors flex items-center mr-4`}>
				<span>{intl.formatMessage({ id: "light" })}</span>
			</button>
			<button
				data-strength="10"
				onClick={() => onToggleTheme('dark')}
				className={`${theme === 'dark' ? 'text-purple-600 font-medium' : ''} magnetic transition-colors flex items-center`}>
				<span>{intl.formatMessage({ id: "dark" })}</span>
			</button>
		</div>
	)
}

export default ThemeSwitcher