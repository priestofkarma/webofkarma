import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import { BsArrowRightShort } from 'react-icons/bs'
import FadeInAnimation from '../components/FadeInAnimation'
import dateFormat from '../utils/dateFormat'
import declOfNum from '../utils/declOfNum'

const Articles = ({ data }) => {
	const intl = useIntl()
	const lang = intl.locale
	const posts = data.allContentfulBlogPost.nodes
	const { pageTitle, seoTitle, seoDescription, seoImage } = data.allContentfulBlogPage.nodes[0]
	const seo = {
		title: seoTitle,
		description: seoDescription.seoDescription,
		image: seoImage.url
	}
	const totalCount = data.allContentfulBlogPost.totalCount
	const enArticles = declOfNum(totalCount, ['Article', 'Articles', 'Articles'])
	const ukArticles = declOfNum(totalCount, ['Стаття', 'Статті', 'Статей'])

	
	return (
		<Layout seo={seo}>
			<div className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900'>
				<div className='container max-w-screen-lg'>
					<div>
						<div className='relative flex items-end justify-between mb-6 xl:mb-10 2xl:-ml-2 max-w-5xl 2xl:max-w-7xl mx-auto'>
							<h2 className='h1 mb-0 xl:text-7xl 2xl:text-8xl'>{pageTitle}</h2>
							<span className='lg:text-lg xl:text-xl'>{totalCount} {lang === 'en' ? enArticles : ukArticles}</span>
						</div>
						<div>
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
											<article className='relative overflow-hidden p-4 lg:p-6 xl:p-8 bg-white dark:shadow-md dark:bg-gray-800 h-full rounded-md lg:rounded-lg'>
												<Link className='group' to={item.path}>
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
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query BlogPageQuery($language: String) {
		allContentfulBlogPage(filter: {node_locale: {eq: $language}}) {
			nodes {
				pageTitle
				seoTitle
				seoDescription {
					seoDescription
				}
				seoImage {
					url
				}
			}
		}
		allContentfulBlogPost(
		filter: {node_locale: {eq: $language}}
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
	}
`

export default Articles