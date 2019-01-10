import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;

  @media screen and (min-width: 800px) {
    width: 60%;
  }
`

const Sidebar = styled.aside`
  @media screen and (min-width: 800px) {
    width: 35%;
  }
`

const Name = styled.h1`
  font-family: 'Roboto';
  font-size: 24px;
  color: black;
  text-align: center;
`

const Info = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  color: black;
  line-height: 1.5em;
  text-align: center;
`

const Photo = styled(Img)`
  border-radius: 100%;
  margin-bottom: 16px;
`

const AboutPage = ({ data }) => {
  const { edges: topRatedPosts } = data.TopRatedPosts

  return (
    <Layout>
      <Helmet>
        <title>Delicioso | About</title>
      </Helmet>
      <Container>
        <Content>
          <Photo fixed={data.Photo.childImageSharp.fixed} />
          <Name>Fried Chickenov</Name>
          <Info>
            Hi, my name is Fried Chickenov. I was a chef and now became Food
            Blogger. I already blogging from 2016. I like to going to restaurant
            to find delicious foods to review.
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

AboutPage.propTypes = {
  data: PropTypes.object,
}

export default AboutPage

export const query = graphql`
  query {
    Photo: file(relativePath: { eq: "profile.jpeg" }) {
      childImageSharp {
        fixed(width: 96, height: 96) {
          ...GatsbyImageSharpFixed
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
