import React, { useRef, useEffect } from "react"
import { graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import { socialMenuItems } from '../utils/MenuItems'
import heroBg from '../images/hero-bg.svg'
import { BsArrowRightShort, BsArrowDown, BsEye, BsStars } from 'react-icons/bs'
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import FadeInAnimation from '../components/FadeInAnimation'

const IndexPage = (props) => {
	gsap.registerPlugin(ScrollToPlugin);
	gsap.registerPlugin(ScrollTrigger)

	const secondBlockRef = useRef()
	const { data, location } = props
	const intl = useIntl()
	const seo = {
		title: 'Home'
	}

	function scrollDown() {
		gsap.to(window, { duration: 1, scrollTo: secondBlockRef.current, ease: 'power4.out' });
	}

	const { heroTitle, heroSubtitle, canHelpTitle, canHelpItem, imagesGrid } = data.allContentfulHomePage.nodes[0]

	let canHelpItems = []
	let obj = {}
	for (let i = 0; i < canHelpItem.length; i++) {
		const item = canHelpItem[i]
		if (item.key === 'title') {
			obj.title = item.value
		} else if (item.key === 'text') {
			obj.text = item.value
			canHelpItems.push(obj)
			obj = {}
		}
	}

	const workRef = useRef()

	useEffect(() => {
		const workList = workRef.current;
		const work = workList.querySelectorAll('.work');

		let workImage = '';
		let workImageBounding = '';
		let workImageWrap = '';

		if (window.matchMedia('(min-width: 1280px)').matches) {
			work.forEach(item => {
				item.addEventListener('mouseenter', workEnter)
				item.addEventListener('mousemove', workMove)
				item.addEventListener('mouseleave', workLeave)
			})

			function workEnter(e) {
				workImage = e.currentTarget.querySelector('.work-image');
				workImageBounding = workImage.getBoundingClientRect();
				workImageWrap = e.currentTarget.querySelector('.work-image-wrap');

				gsap.set(workImage, {
					left: (e.clientX - (workImageBounding.width / 2)),
					top: (e.clientY - (workImageBounding.height / 2)),
				});

				workImage.classList.remove('invisible')
				workImageWrap.classList.add('shown')
			}

			function workMove(e) {
				gsap.to(e.currentTarget.querySelector('.work-image'), 1.5, {
					left: (e.clientX - (workImageBounding.width / 2)),
					top: (e.clientY - (workImageBounding.height / 2)),
					ease: 'Power4.easeOut'
				});
			}

			function workLeave(e) {
				e.currentTarget.querySelector('.work-image').classList.add('invisible')
				e.currentTarget.querySelector('.work-image-wrap').classList.remove('shown')
			}
		}

	}, [location])

	useEffect(() => {
		const firstGrid = document.querySelector('.last-work-grid');
		const secondGrid = document.querySelector('.last-work-grid-second');
		const workGrid = document.querySelector('.work-grid');
		gsap.to(firstGrid, {
			scrollTrigger: {
				trigger: workGrid,
				start: "top bottom",
				end: "bottom top",
				scrub: true
			},
			xPercent: -8,
			ease: 'none',
		});
		gsap.to(secondGrid, {
			scrollTrigger: {
				trigger: workGrid,
				start: "top bottom",
				end: "bottom top",
				scrub: true
			},
			xPercent: 8,
			ease: 'none',
		});
	}, [])


	return (
		<Layout seo={seo} pageProps={props}>
			<section
				className='hero relative bg-no-repeat bg-left-top md:bg-left-bottom bg-cover'
				style={{
					backgroundImage: `url('${heroBg}')`,
				}}>

				<div className="container">
					<div className="hero__inner relative pt-24 lg:pt-32 pb-16 lg:pb-16 flex flex-col md:flex-row">

						<div className='md:w-8/12 lg:w-1/2 xl:w-5/12 xl:max-w-screen-sm 2xl:max-w-screen-md'>

							<Link
								to='/'
								className="mb-8 group inline-flex items-center leading-none text-sm p-3 -mx-3 pr-4 bg-gray-50/10 hover:bg-gray-100/90 border dark:border-none dark:bg-gray-500/10 dark:hover:bg-gray-200/10 rounded-full backdrop-blur-sm transition-colors duration-500 cursor-pointer">
								<span className='bg-green-400 py-2 px-2.5 mr-3 text-center shrink-0 inline-block text-black uppercase rounded-full text-xs leading-none'>{intl.formatMessage({ id: "work" })}</span>
								<span className='text-ellipsis sm:w-64 sm:whitespace-nowrap overflow-hidden mr-1.5'>Dentalex - Курси для сучасних стоматологів</span>
								<BsArrowRightShort className='button-icon' />
							</Link>

							<h1 key='heroTitle' className='text-gradient-animation bg-gradient-to-r from-cobalt-400 to-purple-500 text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl mb-6 xl:mb-8 font-bold'>{heroTitle}</h1>
							<p className='text-md sm:text-lg lg:text-xl xl:w-9/12 leading-normal text-gray-700 dark:text-zinc-300'>{heroSubtitle.heroSubtitle}</p>

							<Link
								to='/contact'
								data-strenght={50}
								data-text-strenght={30}
								className="group button magnetic mt-12">
								<span className="magnetic-text flex">
									<span>{intl.formatMessage({ id: "get_in_touch" })}</span>
									<BsArrowRightShort className='button-icon' />
								</span>
							</Link>

							<div className='hidden md:block -mb-3'>
								<button
									onClick={scrollDown}
									className="group inline-flex items-center py-3.5 px-7 mt-10 -ml-7">
									<BsArrowDown className='animate-bounce text-2xl ml-0 mr-3' />
									<span>{intl.formatMessage({ id: "scroll_down" })}</span>
								</button>
							</div>

						</div>

						<div className="relative block md:pl-16 pt-10 md:pt-16 lg:pt-8 xl:pt-20 xl:pl-40 md:w-1/2">
							<div className="absolute w-full h-full inset-0 flex">
								<svg viewBox="0 0 165 171" className="text-cobalt-500 dark:text-cobalt-700 max-w-2xl m-auto mr-0 w-full max-h-full h-auto block">
									<path d="M146.184 147.872C124.941 172.12 103.697 176.948 82.4531 162.356C61.2094 147.765 37.9271 121.585 12.6062 83.8188C-12.7146 46.0521 0.804158 19.9802 53.1625 5.60312C105.521 -8.77396 139.425 5.28125 154.875 47.7687C170.325 90.2562 167.428 123.624 146.184 147.872Z" fill="currentColor" />
								</svg>
							</div>
							<div className="h-96 relative">
								{data.bestWork.nodes.slice(0, 4).map((work, index) => {
									const ind = index + 1
									return (
										<Link
											to={`/${work.path}`}
											key={work.id}
											className={`hero-image block rounded-sm overflow-hidden group ${(ind % 2) ? 'w-36 lg:w-44 xl:w-60' : 'w-60 lg:w-72 xl:w-96'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
											<div className="flex items-center justify-center absolute w-full h-full inset-0 z-10 text-white text-3xl bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
												<BsEye className='scale-0 group-hover:scale-100 transition-transform duration-500' />
											</div>
											<GatsbyImage
												image={(ind % 2) ? getImage(work.previewImageMobile) : getImage(work.previewImage)}
												alt={(ind % 2) ? work.previewImageMobile.title : work.previewImage.title}
												className='bg-gray-200/20 backdrop-blur-md'
												imgClassName='object-top'
											/>
										</Link>
									)
								})}
							</div>
							<div className='md:hidden relative -mb-3'>
								<button
									onClick={scrollDown}
									className="group inline-flex items-center py-3.5 px-7 mt-10 -ml-7">
									<BsArrowDown className='animate-bounce text-3xl ml-0 mr-3' />
									<span>{intl.formatMessage({ id: "scroll_down" })}</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute right-4 bottom-16 sm:right-10  lg:right-12 lg:bottom-16 flex flex-row md:flex-row xl:flex-col">
					{socialMenuItems.map((item, index) => (
						<a
							href={item.url}
							className='p-1.5 text-2xl 2xl:text-3xl inline-block magnetic hover:text-cobalt-50 hover:bg-cobalt-500 rounded-full transition-colors'
							data-strength='20'
							data-strength-text='10'
							key={`headerSocialItems-${index}`}
							target="_blank"
							rel="noreferrer"
							title={item.name}>
							<span className='magnetic-text block'>{item.icon}</span>
						</a>
					))}
				</div>
			</section>

			{/* second section */}

			<section
				ref={secondBlockRef}
				className='py-12 md:pt-24 xl:pt-32 md:pb-16 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-zinc-800 dark:to-zinc-900'>
				<div className="container">
					<div>
						<h3 className='text-3xl md:text-5xl mb-10 md:mb-20'>
							{canHelpTitle}
							<span className='anim-dot'>.</span>
							<span className='anim-dot'>.</span>
							<span className='anim-dot'>.</span>
						</h3>

						<ul className='md:flex md:-ml-8 xl:-ml-20'>
							{canHelpItems.map((item, index) => {
								return (
									<FadeInAnimation
										elem='li'
										direction='up'
										delay={index * 0.15}
										delayFrom={768}
										key={`canHelpItem-${index}`}
										className='mb-10 md:pl-8 md:mb-0 xl:pl-20 md:w-1/3'>
										<div className='text-zinc-400 dark:text-slate-600 text-md hidden md:block'>0{index + 1}</div>
										<hr className='mt-4 mb-8 md:mb-12 border-zinc-400 dark:border-zinc-600' />
										<h4 className='text-2xl mb-4 md:mb-8 md:text-3xl xl:text-4xl'>{index === 2 ? <BsStars className='inline mr-2' /> : ''}{item.title}</h4>
										<p className='text-base xl:text-lg text-slate-700 dark:text-zinc-300'>{item.text}</p>
									</FadeInAnimation>
								)
							})}
						</ul>
					</div>
				</div>
			</section>

			{/* recent works */}

			<section className='bg-slate-50 dark:bg-zinc-900'>
				<div className="container">
					<div className='py-8 md:py-28 md:pt-20' >
						<h2 className='text-3xl md:text-5xl mb-8 md:mb-12 xl:mb-20'>{intl.formatMessage({ id: "recent_work" })}</h2>
						<ul
							ref={workRef}
							className='flex flex-wrap md:-ml-8 xl:-mx-16'>
							{data.allWork.nodes.map((work, index) => {
								const services = work.services.join(" & ");
								return (
									<li key={work.id} className={`md:w-1/2 xl:w-full md:pl-8 xl:px-16 border-slate-500 dark:border-zinc-500 ${(index > 1) ? 'hidden xl:block' : ''} xl:border-b ${(index === 0) ? 'xl:border-t' : ''}`}>
										<Link
											to={`/${work.path}`}
											className='work group block py-2 pb-12 xl:py-16'>
											<div
												className="work-image w-full xl:max-w-xl 2xl:max-w-2xl xl:invisible xl:fixed z-10 xl:pointer-events-none">
												<GatsbyImage
													className='work-image-wrap w-full relative transition-all'
													image={getImage(work.previewImage)}
													alt={work.previewImage.title}
												/>
											</div>
											<div className='xl:flex items-center justify-between'>
												<h3
													style={{ willChange: 'opacity, transform' }}
													className='inline-block text-2xl md:text-3xl lg:text-4xl xl:text-7xl pt-6 xl:pt-0 transition-all group-hover:-skew-x-12 xl:group-hover:translate-x-8 duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
												<hr className='mt-3 mb-3 md:mb-6 xl:mb-0 xl:hidden border-zinc-400 dark:border-slate-600' />
												<span
													style={{ willChange: 'opacity, transform' }}
													className='inline-block xl:text-lg text-slate-700 dark:text-zinc-400 transition-all group-hover:-skew-x-12 xl:group-hover:-translate-x-8 duration-500 xl:group-hover:opacity-50 translate-z-0'>
													{services}
												</span>
											</div>
										</Link>
									</li>
								)
							})}
						</ul>
						<div className='flex justify-center pt-2 md:pt-8 xl:pt-20'>
							<Link to='/work' className='group button-outline magnetic'
								data-strenght='50'
								data-text-strenght='20'>
								<span className="magnetic-text flex">
									<span className='relative'>{intl.formatMessage({ id: "more_work" })}<sup>{data.allWork.totalCount}</sup></span>
									<BsArrowRightShort className='button-icon' />
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* work grid */}

			<div className='work-grid hidden sm:block relative py-6 lg:py-16'>
				<div style={{ width: '120%', marginLeft: '-2%' }}>
					<div className="flex last-work-grid" style={{ willChange: 'transform' }}>
						{imagesGrid.map((image, index) => {
							return (
								<div key={image.id} className='p-2 md:p-3 lg:p-4 w-1/3'>
									<GatsbyImage
										className='w-full h-full relative transition-all'
										image={getImage(image.gatsbyImageData)}
										alt={image.description}
									/>
								</div>
							)
						})}
					</div>
				</div>
				<div style={{ width: '120%', marginLeft: '-18%' }}>
					<div className="flex justify-end last-work-grid-second" style={{ willChange: 'transform' }}>
						{imagesGrid.map((image, index) => {
							return (
								<div key={image.id} className='p-2 md:p-3 lg:p-4 w-1/3'>
									<GatsbyImage
										className='w-full h-full relative transition-all'
										image={getImage(image.gatsbyImageData)}
										alt={image.description}
									/>
								</div>
							)
						})}
					</div>
				</div>

			</div>

		</Layout >
	)
}

export const query = graphql`
	query indexPageQuery($language: String) {
		allContentfulHomePage(filter: {node_locale: {eq: $language}}) {
			nodes {
				id
				heroTitle
				node_locale
				heroSubtitle {
					id
					heroSubtitle
				}
				canHelpTitle
				canHelpItem {
					value
					key
					id
				}
				imagesGrid {
					id
					gatsbyImageData
					description
				}
			}
		}
		allWork: allContentfulSingleWork(filter: { node_locale: { eq: $language } }) {
			totalCount
			nodes {
				id
				node_locale
				path
				workName
				services
				previewImage {
					gatsbyImageData(aspectRatio: 1.5)
					title
				}
				previewImageMobile {
					gatsbyImageData(aspectRatio: 0.66)
					title
				}
			}
		}
		bestWork: allContentfulSingleWork(
			filter: { node_locale: { eq: $language }, path: { in: ["ericpapp", "onlycam", "qclinic", "dentalex"] } },
			sort: {fields: path, order: DESC}) {
			nodes {
				id
				node_locale
				path
				workName
				services
				previewImage {
					gatsbyImageData(aspectRatio: 1.5)
					title
				}
				previewImageMobile {
					gatsbyImageData(aspectRatio: 0.66)
					title
				}
			}
		}
	}
`

export default IndexPage