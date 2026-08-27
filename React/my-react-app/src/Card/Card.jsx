import { useEffect,useState } from 'react'

import '../Card/Card.css'

function Card() {
  const[data,setData] = useState([])
  const[load, setLoad] = useState(true)
  const[err, setError] = useState(false)
  
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res =>{
        if (res.ok){
            return res.json()
        }
        setError(true)
        setLoad(false)
    })
    .then(datas =>{
        setData(datas)
        setLoad(false)
    })
    .catch((error)=>{
        setError(true)
        setLoad(false)
    })
    
    })
    return(
        load?<h1 className = "msg">Loading....</h1>: err?<h1 className = "msg">No data Found</h1>:
        <div  id = "data-container">{
        data.map((posts)=>{
        return (
            <div className = "information" key={posts.id}  >
            <h3>{posts.title}</h3>
            <p>{posts.body}</p>
            <div className = "buttons">
            <button id ="editbtn">Edit</button> <button id = "deletebtn">Delete</button>
            </div>
        </div>
        )
    })}</div>)
}

export default Card

