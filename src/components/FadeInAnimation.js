import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from "gsap/ScrollTrigger";

const FadeInAnimation = ({
	children,
	elem = 'div',
	direction = 'up',
	delay = 0,
	delayFrom = 767,
	distance = 20,
	...props
}) => {
	gsap.registerPlugin(ScrollTrigger)

	const Component = elem;
	const compRef = useRef(null);
	let fadeDirection;
	switch (direction) {
		case "left":
			fadeDirection = { x: distance + '%' };
			break;
		case "right":
			fadeDirection = { x: -distance + '%' };
			break;
		case "up":
			fadeDirection = { y: distance + '%' };
			break;
		case "down":
			fadeDirection = { y: -distance + '%' };
			break;
		case "scale":
			fadeDirection = { scale: -distance };
			break;
		default:
			fadeDirection = { y: 0 };
	}

	useEffect(() => {
		gsap.from(compRef.current, {
			scrollTrigger: {
				trigger: compRef.current,
				start: "top bottom",
			},
			...fadeDirection,
			duration: 1,
			opacity: 0,
			ease: 'power3.out',
			delay: window.matchMedia(`(min-width: ${delayFrom}px)`).matches ? delay : 0,
		});


	}, [compRef, fadeDirection, delayFrom, delay])

	return (
		<Component ref={compRef} {...props}>
			{children}
		</Component>
	)
}

export default FadeInAnimation