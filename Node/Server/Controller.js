const {
    v4: uuidv4
} = require("uuid");
const fs = require("fs");
const validator = require("validator");
class Controller {
    // POST function
    async postRecord(data) {

        //Validation function    
        this.validation(data)
        // generating id    
        const resData = {
            Id: uuidv4(),
            ...data
        };
        //Write data into Csv file    
        await this.jsontToCsv([resData], "POST","./db/Contacts.csv");

        return resData;

    }

    // GET function
    async getRecord() { 
        const result = await this.csvToJson("./db/Contacts.csv");
        return result;
    
    }

    // GET by ID function
    async getRecordById(id) {

        const result = await this.csvToJson("./db/Contacts.csv")

        const record = result.find(records => records.Id === id);

        return record;
    }

    // UPDATE function
    async updateRecord(data, id) {


        const result = await this.getRecord();
        const UpdatedId = result.find(records => {
            if (records.Id == id) {
                return records
            }
        });
        const finalData = result.map(records => {

            if (records.Id === id) {
                records = {
                    ...records,
                    ...data
                };


                this.validation(records)
                return records;
            } else {
                return records
            }

        });

        await this.jsontToCsv(finalData, "PUT","./db/Contacts.csv")

        return UpdatedId;
    }

    // DELETE function
    async deleteRecord(id) {

        const result = await this.getRecord();

        const deleteId = result.find(records => {
            if (records.Id == id) {
                return records
            }
        });

        const finalData = result.filter(records => {
            if (records.Id !== id) {
                return records;
            }
        });

        await this.jsontToCsv(finalData, "DELETE","./db/Contacts.csv");

        return deleteId;
    }

    validation(data) {


        if (!Object.hasOwn(data, "Name") || data.Name === undefined || data.Name === null ||
            data.Name.trim().length === 0) {
            const err = new Error("Name field is missing");
            err.statusCode = 400;
            err.success = false;
            err.code = "MISSING_DATA";
            err.key = "name";
            throw err;
        } else if (!Object.hasOwn(data, "MobileNumber") || data.MobileNumber === undefined || data.MobileNumber === null ||
            data.MobileNumber.trim().length === 0) {
            const err = new Error("MobileNumber field is missing");
            err.statusCode = 400;
            err.success = false;
            err.code = "MISSING_DATA";
            err.key = "mobileNumber";
            throw err;
        } else if (!Object.hasOwn(data, "Email") || data.Email === undefined || data.Email === null ||
            data.Email.trim().length === 0) {
            const err = new Error("Email field is missing");
            err.statusCode = 400;
            err.success = false;
            err.code = "MISSING_DATA";
            err.key = "email";
            throw err;
        }
        const nameValid = validator.isLength(data.Name, {
            min: 1,
            max: 60
        });

        const mobileValid = validator.isMobilePhone(data.MobileNumber);
        const emailValid = validator.isEmail(data.Email);
        if (!nameValid) {
            const err = new Error("invalid name");
            err.statusCode = 400;
            err.success = false;
            err.code = "INVALID_DATA";
            err.key = "name";
            throw err;
        } else if (!mobileValid) {
            const err = new Error("invalid mobile number");
            err.statusCode = 400;
            err.success = false;
            err.code = "INVALID_DATA";
            err.key = "mobileNumber";
            throw err;
        } else if (!emailValid) {
            const err = new Error("invalid email");
            err.statusCode = 400;
            err.success = false;

            
            err.code = "INVALID_DATA";
            err.key = "email";
            throw err
        }

    }
    async csvToJson(fileName){
        // Step 1: Read CSV file
        const data = await fs.promises.readFile(fileName, "utf8");

        // Step 2: Convert CSV content into rows
        const formattedData = data
            .split("\n");

        // Step 3: Split each row into columns
        const jsonData = formattedData.map(datas =>
            datas.trim().split(",")
        );

        // Step 4: Get column names
        const jsonKey = jsonData[0];

        // Step 5: Get remaining records
        const jsonValue = jsonData.slice(1);

        // Step 6: Convert rows into JSON objects
        const finalData = jsonValue.map(row => {

            const keyValuePairs = jsonKey.map((key, index) => {
                return [key, row[index]];
            });

            return Object.fromEntries(keyValuePairs);
        });
        // Step 7: Return JSON data
        return finalData;
    }

    async jsontToCsv(jsondata, method,fileName) {

        //header
        const header = Object.keys(jsondata[0]).join(",");
        //Values
        const dataValue = jsondata.map(datas =>
            Object.values(datas).join(",")
        );

        // Step 4: Combine all CSV rows into colum
        const newDataValue = dataValue.join("\n");
        //header + value 
        const csvData = header + "\n" + newDataValue
        if (method === "POST") {
            if (fs.existsSync(fileName)) {
                await fs.promises.appendFile(fileName, "\n" + newDataValue)
            } else {
                await fs.promises.writeFile(fileName, csvData)

            }
        } else if (method === "PUT" || method === "DELETE") {
            await fs.promises.writeFile(
                fileName,
                csvData
            );

        }

    }
}
// Export functions
module.exports = Controller;