import React from 'react'

const WhatMedia = ({ clazzName, media, poster }) => {

	return (
		<>
			{media.mimeType.includes('image') ?
				<img
					className={clazzName}
					src={media.url}
					alt={media.title}
				/> :
				<video autoPlay loop muted playsInline
					className={clazzName}
					poster={poster ? poster.url : ''}
					src={media.url}></video>
			}
		</>
	)
}

export default WhatMedia

