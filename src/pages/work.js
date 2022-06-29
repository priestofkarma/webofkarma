import React, { useState, useRef } from "react"
import { graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import gsap from 'gsap'
import { FaAlignJustify, FaThLarge } from 'react-icons/fa'
import { BsArrowRightShort } from 'react-icons/bs'
import LetsWork from '../components/lets-work'
import SingleWork from '../components/work-component'

const WorkPage = ({ data }) => {
	const intl = useIntl()
	const lang = intl.locale
	const { myWorksTitle, seoTitle, seoDescription, seoImage } = data.allContentfulWorkPage.nodes[0]
	const seo = {
		title: seoTitle,
		description: seoDescription.seoDescription,
		image: seoImage.url
	}
	const [view, setView] = useState('lines');
	const linesRef = useRef()
	const gridRef = useRef()

	/* get all services works */
	let allServices = ['All'];
	data.allWork.nodes.forEach((work) => {
		const services = work.services;
		for (const service of services) {
			if (allServices.indexOf(service) === -1) {
				allServices.push(service);
			}
		}
	})

	/* get count works of each service */
	let projectsCounter = {};
	for (const service of allServices) {
		let counter = 1;
		data.allWork.nodes.forEach((work) => {
			const serv = work.services;
			if (serv.indexOf(service) !== -1) {
				projectsCounter[service] = counter++
			}
		})
	}

	const animState = view === 'grid' || window.innerWidth < 1279
	
	/* filter */
	function filterTag(service) {
		const filterBtns = document.querySelectorAll('.button-filter');
		for (const btn of filterBtns) {
			btn.classList.remove('button-active')
			if (btn.getAttribute('data-filter') === service) {
				btn.classList.add('button-active')
			}
		}
		const workItems = document.querySelectorAll('.work-item');
		if (service !== 'All') {
			for (const project of workItems) {
				if (!project.className.includes(service)) {
					animState ? gsap.to(project, 0, { display: 'none', height: 0 }) : gsap.to(project, 0.45, { height: 0 })
				} else {
					animState ? gsap.to(project, 0, { display: 'block', height: 'auto' }) : gsap.to(project, 0.45, { height: 'auto' })
				}
			}
		} else {
			for (const project of workItems) {
				animState ? gsap.to(project, 0, { display: 'block', height: 'auto' }) : gsap.to(project, 0.45, { height: 'auto' })
			}
		}
	}

	/* change view */
	function changeView(view) {
		setView(() => view);
		filterTag('All')
	}

	return (
		<Layout seo={seo}>

			<section className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-28 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900'>
				<div className="container">
					<div className='relative max-w-5xl 2xl:max-w-7xl mx-auto'>
						<h2 className='h1 mb-4 xl:mb-10 2xl:-ml-2 xl:text-7xl 2xl:text-8xl'>{myWorksTitle}</h2>
					</div>
					<div className='max-w-5xl 2xl:max-w-7xl mx-auto'>
						<div className='relative flex flex-wrap pt-4 xl:py-10 xl:pb-16 -mx-1 xl:-mx-1'>
							{allServices.map(service => {
								return (
									<button
										key={service}
										className={`${service === 'All' ? 'button-active' : ''} group button-filter button-outline magnetic mx-1 xl:mx-1 mb-2`}
										data-strenght='35'
										data-text-strenght='10'
										data-filter={service}
										onClick={() => filterTag(service)}
									><span className='relative magnetic-text'>{service}<sup>{projectsCounter[service]}</sup></span></button>
								)
							})}
							<div className="hidden xl:inline-flex ml-auto">
								<button
									className={`${view === 'lines' ? 'button-active' : 'button-outline'} magnetic p-6 mx-1 mb-2`}
									data-strenght='35'
									data-text-strenght='10'
									onClick={() => changeView('lines')}>
									<span className='magnetic-text'><FaAlignJustify /></span>
								</button>
								<button
									className={`${view === 'grid' ? 'button-active' : 'button-outline'} magnetic p-6 mx-1 mb-2`}
									data-strenght='35'
									data-text-strenght='10'
									onClick={() => changeView('grid')}>
									<span className='magnetic-text'><FaThLarge /></span>
								</button>
							</div>
						</div>
					</div>

					<div ref={linesRef} className={`${view === 'lines' ? 'block' : 'hidden'}`}>
						<div className='hidden xl:flex flex-wrap text-zinc-400 xl:px-24 2xl:px-20'>
							<span className='inline-block w-4/12 2xl:pl-2'>{intl.formatMessage({ id: "client" })}</span>
							<span className='inline-block w-3/12'>{intl.formatMessage({ id: "location" })}</span>
							<span className='inline-block w-4/12'>{intl.formatMessage({ id: "services" })}</span>
							<span className='inline-block w-1/12 2xl:pr-2 text-right'>{intl.formatMessage({ id: "year" })}</span>
						</div>
						<div
							className={`view-lines pt-8 pb-4`}>
							<ul
								className='flex flex-wrap md:-mx-4 2xl:-mx-10'>
								{data.allWork.nodes.map((work) => {
									const services = work.services.join(" & ");
									const dataServices = work.services.join(' ');
									const year = new Date(work.date).getFullYear()
									const infoClasses = `text-slate-700 dark:text-zinc-300 transition-all group-hover:skew-x-6 xl:group-hover:-translate-x-4 duration-500 xl:group-hover:opacity-50 translate-z-0`
									return (
										<SingleWork
											key={work.id}
											work={work}
											linkClasses={`xl:py-8 xl:px-28 2xl:px-32`}
											clazzName={`${dataServices} work-item overflow-hidden md:w-1/2 md:px-4 xl:px-0 xl:w-full `}>
											<div
												className="work-image w-full xl:max-w-xl 2xl:max-w-2xl xl:invisible xl:fixed z-10 xl:pointer-events-none">
												<GatsbyImage
													image={getImage(work.previewImage.gatsbyImageData)}
													alt={work.previewImage.title}
													className='work-image-wrap w-full relative transition-all aspect-[8/5] xl:aspect-auto object-cover'
												/>
											</div>
											<div className='xl:flex items-center'>
												<h3
													style={{ willChange: 'opacity, transform' }}
													className='inline-block mb-0 w-full lg:w-4/12 text-2xl md:text-3xl lg:text-4xl pt-6 xl:pt-0 transition-all group-hover:-skew-x-12 xl:group-hover:translate-x-4 duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
												<hr className='mt-3 mb-3 md:mb-6 xl:mb-0 xl:hidden border-zinc-400 dark:border-slate-600' />
												<span
													style={{ willChange: 'opacity, transform' }}
													className={`hidden xl:inline-block w-3/12 ${infoClasses}`}>{work.location}</span>
												<span
													style={{ willChange: 'opacity, transform' }}
													className={`inline-block w-9/12 xl:w-4/12 xl:text-lg ${infoClasses}`}>{services}</span>
												<span
													style={{ willChange: 'opacity, transform' }}
													className={`inline-block w-3/12 xl:w-1/12 text-right ${infoClasses}`}>{year}</span>
											</div>
										</SingleWork>
									)
								})}
								<hr className='hidden xl:block w-full border-slate-500 dark:border-zinc-500' />
							</ul>
						</div>
					</div>
					<div
						ref={gridRef}
						className={`${view === 'grid' ? 'block' : 'hidden'} view-grid py-8`}>
						<ul
							className='flex flex-wrap md:-mx-4 xl:-mx-6'>
							{data.allWork.nodes.map((work, index) => {
								const services = work.services.join(" & ");
								const dataServices = work.services.join(' ');
								const year = new Date(work.date).getFullYear()
								const infoClasses = `text-slate-700 dark:text-zinc-300 transition-all duration-500 xl:group-hover:opacity-50 translate-z-0`
								return (
									<li key={work.id}
										className={`${dataServices} work-item overflow-hidden md:w-1/2 md:px-4 xl:px-6`}>
										<Link
											to={`/${lang}/work/${work.path}`}
											className={`group block pb-12`}>
											<div
												className="w-full overflow-hidden z-10">
												<GatsbyImage
													image={getImage(work.previewImage.gatsbyImageData)}
													alt={work.previewImage.title}
													className='w-full group-hover:scale-105 relative transition-all duration-700 aspect-[8/5] object-cover'
												/>
											</div>
											<div className='pt-4'>
												<h3
													style={{ willChange: 'opacity, transform' }}
													className='inline-block mb-0 w-full text-2xl md:text-3xl lg:text-4xl xl:text-5xl transition-all duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
												<hr className='mt-3 mb-3 md:mb-6 border-zinc-400 dark:border-slate-600' />
												<span
													style={{ willChange: 'opacity, transform' }}
													className={`inline-block w-8/12 xl:text-lg ${infoClasses}`}>{services}</span>
												<span
													style={{ willChange: 'opacity, transform' }}
													className={`inline-block w-4/12 text-right ${infoClasses}`}>{year}</span>
											</div>
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
					<div className='flex justify-center pt-2 md:pt-8 xl:pt-14'>
						<Link to={'/' + lang + '/archive'} className='group button-outline magnetic'
							data-strenght='50'
							data-text-strenght='20'>
							<span className="magnetic-text flex">
								<span className='relative'>{intl.formatMessage({ id: "archive" })}<sup>{data.allArchive.totalCount}</sup></span>
								<BsArrowRightShort className='button-icon' />
							</span>
						</Link>
					</div>
				</div>
			</section>

			<LetsWork />
		</Layout >
	)
}

export const query = graphql`
	query WorkPageQuery($language: String) {
		allArchive: allContentfulArchiveWork(
			filter: {node_locale: {eq: $language}}
			sort: {fields: date, order: DESC }) {
			totalCount
		}
		allWork: allContentfulSingleWork(
			filter: {node_locale: {eq: $language}}
			sort: {fields: date, order: DESC }) {
			totalCount
			nodes {
				id
				node_locale
				path
				workName
				services
				isBestWork
				location
				date
				macbookMedia {
					url
					file {
						fileName
						contentType
					}
				}
				previewImage {
					url
					title
					gatsbyImageData
				}
				previewImageMobile {
					url
					title
					gatsbyImageData
				}
			}
		}
		allContentfulWorkPage(filter: { node_locale: { eq: $language } }) {
			nodes {
				seoTitle
				myWorksTitle
				seoImage {
					url
					title
				}
				seoDescription {
					seoDescription
				}
			}
		}
	}
`

export default WorkPage