import { useState } from 'react'

import '../FormDiv/Forms.css'


function Forms() {
  const[data , setData] = useState({name:"",age:0,mobileNumber:""})
    
  const savebtn = (event)=>{
    event.preventDefault()
    console.log (data)
    
  }
  return (
    <div id = "form-container">
      <form>
        <h1>Input Form </h1>
        <div>
        <label>Name</label><br></br>
        <input type='text' onChange ={(event)=>{setData({...data,name :event.target.value})}}></input><br></br>
        </div><br></br>
        <div>
        <label>Age</label><br></br>
        <input type='number' onChange ={(event)=>{setData({...data,age :event.target.value})}}></input><br></br>
        </div><br></br>
        <div>
        <label>Mobile Number</label><br></br>
        <input type='text' onChange ={(event)=>{setData({...data,mobileNumber :event.target.value})}}></input><br></br>
        </div><br></br>
        <div>
        <button onClick = {savebtn}>Save</button><br></br>
        </div>
      </form>
    </div>
  )
}

export default Forms