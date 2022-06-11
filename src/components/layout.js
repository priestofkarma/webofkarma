import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Header from './header'
import Footer from './footer'
import Seo from './seo'
import gsap from 'gsap'
import getSocialItems from '../utils/getSocialItems'
import getLangContent from '../utils/getLangContent'

const Layout = ({ children, pageProps, seo }) => {
	const { location } = pageProps
	const { language } = pageProps.pageContext
	const isWindow = typeof window !== `undefined`;
	const data = useStaticQuery(graphql`
		query siteQuery {
			allContentfulSiteMetadata {
				nodes {
					title
				}
			}
			allContentfulSocialLinks {
				nodes {
					socialTitle
					telegramLink
					instagramLink
					githubLink
					facebookLink
					node_locale
				}
			}
		}
  	`)

	/* theme */
	const currTheme = (isWindow && localStorage.theme === 'dark') || (isWindow && !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : '';
	const [theme, setTheme] = useState(currTheme);
	const autoToggle = () => {
		localStorage.removeItem('theme')
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme(() => 'dark')
			document.documentElement.classList.add("dark");
		} else {
			setTheme(() => '')
			document.documentElement.classList.remove("dark");
		}
	}

	function toggleTheme(whatTheme) {
		if (whatTheme === 'light') {
			setTheme(() => '');
			localStorage.theme = 'light';
			document.documentElement.classList.remove("dark");
		} else if (whatTheme === 'dark') {
			setTheme(() => 'dark');
			localStorage.theme = 'dark';
			document.documentElement.classList.add("dark");
		}
	}

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add("dark");
		}
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			autoToggle();
		});
		document.body.classList.remove('menu-opened')
	}, [])

	useEffect(() => {

		const magnets = document.querySelectorAll('.magnetic');
		const strength = 25;

		magnets.forEach((magnet) => {
			magnet.addEventListener('mousemove', moveMagnet);
			magnet.addEventListener('mouseleave', function (event) {
				gsap.to(event.currentTarget, 1.5, {
					x: 0,
					y: 0,
					ease: "Elastic.easeOut"
				});
				if (this.querySelector(".magnetic-text")) {
					gsap.to(this.querySelector(".magnetic-text"), 1.5, {
						x: 0,
						y: 0,
						ease: "Elastic.easeOut"
					});
				}
			});

			function moveMagnet(event) {
				const magnetButton = event.currentTarget;
				const bounding = magnetButton.getBoundingClientRect();
				const magnetsStrength = magnetButton.getAttribute("data-strength") || strength;
				const magnetsStrengthText = magnetButton.getAttribute("data-strength-text") || strength / 2;

				gsap.to(magnetButton, 1.5, {
					x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrength,
					y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrength,
					rotate: "0.001deg",
					ease: 'Power4.easeOut'
				});

				if (this.querySelector(".magnetic-text")) {
					gsap.to(this.querySelector(".magnetic-text"), 1.5, {
						x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * magnetsStrengthText,
						y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * magnetsStrengthText,
						rotate: "0.001deg",
						ease: "Power4.easeOut"
					});
				}

			}
		});

	}, [location])

	const { title } = data.allContentfulSiteMetadata.nodes[0]
	const langSocial = getLangContent(language, data.allContentfulSocialLinks.nodes);
	const social = getSocialItems(langSocial);
	// const [loader, setLoader] = useState(isWindow && !('isPreloaderShown' in localStorage));

	useEffect(() => {
		setTimeout(() => {
			document.querySelector("body").classList.add('page-loaded');
			localStorage.setItem('isPreloaderShown', true);
		}, 2000)
	}, [])


	return (
		<div id='site-wrapper'
			className='site-wrapper relative min-h-screen flex flex-col overflow-hidden dark:text-white bg-slate-50 dark:bg-zinc-900'>
			<Seo seo={seo} />
			{isWindow && !('isPreloaderShown' in localStorage) ?
				<div className='preloader bg-gradient-animation bg-gradient-to-br from-slate-50 to-cobalt-50 dark:from-slate-500 dark:to-cobalt-900 fixed flex items-center justify-center w-full h-full inset-0 z-50 bg-slate-700'>
					<div className='preloader__logo w-32 xl:w-52 -mt-10 xl:-mt-20'>
						<svg overflow='visible' viewBox="0 0 512 512">
							<path className='leaf leaf01 fill-cobalt-100' d="M128,283.048c70.693,0,128,67.301,128,67.301s-57.307,67.301-128,67.301S0,350.349,0,350.349S57.307,283.048,128,283.048z" />
							<path className='leaf leaf02 fill-cobalt-200' d="M213.079,212.251C263.067,262.237,256,350.349,256,350.349s-88.112,7.067-138.099-42.92S74.98,169.331,74.98,169.331S163.092,162.264,213.079,212.251z" />
							<path className='leaf leaf05 fill-cobalt-300' d="M384,283.048c-70.693,0-128,67.301-128,67.301s57.307,67.301,128,67.301s128-67.301,128-67.301S454.693,283.048,384,283.048z" />
							<path className='leaf leaf04 fill-cobalt-400' d="M298.92,212.251C248.933,262.237,256,350.349,256,350.349s88.112,7.067,138.099-42.92s42.92-138.099,42.92-138.099S348.908,162.264,298.92,212.251z" />
							<path className='leaf leaf03 fill-cobalt-500' d="M323.301,222.349c0,70.693-67.301,128-67.301,128s-67.301-57.307-67.301-128s67.301-128,67.301-128S323.301,151.657,323.301,222.349z" />
						</svg>
					</div>
				</div> : ''}
			<Header
				language={language}
				social={social}
				siteTitle={title}
				onToggleTheme={toggleTheme}
				theme={theme} />
			<div id="main" className='main grow'>
				{children}
			</div>
			<Footer language={language} social={social} />
		</div>
	)

}

export default Layout