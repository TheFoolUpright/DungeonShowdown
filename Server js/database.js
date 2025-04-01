const mysql = require("mysql2")

const connectionOptions = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "master1234", 
    database: "dungeonshowdown"
});

module.exports = connectionOptions;