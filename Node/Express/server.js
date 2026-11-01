const express = require("express");  //import express
const app = express(); // create an express application

//create a route\
app.get("/time", (req,res) =>{
    const currentDateTime = new Date();
    const date = currentDateTime.toLocaleDateString()
    const time = currentDateTime.toLocaleTimeString()
    res.send("Date: "+ date + " Time: " +time)
});

//start a server
app.listen(3000, () => {
    console.log("Server running on port 3000")
});
