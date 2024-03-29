import React, { useEffect, useRef } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";
import FadeInAnimation from '../components/FadeInAnimation'
import { BsArrowRightShort } from 'react-icons/bs'
import WhatMedia from '../components/what-media'

const SingleWork = ({ data, pageContext }) => {
	const intl = useIntl()
	const lang = intl.locale
	const nextWorkRef = useRef();
	const {
		workName,
		services,
		seoDescription,
		credits,
		location,
		date,
		liveLink,
		imacMedia,
		macbookMedia,
		ipadMedia,
		iphoneMedia,
		heroImage,
		workLogotype,
		firstMediaDividerText,
		firstMediaDivider,
		secondMediaDividerText,
		secondMediaDivider,
		blockOrder
	} = data.contentfulSingleWork

	const seo = {
		title: workName,
		description: seoDescription && seoDescription.seoDescription,
		image: heroImage && heroImage.url
	}

	const nextWork = pageContext.next.node

	/* block order - [iMac, MacBook, iPad, iPhone, First Media, Second Media] */
	const order = {
		imac: blockOrder[0],
		macbook: blockOrder[1],
		ipad: blockOrder[2],
		iphone: blockOrder[3],
		firstMedia: blockOrder[4],
		secondMedia: blockOrder[5],
	}
	const concatServices = services.join(" & ");
	const year = new Date(date).getFullYear()

	gsap.registerPlugin(ScrollTrigger)
	useEffect(() => {

		const parallax = document.querySelectorAll('.parallax');
		if (parallax.length !== 0) {
			parallax.forEach(item => {
				let dataParallax = item.getAttribute('data-parallax') || 10;
				const parallaxItem = item.querySelector('.parallax-item');
				gsap.set(parallaxItem, { yPercent: -dataParallax, height: `${100 + (dataParallax * 2)}%` })
				gsap.to(parallaxItem, {
					scrollTrigger: {
						trigger: parallaxItem,
						start: "top bottom",
						end: "bottom top",
						scrub: true
					},
					yPercent: dataParallax,
					ease: 'none',
				});
			});
		}


		const deviceIphone = document.querySelectorAll('.device-iphone');
		const iphonesBlock = document.querySelectorAll('.iphones-block');
		if (deviceIphone.length !== 0) {
			gsap.set(deviceIphone[0], { yPercent: -15 })
			gsap.to(deviceIphone[0], {
				scrollTrigger: {
					trigger: iphonesBlock,
					start: "top bottom",
					end: "bottom top",
					scrub: true
				},
				yPercent: 15,
				ease: 'none',
			});

			gsap.set(deviceIphone[2], { yPercent: 15 })
			gsap.to(deviceIphone[2], {
				scrollTrigger: {
					trigger: iphonesBlock,
					start: "top bottom",
					end: "bottom top",
					scrub: true
				},
				yPercent: -15,
				ease: 'none',
			});
		}


		const nextWorkImage = nextWorkRef.current.querySelector('.next-work-image')
		if (nextWorkImage) {
			gsap.from(nextWorkImage, {
				scrollTrigger: {
					trigger: nextWorkRef.current,
					start: "40% bottom",
					end: "120% bottom",
					scrub: 1
				},
				yPercent: 70,
				ease: 'none',
			});
		}

	}, [])

	return (
		<Layout seo={seo}>
			<div>
				<div className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-28 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800'>
					<div className="container">
						<div className="relative max-w-5xl mx-auto mb-10 ">
							{workName && <h1 className='h1 mb-6 md:mb-16 xl:text-8xl'>{workName}</h1>}

							<FadeInAnimation elem='div' direction='scale' distance='0' className='absolute -right-4 bottom-2 md:bottom-28 lg:right-0 lg:bottom-36 z-10'>
								<a href={liveLink}
									target='_blank'
									rel='noreferrer'
									data-strenght={50}
									data-text-strenght={30}
									className="magnetic button p-2 flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 rounded-full">
									<span className='magnetic-text flex items-center'>
										<span>{intl.formatMessage({id: "live_site"})}</span>
										<BsArrowRightShort className='text-2xl -rotate-45' />
									</span>
								</a>
							</FadeInAnimation>

							<div className="work-info flex flex-wrap mb-6 lg:mb-10 md:-mx-4 lg:-mx-8">

								{concatServices && <FadeInAnimation className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
									<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "services" })}</h5>
									<hr className='mt-2 mb-4 border-zinc-400' />
									<p>{concatServices}</p>
								</FadeInAnimation>}

								{credits && <FadeInAnimation delay={0.15} delayFrom={0} className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
									<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "credits" })}</h5>
									<hr className='mt-2 mb-4 border-zinc-400' />
									<div><p>{credits}</p></div>
								</FadeInAnimation>}

								{credits && location && <FadeInAnimation delay={0.15} delayFrom={0} className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
									<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "location" })} & {intl.formatMessage({ id: "year" })}</h5>
									<hr className='mt-2 mb-4 border-zinc-400' />
									<p>{location} © {year}</p>
								</FadeInAnimation>}

								{!credits && location && <FadeInAnimation delay={0.15} delayFrom={0} className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
									<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "location" })}</h5>
									<hr className='mt-2 mb-4 border-zinc-400' />
									<div><p>{location}</p></div>
								</FadeInAnimation>}

								{!credits && year && <FadeInAnimation delay={0.3} delayFrom={0} className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
									<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "year" })}</h5>
									<hr className='mt-2 mb-4 border-zinc-400' />
									<div><p>{year}</p></div>
								</FadeInAnimation>}

							</div>
						</div>

						{heroImage && <div className='parallax relative overflow-hidden -mx-8 lg:mx-0' data-parallax={10}>
							<div className="relative">
								<GatsbyImage
									className='parallax-item aspect-[4/3] lg:aspect-[5/3] w-full h-auto'
									image={getImage(heroImage)}
									alt={heroImage.title}
								/>
								{workLogotype && <img
									className='absolute inset-0 aspect-[4/3] lg:aspect-[5/3] w-full h-auto'
									src={workLogotype.url}
									alt={workLogotype.title} />}
							</div>
						</div>}
					</div>
				</div>

				<div className="content overflow-hidden flex flex-col">

					{macbookMedia && <div className={`order-${order.macbook} py-10 md:py-16 lg:py-28 bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900`}>
						<div className='block-device device-mbp'>
							<div className="container max-w-6xl">
								<div className='relative'>
									<div className="block-device__content">
										<WhatMedia clazzName='overlay' media={macbookMedia} />
									</div>
									<div className="block-device__device">
										<div className='overlay'></div>
									</div>
								</div>
							</div>
						</div>
					</div>}

					{iphoneMedia && <div className={`order-${order.iphone} py-10 md:py-20 lg:py-40 iphones-block bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900`}>
						<div className="container flex px-4">
							{iphoneMedia.map((item, index) => {
								return (
									<div key={item.title + index} className='w-1/3 flex justify-center'>
										<div className='block-device device-iphone w-10/12 md:w-8/12'>
											<div className='relative'>
												<div className="block-device__content">
													<WhatMedia clazzName='overlay' media={item} />
												</div>
												<div className="block-device__device">
													<div className='overlay'></div>
												</div>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>}

					{firstMediaDivider &&
						<div data-parallax={10} className={`order-${order.firstMedia} parallax relative overflow-hidden -mx-8 lg:mx-0`}>
							<div className='relative aspect-[5/4] lg:aspect-[5/3] w-full h-auto'>
								<WhatMedia clazzName='parallax-item overlay object-center'
									media={firstMediaDivider} />
								{firstMediaDividerText &&
									<div className='overlay flex justify-center items-center'>
										<div className="container w-auto max-w-screen-md">
											<p className='text-white text-center text-3xl lg:text-5xl'>{firstMediaDividerText}</p>
										</div>
									</div>}
							</div>
						</div>}

					{imacMedia && <div className={`order-${order.imac} py-10 md:py-16 lg:py-28 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800`}>
						<div className='block-device device-imac'>
							<div className="container max-w-5xl">
								<div className='relative'>
									<div className="block-device__content">
										<WhatMedia clazzName='overlay' media={imacMedia} />
									</div>
									<div className="block-device__device">
										<div className='overlay'></div>
									</div>
								</div>
							</div>
						</div>
					</div>}

					{secondMediaDivider &&
						<div data-parallax={10} className={`order-${order.secondMedia} parallax relative overflow-hidden -mx-8 lg:mx-0`}>
							<div className='relative aspect-[5/4] lg:aspect-[5/3] w-full h-auto'>
								<WhatMedia clazzName='parallax-item overlay object-center'
									media={secondMediaDivider} />
								{secondMediaDividerText &&
									<div className='overlay flex justify-center items-center'>
										<div className="container w-auto max-w-screen-md">
											<p className='text-white text-center text-3xl lg:text-5xl'>{secondMediaDividerText}</p>
										</div>
									</div>}
							</div>
						</div>}

					{ipadMedia && <div className={`order-${order.ipad} py-10 md:py-16 lg:py-28`}>
						<div className='block-device device-ipad'>
							<div className="container max-w-5xl">
								<div className='relative'>
									<div className="block-device__content">
										<WhatMedia clazzName='overlay' media={ipadMedia} />
									</div>
									<div className="block-device__device">
										<div className='overlay'></div>
									</div>
								</div>
							</div>
						</div>
					</div>}

				</div>
			</div>
			<div className='bg-zinc-900 text-white text-center pt-10 pb-4 md:pt-16 md:pb-8 xl:pt-24'
				ref={nextWorkRef}>
				<div className="container">
					<Link className='group max-w-screen-sm mx-auto relative block'
						to={'/' + lang + '/work/' + nextWork.path}>
						<div className='overflow-hidden flex flex-col items-center'>
							<div>
								<p className='mb-2 xl:mb-6'>{intl.formatMessage({ id: "next_case" })}</p>
								<h2 className='group-hover:opacity-50 text-5xl xl:text-8xl xl:-mb-20 transition-opacity duration-700' >{nextWork.workName}</h2>
							</div>
							<div
								className='next-work-image w-10/12 max-w-sm'
								style={{ willChange: 'transform' }}
							>
								<GatsbyImage
									image={getImage(nextWork.previewImage.gatsbyImageData)}
									alt={nextWork.previewImage.title}
									className='xl:group-hover:translate-y-10 xl:translate-y-28 transition-transform duration-500 ease-in-out'
								/>
							</div>
						</div>
						<hr className='w-full mb-8 border-zinc-600' />
					</Link>
					<Link to={`/${lang}/work`}
						className='magnetic button-outline border-zinc-600 justify-center w-full sm:w-auto'>
						<span className='magnetic-text relative flex'>
							{intl.formatMessage({ id: "all_work" })}
							<sup>{data.allContentfulSingleWork.totalCount / 2}</sup>
						</span>
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query singleWorkQuery($slug: String, $language: String) {
		allContentfulSingleWork {
			totalCount
		}
		contentfulSingleWork(path: {eq: $slug}, node_locale: {eq: $language}) {
			path
			node_locale
			workName
			services
			credits
			location
			date
			liveLink
			seoDescription {
				seoDescription
			}
			
			heroImage {
				url
				title
				gatsbyImageData
			}
			workLogotype {
				url
				title
			}
			imacMedia {
				url
				title
				mimeType
			}
			macbookMedia {
				url
				title
				mimeType
			}
			ipadMedia {
				url
				title
				mimeType
			}
			iphoneMedia {
				url
				title
				mimeType
			}
			firstMediaDividerText
			firstMediaDivider {
				url
				title
				mimeType
			}
			secondMediaDividerText
			secondMediaDivider {
				url
				title
				mimeType
			}
			blockOrder
		}
	}
`;

export default SingleWork