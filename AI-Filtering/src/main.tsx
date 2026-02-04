import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { KatalystProvider } from '@koddidev/katalyst-ui'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KatalystProvider>
      <App />
    </KatalystProvider>
  </StrictMode>,
)
