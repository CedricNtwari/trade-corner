import { render, fireEvent, act } from '@testing-library/react'
import React from 'react'
import {
  CurrentUserprovider,
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext'

const MockComponent = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  return (
    <div>
      <div data-testid="current-user">{currentUser ? currentUser.username : 'No User'}</div>
      <button onClick={() => setCurrentUser({ username: 'JohnDoe' })}>Set User</button>
    </div>
  )
}

describe('CurrentUserContext', () => {
  it('should update and display current user', async () => {
    const { getByText, getByTestId } = render(
      <CurrentUserprovider>
        <MockComponent />
      </CurrentUserprovider>,
    )

    await act(async () => {
      fireEvent.click(getByText('Set User'))
    })

    expect(getByTestId('current-user')).toHaveTextContent('JohnDoe')
  })
})
