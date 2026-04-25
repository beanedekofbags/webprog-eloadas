import { createRoot } from 'react-dom/client'
import './reactspa.css'
import App from './SpaApp.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)