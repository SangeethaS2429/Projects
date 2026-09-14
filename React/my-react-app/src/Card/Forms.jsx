
import "../Card/Card.css";
import { useState } from "react";

function Forms({
    setShowForm,
    setEditPost,
    addPost,
    updatePost,
    editPost,
    disabled,
    setDisabled
}) {
   
    const handleSubmit = (event) => {
        event.preventDefault();
        if (disabled) return;

        setDisabled(true);

        const title = document.getElementById("title").value;
        const body = document.getElementById("body").value;

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
        <div id="blurbg">

            <form
                autoComplete="off"
                id="form_data"
                onSubmit={handleSubmit}
            >

                <div id="OverallForm">

                    <div id="firstline">

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
                                setShowForm(false);
                                setEditPost(null);
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                    <hr />

                    <div id="content">

                        <label>Title</label>
                        <br />

                        <input
                            type="text"
                            id="title"
                            defaultValue={editPost ? editPost.title : ""}
                        />

                        <br />

                        <label>Body</label>
                        <br />

                        <input
                            type="text"
                            id="body"
                            defaultValue={editPost ? editPost.body : ""}
                        /><br />
                        <div id = "showMsg"></div>

                    </div>

                </div>

            </form>

        </div>
    );
}

export default Forms;