import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Post from './Post'

const Empty = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  color: black;
  text-align: center;
`

const PostList = ({ className, items, isMini }) => (
  <div className={className}>
    {items.map(item => {
      const { id, frontmatter } = item.node
      const { thumbnail } = frontmatter

      return (
        <Post
          key={id}
          {...frontmatter}
          thumbnail={thumbnail.childImageSharp.fluid}
          isMini={isMini}
        />
      )
    })}
    {!items.length && <Empty>No posts were found.</Empty>}
  </div>
)

PostList.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  isMini: PropTypes.bool,
}

PostList.defaultProps = {
  item: [],
}

export default PostList
