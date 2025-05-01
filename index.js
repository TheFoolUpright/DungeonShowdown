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
//var req.session.matchId = 1;
//var req.session.playerId = 1;
//var req.session.playerStatusId = 1;
//var  req.session.roomId = 1;
//var  req.session.showdownTurn = 1;
//var  req.session.state

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
            req.session.playerId = rows[0].player_id

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
            if (err) {
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }

            if (rows.length > 0) {
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
                if (err) {
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
    if (req.session.matchId) {
       res.status(200).json({
           "message": "Player already in a match",
           "state": "MATCH_FOUND"
       })
       return;
    }

    connection.query("SELECT match_id FROM game_match WHERE (player_1_id = ? OR player_2_id = ?) AND is_match_finished = 0;", [req.session.playerId, req.session.playerId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            if (rows.length == 0) {
                if(rows.length == 0) {
                    //Send waiting for matches
                    res.status(200).json({
                        "message": "Waiting for Match!",
                        "state": "WAITING_FOR_MATCH"
                    })
                }
            }
            else {
                req.session.matchId = rows[0].match_id
                if (req.session.matchId) {
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
     if (!req.session.playerId) {
        //not logged in
        res.status(401).json({
            "message": "Player not logged in"
        })
        return;
        
     }

     if (req.session.matchId) {
        res.status(200).json({
            "message": "Player already in a match",
            "state": "MATCH_FOUND"
        })
        return;
     }

     UpdateWaitingForMatchSearch()

    function UpdateWaitingForMatchSearch() {
        connection.query("UPDATE player SET is_waiting_for_match = 1 WHERE player_id = ?;", [req.session.playerId], 
            function (err, rows, fields) {
                if (err) {
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
        connection.query("SELECT player_id FROM player WHERE is_waiting_for_match = 1 AND player_id != ? ", [req.session.playerId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                if(rows.length == 0) {
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
        connection.query("INSERT INTO game_match (player_1_id, player_2_id) VALUES (?, ?)", [player1, req.session.playerId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                FindMatch(player1, req.session.playerId)

            }
        );
    }

    function FindMatch(player1, player2) {
        connection.query("SELECT match_id FROM game_match WHERE player_1_id = ? AND player_2_id = ? AND is_match_finished = 0;", [player1, player2],
            function (err, rows, fields) {
                if (err) {
                    console.log("FindMatch")
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                req.session.matchId = rows[0].match_id
                
                CreatePlayerStatus(player1) 
            }
        )
    }
    
    function CreatePlayerStatus(player1) {
        connection.query("INSERT INTO player_status (match_id, player_id) VALUES (?, ?), (?, ?);", [req.session.matchId, req.session.playerId, req.session.matchId, player1], 
            function (err, rows, fields) {
                if (err) {
                    console.log("FindMatch")
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                GetPlayerStatus()

            }
        )
    }

    function GetPlayerStatus() {
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM player_status WHERE match_id = ?;", [req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                var player1Status = rows[0]
                var player2Status = rows[1]

                req.session.roomId = 1
                GetRoomDeck(player1Status, player2Status)
            }
        )
    }

    function GetRoomDeck(playerStatus, opponentStatus) {
        
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM (SELECT max_health, current_health, energy, insight FROM player_status WHERE player_status_id = ?) ps, card_room cr INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id WHERE  (ps.current_health + card_current_health <= ps.max_health) AND (ps.insight + card_insight <= 10) AND (ps.current_health + card_current_health > 0) AND (ps.energy + card_energy >= 0) AND (ps.insight + card_insight >= 0) AND r.room_id = ?", [playerStatus.player_status_id,  req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                //call function to set cards
                InsertDungeonCards(playerStatus, opponentStatus, rows)

            }
        )
    }


    function InsertDungeonCards(playerStats, opponentStatus, deck) {

        //Create Cards 
        var indexOfElement;
        var MaxHealthDeck = [];
        var MaxHealthIterator = 0;
        var HealingDeck = [];
        var HealingIterator  = 0;
        var DamageDeck = [];
        var DamageIterator = 0;
        var RestDeck = [];
        var RestIterator = 0;
        var EnemyDeck = [];
        var EnemyIterator = 0;

        for (let i = 0; i < deck.length; i++) {
            if(deck[i].card_type_id == 1) {
                MaxHealthDeck[MaxHealthIterator] = deck[i];
                MaxHealthIterator++;
            }
            if(deck[i].card_type_id == 2) {
                HealingDeck[HealingIterator] = deck[i];
                HealingIterator++;
            }
            if(deck[i].card_type_id == 3) {
                DamageDeck[DamageIterator] = deck[i];
                DamageIterator++;
            }
            if(deck[i].card_type_id == 4) {
                RestDeck[RestIterator] = deck[i];
                RestIterator++
            }
            if(deck[i].card_type_id == 5) {
                EnemyDeck[EnemyIterator] = deck[i];
                EnemyIterator++;
            }   
        }

        var playerTypesDeck = []
        var opponentTypesDeck = []
        var typeIterator = 0

        if (MaxHealthDeck.length != 0) {
            playerTypesDeck[typeIterator] = MaxHealthDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = MaxHealthDeck[0].card_type_id
            typeIterator++;
        }
        if (HealingDeck.length != 0) {
            playerTypesDeck[typeIterator] = HealingDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = HealingDeck[0].card_type_id
            typeIterator++;
        }
        if (DamageDeck.length != 0) {
            playerTypesDeck[typeIterator] = DamageDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = DamageDeck[0].card_type_id
            typeIterator++;
        }
        if (RestDeck.length != 0) {
            playerTypesDeck[typeIterator] = RestDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = RestDeck[0].card_type_id
            typeIterator++;
        }
        if (EnemyDeck.length != 0) {
            playerTypesDeck[typeIterator] = EnemyDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = EnemyDeck[0].card_type_id
            typeIterator++;
        }

        var playerType1 = playerTypesDeck[Math.floor(Math.random() * playerTypesDeck.length)]
        indexOfElement = playerTypesDeck.indexOf(playerType1);
        playerTypesDeck.splice(indexOfElement, 1)
        
        var playerType2 = playerTypesDeck[Math.floor(Math.random() * playerTypesDeck.length)]
        indexOfElement = playerTypesDeck.indexOf(playerType2);
        playerTypesDeck.splice(indexOfElement, 1)
        
        var playerType3 = playerTypesDeck[Math.floor(Math.random() * playerTypesDeck.length)]

        var opponentType1 = opponentTypesDeck[Math.floor(Math.random() * opponentTypesDeck.length)]
        indexOfElement = opponentTypesDeck.indexOf(opponentType1);
        opponentTypesDeck.splice(indexOfElement, 1)
        
        var opponentType2 = opponentTypesDeck[Math.floor(Math.random() * opponentTypesDeck.length)]
        indexOfElement = opponentTypesDeck.indexOf(opponentType2);
        opponentTypesDeck.splice(indexOfElement, 1)
        
        var opponentType3 = opponentTypesDeck[Math.floor(Math.random() * opponentTypesDeck.length)]


        var playerCard1
        var playerCard2
        var playerCard3

        var opponentCard1
        var opponentCard2
        var opponentCard3

        switch(playerType1) {
            case 1:
                playerCard1 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                playerCard1 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                playerCard1 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                playerCard1 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                playerCard1 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }
        switch(playerType2) {
            case 1:
                playerCard2 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                playerCard2 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                playerCard2 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                playerCard2 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                playerCard2 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }
        switch(playerType3) {
            case 1:
                playerCard3 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                playerCard3 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                playerCard3 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                playerCard3 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                playerCard3 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }

        switch(opponentType1) {
            case 1:
                opponentCard1 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                opponentCard1 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                opponentCard1 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                opponentCard1 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                opponentCard1 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }
        switch(opponentType2) {
            case 1:
                opponentCard2 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                opponentCard2 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                opponentCard2 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                opponentCard2 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                opponentCard2 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }
        switch(opponentType3) {
            case 1:
                opponentCard3 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                opponentCard3 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                opponentCard3 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                opponentCard3 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                opponentCard3 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }

        //Make cards visable by default
        playerCard1.IsVisible = true;
        playerCard2.IsVisible = true;
        playerCard3.IsVisible = true;
        opponentCard1.IsVisible = true;
        opponentCard2.IsVisible = true;
        opponentCard3.IsVisible = true;
        

        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn, is_visible) VALUES (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?);", 
            [playerStats.player_status_id, 1, playerCard1.card_id,  req.session.roomId,  req.session.showdownTurn, playerCard1.IsVisible, 
             playerStats.player_status_id, 2, playerCard2.card_id,  req.session.roomId,  req.session.showdownTurn, playerCard2.IsVisible,  
             playerStats.player_status_id, 3, playerCard3.card_id,  req.session.roomId,  req.session.showdownTurn, playerCard3.IsVisible,
             opponentStatus.player_status_id, 1, opponentCard1.card_id,  req.session.roomId,  req.session.showdownTurn, opponentCard1.IsVisible, 
             opponentStatus.player_status_id, 2, opponentCard2.card_id,  req.session.roomId,  req.session.showdownTurn, opponentCard2.IsVisible,  
             opponentStatus.player_status_id, 3, opponentCard3.card_id,  req.session.roomId,  req.session.showdownTurn, opponentCard3.IsVisible],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }

            UpdateWaitingForMatchFound()
        })
    }

    function UpdateWaitingForMatchFound() {
        connection.query("UPDATE player p INNER JOIN game_match m ON m.player_1_id = p.player_id or m.player_2_id = p.player_id SET p.is_waiting_for_match = 0 WHERE m.match_id = ?", [req.session.matchId], 
            function (err, rows, fields) {
                if (err) {
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
 * Gets the  req.session.roomId,  req.session.showdownTurn, and  req.session.state from the database
 * Called by client side function getGameState.
 * @param none
 * @returns {JSON} - returns the  req.session.roomId,  req.session.showdownTurn, and  req.session.state to the client side. 
 */
//TODO: Add the state in and only retern the room, turn and state
app.get("/getGameState", (req, res) => {
    GetLastRoom()
    function GetLastRoom() {
        connection.query("SELECT room_id, showdown_turn, state_id FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? ORDER BY room_id DESC, showdown_turn DESC", [req.session.playerId, req.session.matchId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                if(rows.length != 0) {

                     req.session.roomId = rows[0].room_id;
                     req.session.showdownTurn = rows[0].showdown_turn;
                     req.session.state = rows[0].state_id;
                    
                    res.status(200).json({
                        "room_id":  req.session.roomId,
                        "showdown_turn":  req.session.showdownTurn,
                        "state_id":  req.session.state
                    })
                }
            }
        )
    }

})

app.get("/getWaitingOnOpponentDungeon", (req, res) => {

    GetOpponentStatus()

    function GetOpponentStatus() {
        connection.query("SELECT state_id FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE player_id != ? AND match_id = ? AND room_id = ? AND slot_id = 4", [req.session.playerId, req.session.matchId,  req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
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
        connection.query("UPDATE player_status SET state_id = 3 WHERE player_status_id = ?", [req.session.playerStatusId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                } 
                
                res.status(200).json({
                    "message": " req.session.state changed",
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
        connection.query("INSERT INTO player_status (match_id, player_id) VALUES (?, ?)", [req.session.matchId, req.session.playerId],
            function (err, rows, fields) {
                if (err) {
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

    connection.query("SELECT player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, is_visible, match_id, player_id, max_health, current_health, energy, insight, damage, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? AND room_id = ?;", [req.session.playerId, req.session.matchId,  req.session.roomId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            if (rows.length != 0) {
                
                var card1 = rows[0];
                var card2 = rows[1];
                var card3 = rows[2];
                
           
                res.status(200).json({
                    "message": "Player stats and cards updated",
                    "state": "ROOM_LOADED",
                    "room_id":  req.session.roomId,
                    "showdown_turn":  req.session.showdownTurn,
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
    if (!req.session.playerStatusId) {
        console.log("got here")
        GetSessionPlayerStatusId()
    }
    else{
        UpdateGameStateToWaitingForOpponentDungeon()
    }

    function GetSessionPlayerStatusId() {
        connection.query("SELECT player_status_id FROM player_status WHERE player_id = ? AND match_id = ?", [req.session.playerId, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                req.session.playerStatusId = rows[0].player_status_id;
                UpdateGameStateToWaitingForOpponentDungeon()
            }
        )
    }

    

    /**
     * Updates the player_status table with the current state. 
     * Called by the resolveDungeonTurn endpoint.
     * @param none
     * @returns none
     */
    function UpdateGameStateToWaitingForOpponentDungeon() {
        connection.query("UPDATE player_status SET state_id = 2 WHERE match_id = ? AND player_status_id = ?;", [req.session.matchId, req.session.playerStatusId], 
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
        connection.query("UPDATE player_card_slot SET slot_id = 4 WHERE card_id = ? AND player_status_id = ?;", [req.body.cardId, req.session.playerStatusId], 
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
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM player_status WHERE player_status_id = ?;", [req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    console.log(rows[0].player_status_id)
                
                    GetCardStats(rows)
                }
                else{
                    console.log("Problem Here: nadosfno")
                }
                
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
        connection.query("SELECT card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card WHERE card_id = ?;", [req.body.cardId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    var updatedMaxHealth = PlayerStats[0].max_health + rows[0].card_max_health
                    var updatedCurrentHealth = PlayerStats[0].current_health + rows[0].card_current_health + rows[0].card_max_health
                    var updatedEnergy = PlayerStats[0].energy + rows[0].card_energy
                    var updatedInsight = PlayerStats[0].insight + rows[0].card_insight
                    var updatedDamage = PlayerStats[0].damage + rows[0].card_damage
                    UpdatePlayerStats(updatedMaxHealth, updatedCurrentHealth, updatedEnergy, updatedInsight, updatedDamage)
                }
                else{
                    console.log("Problem Here: hfaupiosblz")
                }
                
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
        connection.query("UPDATE player_status SET max_health = ?, current_health = ?, energy = ?, insight = ?, damage = ? WHERE player_status_id = ?;", [updatedMaxHealth, updatedCurrentHealth, updatedEnergy, updatedInsight, updatedDamage, req.session.playerStatusId], 
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
        connection.query("SELECT c.card_id, ct.card_type_id, card_type_name FROM player_card_slot pcs INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id INNER JOIN card c ON pcs.card_id = c.card_id INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?", [req.session.playerStatusId, req.session.matchId,  req.session.roomId], 
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

function setupNextDungeonRoom(req, res) {
    
    req.session.roomId++;
    GetPlayerStats()
        
    /**
     * Reads the player stats from the database and updates the req.session.playerStatusId. 
     * Called by SettingCards function.
     * @param none
     * @returns none
     */
    function GetPlayerStats() {
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage FROM player_status WHERE player_id = ? AND match_id = ?;", [req.session.playerId, req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                req.session.playerStatusId = rows[0].player_status_id
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
        
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM (SELECT max_health, current_health, energy, insight FROM player_status WHERE player_status_id = ?) ps, card_room cr INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id WHERE  (ps.current_health + card_current_health <= ps.max_health) AND (ps.insight + card_insight <= 10) AND (ps.current_health + card_current_health > 0) AND (ps.energy + card_energy >= 0) AND (ps.insight + card_insight >= 0) AND r.room_id = ?", [req.session.playerStatusId,  req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                //call function to set cards
                InsertDungeonCards(playerStats, rows)

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
    function InsertDungeonCards(playerStats, deck) {

        //Create Cards - Mary here
        var indexOfElement;
        var MaxHealthDeck = [];
        var MaxHealthIterator = 0;
        var HealingDeck = [];
        var HealingIterator  = 0;
        var DamageDeck = [];
        var DamageIterator = 0;
        var RestDeck = [];
        var RestIterator = 0;
        var EnemyDeck = [];
        var EnemyIterator = 0;

        for (let i = 0; i < deck.length; i++) {
            if(deck[i].card_type_id == 1) {
                MaxHealthDeck[MaxHealthIterator] = deck[i];
                MaxHealthIterator++;
            }
            if(deck[i].card_type_id == 2) {
                HealingDeck[HealingIterator] = deck[i];
                HealingIterator++;
            }
            if(deck[i].card_type_id == 3) {
                DamageDeck[DamageIterator] = deck[i];
                DamageIterator++;
            }
            if(deck[i].card_type_id == 4) {
                RestDeck[RestIterator] = deck[i];
                RestIterator++
            }
            if(deck[i].card_type_id == 5) {
                EnemyDeck[EnemyIterator] = deck[i];
                EnemyIterator++;
            }   
        }

        var typesDeck = []
        var typeIterator = 0

        if (MaxHealthDeck.length != 0) {
            typesDeck[typeIterator] = MaxHealthDeck[0].card_type_id
            typeIterator++;
        }
        if (HealingDeck.length != 0) {
            typesDeck[typeIterator] = HealingDeck[0].card_type_id
            typeIterator++;
        }
        if (DamageDeck.length != 0) {
            typesDeck[typeIterator] = DamageDeck[0].card_type_id
            typeIterator++;
        }
        if (RestDeck.length != 0) {
            typesDeck[typeIterator] = RestDeck[0].card_type_id
            typeIterator++;
        }
        if (EnemyDeck.length != 0) {
            typesDeck[typeIterator] = EnemyDeck[0].card_type_id
            typeIterator++;
        }

        var type1 = typesDeck[Math.floor(Math.random() * typesDeck.length)]
        indexOfElement = typesDeck.indexOf(type1);
        typesDeck.splice(indexOfElement, 1)
        
        var type2 = typesDeck[Math.floor(Math.random() * typesDeck.length)]
        indexOfElement = typesDeck.indexOf(type2);
        typesDeck.splice(indexOfElement, 1)
        
        var type3 = typesDeck[Math.floor(Math.random() * typesDeck.length)]

        var card1
        var card2
        var card3


        switch(type1) {
            case 1:
                card1 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                card1 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                card1 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                card1 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                card1 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }
        switch(type2) {
            case 1:
                card2 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                card2 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                card2 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                card2 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                card2 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }
        switch(type3) {
            case 1:
                card3 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break;
            case 2:
                card3 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break;
            case 3:
                card3 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break;
            case 4:
                card3 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break;
            case 5:
                card3 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break;
            default:
                console.log("Case Error")
        }

        console.log(card1)
        console.log(card2)
        console.log(card3)
        
        // var card1 = deck[Math.floor(Math.random() * deck.length)]
        // indexOfElement = deck.indexOf(card1);
        // deck.splice(indexOfElement, 1)
        // var card2 = deck[Math.floor(Math.random() * deck.length)]
        // indexOfElement = deck.indexOf(card2);
        // deck.splice(indexOfElement, 1)
        // var card3 = deck[Math.floor(Math.random() * deck.length)]


        //Make cards visible by default
        card1.IsVisible = true;
        card2.IsVisible = true;
        card3.IsVisible = true;
        
        if (playerStats[0].insight < 9 && playerStats[0].insight > 5) {
            var randomChoice =  Math.floor((Math.random() * 3) + 1)
            console.log("1 card: " + randomChoice)
            if (randomChoice == 1) {
                card1.IsVisible = false;
            }
            else if (randomChoice == 2) {
                card2.IsVisible = false;
            }
            else if (randomChoice == 3) {
                card3.IsVisible = false;
            }
            
        }
        if (playerStats[0].insight < 6 && playerStats[0].insight > 2) {
            var randomChoice =  Math.floor((Math.random() * 3) + 1)
            console.log("2 cards: " + randomChoice)
            if (randomChoice == 1) {
                card1.IsVisible = false;
                card2.IsVisible = false;
            }
            else if (randomChoice == 2) {
                card2.IsVisible = false;
                card3.IsVisible = false;
            }
            else if (randomChoice == 3) {
                card1.IsVisible = false;
                card3.IsVisible = false;
            }
        }
        if (playerStats[0].insight < 3) {
            card1.IsVisible = false;
            card2.IsVisible = false;
            card3.IsVisible = false;
        }

        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn, is_visible) VALUES (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?);", [playerStats[0].player_status_id, 1, card1.card_id,  req.session.roomId,  req.session.showdownTurn, card1.IsVisible, playerStats[0].player_status_id, 2, card2.card_id,  req.session.roomId,  req.session.showdownTurn, card2.IsVisible,  playerStats[0].player_status_id, 3, card3.card_id,  req.session.roomId,  req.session.showdownTurn, card3.IsVisible],
        function (err, rows, fields) {
            if (err) {
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
        connection.query("UPDATE player_status SET state_id = 1 WHERE match_id = ? AND player_status_id = ?;", [req.session.matchId, req.session.playerStatusId], 
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

}


/**
 * ???
 * Called by client side function SetupNextRoom.
 * @param none
 * @returns {JSON} 
 */
//TODO: Write stuff for setting cards
app.post("/setupNextDungeonRoom", (req, res) => {
    setupNextDungeonRoom(req, res)
})

/**
 * Reads the opponents card from the database. 
 * Called by client side function getDungeonResult.
 * @param none
 * @returns {JSON} - returns the opponents card selection or if the player is waiting on the opponent
 */
app.get("/getOpponentCard", (req, res) => {

    connection.query("SELECT c.card_id, ct.card_type_id, card_type_name FROM player_card_slot pcs INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id INNER JOIN card c ON pcs.card_id = c.card_id INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?", [req.session.playerStatusId, req.session.matchId,  req.session.roomId], 
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
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?;", [req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId], 
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
        connection.query("UPDATE player_status SET state_id = 6 WHERE player_status_id = ?", [req.session.playerStatusId], 
            function (err, rows, fields) {
                if (err) {
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
            connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10);", [req.session.playerStatusId,  req.session.showdownTurn], 
                function(err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
    
                    if (rows.length != 0) {
                        DisplayPlayerAndOpponentActions(opponentCards, rows);
                    }
                    else {
                        console.log("Error in GetPlayerShowdownCardStats: waiting")
                    }
                    
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
        //getWaitingOnOpponentShowdown
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
    
            if (playerCards.length == 2 && opponentCards.length == 2) {
                //Opponent Actions
                if (opponentCards[0].card_type_id == 8 ) {
                    opponentActions = "Your opponent used " + opponentCards[0].card_name + " "
                    if (opponentCards[1].card_type_id == 6) {
                        opponentActions = opponentActions + "and used a " + opponentCards[1].card_name + ". "
                
                    }
                }
                else if (opponentCards[1].card_type_id == 8) {
                    opponentActions = "Your opponent used " + opponentCards[1].card_name + " "
                    if (opponentCards[0].card_type_id == 6) {
                        opponentActions = opponentActions + "and used a " + opponentCards[0].card_name + ". "
                
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
                    playerActions = "You used " + playerCards[0].card_name + " "
                    if (playerCards[1].card_type_id == 6) {
                        playerActions = playerActions + "and used a " + playerCards[1].card_name + "."
                
                    }
                }
                else if (playerCards[1].card_type_id == 8) {
                    playerActions = "You used " + playerCards[1].card_name + " "
                    if (playerCards[0].card_type_id == 6) {
                        playerActions = playerActions + "and used a " + playerCards[0].card_name + "."
                
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
            }
            else if (playerCards.length == 1 && opponentCards.length == 2) {
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
    
                //Player Actions
                if (playerCards[0].card_type_id == 8 ) {
                    playerActions = "You used " + playerCards[0].card_name
                }
                else if (playerCards[0].card_type_id == 6) {
                    playerActions = playerActions + " You used a " + playerCards[0].card_name + ". "
                }
                if (opponentCards[0].card_type_id == 7) {
                    playerActions = playerActions + "Your opponent used a " + opponentCards[0].card_name + "."
                }
                else if (opponentCards[1].card_type_id == 7) {
                    playerActions = playerActions + "Your opponent used a " + opponentCards[1].card_name + "."
                }
    
            }
            else if (playerCards.length == 2 && opponentCards.length == 1) {
                //Opponent Actions
                if (opponentCards[0].card_type_id == 8 ) {
                    opponentActions = "Your opponent used " + opponentCards[0].card_name
                }
                else if (opponentCards[0].card_type_id == 6) {
                    opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + ". "
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
            }
            else if (playerCards.length == 1 && opponentCards.length == 1) {
                //Opponent Actions
                if (opponentCards[0].card_type_id == 8 ) {
                    opponentActions = "Your opponent used " + opponentCards[0].card_name
                }
                else{
                    if (opponentCards[0].card_type_id == 6) {
                        opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + ". "
                    }
                }
                
                if (playerCards[0].card_type_id == 7) {
                    opponentActions = opponentActions + "You used a " + playerCards[0].card_name + "."
                }
    
                //Player Actions
                if (playerCards[0].card_type_id == 8 ) {
                    playerActions = "You used " + playerCards[0].card_name
                }
                else{
                    if (playerCards[0].card_type_id == 6) {
                        playerActions = playerActions + " You used a " + playerCards[0].card_name + ". "
                    }
                }
                if (opponentCards[0].card_type_id == 7) {
                    playerActions = playerActions + "Your opponent used a " + opponentCards[0].card_name + "."
                }
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

    connection.query("SELECT player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, is_visible, match_id, player_id, max_health, current_health, energy, insight, damage, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, state_id FROM player_card_slot PCS INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? AND room_id = ? AND showdown_turn = ?;", [req.session.playerId, req.session.matchId,  req.session.roomId,  req.session.showdownTurn],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            if (rows.length != 0) {
                
                var card1 = rows[0];
                var card2 = rows[1];
                var card3 = rows[2];
                var card4 = rows[3];

                card2.isEnabled = true
                card3.isEnabled = true
                card4.isEnabled = true

                //Special Attack
                if (card2.card_energy + rows[0].energy < 0) {
                    card2.isEnabled = false
                }
                //Defense
                if ((card3.card_energy + rows[0].energy < 0) || (card3.card_insight + rows[0].insight < 0)) {
                    card3.isEnabled = false
                }
                //Skill
                if ((card4.card_energy + rows[0].energy < 0) || (card4.card_current_health + rows[0].current_health < 0)) {
                    card4.isEnabled = false
                }

                console.log(card2)
                console.log(card3)
                console.log(card4)

                res.status(200).json({
                    "message": "Player stats and cards updated",
                    "state": rows[0].state_id,
                    "room_id":  req.session.roomId,
                    "showdown_turn":  req.session.showdownTurn,
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

app.get("/getEndingCheck", (req, res) => {
    connection.query("SELECT state_id FROM player_status WHERE match_id = ?;", [req.session.matchId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            if (rows.length != 0) {
                if (rows[0].state_id == rows[1].state_id && rows[0].state_id == 7) {
                    GetPlayerStats()
                }
                else{
                    res.status(200).json({
                        "message": "Waiting on Opponent"
                    })
                }
                
                
            }
        }
    )


    function GetPlayerStats() {
        // Now checks whether the current player is player 1 or 2
        connection.query("SELECT player_status_id, player_id, max_health, current_health, energy, insight, damage, showdown_initiative FROM player_status WHERE player_id = ? AND match_id = ?;", [req.session.playerId, req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                req.session.playerStatusId = rows[0].player_status_id

                CheckOpponentHealth(rows[0].current_health)
            }
        )
    }

    function CheckOpponentHealth(playerCurrentHealth) {
        connection.query("SELECT current_health FROM player_status WHERE player_status_id != ? AND match_id = ?;", [req.session.playerStatusId, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                var state;
                if (playerCurrentHealth > 0 && rows[0].current_health <= 0) {
                    state = 8
                    UpdatePlayerStateToEnding(state)
                }
                else if (playerCurrentHealth <= 0 && rows[0].current_health > 0) {
                    state = 9
                    UpdatePlayerStateToEnding(state)
                }
                else if (playerCurrentHealth <= 0 && rows[0].current_health <= 0) {
                    state = 10
                    UpdatePlayerStateToEnding(state)
                }
                else {
                    UpdatePlayerStateToShowdown()
                }
            }
        )
    }

    function UpdatePlayerStateToEnding(state) {
        var queryString1
        var queryString2

        if (state == 8) {
            queryString1 = "UPDATE player_status SET state_id = " + 8 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
            queryString2 = "UPDATE player_status SET state_id = " + 9 + " WHERE player_status_id != " + req.session.playerStatusId +" AND match_id = " + req.session.matchId + ";"
        }
        else if (state == 9) {
            queryString1 = "UPDATE player_status SET state_id = " + 9 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
            queryString2 = "UPDATE player_status SET state_id = " + 8 + " WHERE player_status_id != " + req.session.playerStatusId +" AND match_id = " + req.session.matchId + ";"
        }
        else if (state == 10) {
            queryString1 = "UPDATE player_status SET state_id = " + 10 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
            queryString2 = "UPDATE player_status SET state_id = " + 10 + " WHERE player_status_id != " + req.session.playerStatusId +" AND match_id = " + req.session.matchId + ";"
        }
        else{
            queryString1 = "UPDATE player_status SET state_id = " + 4 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
        }
        
        console.log(queryString1)
        connection.query(queryString1, 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                UpdateOpponentStateToEnding(queryString2)

            }
        )
    }

    function UpdateOpponentStateToEnding(queryString2) {
        console.log(queryString2)
        connection.query(queryString2, 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                res.status(200).json({
                    "message": "Ending state change!"
                })
            }
        )
    }

    function UpdatePlayerStateToShowdown() {
        connection.query("UPDATE player_status SET state_id = 4 WHERE match_id = ?;", [req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                res.status(200).json({
                    "message": "Continuing the Showdown!"
                })
            }
        )
    }
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
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?;", [req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId], 
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
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10);", [req.session.playerStatusId,  req.session.showdownTurn], 
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
    //getShowdownResult
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

        if (playerCards.length == 2 && opponentCards.length == 2) {
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
        }
        else if (playerCards.length == 1 && opponentCards.length == 2) {
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

            //Player Actions
            if (playerCards[0].card_type_id == 8 ) {
                playerActions = "You used " + playerCards[0].card_name
            }
            else if (playerCards[0].card_type_id == 6) {
                playerActions = playerActions + " You used a " + playerCards[0].card_name + ". "
            }
            if (opponentCards[0].card_type_id == 7) {
                playerActions = playerActions + "Your opponent used a " + opponentCards[0].card_name + "."
            }
            else if (opponentCards[1].card_type_id == 7) {
                playerActions = playerActions + "Your opponent used a " + opponentCards[1].card_name + "."
            }

        }
        else if (playerCards.length == 2 && opponentCards.length == 1) {
            //Opponent Actions
            if (opponentCards[0].card_type_id == 8 ) {
                opponentActions = "Your opponent used " + opponentCards[0].card_name
            }
            else if (opponentCards[0].card_type_id == 6) {
                opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + ". "
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
        }
        else if (playerCards.length == 1 && opponentCards.length == 1) {
            //Opponent Actions
            if (opponentCards[0].card_type_id == 8 ) {
                opponentActions = "Your opponent used " + opponentCards[0].card_name
            }
            else{
                if (opponentCards[0].card_type_id == 6) {
                    opponentActions = opponentActions + "Your opponent used a " + opponentCards[0].card_name + ". "
                }
            }
            
            if (playerCards[0].card_type_id == 7) {
                opponentActions = opponentActions + "You used a " + playerCards[0].card_name + "."
            }

            //Player Actions
            if (playerCards[0].card_type_id == 8 ) {
                playerActions = "You used " + playerCards[0].card_name
            }
            else{
                if (playerCards[0].card_type_id == 6) {
                    playerActions = playerActions + " You used a " + playerCards[0].card_name + ". "
                }
            }
            if (opponentCards[0].card_type_id == 7) {
                playerActions = playerActions + "Your opponent used a " + opponentCards[0].card_name + "."
            }
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
    if (req.session.roomId == 5) {
        req.session.roomId++;
        req.session.showdownTurn = 1;

        if (!req.session.playerStatusId) {
            GetSessionPlayerStatusId()
        }
        else{
            CheckIfInitiativeIsSet()
        }
   }
   else {
    req.session.showdownTurn++;

    if (!req.session.playerStatusId) {
        GetSessionPlayerStatusId()
    }
    else {
        GetOpponentShowdownCardStats()
    }
   }
   
   function GetSessionPlayerStatusId() {
    connection.query("SELECT player_status_id FROM player_status WHERE player_id = ? AND match_id = ?", [req.session.playerId, req.session.matchId], 
        function(err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            req.session.playerStatusId = rows[0].player_status_id;
            if (req.session.roomId == 5) {
                CheckIfInitiativeIsSet()
            }
            else {
                GetOpponentShowdownCardStats()
            }
            
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
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?;", [req.session.playerStatusId,  req.session.showdownTurn - 1, req.session.matchId], 
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
                    console.log("playerStatusId "+req.session.playerStatusId)
                    console.log("showdownTurn "+req.session.showdownTurn)
                    console.log("matchId "+req.session.matchId)

                    console.log("opponent's choice not saved")
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
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10);", [req.session.playerStatusId,  req.session.showdownTurn - 1], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                if (rows.length != 0) {
                    GetPlayerShowdownStats(opponentCards, rows);
                }
                else {
                    console.log("Error in GetPlayerShowdownCardStats: setup")
                }
                
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
        connection.query("SELECT player_status_id, Player.match_id, player_id, max_health, current_health, energy, insight, Player.damage, Opponent.damage op_damage FROM (SELECT damage, match_id FROM player_status WHERE match_id = ? AND player_status_id != ?) Opponent INNER JOIN player_status Player ON Opponent.match_id = Player.match_id WHERE player_status_id = ?;", [req.session.matchId, req.session.playerStatusId, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                console.log("nasudbiopb")
                var opponentDamage = rows[0].op_damage;
                var opponentAttack = 0
                var opponentParryAttack = 0
                var playerMaxHealth = rows[0].max_health;
                var playerCurrentHealth = rows[0].current_health;
                var playerEnergy = rows[0].energy;
                var playerInsight = rows[0].insight;
                var playerDamage = rows[0].damage;
                var playerAttack = 0;
                var playerDefense = 0;
                var isParry = false;
                var isDodge = false;
                var isDoubleAttackOpponent = false;
                var isCounterOpponent = false;
                var isParryOpponent = false;

                console.log("Before Calculation")
                console.log("playerCurrentHealth: "+ playerCurrentHealth)
                console.log("playerEnergy: "+ playerEnergy)
                console.log("playerInsight: "+ playerInsight)
                console.log("playerDamage: "+ playerDamage)

                //Player Skills
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 8) {
                        playerCurrentHealth = playerCurrentHealth + playerCards[i].card_current_health;
                        playerInsight = playerInsight + playerCards[i].card_insight;
                        playerEnergy = playerEnergy + playerCards[i].card_energy;
                        playerDamage = playerDamage + playerCards[i].card_damage;
                    }
                }

                //Opponent Skills
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 8) {
                        opponentDamage = opponentDamage + opponentCards[i].card_damage;
                    }
                }
                
                //Player Defense
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 7) {
                        playerDefense = playerDefense + playerCards[i].card_defense;
                        playerInsight = playerInsight + playerCards[i].card_insight;
                        playerEnergy = playerEnergy + playerCards[i].card_energy;

                        if (playerCards[i].card_id == 10) {
                            isParry = true;
                        }
                        if (playerCards[i].card_id == 9) {
                            isDodge = true;
                        }
                    }
                }

                //Opponent Defense
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 7) {
                        if (opponentCards[i].card_id == 10) {
                            opponentParryAttack = opponentCards[i].card_attack
                            isParryOpponent = true;
                        }
                    }
                }

                //Player Attack
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 6) {
                        playerAttack = playerAttack + playerCards[i].card_attack;
                        playerEnergy = playerEnergy + playerCards[i].card_energy;

                        if (playerCards[i].card_id == 3) {
                            isDoubleAttack = true;
                        }
                        if (playerCards[i].card_id == 5) {
                            isCounter = true;
                        }
                    }
                }

                //Opponent Attack
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 6) {
                        opponentAttack = opponentAttack + opponentCards[i].card_attack;

                        if (opponentCards[i].card_id == 3) {
                            isDoubleAttackOpponent = true;
                        }
                        if (opponentCards[i].card_id == 5) {
                            isCounterOpponent = true;
                        }
                    }
                }

                if (isCounterOpponent) {
                    if ((!isDodge || !isParry) && playerAttack != 0) {
                        
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage));
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    }
                }
                if(isDoubleAttackOpponent) {
                    if (!isDodge || !isParry) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - ((opponentAttack * opponentDamage) * 2));
                        playerDefense = Math.max(0, playerDefense - ((opponentAttack * opponentDamage) * 2))
                    }
                    else {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    }
                }
                if (isParryOpponent) {
                    if ((opponentAttack != 0 || !isDodge) && playerAttack != 0) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentParryAttack * (playerAttack * playerDamage)));
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentParryAttack * playerDamage))
                    }
                }
                
                //Apply Normal, Heavy or Recovery Attack Damage
                if (!isCounterOpponent && !isDoubleAttackOpponent) {
                    playerCurrentHealth = playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage)
                    playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                }
                
                console.log("After Calculation")
                console.log("playerCurrentHealth: " + playerCurrentHealth)
                console.log("playerEnergy: " + playerEnergy)
                console.log("playerInsight: " + playerInsight)
                console.log("playerDamage: " + playerDamage)

                UpdateShowdownPlayerStats(Math.min(playerCurrentHealth, playerMaxHealth), playerEnergy, Math.min(playerInsight, 10), playerDamage, opponentCards, playerCards)
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
        console.log("bjiaosbd")
        connection.query("UPDATE player_status SET current_health = ?, energy = ?, insight = ?, damage = ? WHERE player_status_id = ?;", [playerCurrentHealth, playerEnergy, playerInsight, playerDamage, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                //
                CheckIfInitiativeIsSet()
            }
        )
    }

    function CheckIfInitiativeIsSet() {
        connection.query("SELECT showdown_initiative FROM player_status WHERE match_id = ?;", [req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                // req.session.playerStatusId = rows[0].player_status_id
                console.log("req: " + req.session.playerStatusId)

                if (rows[0].showdown_initiative == 1 || rows[1].showdown_initiative == 1) {
                    GetPlayerStats()
                }
                else {
                    UpdatePlayerInitiative()
                }

            }
        )
    }

    function UpdatePlayerInitiative() {
        connection.query("UPDATE player_status SET showdown_initiative = 1 WHERE player_id = ?;", [req.session.playerId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }

                GetPlayerStats()

            }
        )
    }
    
    /**
     * Gets the rows containing the information relating to the player.
     * Called by the setupShowdown endpoint.
     * @param none
     * @returns none
     */

    function GetPlayerStats() {
        // Now checks whether the current player is player 1 or 2
        connection.query("SELECT player_status_id, player_id, max_health, current_health, energy, insight, damage, showdown_initiative FROM player_status WHERE player_id = ? AND match_id = ?;", [req.session.playerId, req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error : " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                req.session.playerStatusId = rows[0].player_status_id
                GetRoomDeck(rows)
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
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM card_room cr INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id WHERE r.room_id = ? AND c.card_id != 1;", [req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err);
                    res.status(500).json({
                        "message": err
                    });
                    return;
                }
                //call function to set cards
                GetForInsertingCards(playerStats, rows)
            }
        )
    }

    /**
     * Selects three random cards from the room deck and Inserts them into the database.
     * Called by GetRoomDeck.
     * @param {object} playerStats - the rows containing the information relating to the player.
     * @param {object} deck - the rows containing the cards available in a room.
     * @returns none
     */
    function GetForInsertingCards(playerStats, deck) {
        //Create Cards

        if (playerStats[0].showdown_initiative == 1) {
            var attackDeck = [];
            var attackIterator = 0;
            var defenseDeck = [];
            var defenseIterator = 0;
            var skillDeck = [];
            var skillIterator = 0;

            for (let i = 0; i < deck.length; i++) {
                if (deck[i].card_type_id == 6) {
                    attackDeck[attackIterator] = deck[i];
                    attackIterator++;
                }
                else if (deck[i].card_type_id == 7) {
                    defenseDeck[defenseIterator] = deck[i];
                    defenseIterator++;
                }
                else if (deck[i].card_type_id == 8) {
                    skillDeck[skillIterator] = deck[i];
                    skillIterator++;
                }
            }

            var card1 = attackDeck[Math.floor(Math.random() * attackDeck.length)]
            var card2 = defenseDeck[Math.floor(Math.random() * defenseDeck.length)]
            var card3 = skillDeck[Math.floor(Math.random() * skillDeck.length)]


            InsertCards(playerStats, card1, card2, card3)
        }
        else {
            console.log("turn: " + req.session.showdownTurn)
            connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path FROM card C INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (6,7,8,9,10) AND PCS.card_id != 8 AND match_id = ?;",[req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId],
                function (err, rows, fields) {
                    if (err) {
        
                        console.log("Database Error: " + err);
                        res.status(500).json({
                            "message": err
                        });
                        return;
                    }
                    if (rows.length != 0) {

                        for (let i = 0; i < rows.length; i++) {
                            for (let j = 0; j < deck.length; j++) {
                                if(rows[i].card_id == deck[j].card_id) {
                                    deck.splice(j, 1)
                                }                              
                            }
                        }
                        
                        var attackDeck = [];
                        var attackIterator = 0;
                        var defenseDeck = [];
                        var defenseIterator = 0;
                        var skillDeck = [];
                        var skillIterator = 0;

                        for (let i = 0; i < deck.length; i++) {

                            if (deck[i].card_type_id == 6) {
                                attackDeck[attackIterator] = deck[i];
                                attackIterator++;
                            }
                            else if (deck[i].card_type_id == 7) {
                                defenseDeck[defenseIterator] = deck[i];
                                defenseIterator++;
                            }
                            else if (deck[i].card_type_id == 8) {
                                skillDeck[skillIterator] = deck[i];
                                skillIterator++;
                            }
                        }
                        var card1 = attackDeck[Math.floor(Math.random() * attackDeck.length)]
                        var card2 = defenseDeck[Math.floor(Math.random() * defenseDeck.length)]
                        var card3 = skillDeck[Math.floor(Math.random() * skillDeck.length)]

                        InsertCards(playerStats, card1, card2, card3)
                        
                    }
                    else {
                        console.log("Opponent Cards are missing")
                    }
                }
            )
        }
    }

    function InsertCards(playerStats, card1, card2, card3) {

        //Make cards visable by default
        card1.IsVisible = true;
        card2.IsVisible = true;
        card3.IsVisible = true;
        
        if (playerStats[0].insight < 9 && playerStats[0].insight >= 6) {
            var randomChoice =  Math.floor((Math.random() * 3) + 1)
            console.log("1 card: " + randomChoice)
            if (randomChoice == 1) {
                card1.IsVisible = false;
            }
            else if (randomChoice == 2) {
                card2.IsVisible = false;
            }
            else if (randomChoice == 3) {
                card3.IsVisible = false;
            }
            
        }
        if (playerStats[0].insight < 6 && playerStats[0].insight >= 3) {
            var randomChoice =  Math.floor((Math.random() * 3) + 1)
            console.log("2 cards: " + randomChoice)
            if (randomChoice == 1) {
                card1.IsVisible = false;
                card2.IsVisible = false;
            }
            else if (randomChoice == 2) {
                card2.IsVisible = false;
                card3.IsVisible = false;
            }
            else if (randomChoice == 3) {
                card1.IsVisible = false;
                card3.IsVisible = false;
            }
        }
        if (playerStats[0].insight < 3) {
            card1.IsVisible = false;
            card2.IsVisible = false;
            card3.IsVisible = false;
        }

        console.log("Insert cards Start")
        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn, is_visible) VALUES (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?);", [playerStats[0].player_status_id, 5, 1,  req.session.roomId,  req.session.showdownTurn, 1,playerStats[0].player_status_id, 6, card1.card_id,  req.session.roomId,  req.session.showdownTurn, card1.IsVisible, playerStats[0].player_status_id, 7, card2.card_id,  req.session.roomId,  req.session.showdownTurn, card2.IsVisible, playerStats[0].player_status_id, 8, card3.card_id,  req.session.roomId,  req.session.showdownTurn, card3.IsVisible],
        function (err, rows, fields) {
            if (err) {

                console.log("Database Error: " + err);
                res.status(500).json({
                    "message": err
                });
                return;
            }
            UpdateGameStateToEndingCheck()
        })
    }
    
    function UpdateGameStateToEndingCheck() {
        connection.query("UPDATE player_status SET state_id = 7 WHERE match_id = ? AND player_status_id = ?;", [req.session.matchId, req.session.playerStatusId], 
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

    if (!req.session.playerStatusId) {
        GetSessionPlayerStatusId()
    }
    else{
        UpdateSelectedCardSlot1()
    }

    function GetSessionPlayerStatusId() {
        connection.query("SELECT player_status_id FROM player_status WHERE player_id = ? AND match_id = ?", [req.session.playerId, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                req.session.playerStatusId = rows[0].player_status_id;
                UpdateSelectedCardSlot1()
            }
        )
    }

//save player cards to database
// req.session.showdownTurn++;


    

    /**
     * Update in the database what card is in the first selection slot at the end of the showdown turn.
     * Called by resolve req.session.showdownTurn endpoint.
     * @param none
     * @returns none
     */
    function UpdateSelectedCardSlot1() {
        connection.query("UPDATE player_card_slot SET slot_id = 9 WHERE card_id = ? AND player_status_id = ? AND showdown_turn = ?;", [req.body.cardId1, req.session.playerStatusId,  req.session.showdownTurn], 
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
        connection.query("UPDATE player_card_slot SET slot_id = 10 WHERE card_id = ? AND player_status_id = ? AND showdown_turn = ?;", [req.body.cardId2, req.session.playerStatusId,  req.session.showdownTurn], 
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
        connection.query("UPDATE player_status SET state_id = 5, showdown_initiative = 0 WHERE match_id = ? AND player_status_id = ?;", [req.session.matchId, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                res.status(200).json({
                    "message": "Updated database with player selection"
                })
            }
        )
    } 

     
})

//#endregion

// listen for requests on port 
app.listen(4000, () => {
    console.log("🙌 Server is running on port 4000. Check http://localhost:4000/")
});