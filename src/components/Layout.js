import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import styled from 'styled-components'
import { Menu as IconMenu } from '@material-ui/icons'
import { Link } from 'gatsby'
import 'normalize.css'
import 'typeface-roboto'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  @media screen and (min-width: 800px) {
    width: 80%;
  }
`

const Header = styled.header`
  width: 100%;
  position: relative;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 18px;
`

const Title = styled.h1`
  font-size: 22px !important;
  font-family: 'Roboto';
  text-align: center;
  letter-spacing: -1px;
  margin: 0px;
`

const StyledIconMenu = styled(IconMenu)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);

  @media screen and (min-width: 800px) {
    display: none !important;
  }
`

const StyledDrawer = styled(Drawer)`
  @media screen and (min-width: 800px) {
    display: none;
  }
`

const Menu = styled.nav`
  border-bottom: 1px solid black;
  height: 32px;
  display: none;

  @media screen and (min-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 18px;
  }
`

const MenuItem = styled.li`
  display: inline-block;
  margin-right: 24px;
`

const MenuLink = styled(Link)`
  font-family: 'Roboto';
  font-size: 12px;
  color: black;
  text-decoration: none;
`

const Footer = styled.footer`
  width: 100%;
  height: 48px;
  border-top: 1px solid black;
  display: flex;
`

const Copyright = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
  color: black;
  margin: auto;
`

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 'home',
      isMenuOpen: false,
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }))
  }

  render() {
    const { children } = this.props
    const { page, isMenuOpen } = this.state

    return (
      <Container>
        <StyledDrawer open={isMenuOpen} onClose={this.toggleMenu}>
          <List>
            <MenuLink to="/">
              <ListItem selected={page === 'home'} button>
                <ListItemText primary="Home" />
              </ListItem>
            </MenuLink>
            <MenuLink to="/articles">
              <ListItem selected={page === 'articles'} button>
                <ListItemText primary="Articles" />
              </ListItem>
            </MenuLink>
            <MenuLink to="/about">
              <ListItem selected={page === 'about'} button>
                <ListItemText primary="About" />
              </ListItem>
            </MenuLink>
          </List>
        </StyledDrawer>
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              <Header>
                <a href="#" onClick={this.toggleMenu}>
                  <StyledIconMenu fontSize="default" />
                </a>
                <Title>Delicioso</Title>
              </Header>
              <Menu>
                <MenuItem>
                  <MenuLink to="/">Home</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink to="/articles">Articles</MenuLink>
                </MenuItem>
                <MenuItem>
                  <MenuLink to="/about">About</MenuLink>
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
            <Grid item xs={12}>
              <Footer>
                <Copyright>
                  Copyright &copy; 2019 - Gattigaga Hayyuta Dewa
                </Copyright>
              </Footer>
            </Grid>
          </Grid>
        </Wrapper>
      </Container>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
