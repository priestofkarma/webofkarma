const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	const singleWorkTemplate = path.resolve(`src/templates/single-work.js`)

	return graphql(`
		query singleWorkQuery {
			allContentfulSingleWork {
				edges {
					node {
						path
					}
				}
			}
		}
  `).then(result => {
		if (result.errors) {
			throw result.errors
		}

		result.data.allContentfulSingleWork.edges.forEach(edge => {
			const pagePath = edge.node.path
			createPage({
				path: pagePath,
				component: singleWorkTemplate,
				context: {
					slug: pagePath,
				},
			})
		})
	})
}