import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"
import { BsArrowRightShort } from 'react-icons/bs'
import dateFormat from '../utils/dateFormat'
import declOfNum from '../utils/declOfNum'
import LetsWork from '../components/lets-work'

const Articles = ({ data }) => {
	const intl = useIntl()
	const lang = intl.locale
	const posts = data.allContentfulArticle.nodes
	const { pageTitle, seoTitle, seoDescription, seoImage } = data.allContentfulBlogPage.nodes[0]
	const seo = {
		title: seoTitle,
		description: seoDescription.seoDescription,
		image: seoImage.url
	}
	const totalCount = data.allContentfulArticle.totalCount
	const enArticles = declOfNum(totalCount, ['Article', 'Articles', 'Articles'])
	const ukArticles = declOfNum(totalCount, ['Стаття', 'Статті', 'Статей'])

	const currCat = (category) => {
		let string = "";
		for (let i = 0; i < category.length; i++) {
			if (category[i] === " ") {
				string += "-";
			} else {
				string += category[i];
			}
		}
		return string.toLowerCase();
	}

	const hash = window.location.hash;
	const currentCategory = hash.substring(hash.indexOf('#') + 1);
	const categoryCounter = {};

	posts.forEach(post => {
		post.category.forEach(cat => {
			if (!(cat in categoryCounter)) {
				categoryCounter[cat] = 1;
			} else {
				console.log("double")
				categoryCounter[cat]++;
			}
		})
	});
	console.log(categoryCounter)
	const categoriesList = () => {
		const array = [];
		posts.forEach(post => {
			const categories = post.category;
			for (const cat of categories) {
				if (!array.includes(cat)) {
					array.push(cat);
				}
			}
		})
		return array;
	}

	return (
		<Layout seo={seo}>
			<div className='pt-32 lg:pt-48 pb-10 md:pb-16 lg:pb-10 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-900'>
				<div className='container max-w-screen-lg'>
					<div>
						<div className='relative flex items-end justify-between mb-6 xl:mb-10 2xl:-ml-2 max-w-5xl 2xl:max-w-7xl mx-auto'>
							<h2 className='h1 mb-0 xl:text-7xl 2xl:text-8xl'>{pageTitle}</h2>
							<span className='lg:text-lg xl:text-xl'>{totalCount} {lang === 'en' ? enArticles : ukArticles}</span>
						</div>
						<div className='flex flex-wrap mb-6'>
							<Link
								to={`/${lang}/articles`}
								className={`${!!currentCategory === false ? 'bg-cobalt-400 dark:bg-cobalt-500 text-cobalt-50 ' : 'bg-slate-200 dark:bg-zinc-600 dark:text-white'} mr-5 mb-3 py-1 px-3 rounded-md group hover:scale-110 transition-all`}>
								<span className='inline-block transition-transform'>{intl.formatMessage({ id: "all_tags" })}</span>
							</Link>
							{categoriesList().map((cat, index) => {
								return (
									<Link
										to={`/${lang}/articles#${currCat(cat)}`}
										key={`categorys-${index}`}
										className={`${currentCategory === currCat(cat) ? 'bg-cobalt-400 dark:bg-cobalt-500 text-cobalt-50' : 'bg-slate-200 dark:bg-zinc-600  dark:text-white'} relative mr-5 mb-3 py-1 px-3 rounded-md group hover:scale-110 transition-all`}>
										<span className='inline-block'>
											{intl.formatMessage({ id: cat })}
											<sup className={`flex w-6 h-6 border border-slate-100  dark:border-zinc-800 rounded-full -right-3 left-auto -top-3 ${currentCategory === currCat(cat) ? 'bg-cobalt-400 text-cobalt-50' : 'bg-slate-200 dark:bg-zinc-600  dark:text-white'} opacity-100`}>
												<span className='m-auto'>{categoryCounter[cat]}</span>
											</sup>
										</span>
									</Link>
								)
							})}
						</div>
						<div>
							<ul className='flex flex-wrap -mx-8 lg:-mx-12 xl:-mx-20'>
								{posts.map((item, index) => {
									const transformCategories = item.category.map(category => currCat(category))
									if (currentCategory && !transformCategories.includes(currentCategory)) {
										return
									}
									const formated = dateFormat(item.date, lang)
									const { timeToRead } = item.contentMd.childMarkdownRemark
									const enRead = `${lang === 'en' ? formated.enDate : formated.ukDate} • ${timeToRead} min read`
									const ukRead = `${lang === 'en' ? formated.enDate : formated.ukDate} • читати ${timeToRead} ${declOfNum(timeToRead, ['хвилину', 'хвилини', 'хвилин'])}`
									return (
										<li className='block w-full md:w-1/2 mb-8 md:mb-12 px-4'
											key={`article-${index}`}>
											<article className='relative overflow-hidden p-4 lg:p-6 xl:p-8 bg-white dark:shadow-md dark:bg-slate-700 h-full rounded-md lg:rounded-lg'>
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
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<LetsWork />
		</Layout >
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
		allContentfulArticle(
		filter: {node_locale: {eq: $language}} 
		sort: {order: DESC, fields: date}
		) {
			totalCount
			nodes {
				id
				path
				title
				date
				category
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