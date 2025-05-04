const mysql = require("mysql2")

var hostname = "j31xe.h.filess.io";
var database = "DungeonShowdown_originalin";
var port = "61002";
var username = "DungeonShowdown_originalin";
var password = "842b203588d10df567b036fe721a06e6e4188006";

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
