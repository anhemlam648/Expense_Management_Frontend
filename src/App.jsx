import { useState } from 'react'
import './App.css'
import loadingGif from './assets/images.png'

function App() {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(true)
  }, 5000)

  return (
    <div className="app-container">
      <h1>Welcome to Expense Management</h1>
      {loading ? (
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="content-container">
          <p>This is the main content of the application.</p>
        </div>
      )}
    </div>
  )
}
export default App
