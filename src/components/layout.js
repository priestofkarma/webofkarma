import React, { useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { ThemeContext } from '../context/themeContext';
import Header from './header'
import Footer from './footer'
import Seo from './seo'
import gsap from 'gsap'
import getSocialItems from '../utils/getSocialItems'
import getLangContent from '../utils/getLangContent'
import { useIntl } from "gatsby-plugin-intl"

const Layout = ({ children, seo }) => {
	const intl = useIntl()
	const lang = intl.locale
	const location = typeof window !== `undefined` && window.location
	const { theme, setTheme } = useContext(ThemeContext);
	const data = useStaticQuery(graphql`
		query siteQuery {
			allContentfulSocialLinks {
				nodes {
					socialTitle
					githubLink
					codepenLink
					twitterLink
					node_locale
				}
			}
		}
  	`)

	/* theme */

	function handleThemeToggle(whatTheme) {
		if (whatTheme === 'light') {
			setTheme('light');
		} else if (whatTheme === 'dark') {
			setTheme('dark');
		}
	}

	useEffect(() => {
		function autoToggle() {
			localStorage.removeItem('theme')
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setTheme('dark')
			} else {
				setTheme('light')
			}
		}
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			autoToggle();
		});
		document.body.classList.remove('menu-opened')
	}, [setTheme])

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

	const langSocial = getLangContent(lang, data.allContentfulSocialLinks.nodes);
	const social = getSocialItems(langSocial);

	return (
		<div id='site-wrapper'
			className='site-wrapper relative min-h-screen flex flex-col dark:text-white bg-slate-50 dark:bg-zinc-900'>
			<Seo theme={theme} seo={seo} />

			<Header
				social={social}
				onToggleTheme={handleThemeToggle}
				theme={theme} />
			<div id="main" className='main grow'>
				{children}
			</div>
			<Footer social={social} />
		</div>
	)

}

export default Layout