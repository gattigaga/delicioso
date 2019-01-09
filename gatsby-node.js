const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const SingleArticle = path.resolve('src/templates/SingleArticle.js')

  return new Promise(resolve => {
    graphql(`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                date
                path
              }
            }
          }
        }
      }
    `).then(result => {
      console.log(result)
      const { edges: posts } = result.data.allMarkdownRemark
      const postsPerPage = 6
      const totalPages = Math.ceil(posts.length / postsPerPage)

      Array.from({ length: totalPages }).forEach((_, index) => {
        const pageConfig = {
          path: !index ? '/articles' : `/articles/${index + 1}`,
          component: path.resolve('./src/templates/Articles.js'),
          context: {
            totalPages,
            pageIndex: index,
            limit: postsPerPage,
            skip: index * postsPerPage,
          },
        }

        if (!index) {
          createPage({ ...pageConfig, path: '/articles/1' })
        }

        createPage(pageConfig)
      })

      posts.forEach(({ node: post }) => {
        createPage({
          path: post.frontmatter.path,
          component: SingleArticle,
          context: {},
        })
      })

      resolve()
    })
  })
}
