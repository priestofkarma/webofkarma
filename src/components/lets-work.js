import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BsArrowRightShort } from 'react-icons/bs'

const LetsWork = () => {
	const intl = useIntl()
	const data = useStaticQuery(graphql`
		query letsWork {
			allContentfulSiteMetadata {
				nodes {
					email
					node_locale
					footerLead {
						childMarkdownRemark {
							html
						}
					}
					image {
						gatsbyImageData(aspectRatio: 1)
						title
					}
				}
			}
		}
	`)

	const { email, image } = data.allContentfulSiteMetadata.nodes[0]
	return (
		<section className='pt-12 md:pb-6 md:pt-20 xl:pt-32 bg-zinc-900 text-zinc-200'>
			<div className="container max-w-4xl">
				<div>
					<h3 className="text-5xl md:text-7xl lg:text-8xl max-w-2xl lg:max-w-none mb-0">
						<span className='inline-block hover:scale-150 duration-500 transition-transform'>
							<GatsbyImage
								style={{ width: '1em', height: '1em' }}
								data-strenght={50}
								className='inline-block magnetic rounded-full'
								image={getImage(image)}
								alt={image.title}
								imgClassName='object-top rounded-full'
							/></span> {intl.formatMessage({ id: "contact_lead" })}</h3>

					<div className='relative py-24 sm:pb-16 lg:pt-28'>
						<hr className='w-full border-zinc-600' />
						<Link
							to='contact'
							data-strenght={50}
							data-text-strenght={30}
							className="group absolute lg:text-xl w-40 h-40 lg:w-48 lg:h-48 lg:top-5 lg:right-10 top-2 right-6 button flex items-center justify-center text-center magnetic">
							<span className="magnetic-text flex">
								<span>{intl.formatMessage({ id: "get_in_touch" })}</span>
							</span>
						</Link>
					</div>
					<div>
						<a href={`mailto:${email}`} className='group w-full sm:w-auto lg:text-xl button-outline magnetic'
							data-strenght='50'
							data-text-strenght='20'>
							<span className="magnetic-text flex w-full justify-center">
								<span className='relative'>{email}</span>
								<BsArrowRightShort className='button-icon' />
							</span>
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LetsWork
