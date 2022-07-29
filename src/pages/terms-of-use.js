import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const TermsOfUse = ({ data }) => {
	const { termsOfUse } = data.allContentfulSiteMetadata.nodes[0]

	return (
		<Layout>
			<div className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-10 bg-gradient-to-b from-zinc-50 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900'>
				<div className='container max-w-6xl'>
					<div className='post-content relative w-full' dangerouslySetInnerHTML={{ __html: termsOfUse.childMarkdownRemark.html }}>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query TermsOfUseQuery($language: String) {
		allContentfulSiteMetadata(filter: {node_locale: {eq: $language}}) {
			nodes {
				node_locale
				termsOfUse {
					childMarkdownRemark {
						html
					}
				}
			}
		}
	}
`

export default TermsOfUse