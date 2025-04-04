//import modules
const express = require("express");
const bodyParser = require("body-parser")
const connection = require("./Server js/database")
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


//Varible
var MatchID = 30;
var PlayerID = 1;

app.post("/login", (req, res) => {

    username = req.body.username;
    password = req.body.password;
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
                    "message": "No one has made an account yet, please register ;-;"
                })
                return
            }

            //Save login to session
            PlayerID = rows[0].player_id

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
    console.log(receivedUsername)
    console.log(receivedemail)
    console.log(receivedPassword1)
    console.log(receivedPassword2)

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
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }

            if (rows.length > 0){
                res.status(409).send({
                    "message": "Username already in database"
                })
            }

        }
    )
    console.log("Inserting into the database")

    //Insert into the Database
    connection.query("INSERT INTO player (player_username, player_email, player_password) VALUES (?,?,?)", [receivedUsername, receivedemail, receivedPassword1],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                
                //Registered got to login page
                res.status(200).json({
                    "message": "Registered Successfully!",
                    "state": "LOGGED_IN"
                })
            }
        );

});

app.get("/getMatchState", (req, res) => {
    if (MatchID) {
       res.status(200).json({
           "message": "Player already in a match",
           "state": "MATCH_FOUND"
       })
       return;
    }

    connection.query("SELECT match_id FROM game_match WHERE (player_1_id = ? OR player_2_id = ?) AND is_match_finished = 0;", [PlayerID, PlayerID],
        function (err, rows, fields) {
            if (err){
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            if (rows.length == 0) {
                if(rows.length == 0){
                    //Send waiting for matches
                    res.status(200).json({
                        "message": "Waiting for Match!",
                        "state": "WAITING_FOR_MATCH"
                    })
                }
            }
            else {
                MatchID = rows[0].match_id
                if (MatchID) {
                   res.status(200).json({
                       "message": "Player already in a match",
                       "state": "MATCH_FOUND"
                   })
                   return;
                }

            }
        }
    )
})

app.put("/joinMatch", (req, res) => {
     if (!PlayerID) {
        //not logged in
        res.status(401).json({
            "message": "Player not logged in"
        })
        return;
        
     }

     if (MatchID) {
        res.status(200).json({
            "message": "Player already in a match",
            "state": "MATCH_FOUND"
        })
        return;
     }

     UpdateWaitingForMatchSearch()

    function UpdateWaitingForMatchSearch() {
        connection.query("UPDATE player SET is_waiting_for_match = 1 WHERE player_id = ?;", [PlayerID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                FindAnOpponent()

            }
        );
        
    }

    function FindAnOpponent() {
        connection.query("SELECT player_id FROM player WHERE is_waiting_for_match = 1 AND player_id != ? ", [PlayerID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                if(rows.length == 0){
                    //Send waiting for matches
                    res.status(200).json({
                        "message": "Waiting for Match!",
                        "state": "WAITING_FOR_MATCH"
                    })
                }
                else {
                    CreateAMatch(rows[0].player_id)
                }
            }
        );
    }

    function CreateAMatch(player1) {
        connection.query("INSERT INTO game_match (player_1_id, player_2_id) VALUES (?, ?)", [player1, PlayerID],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                FindMatch(player1, PlayerID)

            }
        );
    }

    function FindMatch(player1, player2) {
        connection.query("SELECT match_id FROM game_match WHERE player_1_id = ? AND player_2_id = ? AND is_match_finished = 0;", [player1, player2],
            function (err, rows, fields) {
                if (err){
                    console.log("FindMatch")
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                MatchID = rows[0].match_id
                UpdateWaitingForMatchFound()
                
            }
        )
    }
    function UpdateWaitingForMatchFound() {
        connection.query("UPDATE player p INNER JOIN game_match m ON m.player_1_id = p.player_id or m.player_2_id = p.player_id SET p.is_waiting_for_match = 0 WHERE m.match_id = ?", [MatchID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                res.status(200).json({
                    "message": "Match Found!",
                    "state": "MATCH_FOUND"
                })
            }
        );
    }
})

    
    




app.post("/setGameState", (req, res) => {
    CreatePlayerStatus() 


    function CreatePlayerStatus() {
    connection.query("INSERT INTO player_status (match_id, player_id) VALUES (?, ?)", [MatchID, PlayerID],
        function (err, rows, fields) {
            if (err){
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }

            GetPlayerStats();
            
        }
    )
    }
    function GetPlayerStats(){
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM dungeonshowdown.player_status WHERE player_id = ? AND match_id = ?;" [PlayerID, MatchID],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                
                //Call function to get Deck
                GetRoomDeck(rows);
            }
        )
    }

    function GetRoomDeck(playerStats) {
        console.log("Get Room Deck: Start")
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM card_room cr INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id WHERE r.room_id = ?", [req.session.RoomId], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                
                //call function to set cards
                InsertCards(playerStats, rows)

            }
        )
        console.log("Get Room Deck: End")
    }

    function InsertCards(playerStats, deck) {
        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id) VALUES (?,?,?,?);", [playerStats[0].player_status_id, i ,],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                
                //

            }
        )
    }
})

app.get("/getGameState", (req, res) => {
    GetGameState()
    

    function GetGameState() {
        //console.log("GetGameState: Start")
        connection.query("SELECT max_health, current_health, energy, insight, damage FROM player_status WHERE match_id = ? and player_id = ?", [MatchID, PlayerID],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                if (rows.length != 0){
                    //console.log("Sending Stats")
                    res.status(200).json({
                        "message": "Player stats and cards updated",
                        "max_health": rows[0].max_health,
                        "current_health": rows[0].current_health,
                        "energy": rows[0].energy,
                        "insight": rows[0].insight,
                        "damage": rows[0].damage
                        // "card" : [
                        //     card1, card2, card3
                        // ]
                    })
                }
            }
        )
        //console.log("GetGameState: End")
    }



    function GameSetup() {
        //initalized varibles
        var deck = [];
        var playerStats = [];
        req.session.RoomId = 1

        //create player status
        playerStats = GetGameState();

        // //Create deck for player cards
        // deck = GetRoomDeck();

        // //Get three dungeon cards
        // var card1 = deck[Math.floor(Math.random() * deck.length)]
        // var card2 = deck[Math.floor(Math.random() * deck.length)]
        // var card3 = deck[Math.floor(Math.random() * deck.length)]

        res.status(200).json({
            "message": "Player stats and cards updated",
            "max_health": playerStats[0].max_health,
            "current_health": playerStats[0].current_health,
            "energy": playerStats[0].energy,
            "insight": playerStats[0].insight,
            "damage": playerStats[0].damage
            // "card" : [
            //     card1, card2, card3
            // ]
        })

    }

    


})

//Emma and Monica's code
app.post("/cardChoices", (req, res) => {
    // console.log("hello")
    // update to abandoned
    connection.query("SELECT * FROM flower UNION ALL SELECT * FROM spell",
        function (err, rows, fields) {
            // If there is an error, return the error message.
            if (err){
                res.status(500).json({
                    "message": err
                })
                return
            }

            var card1 = rows[Math.floor(Math.random() * rows.length)]
            var card2 = rows[Math.floor(Math.random() * rows.length)]
            var card3 = rows[Math.floor(Math.random() * rows.length)]


            res.status(200).json({ //
                "message": "Here are the card choices",
                "card" : [
                    card1, card2, card3
                ]
            }) 
        }
    )
})

app.get("/getGameState", (req, res) => {

    GetGameState()
    
})

// listen for requests on port 
app.listen(4000, () => {
    console.log("🙌 Server is running on port 4000. Check http://localhost:4000/")
});





