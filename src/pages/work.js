import React from "react"
import { graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import { BsArrowRightShort } from 'react-icons/bs'
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

	return (
		<Layout seo={seo} pageProps={props}>

			<section className='pt-24 lg:pt-32 bg-slate-50 dark:bg-zinc-900'>
				<div className="container">
					<div className='py-8 pb-16 md:py-16' >
						<h2 className='h1'>{intl.formatMessage({ id: "recent_work" })}</h2>
						<ul
							className='flex flex-wrap md:-ml-8 xl:-mx-16'>
							{data.allWork.nodes.map((work, index) => {
								return (
									<SingleWork key={work.id} work={work} index={index} language={language} />
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

			<LetsWork />
		</Layout >
	)
}

export const query = graphql`
	query WorkPageQuery($language: String) {
		allWork: allContentfulSingleWork(filter: { node_locale: { eq: $language } } sort: {fields: date, order: DESC }) {
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
					file {
						fileName
						contentType
					}
				}
				previewImage {
					gatsbyImageData(aspectRatio: 1.6)
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

export default WorkPage