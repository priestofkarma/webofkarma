import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import getLangContent from '../utils/getLangContent'

const Seo = ({ theme, seo }) => {
	const data = useStaticQuery(
		graphql`
			query {
				allContentfulSiteMetadata {
					nodes {
						node_locale
						title
						siteUrl
						image {
							url
						}
						keywords
						description {
							description
						}
					}
				}
			}
	`)
	const intl = useIntl()
	const lang = intl.locale
	const { description, title, image, keywords, meta = [] } = getLangContent(lang, data.allContentfulSiteMetadata.nodes);
	const metaTitle = (seo && seo.title) || title
	const metaDescription = (seo && seo.description) || description.description
	const metaImage = (seo && seo.image) || image.url
	const concatTitle = `${metaTitle} • ${title}`;

	return (
		<Helmet
			htmlAttributes={{
				lang,
				class: theme 
			}}
			title={title}
			titleTemplate={concatTitle}
			meta={[
				{
					property: `title`,
					content: concatTitle,
				},
				{
					name: `description`,
					content: metaDescription,
					lang: lang
				},
				{
					name: 'image',
					content: metaImage,
				},
				{
					property: `og:title`,
					content: concatTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
					lang: lang
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: 'og:image',
					content: metaImage,
				},
				{
					name: `twitter:card`,
					content: `summary_large_image`,
				},
				{
					name: `twitter:creator`,
					content: 'Zhenya Petrenko',
				},
				{
					name: `twitter:title`,
					content: concatTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
					lang: lang
				},
				{
					name: 'twitter:image',
					content: metaImage,
				},
				{
					name: 'keywords',
					lang: lang,
					content: keywords,
				},
			].concat(meta)}
		/>
	)
}


export default Seo
