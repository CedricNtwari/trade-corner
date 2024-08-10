import React, { useState, useRef, useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/tc-high-resolution-logo-transparent.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const menuRef = useRef(null)
  const searchRef = useRef(null)
  const dropdownRef = useRef(null)

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

  return (
    <>
      <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container className={styles.container}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`ml-auto text-left ${styles.navContent}`}>
              {/* Mobile Links Directly in Navbar */}
              <div className="d-md-none">
                <Nav.Link href="#home">
                  <i className="fas fa-home"></i>
                  <span className={styles.navLinkText}>Home</span>
                </Nav.Link>
                <Nav.Link href="#about">
                  <i className="fas fa-info-circle"></i>
                  <span className={styles.navLinkText}>About</span>
                </Nav.Link>
                <Nav.Link href="#contact">
                  <i className="fas fa-envelope"></i>
                  <span className={styles.navLinkText}>Contact</span>
                </Nav.Link>
                <Nav.Link href="#signin">
                  <i className="fas fa-sign-in-alt"></i>
                  <span className={styles.navLinkText}>Sign in</span>
                </Nav.Link>
                <Nav.Link href="#signup">
                  <i className="fas fa-user-plus"></i>
                  <span className={styles.navLinkText}>Sign up</span>
                </Nav.Link>
                <div className={styles.searchWrapper} ref={searchRef}>
                  <Nav.Link
                    onClick={handleSearchToggle}
                    className={styles.searchLink}
                    role="button"
                    aria-label="search"
                  >
                    <i className="fas fa-search"></i>
                  </Nav.Link>
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
                  <Nav.Link className={styles.navLinkCart} href="#cart">
                    <i className="fas fa-shopping-cart"></i>
                    <span className={styles.cartCount}>{cartCount}</span>
                  </Nav.Link>
                </div>
              </div>
              {/* Desktop Links as Dropdown Menu */}
              <div className={`d-none d-md-flex ${styles.desktopMenu}`}>
                <div className={styles.searchWrapper} ref={searchRef}>
                  <Nav.Link onClick={handleSearchToggle} className={styles.searchLink}>
                    <i className="fas fa-search"></i>
                  </Nav.Link>
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
                  <Nav.Link
                    className={styles.navLinkCart}
                    href="#cart"
                    role="link"
                    aria-label="shopping-cart"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className={styles.cartCount}>{cartCount}</span>
                  </Nav.Link>
                </div>
                <div className={styles.menuWrapper} ref={menuRef}>
                  <Nav.Link onClick={handleMenuToggle} className={styles.menuLink}>
                    <span className={styles.navLinkText}>Menu </span>
                    <i className="fas fa-bars"></i>
                  </Nav.Link>
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
          <Nav.Link href="#home">
            <i className="fas fa-home"></i>
            <span className={styles.navLinkText}>Home</span>
          </Nav.Link>
          <Nav.Link href="#about">
            <i className="fas fa-info-circle"></i>
            <span className={styles.navLinkText}>About</span>
          </Nav.Link>
          <Nav.Link href="#contact">
            <i className="fas fa-envelope"></i>
            <span className={styles.navLinkText}>Contact</span>
          </Nav.Link>
          <Nav.Link href="#signin">
            <i className="fas fa-sign-in-alt"></i>
            <span className={styles.navLinkText}>Sign in</span>
          </Nav.Link>
          <Nav.Link href="#signup">
            <i className="fas fa-user-plus"></i>
            <span className={styles.navLinkText}>Sign up</span>
          </Nav.Link>
        </Nav>
      </div>
    </>
  )
}

export default NavBar
