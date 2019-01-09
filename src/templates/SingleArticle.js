import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'
import Rating from 'react-star-rating-component'

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

const Title = styled.h1`
  font-family: 'Roboto';
  font-size: 32px;
  color: black;
  margin-top: 0px;
  margin-bottom: 4px;

  @media screen and (min-width: 800px) {
    font-size: 48px;
  }
`

const Date = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  color: #999;
  margin-top: 0px;
  margin-bottom: 16px;
`

const Thumbnail = styled(Img)`
  width: 100%;
  height: 50vw;
  border: 1px solid #eee;
  box-sizing: border-box;

  @media screen and (min-width: 800px) {
    height: 30vw;
  }
`

const Content = styled.div`
  font-family: 'Roboto';
  font-size: 16px;

  @media screen and (min-width: 800px) {
    width: 60%;
    padding-top: 16px;
  }
`

const Info = styled.div`
  padding: 16px;

  @media screen and (min-width: 800px) {
    padding: 24px 0px;
  }
`

const Sidebar = styled.aside`
  @media screen and (min-width: 800px) {
    width: 35%;
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

const Article = styled.div`
  margin-top: 24px;

  p {
    line-height: 1.5em;
  }

  @media screen and (min-width: 800px) {
    margin-top: 32px;
  }
`

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RatingAmount = styled.span`
  font-family: 'Roboto';
  font-size: 12px;
  color: #999;
  margin-left: 6px;
`

function SingleArticle({ data }) {
  const { edges: topRatedPosts } = data.TopRatedPosts
  const { frontmatter, html } = data.post
  const { date, title, rating, thumbnail } = frontmatter

  return (
    <Layout>
      <Helmet>
        <title>Delicioso | {title}</title>
      </Helmet>
      <Container>
        <Content>
          <Thumbnail fluid={thumbnail.childImageSharp.fluid} />
          <Info>
            <Title>{title}</Title>
            <Date>{date}</Date>
            <RatingWrapper>
              <Rating
                name="rating"
                value={rating}
                editing={false}
                emptyStarColor="#bbb"
              />
              <RatingAmount>({rating.toFixed(1)})</RatingAmount>
            </RatingWrapper>
            <Article dangerouslySetInnerHTML={{ __html: html }} />
          </Info>
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

SingleArticle.propTypes = {
  data: PropTypes.object,
}

export default SingleArticle

export const query = graphql`
  query SingleArticleQuery($path: String!) {
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        rating
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 640, maxHeight: 480) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    TopRatedPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___rating] }
      limit: 3
    ) {
      edges {
        ...fields
      }
    }
  }
`
