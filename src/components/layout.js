import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Header from './header'
import Footer from './footer'
import Seo from './seo'
import gsap from 'gsap'
import Preloader from '../components/preloader'
import getSocialItems from '../utils/getSocialItems'
import getLangContent from '../utils/getLangContent'

const Layout = ({ children, pageProps, seo }) => {
	const { location } = pageProps
	const { language } = pageProps.pageContext
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

	const [theme, setTheme] = useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : '');

	if (theme === 'dark') {
		document.documentElement.classList.add("dark");
	}

	const autoToggle = () => {
		localStorage.removeItem('theme')
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme(theme => 'dark')
			document.documentElement.classList.add("dark");
		} else {
			setTheme(theme => '')
			document.documentElement.classList.remove("dark");
		}
	}

	function toggleTheme(whatTheme) {
		if (whatTheme === 'light') {
			setTheme(theme => '')
			localStorage.theme = 'light'
			document.documentElement.classList.remove("dark");
		} else if (whatTheme === 'dark') {
			setTheme(theme => 'dark')
			localStorage.theme = 'dark'
			document.documentElement.classList.add("dark");
		}
	}

	useEffect(() => {
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			autoToggle();
		});
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
	// const [loader, setLoader] = useState(!('isPreloaderShown' in localStorage));

	useEffect(() => {
		setTimeout(() => {
			document.querySelector("body").classList.add('page-loaded');
			localStorage.setItem('isPreloaderShown', true);
		}, 2000)
	}, [])


	return (
		<div id='site-wrapper'
			className='site-wrapper relative min-h-screen flex flex-col overflow-hidden dark:text-white bg-slate-50 dark:bg-zinc-900'>
			<Seo theme={theme} seo={seo} />
			{!('isPreloaderShown' in localStorage) ? <Preloader /> : ''}
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