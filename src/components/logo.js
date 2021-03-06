import React from 'react'

const Logo = ({ clazzName }) => {
	return (
		<span className='logo-img flex items-center xl:text-lg magnetic' data-stenght='50'>
			<svg className={clazzName} viewBox="0 0 512 512">
				<path className='leaf leaf01 fill-cobalt-100' d="M128,283.048c70.693,0,128,67.301,128,67.301s-57.307,67.301-128,67.301S0,350.349,0,350.349S57.307,283.048,128,283.048z" />
				<path className='leaf leaf02 fill-cobalt-200' d="M213.079,212.251C263.067,262.237,256,350.349,256,350.349s-88.112,7.067-138.099-42.92S74.98,169.331,74.98,169.331S163.092,162.264,213.079,212.251z" />
				<path className='leaf leaf05 fill-cobalt-500' d="M384,283.048c-70.693,0-128,67.301-128,67.301s57.307,67.301,128,67.301s128-67.301,128-67.301S454.693,283.048,384,283.048z" />
				<path className='leaf leaf04 fill-cobalt-400' d="M298.92,212.251C248.933,262.237,256,350.349,256,350.349s88.112,7.067,138.099-42.92s42.92-138.099,42.92-138.099S348.908,162.264,298.92,212.251z" />
				<path className='leaf leaf03 fill-cobalt-300' d="M323.301,222.349c0,70.693-67.301,128-67.301,128s-67.301-57.307-67.301-128s67.301-128,67.301-128S323.301,151.657,323.301,222.349z" />
			</svg>
		</span>
	)
}

export default Logo