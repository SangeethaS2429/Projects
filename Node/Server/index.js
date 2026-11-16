
const express = require("express");
const app = express();
const Controller = require("./Controller");
const contact = new Controller()
app.use(express.json());

// POST - Add records
app.post("/addContact", async (req, res) => {

    try {
        const post = req.body;

        const dataToMethod = await contact.postRecord(post);

        res.status(201).json({
            success: true,
            message: "Data added successfully",
            data: dataToMethod
        });

    } catch (err) { 
        if(err.code === "INVALID_DATA" ||err.code === "MISSING_DATA"){
            return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            code:err.code,
            key:err.key
        })}
        else{
            return res.status(400).json({
            success: false,
            message: "Something went wrong",
            code:"INTERNAL_ERROR",
            
        }
    )}

}
});


// GET - Retrieve records
app.get("/contacts", async (req, res) => {

    try {
        const dataToMethod = await contact.getRecord();
        if (dataToMethod.length == 0){
            res.status(204).json({
            success: false,
            message: "No Data available"
    
        });
        }
        else{
            res.status(200).json({
            success: true,
            message: "Data Retrieved Successfull",
            data: dataToMethod
        });
        }
        

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error retrieving data",
            error: err.message
        });
        
    }
});


app.get("/contacts/:id", async (req, res) => {

    try {
        const dataToMethod = await contact.getRecordById(req.params.id);

        if (!dataToMethod) {
            return res.status(400).json({
                success: false,
                message: "Invald Id"
            });
        }
        

        res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            data: dataToMethod
        });
        

    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Error retrieving data",
            error: err.message
        });
    }
});
app.put("/updateContact/:id", async (req, res) => {

    try {
        const post = req.body;
        const id = req.params.id
        const dataToMethod = await contact.updateRecord(post,id);
        
        if (!dataToMethod) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data Updated successfully",
        });


    } catch (err) { 
        if(err.code === "INVALID_DATA" ||err.code === "MISSING_DATA"){
            return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            code:err.code,
            key:err.key
        })}
        else{
            return res.status(400).json({
            success: false,
            message: "Something went wrong",
            code:"INTERNAL_ERROR",
            
        }
    )}

}
});

app.delete("/deleteContact/:id", async (req, res) => {
    const id  = req.params.id
    try {
        const dataToMethod = await contact.deleteRecord(id);        
        if (!dataToMethod) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            });
        }

        res.status(200).json({
            success: true,
            message: "Data Deleted successfully",
        });
        
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Error retrieving data",
            error: err.message
        });
    }
});

// URL not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "URL not found",
        error: "The requested URL does not exist"
    });
});



// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
