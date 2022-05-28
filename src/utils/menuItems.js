import React from "react"
import { GoMarkGithub } from 'react-icons/go'
import { FaFacebook } from 'react-icons/fa'
import { FaTelegram } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'

export const socialMenuItems = [
	{
		icon: <FaTelegram />,
		url: "https://t.me/priestofkarma",
		name: "Telegram",
	},
	{
		icon: <RiInstagramFill />,
		url: "https://www.instagram.com/karmasacrificer",
		name: "Instagram",
	},
	{
		icon: <GoMarkGithub />,
		url: "https://github.com/priestofkarma",
		name: "GitHub",
	},
	{
		icon: <FaFacebook />,
		url: "https://www.facebook.com/petrenko.evg",
		name: "Facebook",
	},

]
