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
var MatchID = 1;
var PlayerID = 1;
var PlayerStatusID = 1;
var RoomID = 1;
var ShowdownTurn = 1;


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

app.post("/setDungeonPhase", (req, res) => {
    
    CreatePlayerStatus() 

    function CreatePlayerStatus() {
        console.log("CreatePlayerStatus start")
        connection.query("INSERT INTO player_status (match_id, player_id) VALUES (?, ?)", [MatchID, PlayerID],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                SettingCards(req, res);
                
            }
        )
    }
        
})

app.get("/getGameState", (req, res) => {
    
    GetLastRoom()


    function GetLastRoom() {
        connection.query("SELECT player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, match_id, player_id, max_health, current_health, energy, insight, damage, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? ORDER BY room_id DESC LIMIT 3", [PlayerID, MatchID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                RoomID = rows[0].room_id;
                ShowdownTurn = rows[0].showdown_turn;
                GetGameState()
            }
        )
    }
    
    function GetGameState() {
        connection.query("SELECT player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, match_id, player_id, max_health, current_health, energy, insight, damage, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? AND room_id = ?;", [PlayerID, MatchID, RoomID],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                if (rows.length != 0){
                    //console.log("Sending Stats and Cards")

                    var card1 = rows[0];
                    var card2 = rows[1];
                    var card3 = rows[2];
                    
                    console.log(card3.card_energy)

                    res.status(200).json({
                        "message": "Player stats and cards updated",
                        "room_id": RoomID,
                        "showdown_turn": ShowdownTurn,
                        "max_health": rows[0].max_health,
                        "current_health": rows[0].current_health,
                        "energy": rows[0].energy,
                        "insight": rows[0].insight,
                        "damage": rows[0].damage,
                        "card" : [
                            card1, card2, card3
                        ]
                    })
                }
            }
        )
    }
})

app.post("/resolveDungeonTurn", (req, res) => {
    console.log("req.body.cardId")
    // req.body.cardId
    UpdateSelectedCardSlot()

    function UpdateSelectedCardSlot() {
        connection.query("UPDATE player_card_slot SET slot_id = 4 WHERE card_id = ? AND player_status_id = ?;", [req.body.cardId, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetPlayerStats()

            }
        )
    }

    function GetPlayerStats() {
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM dungeonshowdown.player_status WHERE player_status_id = ?;", [PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetCardStats(rows)
                
            }
        )
    }

    function GetCardStats(PlayerStats) {
        connection.query("SELECT card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM dungeonshowdown.card WHERE card_id = ?;", [req.body.cardId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                var updatedMaxHealth = PlayerStats[0].max_health + rows[0].card_max_health
                var updatedCurrentHealth = PlayerStats[0].current_health + rows[0].card_current_health + rows[0].card_max_health
                var updatedEnergy = PlayerStats[0].energy + rows[0].card_energy
                var updatedInsight = PlayerStats[0].insight + rows[0].card_insight
                var updatedDamage = PlayerStats[0].damage + rows[0].card_damage
                UpdatePlayerStats(updatedMaxHealth, updatedCurrentHealth, updatedEnergy, updatedInsight, updatedDamage)
            }
        )
    }

    function UpdatePlayerStats(updatedMaxHealth, updatedCurrentHealth, updatedEnergy, updatedInsight, updatedDamage) {
        connection.query("UPDATE player_status SET max_health = ?, current_health = ?, energy = ?, insight = ?, damage = ? WHERE player_status_id = ?;", [updatedMaxHealth, updatedCurrentHealth, updatedEnergy, updatedInsight, updatedDamage, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                
                GetOpponentCard()
            }
        )
    }

    function GetOpponentCard() {
        connection.query("SELECT c.card_id, ct.card_type_id, card_type_name FROM player_card_slot pcs INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id INNER JOIN card c ON pcs.card_id = c.card_id INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4", [PlayerStatusID, MatchID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                res.status(200).json({
                    "message": "Player stats updated and opponent card received",
                    "card_id": rows[0].card_id,
                    "card_type_id": rows[0].card_type_id,
                    "card_type_name": rows[0].card_type_name
                })
            }
        )
        
    }
});

app.post("/setupNextDungeonRoom", (req, res) => {

    SetupNextRoom()

    function SetupNextRoom() {
        //Set roomID to next
        RoomID++;
        SettingCards(req, res)
    }
})

function SettingCards(req, res) {
    GetPlayerStats()
    function GetPlayerStats(){
        console.log("GetPlayerStats start")
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM player_status WHERE player_id = ? AND match_id = ?;", [PlayerID, MatchID],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                PlayerStatusID = rows[0].player_status_id
                //Call function to get Deck
                GetRoomDeck(rows);
            }
        )
    }

    function GetRoomDeck(playerStats) {
        console.log("Get Room Deck: Start")
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM card_room cr INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id WHERE r.room_id = ?", [RoomID], 
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
        console.log("Insert cards Start")
        //Create Cards
        var indexOfElement;

        var card1 = deck[Math.floor(Math.random() * deck.length)].card_id
        indexOfElement = deck.indexOf(card1[0]);
        deck.splice(indexOfElement, 1)
        var card2 = deck[Math.floor(Math.random() * deck.length)].card_id
        indexOfElement = deck.indexOf(card2[0]);
        deck.splice(indexOfElement, 1)
        var card3 = deck[Math.floor(Math.random() * deck.length)].card_id

        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id) VALUES (?,?,?,?), (?,?,?,?), (?,?,?,?);", [playerStats[0].player_status_id, 1, card1, RoomID, playerStats[0].player_status_id, 2, card2, RoomID ,playerStats[0].player_status_id, 3, card3, RoomID],
        function (err, rows, fields) {
            if (err){
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            
            res.status(200).json({
                "message": "Cards Inserted!"
            })

        })
            
    }
}

app.post("/setupShowdown", (req, res) => {

    // select possible cards
    // insert chosen cards
        GetPlayerStats()
        function GetPlayerStats(){
            console.log("GetPlayerStats start")
            connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM player_status WHERE player_id = ? AND match_id = ?;", [PlayerID, MatchID],
                function (err, rows, fields) {
                    if (err){
                        console.log("Database Error : " + err);
                        res.status(500).json({
                            "message": err
                        });
                        return;
                    }
                    PlayerStatusID = rows[0].player_status_id
                    //Call function to get Deck
                    GetRoomDeck(rows);
                }
            )
        }
    
        function GetRoomDeck(playerStats) {
            console.log("Get Room Deck: Start")
            connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM card_room cr INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id WHERE r.room_id = ?", [RoomID], 
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
            console.log("Insert cards Start")
            //Create Cards
            var indexOfElement;
    
            var card1 = deck[Math.floor(Math.random() * deck.length)].card_id
            indexOfElement = deck.indexOf(card1[0]);
            deck.splice(indexOfElement, 1)
            var card2 = deck[Math.floor(Math.random() * deck.length)].card_id
            indexOfElement = deck.indexOf(card2[0]);
            deck.splice(indexOfElement, 1)
            var card3 = deck[Math.floor(Math.random() * deck.length)].card_id
    
            connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn) VALUES (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?);", [playerStats[0].player_status_id, 1, card1, RoomID, ShowdownTurn, playerStats[0].player_status_id, 2, card2, RoomID, ShowdownTurn, playerStats[0].player_status_id, 3, card3, RoomID, ShowdownTurn],
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                
                res.status(200).json({
                    "message": "Cards Inserted!"
                })
    
            })
                
        }
    })

// listen for requests on port 
app.listen(4000, () => {
    console.log("🙌 Server is running on port 4000. Check http://localhost:4000/")
});





