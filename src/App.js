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
import FAQ from './pages/footer/FAQ'
import TermsConditions from './pages/footer/TermsConditions'
import PrivacyPolicy from './pages/footer/PrivacyPolicy'
import ContactUs from './pages/footer/ContactUs'
import AddProduct from './pages/products/AddProductForm'
import EditProductPage from './pages/products/EditProductPage'
import ProductDetailsPage from './pages/products/ProductDetailPage'
import CartPage from './pages/cart/CartPage'
import PaymentSuccess from './pages/checkout/PaymentSuccess'
import PaymentFailure from './pages/checkout/PaymentFailure'
import OrderPage from './pages/orders/OrderPage'
import PageNotFound from './pages/pageNotFound/PageNotFound'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/cart" component={CartPage} />
          <Route path="/payment-success" component={PaymentSuccess} />
          <Route path="/payment-failure" component={PaymentFailure} />
          <Route exact path="/products" component={ProductsPage} />
          <Route path="/profiles/:id" component={ProfilePage} />
          <Route exact path="/order-history" component={OrderPage} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/terms-and-conditions" component={TermsConditions} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/contact-us" component={ContactUs} />
          <Route exact path="/add-product" component={AddProduct} />
          <Route path="/products/edit/:id" component={EditProductPage} />
          <Route path="/products/:id" component={ProductDetailsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
