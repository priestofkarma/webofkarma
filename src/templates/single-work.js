import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";

const SingleWork = (props) => {
	const intl = useIntl()
	const { data } = props
	const { workName, services, workDescription, previewImage, credits, location, date, previewImageMobile, videoPreview } = data.contentfulSingleWork
	const concatServices = services.join(" & ");
	gsap.registerPlugin(ScrollTrigger)
	const year = new Date(date).getFullYear()

	useEffect(() => {
		const parallax = document.querySelectorAll('.parallax');
		parallax.forEach(item => {
			const parallaxItem = item.querySelector('.parallax-item');
			gsap.to(parallaxItem, {
				scrollTrigger: {
					trigger: item,
					start: "top bottom",
					end: "bottom top",
					scrub: 1
				},
				yPercent: 10,
				ease: 'none',
			});
		})

	}, [])

	return (
		<Layout pageProps={props}>
			<div className="pt-32 pb-20 lg:pt-48">
				<div className="container">
					<div className="work-head max-w-5xl mx-auto mb-10">
						{workName && <h1 className='h1 mb-6 md:mb-16 xl:text-8xl'>{workName}</h1>}
						<div className="work-info flex flex-wrap mb-6 lg:mb-10 md:-mx-4 lg:-mx-8">

							{concatServices && <div className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
								<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "services" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<p>{concatServices}</p>
							</div>}

							{credits && <div className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
								<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "credits" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<div><p>{credits}</p></div>
							</div>}

							{credits && location && <div className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
								<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "location" })} & {intl.formatMessage({ id: "year" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<p>{location} © {year}</p>
							</div>}

							{!credits && location && <div className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
								<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "location" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<div><p>{location}</p></div>
							</div>}

							{!credits && year && <div className='w-full md:w-1/3 md:px-4 lg:px-8 lg:text-lg mb-8'>
								<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "year" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<div><p>{year}</p></div>
							</div>}

						</div>
						{workDescription && <div className='text-lg leading-tight max-w-xl' dangerouslySetInnerHTML={{ __html: workDescription.childMarkdownRemark.html }} />}
					</div>
				</div>

				<div className="content py-4 md:py-8 lg:py-16 flex flex-col">

					{previewImage && <div className='parallax overflow-hidden entire-image mx-auto w-full'>
						<GatsbyImage
							className='parallax-item w-full h-auto'
							image={getImage(previewImage)}
							alt={previewImage.title}
						/>
					</div>}

					{videoPreview && <div className='mt-16 lg:mt-40 mx-auto px-8 w-full max-w-7xl'>
						<video autoPlay loop muted playsInline
							poster={previewImage.url}
							className='w-full relative transition-all'
							src={videoPreview.url}></video>
					</div>}


				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query singleWorkQuery($slug: String, $language: String) {
		contentfulSingleWork(path: {eq: $slug}, node_locale: {eq: $language}) {
			path
			node_locale
			workName
			services
			credits
			location
			date
			workDescription {
				childMarkdownRemark {
					html
				}
			}
			previewImage {
				gatsbyImageData(layout: FULL_WIDTH)
				title
			}
			previewImageMobile {
				gatsbyImageData(layout: FULL_WIDTH)
				title
			}
			videoPreview {
				url
			}
		}
	}
`;

export default SingleWork