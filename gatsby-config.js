require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
	siteMetadata: {
		title: `Webofkarma`,
		author: `Zhenya Petrenko <priestofkarma@gmail.com>`
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
		"gatsby-transformer-remark",
		"gatsby-plugin-postcss",
		"gatsby-plugin-sitemap", {
			resolve: 'gatsby-plugin-manifest',
			options: {
				"icon": "src/images/icon.png"
			}
		},
		"gatsby-plugin-mdx",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
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