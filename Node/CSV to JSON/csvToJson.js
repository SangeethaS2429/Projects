const fs = require("fs");

fs.readFile("TestData.csv", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    // Converts the CSV file content (string) into an array of rows.
    let formattedData = data.split("\n");

    // Splits each row into individual columns and creates an array of arrays.
    const jsonData = formattedData.map((datas) => datas.trim().split(','));

    // Gets the first row, which contains the column names (JSON keys).
    const jsonKey = jsonData[0];

    // Gets all remaining rows, excluding the header row (student values).
    const jsonValue = jsonData.slice(1);

    // Converts each row of values into a JavaScript object.
    const finalData = jsonValue.map((row) => {

        // Creates key-value pairs by matching each column name with its corresponding value.
        const keyValuePairs = jsonKey.map((key, index) => {
            return [key, row[index]];
        });

        // Converts the array of key-value pairs into a JavaScript object.
        return Object.fromEntries(keyValuePairs);
    });

    // Converts the JavaScript array of objects into formatted JSON text.
    fs.writeFile("TestData.json", JSON.stringify(finalData, null, 2), (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("JSON file Creation Successfull");
    });
});