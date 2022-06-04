import React from "react"
import { GoMarkGithub } from 'react-icons/go'
import { FaFacebook } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

export default function getSocialItems(data) {
	const { telegramLink, instagramLink, githubLink, facebookLink } = data;
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
	];
	return links
}
