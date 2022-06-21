import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { useIntl } from "gatsby-plugin-intl"
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import tableOfContents from '../utils/toc'
import LetsWork from '../components/lets-work'

const About = ({ data }) => {
	const intl = useIntl()
	const lang = intl.locale
	const tocRef = useRef();
	const asideRef = useRef();
	const postContentRef = useRef();
	const { title, seoTitle, seoImage, seoDescription, content } = data.allContentfulAboutPage.nodes[0]
	const seo = {
		title: seoTitle,
		description: seoDescription.seoDescription,
		image: seoImage
	}

	function toWrap(selector, className, wrapElement = 'div') {
		const element = document.querySelectorAll(selector);
		if (element) {
			element.forEach((item) => {
				const wrap = document.createElement(wrapElement);
				wrap.classList.add(className);
				item.parentNode.insertBefore(wrap, item);
				wrap.appendChild(item);
			});
		}
	}

	gsap.registerPlugin(ScrollTrigger)
	gsap.registerPlugin(ScrollToPlugin)
	useEffect(() => {
		toWrap('table', 'table-wrap');
		toWrap('iframe', 'iframe-wrap');
		toWrap('video', 'video-wrap');
		toWrap('.code-block', 'code-block-wrapper');

		const videoWrap = document.querySelectorAll('.video-wrap');
		if (videoWrap.length !== 0) {
			videoWrap.forEach((item) => {
				item.insertAdjacentHTML('beforeend', `<button class="overlay video-btn">
			<span><svg class="play-btn" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path></svg>
			<svg class="pause-btn" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z"></path></svg>
			</span>
			</button>`);
				const btn = item.querySelector('.video-btn');
				const video = item.querySelector('video');
				btn.addEventListener('click', () => {
					if (!video.paused) {
						video.pause()
						item.classList.add('paused')
					} else {
						video.play()
						item.classList.remove('paused')
					}
				})
			});
		}

		const headersSelector = '.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6';
		const headers = document.querySelectorAll(headersSelector);
		const tocLinks = document.querySelectorAll('.table-of-contents li a');
		if (headers.length !== 0) {
			tableOfContents({
				headingsSelector: headersSelector,
				wrapperSelector: '.table-of-contents'
			});

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
						start: "top 25%",
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
		}


		/* copy code btn */
		const copyCodeBtn = document.querySelectorAll('.copy-code-btn');
		const tooltipText = lang === 'en' ? 'Copy code' : 'Копіювати код';
		if (copyCodeBtn.length !== 0) {
			copyCodeBtn.forEach(item => {
				item.setAttribute('data-tooltip', tooltipText)
			})
		}
		const copyCodeToaster = document.querySelectorAll('.copy-code-container');
		const toasterText = lang === 'en' ? 'Copied!' : 'Скопійовано!';
		if (copyCodeToaster.length !== 0) {
			copyCodeToaster.forEach(item => {
				item.setAttribute('data-toaster-text', toasterText)
			})
		}

	}, [lang])

	return (
		<Layout seo={seo}>
			<div className='overflow-hidden dark:text-slate-200 lg:overflow-initial pb-10 md:pb-16 lg:pb-28 bg-gray-50 dark:bg-slate-900'>
				<div className='relative pt-32 lg:pt-48 pb-10 bg-slate-200 dark:bg-slate-800'>
					<div className="container px-6 xl:px-20">
						<div className='relative lg:w-9/12 xl:w-8/12'>
							<h1 className='h1 text-black dark:text-white mb-2 xl:mb-4 text-4xl xl:text-6xl font-medium'>{title}</h1>
							<p className='text-lg text-slate-600 dark:text-slate-400'>{seoDescription.seoDescription}</p>
						</div>
					</div>
				</div>
				<div className='container px-6 xl:px-20'>
					<div ref={postContentRef} className='flex flex-wrap pt-10 lg:pt-20 xl:pt-28'>
						<article className='relative w-full lg:w-9/12 xl:w-8/12 post-content lg:text-lg xl:text-xl 2xl:text-xl'
							dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}></article>
						<aside ref={asideRef}
							className='toc hidden lg:block text-lg w-full lg:w-3/12 xl:w-4/12 pl-16 relative'>
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
			<LetsWork />
		</Layout>
	)
}

export const query = graphql`
	query aboutPageQuery($language: String) {
		allContentfulAboutPage(filter: {node_locale: {eq: $language}}) {
			nodes {
				id
				title
				seoTitle
				node_locale
				seoDescription {
					seoDescription
				}
				seoImage {
					url
					title
				}
				content {
					childMarkdownRemark {
						html
					}
				}
			}
		}
	}
`;

export default About