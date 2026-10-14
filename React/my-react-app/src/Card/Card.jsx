import { useEffect, useState } from 'react'
import List from './List'
import '../Card/Card.css'
import { MdRefresh } from "react-icons/md"
import Forms from './Forms'

function Card() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [err, setError] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [editPost, setEditPost] = useState(null)
    const [newPost, setNewPost] = useState([])
     const[disabled, setDisabled] = useState(false)
   
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch")
                }

                return res.json()
            })
            .then(datas => {
                setData(datas)
                setLoad(false)
            })
            .catch(() => {
                setError(true)
                setLoad(false)
            })
    }, [])

    // POST - Add new post
    const addPost = (title, body) => {

        const formData = {
            title: title,
            body: body,
            userId: 1
        }

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to add post")
                }

                return res.json()
            })
           .then(apiPost => {

            // Create our own unique ID
            const newPost = {
                ...apiPost,
                id: Date.now()
            }

            setData(prevData => [newPost, ...prevData])

            setNewPost(prevPosts => [newPost, ...prevPosts])

            setShowForm(false)
        })
            .catch(() => {
                setError(true)
            })
    }
    // DELETE - delete a Post
    const deletePost = (id) => {
        fetch(
        "https://jsonplaceholder.typicode.com/posts/" +id,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }
        )   
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to delete post")
                }

                return res.json()
            })
            .then(() => {
            const index = data.findIndex(post => post.id === id)

            const newData = [...data]

            newData.splice(index, 1)

            setData(newData)
            })
            .catch(() => {
                setError(true)
            })

        }
    // PUT -- update the post
const handleEdit = (post) => {
    setEditPost(post)
    setShowForm(true)
}

const updatePost = (id, title, body) => {

    // Check whether this post was newly added
    const isNewPost = newPost.some(post => post.id === id)

    // NEW POST
    if (isNewPost) {

        setData(prevData =>
            prevData.map(post =>
                post.id === id
                    ? {
                        ...post,
                        title: title,
                        body: body
                    }
                    : post
            )
        )

        // Also update the copy in newPost
        setNewPost(prevPosts =>
            prevPosts.map(post =>
                post.id === id
                    ? {
                        ...post,
                        title: title,
                        body: body
                    }
                    : post
            )
        )

        setShowForm(false)
        setEditPost(null)

        return
    }

    // EXISTING POST
    const formData = {
        id: id,
        title: title,
        body: body,
        userId: 1
    }

    fetch(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
    )
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to update post")
            }

            return res.json()
        })
        .then(updatedPost => {

            setData(prevData =>
                prevData.map(post =>
                    post.id === id
                        ? updatedPost
                        : post
                )
            )

            setShowForm(false)
            setEditPost(null)
        })
        .catch(() => {
            const msg = document.getElementById("showMsg")

            if (msg) {
                msg.innerHTML =
                    "<p id='updmsg'>Failed to Update data</p>" 
                    setDisabled(false) 
                    
            }
            
        })
}
    return (
        load
            ? <div className="loader-container"> <div className="spinner"></div></div>
            : err
                ? <h1 className="msg">No data Found</h1>
                :
                <div id="data-container">

                    <div id="button-container">

                        <button className="btn"
                            id="refreshbtn"
                            onClick={() => window.location.reload()}
>
                            <MdRefresh /> REFRESH
                        </button>

                        <button className="btn"
                            id="addbtn"
                            onClick={() => setShowForm(true)}
                        >
                            + ADD
                        </button>

                    </div>
                    
                    
                    {showForm &&
                        <Forms
                        setShowForm={setShowForm}
                        addPost={addPost}
                        updatePost={updatePost}
                        editPost={editPost}                        
                        setEditPost={setEditPost}
                        setDisabled={setDisabled}
                        
    />
}

                    {
                        data.map((posts) => {
                            return (
                                <List
                                    key={posts.id}
                                    posts={posts}
                                    deletePost = {deletePost}
                                    handleEdit={handleEdit}
                                
                                />
                            )
                        })
                    }

                </div>
    )
}

export default Card