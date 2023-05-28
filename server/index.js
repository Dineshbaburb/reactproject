const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password: "1230",
    database:"smanagement"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.get("/api/get", (req,res) =>{
    const sqlGet = "SELECT * FROM `smanagement`.`students`";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    });
});

app.post ("/api/post", (req,res) =>{
    const {Firstname,Lastname,Location,email,DOB,Education} = req.body;
    const sqlInsert =
    "INSERT INTO students(`Firstname`, `Lastname`, `Location`, `email`, `DOB`, `Education`) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [Firstname,Lastname,Location,email,DOB,Education], (error,result) => {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:ID", (req,res) => { 
    const {ID} = req.params;
    const sqlRemove = "DELETE FROM students WHERE id = ?"; 
    db.query(sqlRemove, ID, (error, result) => {
        if(error){
            console.log(error);
        }     

     });
});

app.get("/", (req, res) => {
//     const sqlInsert =
//     "INSERT INTO `smanagement`.`students` ( `Firstname`, `Lastname`, `Location`, `email`, `DOB`, `Education`) VALUES ( 'Raja', 'Lakshmi', 'Madurai', 'raji06@gmail.com', '1995-09-06', 'MSC')";
//      db.query(sqlInsert, (error, result) => {
//         console.log("error", error);
//         console.log("result", result); 
//     res.send("Hello Express");
// });
});

app.listen(5000, () => {
    console.log("server is running on port 5000");

});