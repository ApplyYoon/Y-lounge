import { useState, useEffect } from 'react'
import './App.css'
import GuestHome from './components/GuestHome'
import UserHome from './components/UserHome'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://172.21.102.46:8080/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then(data => setUser(data))
      .catch(err => console.log("Session validation failed", err));
  }, []);

  const handleLogin = () => {
    // After login, fetch user data
    fetch('http://172.21.102.46:8080/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Login verification failed");
      })
      .then(data => setUser(data))
      .catch(console.error);
  }

  const handleLogout = () => {
    fetch('http://172.21.102.46:8080/api/auth/logout', { method: 'POST', credentials: 'include' })
      .finally(() => setUser(null));
  }

  return (
    <>
      {user ? (
        <UserHome user={user} onLogout={handleLogout} />
      ) : (
        <GuestHome onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
