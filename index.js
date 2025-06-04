//Import modules
const express = require("express")
const bodyParser = require("body-parser")
const connection = require("./api/database")
const session = require("express-session")
const register = require("./api/register")
const login = require("./api/login")
const joinMatch = require("./api/joinMatch")
const dungeon = require("./api/dungeon")
const showdown = require("./api/showdown")
const game = require("./api/game")

//Initialize express
const app = express()

//Apply body parser to the incoming requests
app.use(bodyParser.urlencoded({extended: false}))

// Parses the body of the request as JSON

app.use(express.json())

//Provide the static files in the www folder
app.use("/", express.static("www"))

//Connect to database
connection.connect((err) => {
    if (err) {
        console.log("¯\_(ツ)_/¯ Error connecting to DB : " + err)
        return
    }
    console.log("🦄 Connected to the DB")
} )

//Create session cookies
app.use(session({
    secret: "MySuperSecretKey", 
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000000
    }
}))

var opponentReadyShowdown = false

//#region Login

app.use("/login", login)

//#endregion

//#region Register

app.use("/register", register)

//#endregion

//#region Match

app.use("/joinMatch", joinMatch)

//#endregion

//#region Showdown

app.use("/showdown", showdown)

//#endregion

//#region Game

app.use("/game", game)

///#endregion

//#region Dungeon

app.use("/dungeon", dungeon)

//#endregion

// listen for requests on port 
app.listen(4000, () => {
    console.log("🙌 Server is running on port 4000. Check http://localhost:4000/")
})