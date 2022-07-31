import React from "react"
import { GoMarkGithub } from 'react-icons/go'
import { FaFacebook } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { IoLogoTwitter } from 'react-icons/io'
import { SiCodepen } from 'react-icons/si'

export default function getSocialItems(data) {
	const { telegramLink, instagramLink, githubLink, facebookLink, codepenLink, twitterLink } = data;
	const links = [
		{
			icon: <FaTelegram />,
			url: telegramLink,
			name: "Telegram",
		},
		{
			icon: <RiInstagramFill />,
			url: instagramLink,
			name: "Instagram",
		},
		{
			icon: <GoMarkGithub />,
			url: githubLink,
			name: "GitHub",
		},
		{
			icon: <FaFacebook />,
			url: facebookLink,
			name: "Facebook",
		},
		{
			icon: <SiCodepen />,
			url: codepenLink,
			name: "Codepen",
		},
		{
			icon: <IoLogoTwitter />,
			url: twitterLink,
			name: "Twitter",
		},
	];
	return links
}
