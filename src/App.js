import styles from './App.module.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.content}>{/* Your main content goes here */}</div>
      <Footer />
    </div>
  )
}

export default App
