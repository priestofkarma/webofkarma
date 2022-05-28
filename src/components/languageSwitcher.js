import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const languageName = {
	en: "English",
	uk: "Українська",
}

const Language = () => {

	return (
		<div>
			<IntlContextConsumer>
				{({ languages, language: currentLocale }) =>
					languages.map(language => (
						<button
							className={`${currentLocale === language ? 'text-cobalt-500 font-medium' : ''} transition-colors magnetic mr-4`}
							key={language}

							onClick={function () {
								changeLocale(language);
								document.body.classList.remove('menu-opened')
							}}>
							{languageName[language]}
						</button>
					))
				}
			</IntlContextConsumer>
		</div>
	)
}

export default Language