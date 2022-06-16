import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ theme, seo }) => {
	const data = useStaticQuery(
		graphql`
			query {
				allContentfulSiteMetadata {
					nodes {
						siteUrl
						title
						image {
							url
						}
						description {
							description
						}
					}
				}
			}
		`)
	const { description, title, image, lang = typeof window !== `undefined` ? localStorage.getItem('gatsby-intl-language') || 'en' : 'en', meta = [] } = data.allContentfulSiteMetadata.nodes[0];
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
				},
				{
					name: 'twitter:image',
					content: metaImage,
				},
			].concat(meta)}
		/>
	)
}


export default Seo
