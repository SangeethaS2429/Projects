
import { useState } from 'react'
import Warning from './Warning'
import '../Card/Card.css'

function List({ posts, deletePost, handleEdit }) {
    const [popup, setShowPopup] = useState(false)
      
    

    return (
        <div className="information">

            <h3>{posts.title}</h3>

            <p>{posts.body}</p>

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
        
    )
}

export default List
