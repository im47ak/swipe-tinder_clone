// ALTERNATIVE APPROACH (More Complex)
// main.jsx would become:

import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import AppWrapper from './AppWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)

// AppWrapper.jsx (NEW FILE NEEDED)
import { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

export default function AppWrapper() {
  const [googleClientId, setGoogleClientId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch from backend
    fetch('/api/config/google-client-id')
      .then(res => res.json())
      .then(data => {
        setGoogleClientId(data.clientId)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load Google Client ID:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading Google OAuth...</div>
  }

  if (!googleClientId) {
    return <div>Error: Could not load Google OAuth configuration</div>
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

// PLUS: Backend endpoint needed
// api/routes/configRoutes.js
export const getGoogleClientId = (req, res) => {
  res.json({ clientId: process.env.GOOGLE_CLIENT_ID })
}
