import React from 'react'
import { render, screen } from '@testing-library/react'
import Avatar from '../Avatar'

describe('Avatar Component', () => {
  test('renders an image with the correct src and alt attributes', () => {
    const src = 'https://example.com/avatar.jpg'
    const altText = 'avatar'

    render(<Avatar src={src} />)

    const imageElement = screen.getByAltText(altText)
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', src)
    expect(imageElement).toHaveAttribute('alt', altText)
  })

  test('renders with the correct default height and width', () => {
    const src = 'https://example.com/avatar.jpg'

    render(<Avatar src={src} />)

    const imageElement = screen.getByAltText('avatar')
    expect(imageElement).toHaveAttribute('height', '45')
    expect(imageElement).toHaveAttribute('width', '45')
  })

  test('renders with the correct custom height and width', () => {
    const src = 'https://example.com/avatar.jpg'
    const customHeight = 100

    render(<Avatar src={src} height={customHeight} />)

    const imageElement = screen.getByAltText('avatar')
    expect(imageElement).toHaveAttribute('height', customHeight.toString())
    expect(imageElement).toHaveAttribute('width', customHeight.toString())
  })

  test('renders the optional text if provided', () => {
    const src = 'https://example.com/avatar.jpg'
    const text = 'Username'

    render(<Avatar src={src} text={text} />)

    const textElement = screen.getByText(text)
    expect(textElement).toBeInTheDocument()
  })

  test('does not render text if not provided', () => {
    const src = 'https://example.com/avatar.jpg'

    render(<Avatar src={src} />)

    const imageElement = screen.getByAltText('avatar')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).not.toHaveTextContent()
  })
})
