import { useState } from 'react'

import '../FormDiv/Forms.css'


function FormsDiv() {
  const[data , setData] = useState({name:"",age:0,mobileNumber:""})
    

  return (
    <div id = "form-container">
      <form>
        <h1>Input Form </h1>
        <div>
        <label>Name</label><br></br>
        <input type='text'id = "name"  onChange ={(event)=>{setData({...data,name :event.target.value})}}></input><br></br>
        </div><br></br>
        <div>
        <label>Age</label><br></br>
        <input type='number' id = "age" onChange ={(event)=>{setData({...data,age :event.target.value})}}></input><br></br>
        </div><br></br>
        <div>
        <label>Mobile Number</label><br></br>
        <input type='text'id = "mobileNumber" onChange ={(event)=>{setData({...data,mobileNumber :event.target.value})}}></input><br></br>
        </div><br></br>
        
      </form>

      <div id="div-container">
        <p>Name: {data.name}</p>
        <p>Age: {data.age}</p>
        <p>MobileNumber: {data.mobileNumber}</p>
      </div>
    </div>
  )
}

export default FormsDiv