import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import 'typeface-roboto'

const Container = styled.div`
  margin: 32px 12px;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 800px) {
    justify-content: space-between;
    margin: 32px 0px;
  }
`

const Item = styled.span`
  text-decoration: none;
  font-weight: bold;
  font-family: 'Roboto';
  font-size: 12px;
  color: #aaa;
`

const ItemLink = styled(Item.withComponent(Link))`
  color: black;
`

const Pagination = ({ prevLink, nextLink, isPrevDisabled, isNextDisabled }) => {
  const PrevItem = isPrevDisabled ? Item : ItemLink
  const NextItem = isNextDisabled ? Item : ItemLink

  return (
    <Container>
      <PrevItem to={prevLink} style={{ marginRight: 16 }}>
        PREVIOUS
      </PrevItem>
      <NextItem to={nextLink} style={{ marginLeft: 16 }}>
        NEXT
      </NextItem>
    </Container>
  )
}

Pagination.propTypes = {
  prevLink: PropTypes.string,
  nextLink: PropTypes.string,
  isPrevDisabled: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
}

export default Pagination
