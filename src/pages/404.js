import * as React from "react"
import { Link } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import { FiArrowUpLeft } from 'react-icons/fi'

const NotFoundPage = () => {
	const intl = useIntl()
	const lang = intl.locale
	const seo = {
		title: '404: Not found',
	}
	return (
		<Layout seo={seo}>
			<div className='pt-32 lg:pt-44 pb-16 lg:pb-16'>
				<div className='container px-4 max-w-screen-sm'>
					<div>
						<h1 className='h1 text-6xl sm:text-8xl font-medium'>{intl.formatMessage({ id: "error_title" })}</h1>
						<p className='text-3xl mb-10'>
							{intl.formatMessage({ id: "error_text" })}.
							{process.env.NODE_ENV === "development" ? (
								<>
									<br />
									Try creating a page in <code>src/pages/</code>.
									<br />
								</>
							) : null}
						</p>
						<br />
						<Link to={`/${lang}/`}
							className='text-amber-500 inline-flex items-center text-3xl'><FiArrowUpLeft className='mr-2' /><span>{intl.formatMessage({ id: "back_home" })}</span></Link>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default NotFoundPage
