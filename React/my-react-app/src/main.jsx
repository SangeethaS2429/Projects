import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Card from '../src/Card/Card.jsx'


createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Card />
   
  //</StrictMode>,
)
