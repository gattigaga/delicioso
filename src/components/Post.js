import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import Rating from 'react-star-rating-component'
import 'typeface-roboto'

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;

  ${({ isMini }) =>
    isMini &&
    `
    width: 100% !important;
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 8px;
  `}

  @media screen and (min-width: 540px) {
    width: 46vw;
  }

  @media screen and (min-width: 800px) {
    width: 23vw;
    margin-bottom: 20px;

    ${({ isMini }) =>
      isMini &&
      `
      padding: 8px 0px;
      margin-bottom: 0px;
    `}
  }
`

const Thumbnail = styled(Img)`
  width: 100%;
  height: 50vw;
  border: 1px solid #eee;
  box-sizing: border-box;

  ${({ isMini }) =>
    isMini &&
    `
    width: 96px !important;
    height: 96px !important;
  `}

  @media screen and (min-width: 540px) {
    height: 30vw;
  }

  @media screen and (min-width: 800px) {
    height: 18vw;
  }
`

const Content = styled.div`
  padding: 18px;

  ${({ isMini }) => isMini && 'padding: 12px !important;'}

  @media screen and (min-width: 800px) {
    padding: 12px 0px;
  }
`

const Title = styled.h1`
  font-family: 'Roboto';
  font-size: 20px;
  color: black;
  margin-top: 0px;
  margin-bottom: 4px;

  ${({ isMini }) => isMini && 'font-size: 14px !important;'}
`

const Date = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
  color: #999;
  margin-top: 0px;
  margin-bottom: 16px;

  ${({ isMini }) => isMini && 'margin-bottom: 8px;'}
`

const StyledLink = styled(Link)`
  text-decoration: none;
`
const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`

const RatingAmount = styled.span`
  font-family: 'Roboto';
  font-size: 10px;
  color: #999;
  margin-left: 6px;
`

const Post = ({ date, title, path, rating, thumbnail, isMini }) => {
  return (
    <StyledLink to={path}>
      <Container isMini={isMini}>
        <Thumbnail fluid={thumbnail} isMini={isMini} />
        <Content isMini={isMini}>
          <Title isMini={isMini}>{title}</Title>
          <Date isMini={isMini}>{date}</Date>
          <RatingWrapper>
            <Rating
              name="rating"
              value={rating}
              editing={false}
              emptyStarColor="#bbb"
            />
            <RatingAmount>({rating.toFixed(1)})</RatingAmount>
          </RatingWrapper>
        </Content>
      </Container>
    </StyledLink>
  )
}

Post.propTypes = {
  path: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.number,
  thumbnail: PropTypes.object,
  isMini: PropTypes.bool,
}

export default Post
