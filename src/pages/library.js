import React from 'react'
import Layout from '../components/layout'
import { useIntl } from "gatsby-plugin-intl"
import { graphql } from 'gatsby'

const Library = ({data}) => {
	const intl = useIntl()
	const lang = intl.locale
	
	return (
		<Layout>
			<h1>library</h1>
		</Layout>
	)
}

export default Library