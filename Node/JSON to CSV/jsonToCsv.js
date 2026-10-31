
const fs = require("fs");

fs.readFile("TestData.json","utf8",(err,data)=>{
    if(err){
        console.log(err);
        return;
        
    }
    let students = JSON.parse(data)//coverting json to javescript array
    //console.log(students);
    
    const headers = Object.keys(students[0]).join(",") //getting csv headers and combining with comma
    console.log(headers)
    const csvData = students.map(student=>Object.values(student).join(","))//getting csv data and combining with comma
    console.log(csvData);
    const studData = csvData.join("\n");// .join("\n") combines all student rows.\n places each student on a separate line.
    console.log(studData)
    fs.writeFile("TestData.csv",headers +"\n"+ studData,(err)=>{   //combining headers and data
        if (err){
            console.log(err);
            return;
        }
        console.log("JSON created to CSV Successfully")
    })    
})
