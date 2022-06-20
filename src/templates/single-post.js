import React, { useEffect, useRef } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { useIntl } from "gatsby-plugin-intl"
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import tableOfContents from '../utils/toc'
import dateFormat from '../utils/dateFormat'
import declOfNum from '../utils/declOfNum'

const SinglePost = ({ data, pageContext }) => {
	const intl = useIntl()
	const lang = intl.locale
	const nextPostRef = useRef();
	const tocRef = useRef();
	const asideRef = useRef();
	const postContentRef = useRef();
	const { title, image, description, contentMd, date } = data.contentfulBlogPost
	const seo = {
		title: title,
		description: description.description,
		image: image
	}
	const nextPost = pageContext.next.node
	const formated = dateFormat(date, lang)

	function toWrap(selector, className, wrapElement = 'div') {
		const element = document.querySelectorAll(selector);
		element.forEach((item) => {
			const wrap = document.createElement(wrapElement);
			wrap.classList.add(className);
			item.parentNode.insertBefore(wrap, item);
			wrap.appendChild(item);
		});
	}

	gsap.registerPlugin(ScrollTrigger)
	gsap.registerPlugin(ScrollToPlugin)
	useEffect(() => {
		toWrap('table', 'table-wrap');
		toWrap('iframe', 'iframe-wrap');
		toWrap('video', 'video-wrap');

		const headersSelector = '.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6';
		tableOfContents({
			headingsSelector: headersSelector,
			wrapperSelector: '.table-of-contents'
		});

		const headers = document.querySelectorAll(headersSelector);
		const tocLinks = document.querySelectorAll('.table-of-contents li a');
		function changeTocClass(id) {
			tocLinks.forEach(item => {
				item.classList.remove('toc-active');
				if (item.hash === `#${id}`) {
					item.classList.add('toc-active');
				}
			})
		}

		headers.forEach(item => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					start: "top center",
					onEnter: (prop) => {
						const id = prop.trigger.getAttribute('id')
						changeTocClass(id)
					},
					onEnterBack: (prop) => {
						const id = prop.trigger.getAttribute('id')
						changeTocClass(id)
					},
				},
			})
		})


		/* table-of-contents */
		const toc = tocRef.current
		toc.addEventListener('click', (event) => {
			event.preventDefault()
			const target = event.target
			if (target.tagName.toLowerCase() === "a") {
				const hash = target.hash
				gsap.to(window, {
					duration: 0.7,
					ease: "Power4.out",
					scrollTo: {
						y: hash,
						offsetY: 50,
						autoKill: true,
					}
				});

			}
		})

		const nextPostImage = nextPostRef.current.querySelector('.next-post-image')
		gsap.from(nextPostImage, {
			scrollTrigger: {
				trigger: nextPostRef.current,
				start: "40% bottom",
				end: "120% bottom",
				scrub: 1
			},
			yPercent: 70,
			ease: 'none',
		});
	}, [])

	const { timeToRead } = contentMd.childMarkdownRemark
	const enRead = `${lang === 'en' ? formated.enDate : formated.ukDate} • ${timeToRead} min read`
	const ukRead = `${lang === 'en' ? formated.enDate : formated.ukDate} • читати ${timeToRead} ${declOfNum(timeToRead, ['хвилину', 'хвилини', 'хвилин'])}`

	return (
		<Layout seo={seo}>
			<div className='overflow-hidden dark:text-slate-200 lg:overflow-initial pb-10 md:pb-16 lg:pb-28 bg-zinc-100 dark:bg-slate-900'>
				<div className='relative pt-32 lg:pt-48 pb-10 lg:pb-16 bg-slate-300 dark:bg-slate-800'>
					<div className="container px-6 xl:px-20">
						<div className='relative lg:w-9/12 xl:w-8/12'>
							<h1 className='h1 text-black dark:text-white mb-2 xl:mb-4 text-2xl xl:text-5xl font-medium'>{title}</h1>
							<span className='text-slate-600 dark:text-slate-400'>{lang === 'en' ? enRead : ukRead}</span>
						</div>
					</div>
				</div>
				<div className='container px-6 xl:px-20'>
					<div ref={postContentRef} className='flex flex-wrap pt-10 lg:pt-20'>
						<article className='relative w-full lg:w-9/12 xl:w-8/12 post-content lg:text-lg xl:text-xl 2xl:text-xl'
							dangerouslySetInnerHTML={{ __html: contentMd.childMarkdownRemark.html }}></article>
						<aside ref={asideRef}
							className='toc hidden lg:block text-lg w-full lg:w-3/12 xl:w-4/12 pl-10 relative'>
							<div className='sticky top-20 pl-6 overflow-y-auto' style={{ maxHeight: '75vh' }}>
								<span className='block text-zinc-400 text-xs lg:text-sm xl:text-base 2xl:text-lg mb-4'>{intl.formatMessage({ id: "toc" })}</span>
								<div ref={tocRef} className='text-base 2xl:text-lg text-slate-700 dark:text-white/70 !leading-snug'>
									<ul className='table-of-contents'></ul>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>

			{/* next post */}
			<div className='bg-gradient-to-b dark:from-slate-900 dark:to-zinc-900 from-slate-300 to-slate-400 text-black dark:text-white text-center pt-10 pb-4 md:pt-16 md:pb-8 xl:pt-24'
				ref={nextPostRef}>
				<div className="container">
					<Link className='group max-w-screen-sm mx-auto relative block'
						to={'/' + lang + '/articles/' + nextPost.path}>
						<div className='overflow-hidden flex flex-col items-center'>
							<div>
								<p className='mb-2 xl:mb-6'>{intl.formatMessage({ id: "next_post" })}</p>
								<h2 className='group-hover:opacity-50 text-5xl xl:text-8xl xl:-mb-20 transition-opacity duration-700' >{nextPost.workName}</h2>
							</div>
							<div
								className='next-post-image w-10/12 max-w-sm'
								style={{ willChange: 'transform' }}
							>
								<img className='xl:group-hover:translate-y-10 xl:translate-y-28 transition-transform duration-500 ease-in-out'
									src={nextPost.image.url}
									alt={nextPost.image.title} />
							</div>
						</div>
						<hr className='w-full mb-8 border-zinc-600' />
					</Link>
					<Link to={`/${lang}/articles`}
						className='magnetic button-outline border-zinc-600 justify-center w-full sm:w-auto'>
						<span className='magnetic-text relative flex'>
							{intl.formatMessage({ id: "all_posts" })}
							<sup>{data.allContentfulBlogPost.totalCount / 2}</sup>
						</span>
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query singleBlogPostQuery($slug: String, $language: String) {
		allContentfulBlogPost {
			totalCount
		}
		contentfulBlogPost(path: {eq: $slug}, node_locale: {eq: $language}) {
			id
			node_locale
			date
			title
			description {
				description
			}
			image {
				url
				title
			}
			contentMd {
				childMarkdownRemark {
					html
					timeToRead
				}
			}
		}
	}
`;

export default SinglePost