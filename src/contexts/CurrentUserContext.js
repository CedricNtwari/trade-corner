import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

export const useCurrentUser = () => useContext(CurrentUserContext)
export const useSetCurrentUser = () => useContext(SetCurrentUserContext)

export const CurrentUserprovider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const handleMount = async () => {
    try {
      const response = await axios.get('/auth/current_user')
      setCurrentUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}
