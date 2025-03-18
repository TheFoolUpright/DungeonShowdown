const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database");
const session = require("express-session");

connection.connect((err) => {
    if (err) {
        console.log('error connection to DB : ' + err)
        return
    }
    console.log("Connected to DB.")
})

const app = express();

// MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
app.use("/", express.static("www"));

app.use(session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))

app.post("/register", (req, res) => {
    username = (req.body.username);
    password = (req.body.password);
    passwordCheck = (req.body.passwordCheck);
    if (password == passwordCheck)
    {
        res.send("Welcome" + username);
        connection.query("INSERT INTO games.players (username, password) VALUES (?, ?) ", [username, password]);
    }
    else
    {
        res.send("Register Failed, Passwords don't match");
    }
})

app.post("/login", (req, res) => {

    username = req.body.username;
    password = req.body.password;
    console.log("username: " + username + " |password: " + password)

    connection.query("SELECT * FROM players WHERE username = ? AND password = ?", [username, password], 
        function(err, rows, fields) {
            if (err) {
                console.log("error " + err)
                return
            }
            
            if (rows.length = 0) {
                res.send("No one has made an account yet, please register ;-;")
                return
            }

            // res.redirect("/game.html")
            res.status(200).json({
                "message": "welcome" + username
            })

        }
    )

})

app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000");
});