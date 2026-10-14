
import "./Card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  MdArrowBack   } from "react-icons/md"
function Forms({
    
    setEditPost,
    addPost,
    updatePost,
    editPost,
    disabled,
    setDisabled
}) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (disabled) return;

        
        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;
        if (title === "" || body === "") {

            if (title === "") {
                document.getElementById("titleError").innerHTML ="*Please fill this field";
                document.getElementById("titleError").style.visibility = "visible";
                
                
            } else {
                document.getElementById("titleError").innerHTML = "";
                document.getElementById("titleError").style.visibility = "hidden";
            }

            if (body === "") {
                document.getElementById("bodyError").innerHTML ="*Please fill this field";
                document.getElementById("bodyError").style.visibility = "visible";
            } else {
                document.getElementById("bodyError").innerHTML = "";
                document.getElementById("bodyError").style.visibility = "hidden";
            }

        return;
    }
        setDisabled(true);

        // If editing
        if (editPost) {
            updatePost(editPost.id, title, body);
        }
        // If adding
        else {
            addPost(title, body);
        }
    };


    return (
        

            <form
                autoComplete="off"
                id="form_data"
                onSubmit={handleSubmit}
            >

                <div id="OverallForm">

                    <div id="firstline">
                    <button className="btn"
                            id="backbtn"
                            type="button"
                            disabled = {disabled  }
                            onClick={() => {
                           
                            setEditPost(null);
                            navigate("/Posts");
                        }}
                        ><MdArrowBack /></button>
                        <h3 id="addpost">
                            {editPost ? "EDIT POST" : "ADD POSTS"}
                        </h3>
                        

                        <button className="btn"
                            id="savebtn"
                            type="submit" 
                            disabled ={disabled}
                        >
                            Save
                        </button>

                        <button className="btn"
                            id="cancelbtn"
                            type="button"
                            disabled = {disabled  }
                            onClick={() => {
                           
                            setEditPost(null);
                            navigate("/Posts");
                        }}
                        >
                            Cancel
                        </button>

                    </div>

                   

                    <div id="content">

                        <label>Title</label>
                        <br />

                        <input
                            type="text"
                            id="title"
                            defaultValue={editPost ? editPost.title : ""}
                        />
                        <p id="titleError"> </p>
                            
                        <br />

                        <label>Body</label>
                        <br />

                        <textarea
                            id="body"
                            defaultValue={editPost ? editPost.body : "" }
                        />
                        <p id="bodyError"> </p>
                         
                    </div>

                </div>

            </form>

        
    );
}

export default Forms;