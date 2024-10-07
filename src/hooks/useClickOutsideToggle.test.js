import useClickOutsideToggle from '../hooks/useClickOutsideToggle'
import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'

const TestComponent = () => {
  const { menuOpen, setMenuOpen, searchOpen, setSearchOpen, menuRef, searchRef } =
    useClickOutsideToggle()

  useEffect(() => {
    setMenuOpen(true)
    setSearchOpen(true)
  }, [setMenuOpen, setSearchOpen])

  return (
    <div>
      <div ref={menuRef} data-testid="menu">
        {menuOpen ? 'Menu is open' : 'Menu is closed'}
      </div>
      <div ref={searchRef} data-testid="search">
        {searchOpen ? 'Search is open' : 'Search is closed'}
      </div>
    </div>
  )
}

describe('useClickOutsideToggle', () => {
  test('toggles menu and search visibility', () => {
    render(<TestComponent />)

    expect(screen.getByTestId('menu')).toHaveTextContent('Menu is open')
    expect(screen.getByTestId('search')).toHaveTextContent('Search is open')
  })
})
