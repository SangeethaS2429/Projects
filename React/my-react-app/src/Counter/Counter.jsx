import { useState } from 'react'

import '../Counter/Counter.css'

function Counter() {
  const [count,setCount] = useState(0);
  const incrementCount = ()=>{
    setCount(count + 1);
  }
  const decrementCount = ()=>{
    
    setCount(count - 1);
    
  }
  
  return (
    <div>
      <h1 id = "counts">Counter : {count}</h1>
      <button onClick = {incrementCount} id = "increBtn">+</button>
      <button onClick = {decrementCount} disabled = {count <= 0} id='decreBtn'>-</button>
    </div>
  )
}

export default Counter