import { useEffect, useState } from 'react'
import List from './List.jsx'
import './Card.css'
import { MdAutorenew,MdSearch ,MdArrowBack   } from "react-icons/md"
import Forms from './Forms.jsx'

import { useNavigate,useLocation  } from "react-router-dom";
function Card() {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [err, setError] = useState(false)
    
    const [editPost, setEditPost] = useState(null)
    const [newPost, setNewPost] = useState([])
    const[disabled, setDisabled] = useState(false)
    const [searchTitle, setSearchTitle] = useState("")
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
//Pagination
const [currentPage,setCurrentPage] = useState(1)
const postPerPage = 10
const lastIndexofPage = currentPage * postPerPage
const firstIndexofPage = (currentPage - 1) * postPerPage
const totalPage = Math.ceil(data.length /postPerPage)
const paginate = (page)=>{setCurrentPage(page)}

const isAddPage = location.pathname === "/posts/Add";;
const isUpdatePage = location.pathname.includes("/edit");
// const filteredData = data.filter((post) =>
//     searchTitle === ""
//         ? true
//         : post.title.toLowerCase() === searchTitle.toLowerCase()
// )
const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchTitle.toLowerCase())
)
const currentPost = filteredData.slice(firstIndexofPage,lastIndexofPage)
   
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
            navigate("/Posts")
            
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
    setDisabled(false)
    navigate(`/posts/${post.id}/edit`, { state: { post } })
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

        
        
        setDisabled(false)
        navigate("/Posts" )
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

           
            
            setDisabled(false)
            navigate("/Posts")
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
if (isAddPage || isUpdatePage) {
    return (
        <Forms
           
            addPost={addPost}
            updatePost={updatePost}
            editPost={editPost || location.state?.post}
            setEditPost={setEditPost}
            disabled={disabled}
            setDisabled={setDisabled}
        />
    )
}
    return (
        load
            ? <div className="loader-container"> <div className="spinner"></div></div>
            : err
                ? <h1 className="msg">No data Found</h1>
                :
                <div id="data-container">

                    <div id="button-container">

                 
                    <div id="search-container">
                    {!showSearch ? (
                    <MdSearch
                    size={24}
                    onClick={() => setShowSearch(true)}
                    />
                ) : (
                    <input
                    id="search"
                    type="search"
                    placeholder="Search title"
                    value={searchTitle}
                    
                onChange={(event) => {setSearchTitle(event.target.value);setCurrentPage(1);}}

                    autoFocus
                    />
                )}
                {showSearch &&
        searchTitle.trim() !== "" &&
        filteredData.length === 0 && (
            <p>No records found</p>
        )
    }

            </div>


                       <button className="btn" id="refreshbtn" 
                        type="button" onClick={() => window.location.reload()} title="Refresh Posts">
                      <MdAutorenew size={24} />
                    </button>

                        <button className="btn"
                            id="addbtn"
                            onClick={() => {
                            setEditPost(null);
                            setDisabled(false);
                            navigate("/posts/Add");
                        }}
                        >
                            + ADD NEW POST
                        </button>

                    </div>
                    
                    
                    

                    {
                        currentPost.map((posts) => {
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
                    
                <div id = "pagination">
                    <button className ="pageBtns" onClick={()=> paginate(1)}>First</button> 
                    <button className ="pageBtns" disabled={currentPage == 1} onClick={()=> paginate(currentPage - 1)}>Previous</button>
                   {new Array(totalPage).fill(0).map((_,index) => {
                        return (
                            <button  className = { currentPage == index+1? "active1":"numBtns"} onClick={() => paginate(index+1)} key={index+1}>{index + 1}</button>
                        );
                   })}
                     
                    <button className ="pageBtns" disabled={currentPage == totalPage}onClick={()=> paginate(currentPage + 1)}>Next</button>
                     <button className ="pageBtns" onClick={()=> paginate(totalPage)}>Last</button>  
                </div>
                </div>
    )
}

export default Card