import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/tc-high-resolution-logo-transparent.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
              <i className="fas fa-home"></i>
              <span className={styles.navLinkText}>Home</span>
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-sign-in-alt"></i>
              <span className={styles.navLinkText}>Sign in</span>
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user-plus"></i>
              <span className={styles.navLinkText}>Sign up</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar
