//import modules
const express = require("express");
const bodyParser = require("body-parser")
const connection = require("./database")
const session = require("express-session")

//initialize express
const app = express();

//Apply body parser to the incoming requests
app.use(bodyParser.urlencoded({extended: false}))

// Parses the body of the request as JSON

app.use(express.json())

//Provide the static files in the www folder
app.use("/", express.static("www"))

//Connect to database
connection.connect((err) => {
    if (err) {
        console.log("💩 Error connecting to DB : " + err)
        return
    }
    console.log("🦄 Connected to the DB")
} );

//Create session cookies
app.use(session({
    secret: "MySuperSecretKey", 
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000000
    }
}));


app.post("/login", (req, res) => {

    username = req.body.username;
    password = req.body.password;
    console.log("username: " + username + " |password: " + password)

    connection.query("SELECT player_id FROM player WHERE player_username = ? AND player_password = ?", [username, password], 
        function(err, rows, fields) {
            console.log(rows.length)
            if (err) {
                console.log("error " + err)
                return
            }
            
            if (rows.length == 0) {
                res.status(400).json({
                    "message": "No one has made an account yet, please register ;-;"
                })
                return
            }

            //Save login to session
            req.session.PlayerId = rows[0].player_id

            // res.redirect("/game.html")
            res.status(200).json({
                "message": "welcome" + username
            })

        }
    )

});


//Get Endpoint for Register
app.get("/register", (req, res) => {

});

//Post Endpoint for Register
app.post("/register", (req, res) => {
    //Check if the username and password are sent. If not, return an error.
    if (!req.body.username || !req.body.email || !req.body.password1 || !req.body.password2){
        res.status(400).send({
            "message": "Missing username, email or password"
        })
        return
    }

    // Get the username, email and passwords from the request.
    var receivedUsername = req.body.username
    var receivedemail = req.body.email
    var receivedPassword1 = req.body.password1
    var receivedPassword2 = req.body.password2

    //Validate the varibles
    if (receivedUsername.length < 4) {
        res.status(400).send({
            "message": "Username must be more then 4 charaters"
        })
        return
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{4,}$/.test(receivedPassword1)) {
        res.status(400).send({
            "message": "Password must have a lowercase, uppercase, number, symbol and be more then 4 charaters"
        })
        return
    }

    if (receivedPassword1 != receivedPassword2) {
        res.status(400).send({
            "message": "Passwords must match"
        })
        return
    }

    //Select 
    connection.query("SELECT player_username, player_email FROM player WHERE player_username = ?", [receivedUsername],
        function (err, rows, fields) {
            if (err){
                res.send("Error: " + err);
                return;
            }

            if (rows.length > 0){
                res.status(409).send({
                    "message": "Username already in database"
                })
            }

        }
    )


    //Insert into the Database
    connection.query("INSERT INTO player (player_username, player_email, player_password) VALUES (?,?,?)", [receivedUsername, receivedemail, receivedPassword1],
            function (err, rows, fields) {
                if (err){
                    res.send("Error: " + err);
                    return;
                }
                
                //Registered got to login page
                res.status(200).json({
                    "message": "Registered Successfully!"
                })
            }
        )

});

app.get("/game", (req, res) => {
    connection.query("")
})

app.post("/mainMenu", (req, res) => {
    if (req.session.PlayerId) {
        connection.query("UPDATE player SET is_waiting_for_match = 1 WHERE player_id = ?", [req.session.PlayerId],
        function (err, rows, fields) {
            if (err) {
                console.log(err)
                res.send("Error: " + err);
                return;
            }
            //Check for opponent
            connection.query("SELECT player_id FROM player WHERE is_waiting_for_match = 1 AND player_id != ?", [req.session.PlayerId], 
                function (err, rows, fields) {
                    if (err) {
                        console.log(err)
                        res.send("Error: " + err);
                        return;
                    }
                    if (rows.length == 0) {
                        res.status(200).json({
                            "message": "Waiting for Match!"
                        })
                    }
                    else {
                        connection.query("INSERT INTO game_match (player_1_id, player_2_id) VALUES (?, ?)"), [rows[0].player_id, req.session.PlayerId],
                        function (err, rows, fields) {
                            if (err) {
                                console.log(err)
                                res.send("Error: " + err);
                                return;
                            }
                            if (rows.length == 0) {
                                res.status(200).json({
                                    "message": "Joined Match!"
                                })
                            }

                        }
                        //If match found send to game

                    }
                }
            )

        }
    )

    

    }
    // send to login



})

// listen for requests on port 
app.listen(4000, () => {
    console.log("🙌 Server is running on port 4000. Check http://localhost:4000/")
});





