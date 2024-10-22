import { render, waitFor } from '@testing-library/react'
import {
  CurrentUserprovider,
  useCurrentUser,
  useSetCurrentUser,
} from '../contexts/CurrentUserContext'
import { axiosRes } from '../api/axiosDefaults'
import React from 'react'

jest.mock('../api/axiosDefaults')

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
  it('should fetch current user data', async () => {
    axiosRes.get.mockResolvedValueOnce({
      data: { username: 'JohnDoe' },
    })

    const { getByTestId } = render(
      <CurrentUserprovider>
        <MockComponent />
      </CurrentUserprovider>,
    )

    await waitFor(() => {
      expect(getByTestId('current-user')).toHaveTextContent('JohnDoe')
    })
  })

  it('should set current user manually', async () => {
    const { getByTestId, getByText } = render(
      <CurrentUserprovider>
        <MockComponent />
      </CurrentUserprovider>,
    )

    getByText('Set User').click()

    await waitFor(() => {
      expect(getByTestId('current-user')).toHaveTextContent('JohnDoe')
    })
  })
})
