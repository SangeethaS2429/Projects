var template = [
    { label: "Name", type: "text", id: "Name" },
    { label: "Age", type: "text", id: "Age" },
    { label: "ContactNumber", type: "text", id: "ContactNumber"},
    { label: "City", type: "text", id: "City" },
]
var data = []
var selectedindex

//Creating Add form
var Addform = '<form autocomplete="off" onsubmit="onSumbitAdd()" id="form_data">'
for (var j = 0; j < template.length; j++) {
    Addform += `
        <div>
        <label>${template[j].label}</label><br>
        <input type = "${template[j].type}" id= "${template[j].id}">
        </div>
    `
}
Addform += `
    <br><div>
    <button id ="add" type="submit">Save</button>
    <button id="closeform" type="button" onclick="closeaddform()">Close</button>
    </div>
    </form>`

document.getElementById("AddFormContainer").innerHTML += Addform

//Creating Update form
var Updform = '<form autocomplete="off" onsubmit="onSumbitUpdate()" id="update_form_data">'
for (var j = 0; j < template.length; j++) {
    Updform += `
        <div>
        <label>${template[j].label}</label><br>
        <input type = "${template[j].type}" id= "${template[j].id}upd">
        </div>
    `
}
Updform += `
    <br><div>
    <button id ="add" type="submit">Save</button>
    <button id="closeform" type="button" onclick="closeupdateform()">Close</button>
    </div>
    </form>`

document.getElementById("UpdateFormContainer").innerHTML += Updform

//Creating Table
var tableHeader = '<table> <thead>'
for (var k = 0; k < template.length; k++) {
    tableHeader += `
    <th>${template[k].label}</th>
    `
}
tableHeader += `
    <th> Actions </th>
    </thead>
    <tbody id = "record"></tbody>
    </table>
    `
document.getElementById("tableContainer").innerHTML += tableHeader

//Opening Add Form 
function addform() {
    var addform = document.getElementById("form_data")
    var blurbg = document.getElementById("blurbg")
    blurbg.style.display = "block"
    addform.style.display = "block"
}

//Add Form Actions
function onSumbitAdd() {
    event.preventDefault()
    var person = {}
    for (var j = 0; j < template.length; j++){
        var field = template[j].id
        var inputfield = document.getElementById(field)
        person[field] = inputfield.value
    }
    data.push(person)
    addToTable()
    clearAddform()
    closeaddform()
}

//Clearing Add Form
function clearAddform() {
    document.getElementById("form_data").reset()
}

//Closing Add Form
function closeaddform() {
    var addform = document.getElementById("form_data")
    var blurbg = document.getElementById("blurbg")
    addform.style.display = "none"
    blurbg.style.display = "none"
}

//Opening Update Form
function updateform() {
    var addform = document.getElementById("update_form_data")
    var blurbg = document.getElementById("blurbg")
    addform.style.display = "block"
    blurbg.style.display = "block"
}
// Populating the data from table into form for edit
function update_row(index) {
    selectedindex = index
    updateform()
    for (var j = 0; j < template.length; j++){
        var field = template[j].id
        var inputfield = data[index][field]
        document.getElementById(`${field}upd`).value = inputfield
    }
}

//Update Form Action    
function onSumbitUpdate() {
    event.preventDefault()
    for (var j = 0; j < template.length; j++){
        var field = template[j].id
        data[selectedindex][field] = document.getElementById(`${field}upd`).value 
    }

    
    addToTable()
    clearUpdateform()
    closeupdateform()
}


//Closing Update form
function closeupdateform() {
    var addform = document.getElementById("update_form_data")
    var blurbg = document.getElementById("blurbg")
    addform.style.display = "none"
    blurbg.style.display = "none"
}


//Clearing Update Form
function clearUpdateform() {
    document.getElementById("update_form_data").reset()
}

//Deleting the row from the table
function delete_row(index) {
    data.splice(index, 1)
    addToTable()
}


//Adding  data to the table
function addToTable() {
    var record = document.getElementById("record");

    record.innerHTML = ""; // Clears old rows
    var row = ''
    for (var i = 0; i < data.length; i++){
        row += '<tr>'
       for (var j = 0; j < template.length; j++){
            var field  = template[j].id
            row += `<td>${data[i][field]}</td>`
       }
       row += `<td>
                <button class = "edit"  onclick= "update_row(${i})" >Edit</button>
                <button class = "delete" onclick= "delete_row(${i})">Delete</button>
                </td>
            </tr>` 
     }
    
     record.innerHTML += row
   
}





