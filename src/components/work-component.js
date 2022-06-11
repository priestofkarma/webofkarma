import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'gatsby'
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SingleWork = ({ work, index, language }) => {
	gsap.registerPlugin(ScrollToPlugin);
	gsap.registerPlugin(ScrollTrigger)

	const services = work.services.join(" & ");
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
		<li className={`md:w-1/2 xl:w-full border-slate-500 dark:border-zinc-500 ${(index > 1) ? 'hidden xl:block' : ''} xl:border-b ${(index === 0) ? 'xl:border-t' : ''}`}>
			<Link
				ref={workRef}
				to={`/${language}/${work.path}`}
				className='work group block py-2 pb-12 xl:py-16 xl:px-16'>
				<div
					className="work-image w-full xl:max-w-xl 2xl:max-w-2xl xl:invisible xl:fixed z-10 xl:pointer-events-none">
					<GatsbyImage
						className='work-image-wrap w-full relative transition-all'
						image={getImage(work.previewImage)}
						alt={work.previewImage.title}
					/>
					{/* {work.videoPreview ? <video autoPlay loop muted playsInline
						poster={work.previewImage.url}
						className='work-image-wrap w-full relative transition-all'
						src={work.videoPreview.url}></video> :
						<GatsbyImage
							className='work-image-wrap w-full relative transition-all'
							image={getImage(work.previewImage)}
							alt={work.previewImage.title}
						/>} */}
				</div>
				<div className='xl:flex items-center justify-between'>
					<h3
						style={{ willChange: 'opacity, transform' }}
						className='inline-block text-2xl md:text-3xl lg:text-4xl xl:text-7xl pt-6 xl:pt-0 transition-all group-hover:-skew-x-12 xl:group-hover:translate-x-8 duration-500 xl:group-hover:opacity-50 translate-z-0'>{work.workName}</h3>
					<hr className='mt-3 mb-3 md:mb-6 xl:mb-0 xl:hidden border-zinc-400 dark:border-slate-600' />
					<span
						style={{ willChange: 'opacity, transform' }}
						className='inline-block xl:text-lg text-slate-700 dark:text-zinc-400 transition-all group-hover:-skew-x-12 xl:group-hover:-translate-x-8 duration-500 xl:group-hover:opacity-50 translate-z-0'>
						{services}
					</span>
				</div>
			</Link>
		</li>
	)

}

export default SingleWork