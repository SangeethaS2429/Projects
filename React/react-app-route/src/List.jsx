
import { useState } from 'react'
import Warning from './Warning'
import './Card.css'

function List({ posts, deletePost, handleEdit }) {
    const [popup, setShowPopup] = useState(false)
      
    

    return (
        <div id="cardss">
        <div className="information">
        

            <div id = "post_title"><h3>{posts.title}</h3></div>

            <div id = "post_body"><p>{posts.body}</p></div>

            <div className="buttons">

                <button className="btn"
                    id="editbtn"
                    onClick={() => handleEdit(posts)}>
                    Edit
                </button>

                <button className="btn"
                    id="deletebtn"
                    onClick={()=>{
                        setShowPopup(true)
                       
                        }}>
                    Delete
                </button>
                    
            </div>
        {popup && <Warning setShowPopup ={setShowPopup}
        deletePost={deletePost}
        postsId = {posts.id} />}
        
        </div>
        </div>
    )
}

export default List
