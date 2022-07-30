import React, { useRef, useEffect } from "react"
import { graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import heroBg from '../images/hero-bg.svg'
import { BsArrowRightShort, BsArrowDown, BsEye, BsStars } from 'react-icons/bs'
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import FadeInAnimation from '../components/FadeInAnimation'
import getSocialItems from '../utils/getSocialItems'
import LetsWork from '../components/lets-work'
import SingleWork from '../components/work-component'
import dateFormat from '../utils/dateFormat'
import declOfNum from '../utils/declOfNum'

const IndexPage = ({ data }) => {
	const secondBlockRef = useRef()
	const intl = useIntl()
	const lang = intl.locale
	const social = getSocialItems(data.allContentfulSocialLinks.nodes[0])
	const lastPost = data.allContentfulArticle.nodes[0]
	const posts = data.allContentfulArticle.nodes

	const {
		homepageTitle,
		heroTitle,
		heroSubtitle,
		canHelpTitle,
		canHelpFirstItemTitle,
		canHelpFirstItemText,
		canHelpSecondItemTitle,
		canHelpSecondItemText,
		canHelpThirdItemTitle,
		canHelpThirdItemText,
		imagesGrid,
		imagesSecondGrid
	} = data.allContentfulHomePage.nodes[0]

	const seo = {
		title: homepageTitle,
	}
	gsap.registerPlugin(ScrollToPlugin);
	gsap.registerPlugin(ScrollTrigger)
	function scrollDown() {
		gsap.to(window, {
			duration: 1,
			scrollTo: secondBlockRef.current,
			ease: 'power4.out'
		});
	}

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
		<Layout seo={seo}>
			<section
				className='hero overflow-hidden relative bg-no-repeat bg-left-top md:bg-left-bottom bg-cover'
				style={{
					backgroundImage: `url('${heroBg}')`,
				}}>

				<div className="container">
					<div className="hero__inner relative pt-24 lg:pt-32 pb-16 lg:pb-16 flex flex-col md:flex-row">

						<div className='md:w-8/12 lg:w-1/2 xl:w-5/12 xl:max-w-screen-sm 2xl:max-w-screen-md'>

							<Link
								to={`/${lang}/articles/${lastPost.path}`}
								className="mb-4 md:mb-8 group inline-flex items-center leading-none text-sm p-3 -mx-3 pr-4 bg-gray-50/10 hover:bg-gray-100/90 border dark:border-none dark:bg-gray-500/10 dark:hover:bg-gray-200/10 rounded-full backdrop-blur-sm transition-colors duration-500 cursor-pointer">
								<span className='bg-green-400 py-2 px-2.5 mr-3 text-center shrink-0 inline-block text-black uppercase rounded-full text-xs leading-none'>
									{intl.formatMessage({ id: "post" })}
								</span>
								<span className='text-ellipsis sm:w-64 sm:whitespace-nowrap overflow-hidden mr-1.5'>{lastPost.title}</span>
								<BsArrowRightShort className='button-icon' />
							</Link>

							<h1 key='heroTitle' className='hero-title text-gradient-animation bg-gradient-to-r from-cobalt-400 to-purple-500 text-5xl sm:text-5xl xl:text-6xl 2xl:text-7xl mb-6 xl:mb-8 font-bold'>
								{heroTitle}
							</h1>
							<div
								className='text-lg sm:text-lg lg:text-xl xl:w-9/12 leading-normal text-gray-700 dark:text-zinc-300'
								dangerouslySetInnerHTML={{ __html: heroSubtitle.childMarkdownRemark.html }}></div>
							<Link
								to={'/' + lang + '/contact'}
								data-strenght={50}
								data-text-strenght={30}
								className="group button magnetic mt-6 md:mt-12">
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
								<svg viewBox="0 0 165 171" className='text-cobalt-500 dark:text-cobalt-700 max-w-2xl m-auto mr-0 w-full max-h-full h-auto block'>
									<path d="M146.184 147.872C124.941 172.12 103.697 176.948 82.4531 162.356C61.2094 147.765 37.9271 121.585 12.6062 83.8188C-12.7146 46.0521 0.804158 19.9802 53.1625 5.60312C105.521 -8.77396 139.425 5.28125 154.875 47.7687C170.325 90.2562 167.428 123.624 146.184 147.872Z" fill="currentColor" />
								</svg>
							</div>
							<div className="h-96 relative">
								{data.allWork.nodes.filter(work => work.isBestWork === true)
									.map((work, index) => {
										const ind = index + 1
										return (
											<Link
												to={`/${lang}/work/${work.path}`}
												key={work.id}
												className={`hero-image block group ${(ind % 2) ? 'w-36 lg:w-44 xl:w-60' : 'w-60 lg:w-72 xl:w-96'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
												<div data-strenght='100' className='magnetic'>
													<div className="flex items-center justify-center absolute w-full h-full inset-0 z-10 rounded-sm text-white text-3xl bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
														<BsEye className='scale-0 group-hover:scale-100 transition-transform duration-500' />
													</div>
													<GatsbyImage
														image={(ind % 2) ? getImage(work.previewImageMobile) : getImage(work.previewImage)}
														alt={(ind % 2) ? work.previewImageMobile.title : work.previewImage.title}
														imgClassName='object-top rounded-sm'
													/>
												</div>
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
					{social.map((item, index) => (
						<a
							href={item.url}
							className='p-1.5 text-2xl 2xl:text-3xl inline-block magnetic hover:text-cobalt-50 hover:bg-cobalt-500 rounded-full transition-colors'
							data-strenght='20'
							data-strenght-text='10'
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
				className='pt-12 md:pt-24 xl:pt-32 md:pb-16 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-zinc-800 dark:to-zinc-900'>
				<div className="container">
					<div>
						<h2 className='h2 mb-10'>
							{canHelpTitle}
							<span className='anim-dot'>.</span>
							<span className='anim-dot'>.</span>
							<span className='anim-dot'>.</span>
						</h2>

						<ul className='md:flex md:-ml-8 xl:-ml-20'>
							<FadeInAnimation
								elem='li'
								direction='up'
								delay={0}
								delayFrom={768}
								className='can-help-item'>
								<div className='can-help-num'>01</div>
								<hr className='can-help-hr' />
								<h3 className='h4 can-help-title'>{canHelpFirstItemTitle}</h3>
								<div
									className='can-help-text'
									dangerouslySetInnerHTML={{ __html: canHelpFirstItemText.childMarkdownRemark.html }}></div>
							</FadeInAnimation>
							<FadeInAnimation
								elem='li'
								direction='up'
								delay={0.15}
								delayFrom={768}
								className='can-help-item'>
								<div className='can-help-num'>02</div>
								<hr className='can-help-hr' />
								<h3 className='h4 can-help-title'>{canHelpSecondItemTitle}</h3>
								<div
									className='can-help-text'
									dangerouslySetInnerHTML={{ __html: canHelpSecondItemText.childMarkdownRemark.html }}></div>
							</FadeInAnimation>
							<FadeInAnimation
								elem='li'
								direction='up'
								delay={0.3}
								delayFrom={768}
								className='can-help-item'>
								<div className='can-help-num'>03</div>
								<hr className='can-help-hr' />
								<h3 className='h4 can-help-title'><BsStars className='inline mr-2' />{canHelpThirdItemTitle}</h3>
								<div
									className='can-help-text'
									dangerouslySetInnerHTML={{ __html: canHelpThirdItemText.childMarkdownRemark.html }}></div>
							</FadeInAnimation>
						</ul>
					</div>
				</div>
			</section>

			{/* recent works */}

			<section className='bg-slate-50 dark:bg-zinc-900'>
				<div className="container">
					<div className='py-8 pb-16 md:py-16' >
						<h2 className='h2'>{intl.formatMessage({ id: "recent_work" })}</h2>
						<ul
							className='flex flex-wrap md:-mx-4 xl:-mx-16 2xl:-mx-24'>
							{data.allWork.nodes.slice(0, 4).map((work) => {
								const services = work.services.join(" & ");
								return (
									<SingleWork
										key={work.id}
										work={work}
										linkClasses={`xl:py-16 xl:px-16 2xl:px-24`}
										clazzName={`md:w-1/2 md:px-4 xl:px-0 xl:w-full`}
									>
										<div
											className="work-image w-full xl:max-w-xl 2xl:max-w-2xl xl:invisible xl:fixed z-10 xl:pointer-events-none">
											<GatsbyImage
												image={getImage(work.previewImage.gatsbyImageData)}
												alt={work.previewImage.title}
												className='work-image-wrap w-full relative transition-all aspect-[8/5] xl:aspect-auto object-cover'
											/>
										</div>
										<div className='xl:flex items-center justify-between'>
											<h3
												style={{ willChange: 'opacity, transform' }}
												className='inline-block text-2xl md:text-3xl lg:text-4xl xl:text-7xl pt-6 mb-0 xl:pt-0 transition-all group-hover:-skew-x-12 xl:group-hover:translate-x-8 duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
											<hr className='mt-3 mb-3 md:mb-6 xl:mb-0 xl:hidden border-zinc-400 dark:border-slate-600' />
											<span
												style={{ willChange: 'opacity, transform' }}
												className='inline-block xl:text-lg text-slate-700 dark:text-zinc-400 transition-all group-hover:-skew-x-12 xl:group-hover:-translate-x-8 duration-500 xl:group-hover:opacity-50 translate-z-0'>
												{services}
											</span>
										</div>
									</SingleWork>
								)
							})}
							<hr className='hidden xl:block w-full border-slate-500 dark:border-zinc-500' />
						</ul>
						<div className='flex justify-center pt-2 md:pt-8 xl:pt-20'>
							<Link to={'/' + lang + '/work'} className='group button-outline magnetic'
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

			<div className='work-grid overflow-hidden hidden sm:block relative py-6 lg:py-16'>
				<div style={{ width: '120%', marginLeft: '-2%' }}>
					<div className="flex last-work-grid" style={{ willChange: 'transform' }}>
						{imagesGrid.map((item, index) => {
							return (
								<div key={item.id} className={`${index === 0 ? 'hidden lg:block' : ''} p-2 md:p-3 lg:p-4 w-1/3 aspect-[8/5]`}>
									{item.gatsbyImageData ?
										<GatsbyImage
											className='item-loading w-full h-full relative transition-all'
											image={getImage(item.gatsbyImageData)}
											alt={item.description}
										/> :
										<video autoPlay loop muted playsInline
											className='item-loading w-full h-full relative transition-all'
											src={item.url}></video>}
								</div>
							)
						})}
					</div>
				</div>

				<div style={{ width: '120%', marginLeft: '-18%' }}>
					<div className="flex last-work-grid-second" style={{ willChange: 'transform' }}>
						{imagesSecondGrid.map((item, index) => {
							return (
								<div key={item.id} className={`${index === 0 ? 'hidden lg:block' : ''} p-2 md:p-3 lg:p-4 w-1/3 aspect-[8/5]`}>
									{item.gatsbyImageData ?
										<GatsbyImage
											className='item-loading w-full h-full relative transition-all'
											image={getImage(item.gatsbyImageData)}
											alt={item.description}
										/> :
										<video autoPlay loop muted playsInline
											className='item-loading w-full h-full relative transition-all'
											src={item.url}></video>}
								</div>
							)
						})}
					</div>
				</div>
			</div>

			<div className='py-6 pb-10 lg:py-16 lg:pb-20 overflow-hidden'>
				<div className='container max-w-screen-lg'>
					<div className='relative'>
						<h2 className='h2 mb-10'>{intl.formatMessage({ id: "recent_articles" })}</h2>
						<ul className='flex flex-wrap -mx-8 lg:-mx-12 xl:-mx-20'>
							{posts.map((item, index) => {
								const formated = dateFormat(item.date, lang)
								const { timeToRead } = item.contentMd.childMarkdownRemark
								const enRead = `${lang === 'en' ? formated.enDate : formated.ukDate} • ${timeToRead} min read`
								const ukRead = `${lang === 'en' ? formated.enDate : formated.ukDate} • читати ${timeToRead} ${declOfNum(timeToRead, ['хвилину', 'хвилини', 'хвилин'])}`
								return (
									<FadeInAnimation
										elem='li'
										direction='up'
										delay={(index % 2 === 0) ? index : (index * 0.15)}
										delayFrom={768}
										key={item.id}
										className='block w-full md:w-1/2 mb-8 md:mb-12 px-4'>
										<article className='relative overflow-hidden p-4 lg:p-6 xl:p-8 bg-white dark:shadow-md dark:bg-slate-800 h-full rounded-md lg:rounded-lg'>
											<Link className='group' to={`/${lang}/articles/${item.path}`}>
												<div className='flex items-center text-sm md:text-base text-zinc-500 dark:text-zinc-400'>
													<span>{lang === 'en' ? enRead : ukRead}</span>
												</div>
												<h2 className='h3 text-xl md:text-2xl font-medium mt-1 mb-3 leading-tight group-hover:text-cobalt-500 dark:group-hover:text-cobalt-400 transition-colors duration-500'>{item.title}</h2>
												<div className='md:text-lg text-zinc-600 dark:text-gray-300' dangerouslySetInnerHTML={{ __html: item.description.childMarkdownRemark.html }}></div>
												<div className='flex items-center mt-4 font-medium'>
													<span>{intl.formatMessage({ id: "read_more" })}</span>
													<BsArrowRightShort className='text-xl ml-1 group-hover:translate-x-1 transition-transform' />
												</div>
											</Link>

										</article>
									</FadeInAnimation>
								)
							})}
						</ul>
						<div className='flex justify-center pt-2 md:pt-8'>
							<Link to={`/${lang}/articles`} className='group button-outline magnetic'
								data-strenght='50'
								data-text-strenght='20'>
								<span className="magnetic-text flex">
									<span className='relative'>{intl.formatMessage({ id: "more_articles" })}<sup>{data.allContentfulArticle.totalCount}</sup></span>
									<BsArrowRightShort className='button-icon' />
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<LetsWork />

		</Layout >
	)
}

export const query = graphql`
	query indexPageQuery($language: String) {
		allContentfulSocialLinks(filter: {node_locale: {eq: $language}}) {
			nodes {
				telegramLink
				instagramLink
				githubLink
				facebookLink
			}
		}
		allContentfulArticle(
			filter: {node_locale: {eq: $language}} 
			limit: 2
			sort: {order: DESC, fields: date}
			) {
			totalCount
			nodes {
				id
				path
				title
				date
				node_locale
				contentMd {
					childMarkdownRemark {
						timeToRead
					}
				}
				description {
					childMarkdownRemark {
						html
						timeToRead
					}
				}
			}
		}
		allContentfulHomePage(filter: {node_locale: {eq: $language}}) {
			nodes {
				id
				homepageTitle
				heroTitle
				node_locale
				heroSubtitle {
					id
					heroSubtitle
					childMarkdownRemark {
						html
					}
				}
				canHelpTitle
				canHelpFirstItemTitle
				canHelpFirstItemText {
					childMarkdownRemark {
						html
					}
				}
				canHelpSecondItemTitle
				canHelpSecondItemText {
					childMarkdownRemark {
						html
					}
				}
				canHelpThirdItemTitle
				canHelpThirdItemText {
					childMarkdownRemark {
						html
					}
				}
				imagesGrid {
					id
					gatsbyImageData
					description
					url
				}
				imagesSecondGrid {
					id
					gatsbyImageData
					description
					url
				}
			}
		}
		allWork: allContentfulSingleWork(
			filter: { node_locale: {eq: $language} }
			sort: {fields: date, order: DESC}) {
			totalCount
			nodes {
				id
				node_locale
				path
				workName
				services
				isBestWork
				macbookMedia {
					url
					title
				}
				previewImage {
					gatsbyImageData
					title
					url
				}
				previewImageMobile {
					gatsbyImageData(aspectRatio: 0.625)
					title
				}
			}
		}
	}
`

export default IndexPage
