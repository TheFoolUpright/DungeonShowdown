const mysql = require("mysql2")

const connectionOptions = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "root", 
    database: "dungeonshowdown"
});

module.exports = connectionOptions;