const mysql = require("mysql2")

var hostname = "u7knk5.h.filess.io";
var database = "DungeonShowdown_caretubeat";
var port = "61032";
var username = "DungeonShowdown_caretubeat";
var password = "cb5297275b6b5a97e719d421b1440160c8cece7a";

// var hostname = "localhost";
// var database = "dungeonshowdown";
// var port = "3306";
// var username = "root";
// var password = "master1234";

const connectionOptions = mysql.createConnection({
    host: hostname,
    user: username,
    password,
    database,
    port,
});

module.exports = connectionOptions;
