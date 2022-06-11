const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	const singleWorkTemplate = path.resolve(`src/templates/single-work.js`)

	return graphql(`
		query singleWorkQuery {
			allContentfulSingleWork {
				edges {
					node {
						id
						path
						workName
						previewImage {
							gatsbyImageData
						}
					}
				}
			}
		}
  `).then(result => {
		if (result.errors) {
			throw result.errors
		}

		result.data.allContentfulSingleWork.edges.forEach((edge, index) => {
			const works = result.data.allContentfulSingleWork.edges;
			const pagePath = edge.node.path
			const prev = index === 0 ? null : works[index - 1];
			const next = index === works.length - 1 ? null : works[index + 1];
		
			createPage({
				path: pagePath,
				component: singleWorkTemplate,
				context: {
					id: edge.node.id,
					slug: pagePath,
					prev,
					next
				},
			})
		})
	})
}