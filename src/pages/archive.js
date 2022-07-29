import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import Layout from '../components/layout'
import LetsWork from '../components/lets-work'
import FadeInAnimation from '../components/FadeInAnimation'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'


const ArchivePage = ({ data }) => {
	const intl = useIntl()
	// const lang = intl.locale

	const { seoTitle, seoDescription, seoImage } = data.allContentfulArchivePage.nodes[0]
	const seo = {
		title: seoTitle,
		description: seoDescription.seoDescription,
		image: seoImage.url
	}

	return (
		<Layout seo={seo}>

			<section className='overflow-hidden pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-28 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900'>
				<div className="container">
					<div className='relative max-w-5xl 2xl:max-w-7xl mx-auto'>
						<h2 className='h1 mb-4 xl:mb-10 2xl:-ml-2 xl:text-7xl 2xl:text-8xl'><span className='relative'>{intl.formatMessage({ id: "archive" })}<sup className='xl:text-4xl xl:-top-4'>{data.allArchive.totalCount}</sup></span></h2>
					</div>

					<div>
						<div className='hidden md:flex flex-wrap text-zinc-400 px-4 xl:px-24 2xl:px-20'>
							<span className='inline-block w-4/12 2xl:pl-2'>{intl.formatMessage({ id: "client" })}</span>
							<span className='hidden lg:inline-block w-3/12'>{intl.formatMessage({ id: "location" })}</span>
							<span className='inline-block w-4/12'>{intl.formatMessage({ id: "services" })}</span>
							<span className='inline-block w-1/12 md:w-4/12 lg:w-1/12 2xl:pr-2 text-right'>{intl.formatMessage({ id: "year" })}</span>
						</div>
						<div
							className={`view-lines py-8`}>
							<ul
								className='flex flex-wrap -mx-8 md:-mx-4 2xl:-mx-10'>
								{data.allArchive.nodes.map((work, index) => {
									const services = work.services.join(" & ");
									const year = new Date(work.date).getFullYear()
									const infoClasses = `text-slate-700 dark:text-zinc-300 transition-all group-hover:skew-x-6 xl:group-hover:-translate-x-4 duration-500 xl:group-hover:opacity-50 translate-z-0`
									return (
										<FadeInAnimation
											direction='up'
											key={work.id}
											className='w-full'>
											<hr className='block border-slate-500 dark:border-zinc-500' />
											<a
												href={work.liveLink}
												target='_blank'
												rel='noreferrer'
												className='work group block py-6 xl:py-8 px-8 xl:px-28 2xl:px-32'>
												<div className='md:flex items-center'>
													<BsFillArrowUpRightCircleFill className='absolute z-10 text-2xl md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:text-4xl top-6 right-8 md:-right-3 md:top-1/2 md:-translate-y-1/2' />
													<h3
														style={{ willChange: 'opacity, transform' }}
														className='inline-block mb-0 w-10/12 md:w-4/12 text-2xl md:text-3xl lg:text-4xl transition-all group-hover:-skew-x-12 xl:group-hover:translate-x-4 duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
													<span
														style={{ willChange: 'opacity, transform' }}
														className={`hidden lg:inline-block w-3/12 ${infoClasses}`}>{work.location}</span>
													<span
														style={{ willChange: 'opacity, transform' }}
														className={`inline-block w-8/12 md:w-4/12 xl:text-lg ${infoClasses}`}>{services}</span>
													<span
														style={{ willChange: 'opacity, transform' }}
														className={`inline-block w-4/12 md:w-4/12 lg:w-1/12 text-right ${infoClasses}`}>{year}</span>
												</div>
											</a>
										</FadeInAnimation>
									)
								})}
								<hr className='block w-full border-slate-500 dark:border-zinc-500' />
							</ul>
						</div>
					</div>
				</div>
			</section>

			<LetsWork />
		</Layout >
	)
}

export const query = graphql`
	query ArchivePageQuery($language: String) {
		allArchive: allContentfulArchiveWork(
			filter: {node_locale: {eq: $language}}
			sort: {fields: date, order: DESC }) {
			totalCount
			nodes {
				id
				node_locale
				workName
				services
				location
				date
				liveLink
			}
		}
		allContentfulArchivePage(filter: { node_locale: { eq: $language } }) {
			nodes {
				seoTitle
				seoImage {
					url
				}
				seoDescription {
					seoDescription
				}
			}
		}
	}
`

export default ArchivePage