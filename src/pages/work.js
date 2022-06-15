import React from "react"
import { graphql } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import gsap from 'gsap'
import LetsWork from '../components/lets-work'
import SingleWork from '../components/work-component'

const WorkPage = (props) => {
	const { language } = props.pageContext
	const { data } = props
	const intl = useIntl()
	const pageTitle = intl.formatMessage({ id: "recent_work" })
	const seo = {
		title: pageTitle
	}

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

	/* filter works */
	function handleFilter(e, service) {
		const filterBtns = document.querySelectorAll('.button-filter');
		for (const btn of filterBtns) {
			btn.classList.remove('button', 'border-cobalt-500')
		}
		e.currentTarget.classList.add('button', 'border-cobalt-500')
		const workItems = document.querySelectorAll('.work-item');
		if (service !== 'All') {
			for (const project of workItems) {
				if (!project.className.includes(service)) {
					gsap.to(project, 0.45, { height: 0 })
				} else {
					gsap.to(project, 0.45, { height: 'auto' })
				}
			}
		} else {
			for (const project of workItems) {
				gsap.to(project, 0.45, { height: 'auto' })
			}
		}
	}

	return (
		<Layout seo={seo} pageProps={props}>

			<section className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-28 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800'>
				<div className="container">
					<div className='relative max-w-5xl 2xl:max-w-7xl mx-auto'>
						<h2 className='h1 mb-4 xl:mb-10 2xl:-ml-2 xl:text-7xl 2xl:text-8xl'>{intl.formatMessage({ id: "my_works" })}</h2>
					</div>
					<div className='max-w-5xl 2xl:max-w-7xl mx-auto'>
						<div className='pt-4 xl:py-10 xl:pb-16 -mx-1 xl:-mx-4'>
							{allServices.map(service => {
								return (
									<button
										key={service}
										className={`${service === 'All' ? 'button border-cobalt-500' : ''} group button-filter button-outline magnetic mx-1 xl:mx-2 mb-2`}
										data-strenght='35'
										data-text-strenght='10'
										data-filter={service}
										onClick={(e) => handleFilter(e, service)}
									><span className='relative magnetic-text'>{service}<sup>{projectsCounter[service]}</sup></span></button>
								)
							})}
						</div>
					</div>

					<div className='hidden xl:flex flex-wrap text-zinc-400 xl:px-24 2xl:px-20'>
						<span className='inline-block w-4/12 2xl:pl-2'>{intl.formatMessage({ id: "client" })}</span>
						<span className='inline-block w-3/12'>{intl.formatMessage({ id: "location" })}</span>
						<span className='inline-block w-4/12'>{intl.formatMessage({ id: "services" })}</span>
						<span className='inline-block w-1/12 2xl:pr-2 text-right'>{intl.formatMessage({ id: "year" })}</span>
					</div>
					<div className='py-8'>
						<ul
							className='flex flex-wrap md:-mx-4 2xl:-mx-10'>
							{data.allWork.nodes.map((work, index) => {
								const services = work.services.join(" & ");
								const dataServices = work.services.join(' ');
								const year = new Date(work.date).getFullYear()
								const infoClasses = `text-slate-700 dark:text-zinc-300 transition-all group-hover:skew-x-6 xl:group-hover:-translate-x-4 duration-500 xl:group-hover:opacity-50 translate-z-0`
								return (
									<SingleWork
										key={work.id}
										work={work}
										language={language}
										linkClasses={`xl:py-8 xl:px-28 2xl:px-32`}
										clazzName={`${dataServices} work-item overflow-hidden md:w-1/2 md:px-4 xl:px-0 xl:w-full `}>
										<div
											className="work-image w-full xl:max-w-xl 2xl:max-w-2xl xl:invisible xl:fixed z-10 xl:pointer-events-none">
											<img
												className='work-image-wrap w-full relative transition-all aspect-[8/5] xl:aspect-auto object-cover'
												src={work.previewImage.url}
												alt={work.previewImage.title} />
										</div>
										<div className='xl:flex items-center'>
											<h3
												style={{ willChange: 'opacity, transform' }}
												className='inline-block w-4/12 text-2xl md:text-3xl lg:text-4xl pt-6 xl:pt-0 transition-all group-hover:-skew-x-12 xl:group-hover:translate-x-4 duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
											<hr className='mt-3 mb-3 md:mb-6 xl:mb-0 xl:hidden border-zinc-400 dark:border-slate-600' />
											<span
												style={{ willChange: 'opacity, transform' }}
												className={`hidden xl:inline-block w-3/12 ${infoClasses}`}>{work.location}</span>
											<span
												style={{ willChange: 'opacity, transform' }}
												className={`inline-block w-8/12 xl:w-4/12 xl:text-lg ${infoClasses}`}>{services}</span>
											<span
												style={{ willChange: 'opacity, transform' }}
												className={`inline-block w-4/12 xl:w-1/12 text-right ${infoClasses}`}>{year}</span>
										</div>
									</SingleWork>
								)
							})}
							<hr className='hidden xl:block w-full border-slate-500 dark:border-zinc-500' />
						</ul>
					</div>
				</div>
			</section>

			<LetsWork />
		</Layout >
	)
}

export const query = graphql`
	query WorkPageQuery($language: String) {
		allWork: allContentfulSingleWork(filter: { node_locale: { eq: $language } }
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
				}
				previewImageMobile {
					url
					title
				}
			}
		}
	}
`

export default WorkPage