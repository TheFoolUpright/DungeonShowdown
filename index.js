//Import modules
const express = require("express");
const bodyParser = require("body-parser")
const connection = require("./Server js/database")
const session = require("express-session")

//Initialize express
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
        console.log("¯\_(ツ)_/¯ Error connecting to DB : " + err)
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

//#region Variables

//Varible
var MatchID = 1;
var PlayerID = 1;
var PlayerStatusID = 1;
var RoomID = 1;
var ShowdownTurn = 1;
var State

//#endregion

//#region Login

/**
 * explain their purpose.
 * @param {number} a - The first number.
 * @param {string} b - The second number.
 * @returns {JSON} The sum of a and b.
 */
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

//#endregion

//#region Register

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

//#endregion

//#region Match

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

//#endregion

//#region Game

/**
 * Gets the RoomID, ShowdownTurn, and State from the database
 * Called by client side function getGameState.
 * @param none
 * @returns {JSON} - returns the RoomID, ShowdownTurn, and State to the client side. 
 */
//TODO: Add the state in and only retern the room, turn and state
app.get("/getGameState", (req, res) => {

    GetLastRoom()
    function GetLastRoom() {
        connection.query("SELECT room_id, showdown_turn, state_id FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = 1 AND match_id = 1 ORDER BY room_id DESC, showdown_turn DESC", [PlayerID, MatchID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                if(rows.length != 0){

                    RoomID = rows[0].room_id;
                    ShowdownTurn = rows[0].showdown_turn;
                    State = rows[0].state_id;
                    
                    
                    res.status(200).json({
                        "room_id": RoomID,
                        "showdown_turn": ShowdownTurn,
                        "state_id": State
                    })
                }
            }
        )
    }

})

app.get("/getWaitingOnOpponentDungeon", (req, res) => {

    GetOpponentStatus()

    function GetOpponentStatus() {
        connection.query("SELECT state_id FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE player_id != ? AND match_id = ? AND room_id = ? AND slot_id = 4", [PlayerID, MatchID, RoomID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                if (rows.length != 0) {
                    //Update the state
                    UpdateGameState()
                }
                else { 
                    res.status(200).json({
                        "message": "Opponent hasn't confirmed their card",
                    });
                     
                }
            }
        )
    }

    function UpdateGameState() {
        connection.query("UPDATE player_status SET state_id = 3 WHERE player_status_id = ?", [PlayerStatusID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                
                res.status(200).json({
                    "message": "State changed",
                });

            }
        )
    }
})

//#endregion

//#region Dungeon

/**
 * Creates player status for the current player in the match
 * Not called?.
 * @param none
 * @returns none
 */
//TODO: is this still needed. Should this fununality exist in the match endpoint. 
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

/**
 * Reads the player stats and card from the database and returns them
 * Called by client side function getDungeonCardSelection.
 * @param none
 * @returns {JSON} - returns player stats and dungeon cards
 */
app.get("/getDungeonCardSelection", (req, res) => {

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
                
                var card1 = rows[0];
                var card2 = rows[1];
                var card3 = rows[2];
            
                res.status(200).json({
                    "message": "Player stats and cards updated",
                    "state": "ROOM_LOADED",
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
    
})

/**
 * Updates the player_card_slot table with the selected card. 
 * Grabs the player's current stats from the database. 
 * Calculates the selected cards effect on the player stats.
 * Updates the player_status table with the new player stats values.
 * Reads the opponents card selection and send it back to the client. 
 * Called by client side function DungeonEndTurn.
 * @param {number} req.body.cardId - the selected card id from the client function
 * @returns {JSON} - returns the opponents card selection or if the player is waiting on the opponent
 */
app.post("/resolveDungeonTurn", (req, res) => {

    UpdateGameStateToWaitingForOpponentDungeon()

    /**
     * Updates the player_status table with the current state. 
     * Called by the resolveDungeonTurn endpoint.
     * @param none
     * @returns none
     */
    function UpdateGameStateToWaitingForOpponentDungeon() {
        connection.query("UPDATE player_status SET state_id = 2 WHERE match_id = ? AND player_status_id = ?;", [MatchID, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                UpdateSelectedCardSlot()

            }
        )
    } 


    /**
     * Updates the player_card_slot table with the selected card. 
     * Called by the UpdateGameState function.
     * @param none
     * @returns none
     */
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
    /**
     * Grabs the player's current stats from the database. 
     * Called by UpdateSelectedCardSlot function.
     * @param none
     * @returns none
     */
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

    /**
     * Calculates the selected cards effect on the player stats.
     * Called by GetPlayerStats function.
     * @param {Array} PlayerStats - an array of player stats from the database 
     * @returns none
     */
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

    /**
     * Updates the player_status table with the new player stats values.
     * Called by GetCardStats function.
     * @param {number} updatedMaxHealth - The new value of the players Max Health 
     * @param {number} updatedCurrentHealth - The new value of the players Current Health 
     * @param {number} updatedEnergy - The new value of the players Energy 
     * @param {number} updatedInsight - The new value of the players Insight
     * @param {number} updatedDamage - The new value of the players Damage
     * @returns none
     */
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

    /**
     * Reads the opponents card selection and send it back to the client. 
     * Called by UpdatePlayerStats function.
     * @param none
     * @returns {JSON} - returns the opponents card selection or if the player is waiting on the opponent
     */
    function GetOpponentCard() {
        connection.query("SELECT c.card_id, ct.card_type_id, card_type_name FROM player_card_slot pcs INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id INNER JOIN card c ON pcs.card_id = c.card_id INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?", [PlayerStatusID, MatchID, RoomID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if(rows.length != 0) {
                    res.status(200).json({
                        "message": "Player stats updated and opponent card received",
                        "state": "NEXT_ROOM",
                        "card_id": rows[0].card_id,
                        "card_type_id": rows[0].card_type_id,
                        "card_type_name": rows[0].card_type_name
                    })
                }
                else
                {
                    res.status(200).json({
                        "message": "Opponent hasn't confirmed their card",
                        "state": "WAITING_FOR_OPP"
                    })
                }
                
            }
        )
        
    }
});

/**
 * ???
 * Called by client side function SetupNextRoom.
 * @param none
 * @returns {JSON} 
 */
//TODO: Write stuff for setting cards
app.post("/setupNextDungeonRoom", (req, res) => {

    RoomID++;
    GetPlayerStats()
        
    /**
     * Reads the player stats from the database and updates the PlayerStatusID. 
     * Called by SettingCards function.
     * @param none
     * @returns none
     */
    function GetPlayerStats(){
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

    /**
     * Get the dungeon cards for the room the player is in.
     * Called by GetPlayerStats function.
     * @param {array} playerStats - an array with the player stats
     * @returns none
     */
    function GetRoomDeck(playerStats) {
        
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
    }

    /**
     * Inserts 3 cards for the dungeon into the player_card_slot table
     * Called by GetPlayerStats function.
     * @param {array} playerStats - an array with the player stats
     * @param {array} deck - an array with all the dungeon cards for the room
     * @returns {JSON} - returns a message 
     */
    function InsertCards(playerStats, deck) {

        //Create Cards
        var indexOfElement;

        var card1 = deck[Math.floor(Math.random() * deck.length)]
        indexOfElement = deck.indexOf(card1);
        deck.splice(indexOfElement, 1)
        var card2 = deck[Math.floor(Math.random() * deck.length)]
        indexOfElement = deck.indexOf(card2);
        deck.splice(indexOfElement, 1)
        var card3 = deck[Math.floor(Math.random() * deck.length)]

        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn) VALUES (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?);", [playerStats[0].player_status_id, 1, card1.card_id, RoomID, ShowdownTurn, playerStats[0].player_status_id, 2, card2.card_id, RoomID, ShowdownTurn, playerStats[0].player_status_id, 3, card3.card_id, RoomID, ShowdownTurn],
        function (err, rows, fields) {
            if (err){
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            UpdateGameStateToDungeonCardSelection()
            
        })
    }

    function UpdateGameStateToDungeonCardSelection() {
        connection.query("UPDATE player_status SET state_id = 1 WHERE match_id = ? AND player_status_id = ?;", [MatchID, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                res.status(200).json({
                    "message": "Cards inserted and game state changed!"
                })
            }
        )
    }

})

/**
 * Reads the opponents card from the database. 
 * Called by client side function getDungeonResult.
 * @param none
 * @returns {JSON} - returns the opponents card selection or if the player is waiting on the opponent
 */
app.get("/getOpponentCard", (req, res) => {

    connection.query("SELECT c.card_id, ct.card_type_id, card_type_name FROM player_card_slot pcs INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id INNER JOIN card c ON pcs.card_id = c.card_id INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?", [PlayerStatusID, MatchID, RoomID], 
        function(err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            if(rows.length != 0) {
                res.status(200).json({
                    "message": "Player stats updated and opponent card received",
                    "state": "NEXT_ROOM",
                    "card_id": rows[0].card_id,
                    "card_type_id": rows[0].card_type_id,
                    "card_type_name": rows[0].card_type_name
                })
            }
            else
            {
                res.status(200).json({
                    "message": "Opponent hasn't confirmed their card",
                    "state": "WAITING_FOR_OPP"
                })
            }
            
        }
    )
        
})



//#endregion

//#region Showdown

app.get("/getWaitingOnOpponentShowdown", (req, res) => {
    
    GetOpponentShowdownCardStats()

     /**
     * Get all the information from the opponent's selected cards to use in the next function.
     * Called by UpdateSelectedCardSlot2.
     * @param none
     * @returns none
     */
     function GetOpponentShowdownCardStats() {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?;", [PlayerStatusID, ShowdownTurn, MatchID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    UpdateGameStateToShowdownResult()
                    GetPlayerShowdownCardStats(rows)
                }
                else {
                    res.status(200).json({
                        "message": "Opponent hasn't confirmed their card(s)"
                    })
                }
                
            }
        )
        
    }

    function UpdateGameStateToShowdownResult() {
        connection.query("UPDATE player_status SET state_id = 6 WHERE player_status_id = ?", [PlayerStatusID], 
            function (err, rows, fields) {
                if (err){
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                
            }
        )
    }
    
    
        /**
         * Get all the information from the player's selected cards to use in the next function.
         * Called by GetOpponentShowdownCardStats.
         * @param {object} opponentCards - An array of the opponent's selected cards.
         * @returns none
         */
        function GetPlayerShowdownCardStats(opponentCards) {
            connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10);", [PlayerStatusID, ShowdownTurn], 
                function(err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
    
                    GetPlayerShowdownStats(opponentCards, rows);
                    
                }
            )
        }
    
        /**
         * Save in variables what stats need to be changed and by how much once the showdown turn concludes.
         * Called by GetPlayerShowdownCardStats.
         * @param {object} opponentCards - An array of the opponent's selected cards.
         * @param {object} playerCards - An array of the player's selected cards.
         * @returns none
         */
        function GetPlayerShowdownStats(opponentCards, playerCards) {
            connection.query("SELECT player_status_id, Player.match_id, player_id, current_health, energy, insight, Player.damage, Opponent.damage op_damage FROM (SELECT damage, match_id FROM dungeonshowdown.player_status WHERE match_id = ? AND player_status_id != ?) Opponent INNER JOIN dungeonshowdown.player_status Player ON Opponent.match_id = Player.match_id WHERE player_status_id = ?;", [MatchID, PlayerStatusID, PlayerStatusID], 
                function(err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    var opponentDamage = rows[0].op_damage;
                    var opponentAttack = 0
                    var opponentParryAttack = 0
                    var playerCurrentHealth = rows[0].current_health;
                    var playerEnergy = rows[0].energy;
                    var playerInsight = rows[0].insight;
                    var playerDamage = rows[0].damage;
                    var playerDefense = 0;
                    var playerAttack = 0;
                    var isParry = false;
                    var isDodge = false;
                    var isDoubleAttack = false;
                    var isCounter = false;
                    var isDoubleAttackOpponent = false;
                    var isCounterOpponent = false;
                    var isParryOpponent = false;
                    
                    //Player Skills
                    for (let i = 0; i < playerCards.length; i++) {
                        if (playerCards.card_type_id == 8) {
                            playerCurrentHealth = playerCurrentHealth + playerCards.card_current_health;
                            playerInsight = playerInsight + playerCards.card_insight;
                            playerEnergy = playerEnergy + playerCards.card_energy;
                            playerDamage = playerDamage + playerCards.card_damage;
                        }
                    }
    
                    //Opponent Skills
                    for (let i = 0; i < opponentCards.length; i++) {
                        if (opponentCards.card_type_id == 8) {
                            opponentDamage = opponentDamage + opponentCards.card_damage;
                        }
                    }
                    
                    //Player Defense
                    for (let i = 0; i < playerCards.length; i++) {
                        if (playerCards.card_type_id == 7) {
                            playerDefense = playerDefense + playerCards.card_defense;
                            playerInsight = playerInsight + playerCards.card_insight;
                            playerEnergy = playerEnergy + playerCards.card_energy;
    
                            if (playerCards.card_id = 1) {
                                isParry = true;
                            }
                            if (playerCards.card_id = 2) {
                                isDodge = true;
                            }
                        }
                    }
    
                    //Opponent Defense
                    for (let i = 0; i < opponentCards.length; i++) {
                        if (opponentCards.card_type_id == 7) {
                            if (opponentCards.card_id = 1) {
                                opponentParryAttack = opponentCards.card_attack
                                isParryOpponent = true;
                            }
                        }
                    }
    
                    //Player Attack
                    for (let i = 0; i < playerCards.length; i++) {
                        if (playerCards.card_type_id == 6) {
                            playerAttack = playerAttack + playerCards.card_attack;
                            playerEnergy = playerEnergy + playerCards.card_energy;
    
                            if (playerCards.card_id = 3) {
                                isDoubleAttack = true;
                            }
                            if (playerCards.card_id = 4) {
                                isCounter = true;
                            }
                        }
                    }
    
                    //Opponent Attack
                    for (let i = 0; i < opponentCards.length; i++) {
                        if (opponentCards.card_type_id == 6) {
                            opponentAttack = opponentAttack + opponentCards.card_attack;
    
                            if (opponentCards.card_id = 3) {
                                isDoubleAttackOpponent = true;
                            }
                            if (opponentCards.card_id = 4) {
                                isCounterOpponent = true;
                            }
                        }
                    }
    
                    if (isCounterOpponent) {
                        if(!isDodge || !isParry){
                            
                            playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - (opponentAttack * opponentDamage));
                            playerDefense = Math.max(0, playerDefense - (opponentAttack * opponentDamage))
                        }
                    }
                    if(isDoubleAttackOpponent) {
                        if(!isDodge || !isParry){
                            playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - ((opponentAttack * opponentDamage) * 2));
                            playerDefense = Math.max(0, playerDefense - ((opponentAttack * opponentDamage) * 2))
                        }
                        else{
                            
                            playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - (opponentAttack * opponentDamage))
                            playerDefense = Math.max(0, playerDefense - (opponentAttack * opponentDamage))
                        }
                    }
                    if (isParryOpponent) {
                        if(opponentAttack != 0 || !isDodge) {
                            playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - (opponentParryAttack * playerDamage));
                            playerDefense = Math.max(0, playerDefense - (opponentParryAttack * playerDamage))
                        }
                    }
                    
                    //Apply Normal, Heavy or Recovery Attack Damage
                    if(!isCounterOpponent && !isDoubleAttackOpponent) {
                        playerCurrentHealth = playerCurrentHealth + playerDefense - (opponentAttack * opponentDamage)
                        playerDefense = Math.max(0, playerDefense - (opponentAttack * opponentDamage))
                    }
                    
                    
                    UpdateShowdownPlayerStats(playerCurrentHealth, playerEnergy, playerInsight, playerDamage, opponentCards, playerCards)
                }
            )
        }
    
        /**
         * Update the player stats in the database according to the selected cards in the showdown.
         * Called by GetPlayerShowdownStats.
         * @param {number} playerCurrentHealth - The new Current Health value to be updated into the database.
         * @param {number} playerEnergy - The new Energy value to be updated into the database.
         * @param {number} playerInsight - The new Insight value to be updated into the database.
         * @param {number} playerDamage - The new Damage value to be updated into the database.
         * @param {object} opponentCards - An array of the opponent's selected cards.
         * @param {object} playerCards - An array of the player's selected cards.
         * @returns {JSON} The sum of a and b.
         */
        function UpdateShowdownPlayerStats(playerCurrentHealth, playerEnergy, playerInsight, playerDamage, opponentCards, playerCards) {
            connection.query("UPDATE player_status SET current_health = ?, energy = ?, insight = ?, damage = ? WHERE player_status_id = ?;", [playerCurrentHealth, playerEnergy, playerInsight, playerDamage, PlayerStatusID], 
                function(err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    DisplayPlayerAndOpponentActions(opponentCards, playerCards)
                }
            )
        }
    
    
        /**
         * Creates the strings that show the opponent and player actions in the showdown.
         * Called by UpdateShowdownPlayerStats.
         * @param {object} opponentCards - An array of the opponent's selected cards.
         * @param {object} playerCards - An array of the player's selected cards.
         * @returns none
         */
        function DisplayPlayerAndOpponentActions(opponentCards, playerCards) {
            var opponentActions = "";
            var playerActions = "";
    
            // 6	Attack
            // 7	Defense
            // 8	Skill
            // console.log("opponentCards")
            // console.log(opponentCards)
            // console.log("playerCards")
            // console.log(playerCards)
    
            //Opponent Actions
            if (opponentCards[0].card_type_id == 8 ) {
                opponentActions = "Your opponent used " + opponentCards[0].card_name
                if (opponentCards[1].card_type_id == 6) {
                    opponentActions = opponentActions + " and used a " + opponentCards[1].card_name + ". "
            
                }
            }
            else if (opponentCards[1].card_type_id == 8) {
                opponentActions = "Your opponent used " + opponentCards[1].card_name
                if (opponentCards[0].card_type_id == 6) {
                    opponentActions = opponentActions + " and used a " + opponentCards[0].card_name + ". "
            
                }
            }
            else{
                
                if (opponentCards[0].card_type_id == 6) {
                    opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + ". "
                }
                else if (opponentCards[1].card_type_id == 6) {
                    opponentActions = opponentActions + "Your opponent used a " + opponentCards[1].card_name + ". "
                }
            }
            
    
            if (playerCards[0].card_type_id == 7) {
                opponentActions = opponentActions + "You used a " + playerCards[0].card_name + "."
            }
            else if (playerCards[1].card_type_id == 7) {
                opponentActions = opponentActions + "You used a " + playerCards[1].card_name + "."
            }
    
            //Player Actions
            if (playerCards[0].card_type_id == 8 ) {
                playerActions = "You used " + playerCards[0].card_name
                if (playerCards[1].card_type_id == 6) {
                    playerActions = playerActions + " and used a " + playerCards[1].card_name + "."
            
                }
            }
            else if (playerCards[1].card_type_id == 8) {
                playerActions = "You used " + playerCards[1].card_name
                if (playerCards[0].card_type_id == 6) {
                    playerActions = playerActions + " and used a " + playerCards[0].card_name + "."
            
                }
            }
            else{
                if (playerCards[0].card_type_id == 6) {
                    playerActions = playerActions + " You used a " + playerCards[0].card_name + ". "
                }
                else if (playerCards[1].card_type_id == 6) {
                    playerActions = playerActions + " You used a " + playerCards[1].card_name + ". "
                }
            }
            if (opponentCards[0].card_type_id == 7) {
                playerActions = playerActions + "Your opponent used a " + opponentCards[0].card_name + "."
            }
            else if (opponentCards[1].card_type_id == 7) {
                playerActions = playerActions + "Your opponent used a " + opponentCards[1].card_name + "."
            }
    
    
            res.status(200).json(
                {
                    "playerActions": playerActions,
                    "opponentActions": opponentActions
                }
            )
        }
})


/**
 * Reads the player stats and showdown card from the database
 * Called by client side function getShowdownCardSelection
 * @param none
 * @returns {JSON} - Returns the player stats and showdown cards 
 */
app.get("/getShowdownCardSelection", (req, res) => {

    connection.query("SELECT player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, match_id, player_id, max_health, current_health, energy, insight, damage, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? AND room_id = ? AND showdown_turn = ?;", [PlayerID, MatchID, RoomID, ShowdownTurn],
        function (err, rows, fields) {
            if (err){
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            if (rows.length != 0){
                
                var card1 = rows[0];
                var card2 = rows[1];
                var card3 = rows[2];
                var card4 = rows[3];

                console.log("Card 1" + card1)
                console.log("Card 1" + card1)
                console.log("Card 1" + card1)
                console.log("Card 1" + card1)
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
                        card1, card2, card3, card4
                    ]
                })
                
            }
        }
    )
    
})

/**
 * Gets what cards the opponent chose for the showdown turn.
 * Gets what cards the player chose for the showdown turn.
 * Creates the opponentActions and playerActions strings that are updated to say which cards each player selected.
 * Called by client side function getShowdownResult
 * @param none
 * @returns {JSON} -  
 */
app.get("/getShowdownResult", (req, res) => {
    GetOpponentShowdownCardStats()

    /**
     * Gets what cards the opponent chose for the showdown turn.
     * Called by endpoint getShowdownResult.
     * @param none
     * @returns none
     */
    function GetOpponentShowdownCardStats() {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?;", [PlayerStatusID, ShowdownTurn, MatchID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetPlayerShowdownCardStats(rows)
            }
        )
    }

    
    /**
     * Gets what cards the player chose for the showdown turn.
     * Called by GetOpponentShowdownCardStats.
     * @param {object} opponentCards - An array of the opponent's selected cards.
     * @returns none
     */
    function GetPlayerShowdownCardStats(opponentCards) {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10);", [PlayerStatusID, ShowdownTurn], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                DisplayPlayerAndOpponentActions(opponentCards, rows);
                
            }
        )
    }


    /**
     * Creates the opponentActions and playerActions strings that are updated to say which cards each player selected.
     * Called by GetPlayerShowdownCardStats.
     * @param {object} opponentCards - An array of the opponent's selected cards.
     * @param {object} playerCards - An array of the player's selected cards.
     * @returns none.
     */
    function DisplayPlayerAndOpponentActions(opponentCards, playerCards) {
        var opponentActions = "";
        var playerActions = "";

        // 6	Attack
        // 7	Defense
        // 8	Skill
        // console.log("opponentCards")
        // console.log(opponentCards)
        // console.log("playerCards")
        // console.log(playerCards)

        //Opponent Actions
        if (opponentCards[0].card_type_id == 8 ) {
            opponentActions = "Your opponent used " + opponentCards[0].card_name
            if (opponentCards[1].card_type_id == 6) {
                opponentActions = opponentActions + " and used a " + opponentCards[1].card_name + "."
        
            }
        }
        else if (opponentCards[1].card_type_id == 8) {
            opponentActions = "Your opponent used " + opponentCards[1].card_name
            if (opponentCards[0].card_type_id == 6) {
                opponentActions = opponentActions + " and used a " + opponentCards[0].card_name + "."
        
            }
        }
        else{
            
            if (opponentCards[0].card_type_id == 6) {
                opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + "."
            }
            else if (opponentCards[1].card_type_id == 6) {
                opponentActions = opponentActions + "Your opponent used a " + opponentCards[1].card_name + "."
            }
        }
        

        if (playerCards[0].card_type_id == 7) {
            opponentActions = opponentActions + " You used a " + playerCards[0].card_name + "."
        }
        else if (playerCards[1].card_type_id == 7) {
            opponentActions = opponentActions + " You used a " + playerCards[1].card_name + "."
        }

        //Player Actions
        if (playerCards[0].card_type_id == 8 ) {
            playerActions = "You used " + playerCards[0].card_name
            if (playerCards[1].card_type_id == 6) {
                playerActions = playerActions + " and used a " + playerCards[1].card_name + "."
        
            }
        }
        else if (playerCards[1].card_type_id == 8) {
            playerActions = "You used " + playerCards[1].card_name
            if (playerCards[0].card_type_id == 6) {
                playerActions = playerActions + " and used a " + playerCards[0].card_name + "."
        
            }
        }
        else{
            if (playerCards[0].card_type_id == 6) {
                playerActions = playerActions + "You used a " + playerCards[0].card_name + "."
            }
            else if (playerCards[1].card_type_id == 6) {
                playerActions = playerActions + "You used a " + playerCards[1].card_name + "."
            }
        }
        if (opponentCards[0].card_type_id == 7) {
            playerActions = playerActions + " Your opponent used a " + opponentCards[0].card_name + "."
        }
        else if (opponentCards[1].card_type_id == 7) {
            playerActions = playerActions + " Your opponent used a " + opponentCards[1].card_name + "."
        }

        res.status(200).json(
            {
                "playerActions": playerActions,
                "opponentActions": opponentActions
            }
        )
    }
})


/**
 * Selects the cards for the next showdown turn.
 * Called by client side function SetupNextRoom.
 * @param none
 * @returns {JSON} - returns a success message
 */
app.post("/setupShowdown", (req, res) => {

    if(RoomID == 5){
        RoomID++;
        ShowdownTurn = 0;
    }
    ShowdownTurn++;

    /**
     * Gets the rows containing the information relating to the player.
     * Called by the setupShowdown endpoint.
     * @param none
     * @returns none
     */
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

    /**
     * Gets the rows containing the cards available in a room.
     * Called by GetPlayerStats.
     * @param {object} playerStats - the rows containing the information relating to the player.
     * @returns none
     */
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

    /**
     * Selects three random cards from the room deck and Inserts them into the database.
     * Called by GetRoomDeck.
     * @param {object} playerStats - the rows containing the information relating to the player.
     * @param {object} deck - the rows containing the cards available in a room.
     * @returns none
     */
    function InsertCards(playerStats, deck) {
        console.log("Insert cards Start")
        //Create Cards
        var indexOfElement;

        var card1 = deck[Math.floor(Math.random() * deck.length)]
        indexOfElement = deck.indexOf(card1);
        deck.splice(indexOfElement, 1)
        var card2 = deck[Math.floor(Math.random() * deck.length)]
        indexOfElement = deck.indexOf(card2);
        deck.splice(indexOfElement, 1)
        var card3 = deck[Math.floor(Math.random() * deck.length)]


        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn) VALUES (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?), (?,?,?,?,?);", [playerStats[0].player_status_id, 5, 8, RoomID, ShowdownTurn, playerStats[0].player_status_id, 6, card1.card_id, RoomID, ShowdownTurn, playerStats[0].player_status_id, 7, card2.card_id, RoomID, ShowdownTurn, playerStats[0].player_status_id, 8, card3.card_id, RoomID, ShowdownTurn],
        function (err, rows, fields) {
            if (err){

                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            
            UpdateGameStateToShowdownCardSelection()

        })
            
    }

    function UpdateGameStateToShowdownCardSelection() {
        connection.query("UPDATE player_status SET state_id = 4 WHERE match_id = ? AND player_status_id = ?;", [MatchID, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                res.status(200).json({
                    "message": "Cards inserted and game state changed!"
                })
            }
        )
    }
});


/**
 * Checks the cards selected by the player and opponent by the end of a showdown turn and applies their effects to the player
 * Called by client side function ShowdownEndTurn.
 * @param none
 * @returns {JSON} - returns the srings for the playerActions and opponentActions stating which cards each one chose
 */
app.post("/resolveShowdownTurn", (req, res) => {

//save player cards to database
//ShowdownTurn++;

// req.body.cardId

    UpdateSelectedCardSlot1()

    /**
     * Update in the database what card is in the first selection slot at the end of the showdown turn.
     * Called by resolveShowdownTurn endpoint.
     * @param none
     * @returns none
     */
    function UpdateSelectedCardSlot1() {
        connection.query("UPDATE player_card_slot SET slot_id = 9 WHERE card_id = ? AND player_status_id = ? AND showdown_turn = ?;", [req.body.cardId1, PlayerStatusID, ShowdownTurn], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                UpdateSelectedCardSlot2()
            }
        )
        
    }

    /**
     * Update in the database what card is in the second selection slot at the end of the showdown turn.
     * Called by UpdateSelectedCardSlot1.
     * @param none
     * @returns none
     */
    function UpdateSelectedCardSlot2() {
        connection.query("UPDATE player_card_slot SET slot_id = 10 WHERE card_id = ? AND player_status_id = ? AND showdown_turn = ?;", [req.body.cardId2, PlayerStatusID, ShowdownTurn], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                UpdateGameStateToWaitingForOpponentShowdown()
            }
        )
    }


    
    function UpdateGameStateToWaitingForOpponentShowdown() {
        connection.query("UPDATE player_status SET state_id = 5 WHERE match_id = ? AND player_status_id = ?;", [MatchID, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetOpponentShowdownCardStats()
            }
        )
    } 

    /**
     * Get all the information from the opponent's selected cards to use in the next function.
     * Called by UpdateSelectedCardSlot2.
     * @param none
     * @returns none
     */
    function GetOpponentShowdownCardStats() {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?;", [PlayerStatusID, ShowdownTurn, MatchID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetPlayerShowdownCardStats(rows)
                }
                else {
                    res.status(200).json({
                        "message": "Waiting for opponent's choice"
                    })
                }
                
            }
        )
        
    }


    /**
     * Get all the information from the player's selected cards to use in the next function.
     * Called by GetOpponentShowdownCardStats.
     * @param {object} opponentCards - An array of the opponent's selected cards.
     * @returns none
     */
    function GetPlayerShowdownCardStats(opponentCards) {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10);", [PlayerStatusID, ShowdownTurn], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                GetPlayerShowdownStats(opponentCards, rows);
                
            }
        )
    }

    /**
     * Save in variables what stats need to be changed and by how much once the showdown turn concludes.
     * Called by GetPlayerShowdownCardStats.
     * @param {object} opponentCards - An array of the opponent's selected cards.
     * @param {object} playerCards - An array of the player's selected cards.
     * @returns none
     */
    function GetPlayerShowdownStats(opponentCards, playerCards) {
        connection.query("SELECT player_status_id, Player.match_id, player_id, current_health, energy, insight, Player.damage, Opponent.damage op_damage FROM (SELECT damage, match_id FROM dungeonshowdown.player_status WHERE match_id = ? AND player_status_id != ?) Opponent INNER JOIN dungeonshowdown.player_status Player ON Opponent.match_id = Player.match_id WHERE player_status_id = ?;", [MatchID, PlayerStatusID, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                var opponentDamage = rows[0].op_damage;
                var opponentAttack = 0
                var opponentParryAttack = 0
                var playerCurrentHealth = rows[0].current_health;
                var playerEnergy = rows[0].energy;
                var playerInsight = rows[0].insight;
                var playerDamage = rows[0].damage;
                var playerDefense = 0;
                var playerAttack = 0;
                var isParry = false;
                var isDodge = false;
                var isDoubleAttack = false;
                var isCounter = false;
                var isDoubleAttackOpponent = false;
                var isCounterOpponent = false;
                var isParryOpponent = false;
                
                //Player Skills
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards.card_type_id == 8) {
                        playerCurrentHealth = playerCurrentHealth + playerCards.card_current_health;
                        playerInsight = playerInsight + playerCards.card_insight;
                        playerEnergy = playerEnergy + playerCards.card_energy;
                        playerDamage = playerDamage + playerCards.card_damage;
                    }
                }

                //Opponent Skills
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards.card_type_id == 8) {
                        opponentDamage = opponentDamage + opponentCards.card_damage;
                    }
                }
                
                //Player Defense
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards.card_type_id == 7) {
                        playerDefense = playerDefense + playerCards.card_defense;
                        playerInsight = playerInsight + playerCards.card_insight;
                        playerEnergy = playerEnergy + playerCards.card_energy;

                        if (playerCards.card_id = 1) {
                            isParry = true;
                        }
                        if (playerCards.card_id = 2) {
                            isDodge = true;
                        }
                    }
                }

                //Opponent Defense
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards.card_type_id == 7) {
                        if (opponentCards.card_id = 1) {
                            opponentParryAttack = opponentCards.card_attack
                            isParryOpponent = true;
                        }
                    }
                }

                //Player Attack
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards.card_type_id == 6) {
                        playerAttack = playerAttack + playerCards.card_attack;
                        playerEnergy = playerEnergy + playerCards.card_energy;

                        if (playerCards.card_id = 3) {
                            isDoubleAttack = true;
                        }
                        if (playerCards.card_id = 4) {
                            isCounter = true;
                        }
                    }
                }

                //Opponent Attack
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards.card_type_id == 6) {
                        opponentAttack = opponentAttack + opponentCards.card_attack;

                        if (opponentCards.card_id = 3) {
                            isDoubleAttackOpponent = true;
                        }
                        if (opponentCards.card_id = 4) {
                            isCounterOpponent = true;
                        }
                    }
                }

                if (isCounterOpponent) {
                    if(!isDodge || !isParry){
                        
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - (opponentAttack * opponentDamage));
                        playerDefense = Math.max(0, playerDefense - (opponentAttack * opponentDamage))
                    }
                }
                if(isDoubleAttackOpponent) {
                    if(!isDodge || !isParry){
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - ((opponentAttack * opponentDamage) * 2));
                        playerDefense = Math.max(0, playerDefense - ((opponentAttack * opponentDamage) * 2))
                    }
                    else{
                        
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - (opponentAttack * opponentDamage))
                        playerDefense = Math.max(0, playerDefense - (opponentAttack * opponentDamage))
                    }
                }
                if (isParryOpponent) {
                    if(opponentAttack != 0 || !isDodge) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - (opponentParryAttack * playerDamage));
                        playerDefense = Math.max(0, playerDefense - (opponentParryAttack * playerDamage))
                    }
                }
                
                //Apply Normal, Heavy or Recovery Attack Damage
                if(!isCounterOpponent && !isDoubleAttackOpponent) {
                    playerCurrentHealth = playerCurrentHealth + playerDefense - (opponentAttack * opponentDamage)
                    playerDefense = Math.max(0, playerDefense - (opponentAttack * opponentDamage))
                }
                
                
                UpdateShowdownPlayerStats(playerCurrentHealth, playerEnergy, playerInsight, playerDamage, opponentCards, playerCards)
            }
        )
    }

    /**
     * Update the player stats in the database according to the selected cards in the showdown.
     * Called by GetPlayerShowdownStats.
     * @param {number} playerCurrentHealth - The new Current Health value to be updated into the database.
     * @param {number} playerEnergy - The new Energy value to be updated into the database.
     * @param {number} playerInsight - The new Insight value to be updated into the database.
     * @param {number} playerDamage - The new Damage value to be updated into the database.
     * @param {object} opponentCards - An array of the opponent's selected cards.
     * @param {object} playerCards - An array of the player's selected cards.
     * @returns {JSON} The sum of a and b.
     */
    function UpdateShowdownPlayerStats(playerCurrentHealth, playerEnergy, playerInsight, playerDamage, opponentCards, playerCards) {
        connection.query("UPDATE player_status SET current_health = ?, energy = ?, insight = ?, damage = ? WHERE player_status_id = ?;", [playerCurrentHealth, playerEnergy, playerInsight, playerDamage, PlayerStatusID], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                DisplayPlayerAndOpponentActions(opponentCards, playerCards)
            }
        )
    }


    /**
     * Creates the strings that show the opponent and player actions in the showdown.
     * Called by UpdateShowdownPlayerStats.
     * @param {object} opponentCards - An array of the opponent's selected cards.
     * @param {object} playerCards - An array of the player's selected cards.
     * @returns none
     */
    function DisplayPlayerAndOpponentActions(opponentCards, playerCards) {
        var opponentActions = "";
        var playerActions = "";

        // 6	Attack
        // 7	Defense
        // 8	Skill
        // console.log("opponentCards")
        // console.log(opponentCards)
        // console.log("playerCards")
        // console.log(playerCards)

        //Opponent Actions
        if (opponentCards[0].card_type_id == 8 ) {
            opponentActions = "Your opponent used " + opponentCards[0].card_name
            if (opponentCards[1].card_type_id == 6) {
                opponentActions = opponentActions + " and used a " + opponentCards[1].card_name + ". "
        
            }
        }
        else if (opponentCards[1].card_type_id == 8) {
            opponentActions = "Your opponent used " + opponentCards[1].card_name
            if (opponentCards[0].card_type_id == 6) {
                opponentActions = opponentActions + " and used a " + opponentCards[0].card_name + ". "
        
            }
        }
        else{
            
            if (opponentCards[0].card_type_id == 6) {
                opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + ". "
            }
            else if (opponentCards[1].card_type_id == 6) {
                opponentActions = opponentActions + "Your opponent used a " + opponentCards[1].card_name + ". "
            }
        }
        

        if (playerCards[0].card_type_id == 7) {
            opponentActions = opponentActions + "You used a " + playerCards[0].card_name + "."
        }
        else if (playerCards[1].card_type_id == 7) {
            opponentActions = opponentActions + "You used a " + playerCards[1].card_name + "."
        }

        //Player Actions
        if (playerCards[0].card_type_id == 8 ) {
            playerActions = "You used " + playerCards[0].card_name
            if (playerCards[1].card_type_id == 6) {
                playerActions = playerActions + " and used a " + playerCards[1].card_name + "."
        
            }
        }
        else if (playerCards[1].card_type_id == 8) {
            playerActions = "You used " + playerCards[1].card_name
            if (playerCards[0].card_type_id == 6) {
                playerActions = playerActions + " and used a " + playerCards[0].card_name + "."
        
            }
        }
        else{
            if (playerCards[0].card_type_id == 6) {
                playerActions = playerActions + " You used a " + playerCards[0].card_name + ". "
            }
            else if (playerCards[1].card_type_id == 6) {
                playerActions = playerActions + " You used a " + playerCards[1].card_name + ". "
            }
        }
        if (opponentCards[0].card_type_id == 7) {
            playerActions = playerActions + "Your opponent used a " + opponentCards[0].card_name + "."
        }
        else if (opponentCards[1].card_type_id == 7) {
            playerActions = playerActions + "Your opponent used a " + opponentCards[1].card_name + "."
        }


        res.status(200).json(
            {
                "playerActions": playerActions,
                "opponentActions": opponentActions
            }
        )
    }
})

//#endregion

// listen for requests on port 
app.listen(4000, () => {
    console.log("🙌 Server is running on port 4000. Check http://localhost:4000/")
});