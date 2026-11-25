import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)
const sampleText = 'Salão de beleza, essência, cuidado & SPA'
const fontFaces = [
  ...['400', '500', '600', '700'].map((weight) => document.fonts.load(`${weight} 16px "DM Sans"`, sampleText)),
  ...['500', '600', '700'].map((weight) => document.fonts.load(`${weight} 32px "Cormorant Garamond"`, sampleText)),
]
const fontsLoaded = Promise.all(fontFaces).then(() => document.fonts.ready)
const fallbackTimer = new Promise<void>((resolve) => window.setTimeout(resolve, 3000))

void Promise.race([fontsLoaded, fallbackTimer])
  .catch(() => undefined)
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('fonts-pending')
      document.documentElement.classList.add('fonts-ready')
    })
  })
