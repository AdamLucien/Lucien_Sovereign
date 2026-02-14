import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const SUPPORTED_LANGS = ['en', 'cs', 'de', 'uk', 'zh']
const pathLang = window.location.pathname.split('/').filter(Boolean)[0]
const initialLang = SUPPORTED_LANGS.includes(pathLang) ? pathLang : 'en'
const initialPath = window.location.pathname || `/${initialLang}/`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialLang={initialLang} initialPath={initialPath} />
  </StrictMode>,
)
