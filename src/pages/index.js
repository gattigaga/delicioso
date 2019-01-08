import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import 'typeface-roboto'

import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  @media screen and (min-width: 800px) {
    display: flex;
    justify-content: space-between;
  }
`

const LabelWrapper = styled.div`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`

const Label = styled.h1`
  font-family: 'Roboto';
  font-size: 12px;
  margin: 0px;
  text-transform: uppercase;
`

const LatestPosts = styled(PostList)`
  padding-top: 8px;

  @media screen and (min-width: 540px) {
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media screen and (min-width: 800px) {
    padding: 8px 0px;
  }
`

const Content = styled.div`
  @media screen and (min-width: 800px) {
    width: 60%;
  }
`

const Sidebar = styled.aside`
  @media screen and (min-width: 800px) {
    width: 35%;
  }
`

const IndexPage = ({ data }) => {
  const { edges: topRatedPosts } = data.TopRatedPosts
  const { edges: latestPosts } = data.LatestPosts

  return (
    <Layout>
      <Helmet>
        <title>Delicioso | Homepage</title>
      </Helmet>
      <Container>
        <Content>
          <LabelWrapper>
            <Label>Latest Articles</Label>
          </LabelWrapper>
          <LatestPosts items={latestPosts} />
        </Content>
        <Sidebar>
          <LabelWrapper>
            <Label>Top 3 Articles</Label>
          </LabelWrapper>
          <PostList items={topRatedPosts} isMini />
        </Sidebar>
      </Container>
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage

export const query = graphql`
  fragment fields on MarkdownRemarkEdge {
    node {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        rating
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 320, maxHeight: 240) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }

  query {
    TopRatedPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___rating] }
      limit: 3
    ) {
      edges {
        ...fields
      }
    }
    LatestPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 6
    ) {
      edges {
        ...fields
      }
    }
  }
`
