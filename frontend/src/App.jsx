import { useState } from 'react'
import './App.css'
import GuestHome from './components/GuestHome'
import UserHome from './components/UserHome'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <>
      {isLoggedIn ? (
        <UserHome onLogout={handleLogout} />
      ) : (
        <GuestHome onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
