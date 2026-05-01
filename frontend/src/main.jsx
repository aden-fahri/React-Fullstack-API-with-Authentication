import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import AppProvider from './Context/appContext'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
)
