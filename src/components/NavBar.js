import React, { useState, useRef, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/tc-high-resolution-logo-transparent.png'
import styles from '../styles/NavBar.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import Avatar from './Avatar'
import axios from 'axios'
import AlertMessage from './AlertMessage'
import { useCart, useSetCart } from '../contexts/CartContext'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [alert, setAlert] = useState({ message: '', variant: '', show: false })
  const menuRef = useRef(null)
  const searchRef = useRef(null)
  const dropdownRef = useRef(null)
  const history = useHistory()
  const { cartCount } = useCart()
  const { clearCart } = useSetCart()

  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  // TODO: Refactor the NavBar component to use useClickOutsideToggle hook for handling click outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev)
  }

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev)
  }

  const closeMenu = () => {
    const toggle = document.querySelector('.navbar-toggler')
    if (toggle) {
      toggle.click()
    }
  }

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/')
      setCurrentUser(null)
      clearCart()
      setAlert({ message: 'You signed out successfully.', variant: 'success', show: true })
      setTimeout(() => {
        setAlert({ message: '', variant: '', show: false })
      }, 2000)
      history.push('/')
    } catch (err) {
      // console.log(err)
    }
  }

  const closeAlert = () => setAlert({ ...alert, show: false })

  const shopNowIcon = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/products/">
        <i className="fas fa-store"></i>Shop Now
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/add-product/">
        <i className="fas fa-plus-circle"></i>Add Product
      </NavLink>
    </>
  )

  const loggedInIcons = (
    <>
      <NavLink
        data-testid="desktop-profile"
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => setMenuOpen(false)}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
      <NavLink className={styles.NavLink} to="/order-history" onClick={() => setMenuOpen(false)}>
        <i className="fas fa-receipt"></i> Orders
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={() => {
          handleSignOut()
          setMenuOpen(false)
        }}
        data-testid="desktop-signout"
      >
        <i className="fas fa-sign-out-alt"></i> Sign out
      </NavLink>
    </>
  )
  const loggedInIconsMobile = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/products/"
        onClick={closeMenu}
      >
        <i className="fas fa-store"></i>Shop Now
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/add-product/"
        onClick={closeMenu}
      >
        <i className="fas fa-plus-circle"></i>Add Product
      </NavLink>
      <NavLink
        data-testid="mobile-profile"
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={closeMenu}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
      <NavLink className={styles.NavLink} to="/order-history" onClick={closeMenu}>
        <i className="fas fa-receipt"></i> Orders
      </NavLink>
      <NavLink
        data-testid="mobile-signout"
        className={styles.NavLink}
        to="/"
        onClick={() => {
          handleSignOut()
          closeMenu()
        }}
      >
        <i className="fas fa-sign-out-alt"></i> Sign out
      </NavLink>
    </>
  )

  const loggedOutIcons = (
    <>
      <NavLink
        data-testid="desktop-signin"
        to="/signin"
        activeClassName={styles.Active}
        onClick={() => setMenuOpen(false)}
      >
        <i className="fas fa-sign-in-alt"></i>
        <span className={styles.navLinkText}>Sign in</span>
      </NavLink>
      <NavLink to="/signup" activeClassName={styles.Active} onClick={() => setMenuOpen(false)}>
        <i className="fas fa-user-plus"></i>
        <span className={styles.navLinkText}>Sign up</span>
      </NavLink>
    </>
  )

  const loggedOutIconsMobile = (
    <>
      <NavLink
        data-testid="mobile-signin"
        to="/signin"
        activeClassName={styles.Active}
        onClick={closeMenu}
      >
        <i className="fas fa-sign-in-alt"></i>
        <span className={styles.navLinkText}>Sign in</span>
      </NavLink>
      <NavLink to="/signup" activeClassName={styles.Active} onClick={closeMenu}>
        <i className="fas fa-user-plus"></i>
        <span className={styles.navLinkText}>Sign up</span>
      </NavLink>
    </>
  )

  return (
    <>
      {alert.show && (
        <div className={styles.AlertWrapper}>
          <AlertMessage message={alert.message} variant={alert.variant} onClose={closeAlert} />
        </div>
      )}

      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container className={styles.container}>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="45" />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`ml-auto text-left ${styles.navContent}`}>
              {/* Mobile Links Directly in Navbar */}
              <div className={`d-md-none ${styles.OpenNavMobile}`} ref={dropdownRef}>
                <NavLink exact to="/" activeClassName={styles.Active} onClick={closeMenu}>
                  <i className="fas fa-home"></i>
                  <span className={styles.navLinkText}>Home</span>
                </NavLink>
                {currentUser ? loggedInIconsMobile : loggedOutIconsMobile}
                <div className={styles.searchWrapper} ref={searchRef}>
                  <button
                    onClick={handleSearchToggle}
                    className={`${styles.searchLink} ${searchOpen ? styles.searchLinkActive : ''}`}
                    aria-label="search"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                  {searchOpen && (
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`${styles.searchInput} ${
                        searchOpen ? styles.searchInputOpen : ''
                      }`}
                      autoFocus
                    />
                  )}
                </div>
                {/* Cart Icon and Count */}
                <div className={styles.cartWrapper}>
                  <NavLink
                    className={styles.navLinkCart}
                    activeClassName={styles.Active}
                    role="link"
                    aria-label="shopping-cart"
                    onClick={closeMenu}
                    to="/cart"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className={styles.cartCount}>{cartCount}</span>
                  </NavLink>
                </div>
              </div>
              {/* Desktop Links as Dropdown Menu */}
              <div className={`d-none d-md-flex ${styles.desktopMenu}`}>
                {currentUser && shopNowIcon}
                <div className={styles.searchWrapper} ref={searchRef}>
                  <button
                    onClick={handleSearchToggle}
                    className={`${styles.searchLink} ${searchOpen ? styles.searchLinkActive : ''}`}
                    aria-label="search"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                  {searchOpen && (
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`${styles.searchInput} ${
                        searchOpen ? styles.searchInputOpen : ''
                      }`}
                      autoFocus
                    />
                  )}
                </div>
                <div className={styles.cartWrapper}>
                  <NavLink
                    className={styles.navLinkCart}
                    to="/cart"
                    role="link"
                    aria-label="shopping-cart"
                    activeClassName={styles.Active}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className={styles.cartCount}>{cartCount}</span>
                  </NavLink>
                </div>
                <div className={styles.menuWrapper} ref={menuRef}>
                  <button
                    onClick={handleMenuToggle}
                    className={`${styles.menuLink} ${menuOpen ? styles.menuLinkActive : ''}`}
                    data-testid="menu-button"
                  >
                    <span className={styles.navLinkText}>Menu </span>
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Backdrop for desktop when dropdown is open */}
      {menuOpen && <div className={`${styles.backdrop} ${styles.backdropOpen}`} />}

      {/* Dropdown menu for desktop */}
      <div
        className={`${styles.dropdownMenu} ${menuOpen ? styles.dropdownMenuOpen : ''}`}
        ref={dropdownRef}
        data-testid="dropdown-menu"
      >
        <Nav className="flex-column">
          <NavLink exact to="/" activeClassName={styles.Active} onClick={() => setMenuOpen(false)}>
            <i className="fas fa-home"></i>
            <span className={styles.navLinkText}>Home</span>
          </NavLink>
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </div>
    </>
  )
}

export default NavBar
