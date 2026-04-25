import { createRoot } from 'react-dom/client'
import './react.css'
import App from './AxiosApp.jsx'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)