require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: `Webofkarma`,
		author: `Zhenya Petrenko <priestofkarma@gmail.com>`,
		siteUrl: `https://webofkarmamaster.gtsb.io/`
	},
	plugins: [
		{
			resolve: 'gatsby-source-contentful',
			options: {
				"spaceId": process.env.CONTENTFUL_SPACE_ID,
				"accessToken": process.env.CONTENTFUL_ACCESS_TOKEN
			}
		},
		"gatsby-plugin-image",
		"gatsby-plugin-react-helmet",
		// "gatsby-transformer-remark",
		"gatsby-plugin-sass",
		"gatsby-plugin-postcss",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		"gatsby-plugin-sitemap", {
			resolve: 'gatsby-plugin-manifest',
			options: {
				"icon": "src/images/icon.png"
			}
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-code-buttons',
						options: {
							buttonContainerClass: `copy-code-container`,
							buttonClass: `copy-code-btn`,
							svgIconClass: `copy-button-icon`,
							svgIcon: `<svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.4 14.8v22.8a3.8 3.8 0 003.8 3.8h15.2a3.8 3.8 0 003.8-3.8V20.96a3.799 3.799 0 00-1.144-2.717l-6.298-6.16A3.8 3.8 0 0035.1 11h-8.9a3.8 3.8 0 00-3.8 3.8v0z" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M37.6 41.4v3.8a3.8 3.8 0 01-3.8 3.8H18.6a3.8 3.8 0 01-3.8-3.8V24.3a3.8 3.8 0 013.8-3.8h3.8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
							tooltipText: `Copy to clipboard`,
							toasterClass: `copy-code-toaster`,
							toasterTextClass: `copy-code-toaster-text`,
							toasterText: `Copied!`,
							toasterDuration: 3500
						}
					},
					{
						resolve: `gatsby-remark-vscode`,
						options: {
							wrapperClassName: 'code-block',
							theme: {
								default: 'GitHub Light Default',
								parentSelector: {
									'html.light': 'GitHub Light Default',
									'html.dark': 'Solarized Dark'
								}
							},
							extensions: ['github-vscode-theme'],
							inlineCode: {
								marker: '-',
								theme: {
									default: 'GitHub Light Default',
									dark: 'Solarized Dark'
								}
							},
						}
					},
					/* or with prismjs */
					// `gatsby-remark-prismjs-copy-button`,
					/* {
						resolve: 'gatsby-remark-prismjs',
						options: {
							classPrefix: "language-",
							aliases: {},
							showLineNumbers: false,
							noInlineHighlight: false,
							prompt: {
								user: "root",
								host: "localhost",
								global: false,
							},
							escapeEntities: {},
						},
					} */
				],
			},
		},
		/* {
			resolve: `gatsby-plugin-mdx`,
			options: {
				gatsbyRemarkPlugins: [
					"gatsby-remark-prismjs-copy-button",
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							classPrefix: "language-",
							inlineCodeMarker: null,
							aliases: {},
							showLineNumbers: true,
							noInlineHighlight: true,
							prompt: {
								user: "root",
								host: "localhost",
								global: false,
							},
							escapeEntities: {},
						},
					},
				],
			},
		}, */
		{
			resolve: `gatsby-plugin-intl`,
			options: {
				path: `${__dirname}/src/intl`,
				languages: [`en`, `uk`],
				defaultLanguage: `en`,
				redirect: true,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				"name": "images",
				"path": `${__dirname}/src/images/`
			},
			__key: "images"
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				"name": "pages",
				"path": `${__dirname}/src/pages/`
			},
			__key: "pages"
		}]
};