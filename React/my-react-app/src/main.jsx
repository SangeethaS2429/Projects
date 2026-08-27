import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import Forms from '../src/FormDiv/Forms.jsx'
//import Counter from '../src/Counter/Counter.jsx'
// import FormsDiv from '../src/FormDiv/FormsDiv.jsx'
import Card from '../src/Card/Card.jsx'


createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Card />
    // <FormsDiv />
    // <Forms />
    // <Counter />
  //</StrictMode>,
)
