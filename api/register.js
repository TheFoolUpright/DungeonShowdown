//Import modules
const express = require("express")
const connection = require("./database")
const router = express.Router();

//Post Endpoint for Register
router.post("/register", (req, res) => {
    //Check if the username and password are sent. If not, return an error.
    if (!req.body.username || !req.body.email || !req.body.password1 || !req.body.password2) {
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
    var isSent = false
    console.log(receivedUsername)
    console.log(receivedemail)
    console.log(receivedPassword1)
    console.log(receivedPassword2)

    //Validate the varibles
    if (receivedUsername.length < 4 && !isSent) {
        res.status(400).send({
            "message": "Username must be more then 4 charaters"
        })
        isSent = true
        return
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{4,}$/.test(receivedPassword1) && !isSent) {
        res.status(400).send({
            "message": "Password must have a lowercase, uppercase, number, symbol and be more then 4 charaters"
        })
        isSent = true
        return
    }

    if (receivedPassword1 != receivedPassword2 && !isSent) {
        res.status(400).send({
            "message": "Passwords must match"
        })
        isSent = true
        return
    }

    if (!isSent) {
    connection.query("SELECT player_username, player_email FROM player WHERE player_username = ?", [receivedUsername],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }

            if (rows.length != 0) {
                res.status(409).send({
                    "message": "Username already in database"
                })
                isSent = true
            }
            else {
                InsertPlayer()
            }

        }
    )
    }
    

    function InsertPlayer() {
        //Insert into the Database
        console.log("Inserting into the database")
        connection.query("INSERT INTO player (player_username, player_email, player_password) \
            VALUES (?,?,?)"
            , [receivedUsername, receivedemail, receivedPassword1],
                function (err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    console.log("Sending")
                    //Registered got to login page
                    res.status(200).json({
                        "message": "Registered Successfully!",
                        "state": "LOGGED_IN"
                    })
                })
        }
})

module.exports = router;