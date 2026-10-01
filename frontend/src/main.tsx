import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthPage from './components/AuthPage.tsx'

function AuthGate() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem('retailmax-authenticated') === 'true'
  )

  const handleLogin = () => {
    localStorage.setItem('retailmax-authenticated', 'true')
    setAuthenticated(true)
  }

  if (!authenticated) {
    return <AuthPage onLogin={handleLogin} />
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthGate />
  </StrictMode>,
)