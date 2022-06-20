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
					`gatsby-remark-prismjs-copy-button`,
					{
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
					}
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