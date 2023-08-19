import React from 'react'
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ContactForm from '../components/contact-form'
import getSocialItems from '../utils/getSocialItems'

const Contact = ({ data }) => {
	const intl = useIntl()
	const {
		pageTitle,
		seoTitle,
		seoDescription,
		seoImage
	} = data.allContentfulContactPage.nodes[0]

	const seo = {
		title: seoTitle,
		description: seoDescription.seoDescription,
		image: seoImage.url
	};

	const { email } = data.allContentfulSiteMetadata.nodes[0]
	const social = getSocialItems(data.allContentfulSocialLinks.nodes[0])

	return (
		<Layout seo={seo}>
			<div className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-10 bg-gradient-to-b from-zinc-50 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900'>
				<div className='container max-w-6xl'>
					<div className=' md:w-8/12 lg:w-6/12'>
						<h1 className='h1'>{pageTitle}</h1>
					</div>

					<div className='md:flex md:flex-row-reverse flex-wrap'>
						<div className='md:w-4/12  md:pl-6'>
							<h5 className='text-zinc-400 text-xs mb-1 -mt-1.5 md:text-sm'>{intl.formatMessage({ id: "contacts" })}</h5>
							<a className='magnetic inline-block md:text-lg hover:text-cobalt-500 transition-colors'
								data-strenght='10'
								href={`mailto:${email}`}>{email}</a>

							<h5 className='text-zinc-400 text-xs mb-1 mt-6 md:mt-10 md:text-sm'>{intl.formatMessage({ id: "social" })}</h5>
							<div className='-mx-2 mb-8 flex flex-row flex-wrap md:flex-col items-start md:text-lg'>
								{social.map((item, index) => (
									<a
										href={item.url}
										className='mx-2 md:mb-2 inline-block magnetic hover:text-cobalt-500 transition-colors'
										data-strenght='10'
										key={`socialItems-${index}`}
										target="_blank"
										rel="noreferrer"
										title={item.name}>
										{item.name}
									</a>
								))}
							</div>
						</div>

						<div className='md:w-8/12 md:pr-6'>
							<ContactForm data={data} />
						</div>
					</div>

				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query ContactPageQuery($language: String) {
		allContentfulSocialLinks(filter: {node_locale: {eq: $language}}) {
			nodes {
				githubLink
				codepenLink
				twitterLink
			}
		}
		allContentfulSiteMetadata(filter: {node_locale: {eq: $language}}) {
			nodes {
				email
				node_locale
				image {
					gatsbyImageData(aspectRatio: 1)
					title
				}
			}
		}
		allContentfulContactPage(filter: {node_locale: {eq: $language}}) {
			nodes {
				node_locale
				seoTitle
				seoDescription {
					seoDescription
				}
				seoImage {
					url
				}
				pageTitle
				nameFieldLabel
				nameFieldPlaceholder
				nameFieldError
				emailFieldLabel
				emailFieldPlaceholder
				emailFieldError
				serviceFieldLabel
				serviceFieldPlaceholder
				messageFieldLabel
				messageFieldPlaceholder
				messageFieldError
				thanksMessage
			}
		}
	}
`

export default Contact