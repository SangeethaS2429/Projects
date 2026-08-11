var info = "";
var apiData = [];
var div_ctn = document.getElementById("posts-container");
var load = `<h1 id = "load_msg">Loading.....</h1>`;
var error_msg = `<h1 id = "error_msg">Failed to Fetch Data</h1>`
var deleteError = `<div id = "delete_ctn">
    <h1 id="deleteFail">Failed to  delete</h1>
    <button onclick = "closedelete()" id="deleteclose">close</button>
</div>`;
var confirm_msg =  `<div id = "confirm_delete">
    <h2 id = "alertconfirm">Are you sure want to Delete</h2>
    <button onclick = "okDelete()" id="ok-delete">Ok</button> 
    <button onclick = "closeconfirm()" id="close-confirm">Cancel</button>
</div>`;

document.getElementById("deleteBlock").innerHTML += deleteError;
document.getElementById("deleteBlock").innerHTML += confirm_msg;

var selectedIndex;

div_ctn.innerHTML = load;

//Get Api
function getapi() {
    
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        throw new Error("Failed to fetch data");        
        })
        .then(data => {
            apiData = data;
            displayData();
        })
        .catch(error => { 
            div_ctn.innerHTML = error_msg
        })
}

window.onload = getapi;

//Creating form
var addForm = `<form autocomplete = "off" onsubmit = "selectformaction(event)" id ="form_data">
<div id ="OverallForm">                
<div id = "firstline"> <h3 id=addpost>ADD POSTS</h3> <button id = "savebtn" type="submit">Save</button><button  id = "cancelbtn" type="button" onclick="closeforms()">Cancel</button></div>
                <hr>                 
                <div id = "content">
                <label>Title</label><br>
                <input type = "text" id= "title"><br>
                <label>Body</label><br>
                <input type = "text" id= "body"><br>
                </div> 
                <br><div id = "showmsg"></div>
                </div>
                </form>`
document.getElementById("AddFormContainer").innerHTML += addForm

//Add Form
function formsData() {
    var addform = document.getElementById("form_data")
    var blurbg = document.getElementById("blurbg")
    blurbg.style.display = "block"
    addform.style.display = "block"
}

//close Form
function closeforms() {
    var addform = document.getElementById("form_data")
    var blurbg = document.getElementById("blurbg")
    clearform()
    document.getElementById("showmsg").style.display = "none"
    addform.style.display = "none"
    blurbg.style.display = "none"
}

//clear form data
function clearform() {
    document.getElementById("form_data").reset()
}
//select Form action 
function selectformaction(event) {
    event.preventDefault();
    console.log("SAVE BUTTON CLICKED");
    if (selectedIndex == undefined) {
        postapi();
    } else {
        putapi();
    }
}
//Onsubmit Form action
function postapi() {
    var msg = document.getElementById("showmsg");
    msg.innerHTML = "<p>Loading.....</p>";
    msg.style.display = "block";
    var formData = {}
    formData.title = document.getElementById("title").value
    formData.body = document.getElementById("body").value
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Failed to fetch data");

        })
        .then((data) => {
            data.isNew = true
            apiData.unshift(data);
            displayData();
            clearform()
            closeforms();
        })
        .catch((error) => {
            var msg = document.getElementById("showmsg");
            msg.innerHTML = "<p>Failed to Post Data</p>";
            msg.style.display = "block";
        });
}

// Update Index populating data to form
function updateIndex(index) {
    selectedIndex = index
    formsData()
    var selectedData = apiData[selectedIndex]

    document.getElementById("title").value = selectedData.title
    document.getElementById("body").value = selectedData.body
}
function putapi() {
    var msg = document.getElementById("showmsg");
    msg.innerHTML = "<p>Loading.....</p>";
    msg.style.display = "block";
    var formData = {};

    formData.title = document.getElementById("title").value;
    formData.body = document.getElementById("body").value;
    //NEW POST
    // NEWLY ADDED POST
    if (apiData[selectedIndex].isNew) {

        apiData[selectedIndex].title = formData.title;
        apiData[selectedIndex].body = formData.body;
        displayData();

        clearform();
        closeforms();

        selectedIndex = undefined;

        return;
    }
//EXISTING POST
    fetch(
        "https://jsonplaceholder.typicode.com/posts/" +apiData[selectedIndex].id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
    )
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        throw new Error("Failed to fetch data");
        })

        .then((data) => {

            // Update local array
            apiData[selectedIndex].title = data.title;
            apiData[selectedIndex].body = data.body;

            // Rebuild display
            displayData();
            clearform();
            closeforms();
            selectedIndex = undefined;
        })

        .catch((error) => {
            var msg = document.getElementById("showmsg");
            msg.innerHTML = "<p>Failed to Update Data<p>";
            msg.style.display = "block";
        });
}

function deleteapi(index) {
    selectedIndex = index;
     fetch(
        "https://jsonplaceholder.typicode.com/posts/" +apiData[index].id,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }
    )
    .then((res) => {
        if (res.ok) {
            return res.json();
        }

        throw new Error("Failed to fetch data");
    })

    .then((data) => {
        var blurbg = document.getElementById("blurbg");
        var msg = document.getElementById("confirm_delete");
        blurbg.style.display = "block"
        msg.style.display = "block";
         
    })

    .catch((error) => {
        var blurbg = document.getElementById("blurbg")
        var msg = document.getElementById("delete_ctn");
        blurbg.style.display = "block";
        msg.style.display = "block";
    });
}

function displayData(){
    info = "";
            for (var i = 0; i < apiData.length; i++) {
                info += ` <div class="information"> 
            <h3>${apiData[i].title}</h3> <hr>
            <p>${apiData[i].body}</p><br> 
            <button onclick="updateIndex(${i})" id = "editbtn" >Edit</button> <button  onclick="deleteapi(${i})" id = "deletebtn">Delete</button> </div> `;
            }

            div_ctn.innerHTML = info;
}
function closedelete(){
    var blurbg = document.getElementById("blurbg");
    var msg = document.getElementById("delete_ctn");
    msg.style.display = "none";
    blurbg.style.display = "none"
}

function closeconfirm(){
    var blurbg = document.getElementById("blurbg");
    var msg = document.getElementById("confirm_delete");
    msg.style.display = "none";
    blurbg.style.display = "none"
}


function okDelete(){
    apiData.splice(selectedIndex, 1);
    displayData();
    closeconfirm();
    selectedIndex = undefined;
}