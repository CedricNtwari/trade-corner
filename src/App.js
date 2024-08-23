import styles from './App.module.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { Container } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm'

function App() {
  return (
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
  )
}

export default App
