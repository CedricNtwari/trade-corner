import styles from './App.module.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm'
import SignInForm from './pages/auth/SignInForm'
import ProductsPage from './pages/products/ProductsPage'
import ProfilePage from './pages/profiles/ProfilePage'
import HomePage from './pages/home/HomePage'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/cart" render={() => <h1>Shopping Cart</h1>} />
          <Route exact path="/products" component={ProductsPage} />
          <Route path="/profiles/:id" component={ProfilePage} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
