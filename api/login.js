//Import modules
const express = require("express")
const connection = require("./database")
const router = express.Router();

/**
 * explain their purpose.
 * @param {number} a - The first number.
 * @param {string} b - The second number.
 * @returns {JSON} The sum of a and b.
 */
router.post("/login", (req, res) => {

    username = req.body.username
    password = req.body.password
    console.log("username: " + username + " |password: " + password)

    connection.query("SELECT player_id FROM player WHERE player_username = ? AND player_password = ?", [username, password], 
        function(err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            
            if (rows.length == 0) {
                res.status(400).json({
                    "message": "No account found with this username, please register first"
                })
                return
            }

            //Save login to session
            req.session.playerId = rows[0].player_id

            // res.redirect("/game.html")
            res.status(200).json({
                "message": "welcome" + username
            })

        }
    )

})


router.get("/idLoggedIn", (req, res) => {
    if (!req.session.playerId) {
        res.status(200).json({
                "message": "The user is not logged in",
                "state": "NOT_LOGGED_IN"
            })
        return
    }
    else {
        res.status(200).json({
                "message": "The user is logged in",
                "state": "LOGGED_IN"
            })
        return
    }    
    
})

module.exports = router;