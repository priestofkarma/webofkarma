const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	const singleWorkTemplate = path.resolve(`src/templates/single-work.js`)
	const singlePostTemplate = path.resolve(`src/templates/single-post.js`)

	return graphql(`
		query {
			allContentfulSingleWork {
				edges {
					node {
						id
						path
						workName
						previewImage {
							url
							title
							gatsbyImageData
						}
					}
				}
			}
			allContentfulArticle {
				edges {
					node {
						id
						title
						path
						image {
							url
							title
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
				path: `work/${pagePath}`,
				component: singleWorkTemplate,
				context: {
					id: edge.node.id,
					slug: pagePath,
					prev,
					next
				},
			})
		})
		
		result.data.allContentfulArticle.edges.forEach((edge, index) => {
			const posts = result.data.allContentfulArticle.edges;
			const pagePath = edge.node.path
			const prev = index === 0 ? null : posts[index - 1];
			const next = index === posts.length - 1 ? null : posts[index + 1];
		
			createPage({
				path: `articles/${pagePath}`,
				component: singlePostTemplate,
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