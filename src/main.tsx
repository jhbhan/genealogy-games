import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GenealogyGame from './GenealogyGame'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GenealogyGame />
  </StrictMode>,
)
