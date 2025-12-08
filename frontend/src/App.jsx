import { useState, useEffect } from 'react'
import './App.css'
import GuestHome from './components/GuestHome'
import UserHome from './components/UserHome'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) setIsLoggedIn(true);
      })
      .catch(err => console.log("Session validation failed", err));
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    fetch('http://localhost:8080/api/auth/logout', { method: 'POST', credentials: 'include' })
      .finally(() => setIsLoggedIn(false));
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
