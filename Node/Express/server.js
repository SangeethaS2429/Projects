const express = require("express");
const app = express();

// Create a route
app.get("/time", (req, res) => {

    const currentDateTime = new Date();
    const date = currentDateTime.toLocaleDateString();
    const time = currentDateTime.toLocaleTimeString();

    // Success response
    res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data: {
            date: date,
            time: time
        }
    });

});

// Failure response - URL not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "URL not found",
        error: "The requested URL does not exist"
    });
});

// Start a server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});