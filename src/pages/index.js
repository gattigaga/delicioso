import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import Layout from '../components/Layout'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const IndexPage = () => (
  <Layout>
    <Helmet>
      <title>Delicioso | Homepage</title>
    </Helmet>
    <Container />
  </Layout>
)

export default IndexPage
