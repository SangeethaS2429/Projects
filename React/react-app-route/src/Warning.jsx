

function Warning({setShowPopup,deletePost,postsId}){
    return(
        <div id="blurbg">
        
        <div id = "confirm_delete">
            <h2 id = "alertconfirm">Are you sure want to Delete</h2>
            <button onClick = {() =>{deletePost(postsId) 
                setShowPopup(false)}} id="ok-delete" className = "btn">Delete</button> 
            <button onClick={()=>setShowPopup(false)} id="close-confirm" className="btn">Cancel</button>
        </div>
        </div>
    )
}

export default Warning
