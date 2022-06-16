import React, { useEffect, useState, useRef } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import LanguageSwitcher from './languageSwitcher'
import Logo from './logo'
import { useIntl } from "gatsby-plugin-intl"
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";

const Header = ({ language, social, onToggleTheme, theme }) => {
	const intl = useIntl()
	const [isOpen, setMenu] = useState(false);
	const menuRef = useRef();
	const menuOverlayRef = useRef();
	const menuBtnRef = useRef();
	const tlRef = useRef();
	gsap.registerPlugin(ScrollTrigger)

	const data = useStaticQuery(graphql`
		query headerQuery {
			allContentfulSingleWork {
				totalCount
			}
		}
  	`)

	function toggleMenu() {
		setMenu(isOpen => !isOpen);
		if (!isOpen) {
			document.body.classList.add('menu-opened')
			tlRef.current.play()
		} else {
			document.body.classList.remove('menu-opened')
			tlRef.current.reverse()
		}
	}

	useEffect(() => {
		tlRef.current = gsap.timeline({ paused: true })
			.to(menuRef.current, { x: 0, duration: 1, ease: "power4.inOut" })
			.from(menuRef.current.querySelectorAll('.menu__item'),
				{ xPercent: 40, duration: 1, stagger: 0.05, ease: "power4.inOut" }, '-=0.95')
			.from(menuRef.current.querySelectorAll('.header__nav a'),
				{ x: 50, duration: 1, stagger: 0.05, ease: "power4.inOut" }, '<')

		ScrollTrigger.create({
			start: 'top -30%',
			onUpdate: self => {
				document.body.classList.add('scrolled');
			},
			onLeaveBack: self => {
				document.body.classList.remove('scrolled');
			},
		});
	}, [])

	/* Navigation */
	const navLinks = [
		{ href: `/work`, label: 'works', count: data.allContentfulSingleWork.totalCount / 2 },
		{ href: `/posts`, label: 'posts', count: 9 },
		// { href: `/library`, label: 'library' },
		{ href: `/about`, label: 'about' },
		{ href: `/contact`, label: 'contact' },
	];

	return (
		<header className='header flex items-center absolute z-50 w-full top-0 left-0'>
			<div className="header__inner relative w-full">
				<div
					aria-label='Close menu'
					onClick={toggleMenu}
					ref={menuOverlayRef}
					aria-hidden={isOpen ? true : false}
					className={`${isOpen ? 'pointer-event-all opacity-50' : 'opacity-0 delay-700 pointer-events-none'} translate-z-0 transition-opacity duration-700 w-screen h-screen fixed inset-0`}
					style={{
						background: 'linear-gradient(to right,hsla(220, 13%, 0%, .3) 40%, hsla(220, 13%, 0%, 1) 80%)'
					}}
				></div>

				<div
					id="menu"
					className='menu fixed translate-x-full right-0 top-0 h-screen w-screen max-w-lg text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-1000'
					ref={menuRef}>

					<div className="menu__container relative overflow-y-auto h-full">
						<div className=" min-h-full px-8 pt-20 pb-10 sm:px-20 flex flex-col">

							<div className="menu__item mt-auto mb-4">
								<h5 className='text-zinc-400 text-xs md:text-sm'>{intl.formatMessage({ id: "navigation" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<nav className='nav header__nav mb-4'>
									<ul className='text-3xl xl:text-4xl 2xl:text-5xl pt-2 md:pt-6'>
										{navLinks.map(({ href, label, count }) => {
											return (
												<li key={href} className='mb-4 2xl:mb-6'>
													<Link to={'/' + language + href}
														data-strength="20"
														className={`magnetic group inline-block relative hover:opacity-80 transition-colors`}>
														<div className={`link-dot -left-6 group-hover:scale-100 transition-transform ${typeof window !== `undefined` && window.location.pathname === '/' + language + href + '/' ? 'scale-100' : 'scale-0'}`}></div>{intl.formatMessage({ id: label })}{count && <sup>{count}</sup>}
													</Link>
												</li>
											)
										})}

									</ul>
								</nav>
							</div>

							<div className="menu__item mt-auto mb-4">
								<h5 className='text-zinc-400 text-xs lg:text-sm'>{intl.formatMessage({ id: "theme" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<div className='flex'>
									<button
										data-strength="10"
										onClick={() => onToggleTheme('light')}
										className={`${theme !== 'dark' ? 'text-orange-600 font-medium' : ''} magnetic transition-colors flex items-center mr-4`}>
										<span>{intl.formatMessage({ id: "light" })}</span>
									</button>
									<button
										data-strength="10"
										onClick={() => onToggleTheme('dark')}
										className={`${theme === 'dark' ? 'text-purple-600 font-medium' : ''} magnetic transition-colors flex items-center`}>
										<span>{intl.formatMessage({ id: "dark" })}</span>
									</button>
								</div>
							</div>

							<div className="menu__item mt-auto mb-4">
								<h5 className='text-zinc-400 text-xs lg:text-sm'>{intl.formatMessage({ id: "language" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<LanguageSwitcher />
							</div>

							<div className="menu__item mt-auto mb-4">
								<h5 className='text-zinc-400 text-xs lg:text-sm'>{intl.formatMessage({ id: "social" })}</h5>
								<hr className='mt-2 mb-4 border-zinc-400' />
								<div className='flex flex-wrap'>
									{social.map((item, index) => (
										<a
											href={item.url}
											className='mr-4 inline-block magnetic hover:text-cobalt-500 transition-colors'
											data-strength='20'
											key={`headerSocialItems-${index}`}
											target="_blank"
											rel="noreferrer"
											title={item.name}>
											{item.name}
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				<Link to={'/'+language+'/'} aria-label="To homepage" className='text-black dark:text-white inline-block absolute top-5 left-8 lg:left-8 lg:top-10 2xl:left-16'>
					<Logo clazzName='w-10 xl:w-12 2xl:w-16 -mt-1' />
				</Link>

				<div className='fake-menu-btn absolute right-6 top-3 lg:right-12 lg:top-12'>
					<button
						data-strenght='50'
						className={`w-12 h-12 rounded-full duration-700 transition-colors magnetic`}
						onClick={toggleMenu}>
						<span className="link-dot"></span>
						<span>{intl.formatMessage({ id: "menu" })}</span>
					</button>
				</div>

				<div className='menu-btn-wrap fixed right-6 top-3 lg:right-8 lg:top-8'>
					<button
						ref={menuBtnRef}
						data-strenght='50'
						data-strenght-text='35'
						className={`${isOpen ? 'is-open bg-cobalt-600' : 'bg-black dark:bg-cobalt-500'} menu-btn w-12 h-12 lg:w-20 lg:h-20 rounded-full duration-700 transition-colors magnetic`}
						onClick={toggleMenu}>
						<span className='magnetic-text menu-btn__inner'>
							<span className='w-5 sm:w-6'></span>
							<span className='w-5 sm:w-6'></span>
							<span className='menu-btn-text__inner'>{intl.formatMessage({ id: "menu" })}</span>
						</span>
					</button>
				</div>
			</div>
		</header >
	)
}

export default Header