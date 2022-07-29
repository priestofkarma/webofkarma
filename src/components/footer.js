import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import getLangContent from '../utils/getLangContent'

const Footer = () => {

	const intl = useIntl()
	const lang = intl.locale
	const year = new Date().getFullYear();
	const data = useStaticQuery(graphql`
		query footerQuery {
			allContentfulSingleWork {
				totalCount
			}
			allContentfulSiteMetadata {
				nodes {
					email
					footerSlogan
					node_locale
					image {
						gatsbyImageData(aspectRatio: 1)
						title
					}
				}
			}
		}
  	`)

	const langData = getLangContent(lang, data.allContentfulSiteMetadata.nodes)
	const {
		footerSlogan,
	} = langData

	return (
		<footer
			id='footer'
			className='py-6 lg:py-10 bg-zinc-900 text-zinc-300 shrink-0'>
			<div className="container">
				<div className='flex flex-wrap'>
					<hr className='w-full my-6 xl:my-8 xl:mt-0 border-zinc-600' />
					<div className="flex flex-wrap w-full justify-between flex-row text-sm sm:text-left">
						<span className='mb-1 mr-4'>© {year} {intl.formatMessage({ id: "all_rights" })}</span>
						<div className='flex'>
							<Link to={`/${lang}/terms-of-use`} className="mr-4">{intl.formatMessage({ id: "terms-of-use" })}</Link>
							<Link to={`/${lang}/privacy-policy`}>{intl.formatMessage({ id: "privacy-policy" })}</Link>
						</div>
						<span>{footerSlogan}</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer