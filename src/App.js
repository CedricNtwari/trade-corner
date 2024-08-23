import styles from './App.module.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CurrentUserContext = createContext()
export const SetCurrentUserContext = createContext()

function App() {
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
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/cart" render={() => <h1>Shopping Cart</h1>} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
