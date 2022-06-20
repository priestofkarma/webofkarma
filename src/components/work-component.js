import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'gatsby'
import { useIntl } from "gatsby-plugin-intl"

const SingleWork = ({ dataService, work, clazzName, linkClasses, children }) => {
	const intl = useIntl()
	const lang = intl.locale
	const workRef = useRef()
	useEffect(() => {
		const work = workRef.current;
		let workImage = '';
		let workImageBounding = '';
		let workImageWrap = '';
		if (window.matchMedia('(min-width: 1280px)').matches) {
			work.addEventListener('mouseenter', workEnter)
			work.addEventListener('mousemove', workMove)
			work.addEventListener('mouseleave', workLeave)
			function workEnter(e) {
				workImage = e.currentTarget.querySelector('.work-image');
				workImageBounding = workImage.getBoundingClientRect();
				workImageWrap = e.currentTarget.querySelector('.work-image-wrap');
				gsap.set(workImage, {
					left: (e.clientX - (workImageBounding.width / 2)),
					top: (e.clientY - (workImageBounding.height / 2)),
				});
				workImage.classList.remove('invisible')
				workImageWrap.classList.add('shown')
			}
			function workMove(e) {
				gsap.to(e.currentTarget.querySelector('.work-image'), 1.5, {
					left: (e.clientX - (workImageBounding.width / 2)),
					top: (e.clientY - (workImageBounding.height / 2)),
					ease: 'Power4.easeOut'
				});
			}
			function workLeave(e) {
				e.currentTarget.querySelector('.work-image').classList.add('invisible')
				e.currentTarget.querySelector('.work-image-wrap').classList.remove('shown')
			}
		}
	}, [])

	return (
		<li data-service={dataService} className={clazzName}>
			<hr className='hidden xl:block border-slate-500 dark:border-zinc-500' />
			<Link
				ref={workRef}
				to={`/${lang}/work/${work.path}`}
				className={`work group block pb-12 ${linkClasses}`}>
				{children}
			</Link>
		</li>
	)

}

export default SingleWork