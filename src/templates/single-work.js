import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SingleWork = (props) => {
	const { data } = props

	return (
		<Layout pageProps={props}>
			<div className="pt-20">
				<div className="container">
					<h1 className='text-4xl'>{data.contentfulSingleWork.workName}</h1>
					<div dangerouslySetInnerHTML={{ __html: data.contentfulSingleWork.workDescription.childMarkdownRemark.html }} />

					<GatsbyImage
						image={getImage(data.contentfulSingleWork.previewImage)}
						alt={data.contentfulSingleWork.previewImage.title}
					/>
				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query singleWorkQuery($slug: String, $language: String) {
		contentfulSingleWork(path: {eq: $slug}, node_locale: {eq: $language}) {
			path
			node_locale
			workName
			workDescription {
				id
				childMarkdownRemark {
					html
				}
			}
			previewImage {
				gatsbyImageData
				title
			}
		}
	}
`

/* query singleWorkQuery($slug: String, $language: String) {
	contentfulPersonalSite(path: { eq: $slug }, node_locale: { eq: $language }) {
		path
		node_locale
		title
		content {
			childMarkdownRemark {
				html
			}
		}
	}
} */

export default SingleWork