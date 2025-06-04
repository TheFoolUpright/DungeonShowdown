//Import modules
const express = require("express")
const connection = require("./database")
const router = express.Router();

router.get("/getWaitingOnOpponentDungeon", (req, res) => {
    GetOpponentStatus()

    function GetOpponentStatus() {
        connection.query("SELECT state_id \
            FROM player_card_slot PCS \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            WHERE player_id != ? AND match_id = ? AND room_id = ? AND slot_id = 4"
            , [req.session.playerId, req.session.matchId,  req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                } 
                if (rows.length != 0) {
                    UpdateGameState()
                }
                else { 
                    res.status(200).json({
                        "message": "Opponent hasn't confirmed their card",
                        "state": "WAITING_FOR_OPP"
                    })
                }
            }
        )
    }

    function UpdateGameState() {
        connection.query("UPDATE player_status SET state_id = 3 WHERE player_status_id = ?", [req.session.playerStatusId], 
            function (err, rows, fields) {
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
        connection.query("SELECT c.card_id, card_name, card_image_path, ct.card_type_id, card_type_name, p.player_color, p.player_username, current_health \
            FROM player_card_slot pcs \
            INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id \
            INNER JOIN player p ON p.player_id = ps.player_id \
            INNER JOIN card c ON pcs.card_id = c.card_id \
            INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id \
            WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?", [req.session.playerStatusId, req.session.matchId,  req.session.roomId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetPlayerUsername(rows)
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

    function GetPlayerUsername(opponentData) {
        connection.query("SELECT player_username , player_color, max_health, current_health, energy, insight, damage \
            FROM player_status ps \
            INNER JOIN player p ON p.player_id = ps.player_id \
            WHERE p.player_id = ? AND match_id = ?", [req.session.playerId, req.session.matchId],
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    res.status(200).json({
                        "message": "Player stats updated and opponent card received",
                        "state": "NEXT_ROOM",
                        "card_id": opponentData[0].card_id,
                        "card_name": opponentData[0].card_name,
                        "room_id": req.session.roomId,
                        "card_image_path": opponentData[0].card_image_path,
                        "card_type_id": opponentData[0].card_type_id,
                        "card_type_name": opponentData[0].card_type_name,
                        "opponent_color": opponentData[0].player_color,
                        "opponent_current_health": opponentData[0].current_health,
                        "player_color": rows[0].player_color,
                        "player_username": rows[0].player_username,
                        "max_health": rows[0].max_health,
                        "current_health": rows[0].current_health,
                        "energy": rows[0].energy,
                        "insight": rows[0].insight,
                        "damage": rows[0].damage
                    })
                }
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
router.get("/getDungeonCardSelection", (req, res) => {

    connection.query("SELECT player_username, player_color, \
    player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, is_visible, \
    match_id, PS.player_id, max_health, current_health, energy, insight, damage, \
    card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, card_description, card_display_option \
    FROM player_card_slot PCS \
    INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
    INNER JOIN player P ON P.player_id = PS.player_id \
    INNER JOIN card C ON PCS.card_id = C.card_id \
    WHERE PS.player_id = ? AND match_id = ? AND room_id = ?"
    , [req.session.playerId, req.session.matchId,  req.session.roomId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            if (rows.length != 0) {
                
                var card1 = rows[0]
                var card2 = rows[1]
                var card3 = rows[2]
                
           
                res.status(200).json({
                    "message": "Player stats and cards updated",
                    "state": "ROOM_LOADED",
                    "player_username": rows[0].player_username,
                    "player_color": rows[0].player_color,
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
router.post("/resolveDungeonTurn", (req, res) => {
    if (!req.session.playerStatusId) {
        GetSessionPlayerStatusId()
    }
    else {
        UpdateGameStateToWaitingForOpponentDungeon()
    }

    function GetSessionPlayerStatusId() {
        connection.query("SELECT player_status_id \
            FROM player_status WHERE player_id = ? AND match_id = ?"
            , [req.session.playerId, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                req.session.playerStatusId = rows[0].player_status_id
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
        connection.query("UPDATE player_status \
                        SET state_id = 2 \
                        WHERE match_id = ? AND player_status_id = ?"
                        , [req.session.matchId, req.session.playerStatusId], 
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
        connection.query("UPDATE player_card_slot \
                        SET slot_id = 4 \
                        WHERE card_id = ? AND player_status_id = ?"
                        , [req.body.cardId, req.session.playerStatusId], 
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
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage \
            FROM player_status WHERE player_status_id = ?"
            , [req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetCardStats(rows)
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
        connection.query("SELECT card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path \
                    FROM card WHERE card_id = ?"
                    , [req.body.cardId], 
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
        connection.query("UPDATE player_status \
                        SET max_health = ?, current_health = ?, energy = ?, insight = ?, damage = ? \
                        WHERE player_status_id = ?"
                        , [updatedMaxHealth, updatedCurrentHealth, updatedEnergy, updatedInsight, updatedDamage, req.session.playerStatusId], 
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
        connection.query("SELECT c.card_id, card_name, card_image_path, ct.card_type_id, card_type_name, p.player_color, p.player_username, current_health \
            FROM player_card_slot pcs \
            INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id \
            INNER JOIN player p ON p.player_id = ps.player_id \
            INNER JOIN card c ON pcs.card_id = c.card_id \
            INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id \
            WHERE pcs.player_status_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?"
            , [req.session.playerStatusId, req.session.matchId,  req.session.roomId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    UpdateGameStateToDungeonResult(rows)
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

    function UpdateGameStateToDungeonResult(cardsAndStats) {
        connection.query("UPDATE player_status \
            SET state_id = 3 \
            WHERE match_id = ? AND player_status_id = ?"
            , [req.session.matchId, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetPlayerUsername(cardsAndStats)
            }
        )
    } 
    
    function GetPlayerUsername(opponentData) {
        connection.query("SELECT player_username , player_color, max_health, current_health, energy, insight, damage \
            FROM player_status ps \
            INNER JOIN player p ON p.player_id = ps.player_id \
            WHERE p.player_id = ? AND match_id = ?"
            , [req.session.playerId, req.session.matchId],
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    res.status(200).json({
                        "message": "Player stats updated and opponent card received",
                        "state": "NEXT_ROOM",
                        "card_id": opponentData[0].card_id,
                        "card_name": opponentData[0].card_name,
                        "room_id": req.session.roomId,
                        "card_image_path": opponentData[0].card_image_path,
                        "card_type_id": opponentData[0].card_type_id,
                        "card_type_name": opponentData[0].card_type_name,
                        "opponent_color": opponentData[0].player_color,
                        "opponent_current_health": opponentData[0].current_health,
                        "player_color": rows[0].player_color,
                        "player_username": rows[0].player_username,
                        "max_health": rows[0].max_health,
                        "current_health": rows[0].current_health,
                        "energy": rows[0].energy,
                        "insight": rows[0].insight,
                        "damage": rows[0].damage
                    })
                }
            }
        )
    }
})




/**
 * ???
 * Called by client side function SetupNextRoom.
 * @param none
 * @returns {JSON} 
 */
//TODO: Write stuff for setting cards
router.post("/setupNextDungeonRoom", (req, res) => {
    setupNextDungeonRoom(req, res)
})

/**
 * Reads the opponents card from the database. 
 * Called by client side function getDungeonResult.
 * @param none
 * @returns {JSON} - returns the opponents card selection or if the player is waiting on the opponent
 */
router.get("/getOpponentCard", (req, res) => {

    connection.query("SELECT c.card_id, c.card_name, c.card_image_path, ct.card_type_id, card_type_name, p.player_color, p.player_username, current_health \
        FROM player_card_slot pcs \
        INNER JOIN player_status ps ON pcs.player_status_id = ps.player_status_id \
        INNER JOIN player p ON p.player_id = ps.player_id \
        INNER JOIN card c ON pcs.card_id = c.card_id \
        INNER JOIN card_type ct ON c.card_type_id = ct.card_type_id \
        WHERE p.player_id != ? AND match_id = ? AND slot_id = 4 AND room_id = ?", [req.session.playerId, req.session.matchId,  req.session.roomId], 
        function(err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            if (rows.length != 0) {
                GetPlayerUsername(rows)
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
    
    function GetPlayerUsername(opponentData) {
        connection.query("SELECT player_username, player_color, max_health, current_health, energy, insight, damage \
            FROM player_status ps \
            INNER JOIN player p ON p.player_id = ps.player_id \
            WHERE p.player_id = ? AND match_id = ?"
            , [req.session.playerId, req.session.matchId],
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    res.status(200).json({
                        "message": "Player stats updated and opponent card received",
                        "state": "NEXT_ROOM",
                        "card_id": opponentData[0].card_id,
                        "card_name": opponentData[0].card_name,
                        "room_id": req.session.roomId,
                        "card_image_path": opponentData[0].card_image_path,
                        "card_type_id": opponentData[0].card_type_id,
                        "card_type_name": opponentData[0].card_type_name,
                        "opponent_color": opponentData[0].player_color,
                        "opponent_current_health": opponentData[0].current_health,
                        "player_color": rows[0].player_color,
                        "player_username": rows[0].player_username,
                        "max_health": rows[0].max_health,
                        "current_health": rows[0].current_health,
                        "energy": rows[0].energy,
                        "insight": rows[0].insight,
                        "damage": rows[0].damage
                    })
                }
            }
        )
    }
})

function setupNextDungeonRoom(req, res) {
    
    req.session.roomId++
    GetPlayerStats()
        
    /**
     * Reads the player stats from the database and updates the req.session.playerStatusId. 
     * Called by SettingCards function.
     * @param none
     * @returns none
     */
    function GetPlayerStats() {
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage \
            FROM player_status WHERE player_id = ? AND match_id = ?"
            , [req.session.playerId, req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                req.session.playerStatusId = rows[0].player_status_id
                GetRoomDeck(rows)
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
        
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path \
            FROM (SELECT max_health, current_health, energy, insight FROM player_status \
            WHERE player_status_id = ?) ps, card_room cr \
            INNER JOIN card c ON c.card_id = cr.card_id \
            INNER JOIN room r ON cr.room_id = r.room_id \
            WHERE (ps.current_health + card_current_health <= ps.max_health) \
            AND (ps.insight + card_insight <= 10) \
            AND (ps.current_health + card_current_health > 0) \
            AND (ps.energy + card_energy >= 0) \
            AND (ps.insight + card_insight >= 0) \
            AND r.room_id = ?"
            , [req.session.playerStatusId,  req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
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

        var indexOfElement
        var MaxHealthDeck = []
        var MaxHealthIterator = 0
        var HealingDeck = []
        var HealingIterator  = 0
        var DamageDeck = []
        var DamageIterator = 0
        var RestDeck = []
        var RestIterator = 0
        var EnemyDeck = []
        var EnemyIterator = 0

        for (let i = 0; i < deck.length; i++) {
            if (deck[i].card_type_id == 1) {
                MaxHealthDeck[MaxHealthIterator] = deck[i]
                MaxHealthIterator++
            }
            if (deck[i].card_type_id == 2) {
                HealingDeck[HealingIterator] = deck[i]
                HealingIterator++
            }
            if (deck[i].card_type_id == 3) {
                DamageDeck[DamageIterator] = deck[i]
                DamageIterator++
            }
            if (deck[i].card_type_id == 4) {
                RestDeck[RestIterator] = deck[i]
                RestIterator++
            }
            if (deck[i].card_type_id == 5) {
                EnemyDeck[EnemyIterator] = deck[i]
                EnemyIterator++
            }   
        }

        var typesDeck = []
        var typeIterator = 0

        if (MaxHealthDeck.length != 0) {
            typesDeck[typeIterator] = MaxHealthDeck[0].card_type_id
            typeIterator++
        }
        if (HealingDeck.length != 0) {
            typesDeck[typeIterator] = HealingDeck[0].card_type_id
            typeIterator++
        }
        if (DamageDeck.length != 0) {
            typesDeck[typeIterator] = DamageDeck[0].card_type_id
            typeIterator++
        }
        if (RestDeck.length != 0) {
            typesDeck[typeIterator] = RestDeck[0].card_type_id
            typeIterator++
        }
        if (EnemyDeck.length != 0) {
            typesDeck[typeIterator] = EnemyDeck[0].card_type_id
            typeIterator++
        }

        var type1 = typesDeck[Math.floor(Math.random() * typesDeck.length)]
        indexOfElement = typesDeck.indexOf(type1)
        typesDeck.splice(indexOfElement, 1)
        
        var type2 = typesDeck[Math.floor(Math.random() * typesDeck.length)]
        indexOfElement = typesDeck.indexOf(type2)
        typesDeck.splice(indexOfElement, 1)
        
        var type3 = typesDeck[Math.floor(Math.random() * typesDeck.length)]

        var card1
        var card2
        var card3


        switch(type1) {
            case 1:
                card1 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                card1 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                card1 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                card1 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                card1 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }
        switch(type2) {
            case 1:
                card2 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                card2 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                card2 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                card2 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                card2 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }
        switch(type3) {
            case 1:
                card3 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                card3 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                card3 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                card3 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                card3 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }

        //Make cards visible by default
        card1.IsVisible = true
        card2.IsVisible = true
        card3.IsVisible = true
        
        if (playerStats[0].insight < 7 && playerStats[0].insight > 3) {
            var randomChoice =  Math.floor((Math.random() * 3) + 1)
            if (randomChoice == 1) {
                card1.IsVisible = false
            }
            else if (randomChoice == 2) {
                card2.IsVisible = false
            }
            else if (randomChoice == 3) {
                card3.IsVisible = false
            }
            
        }
        if (playerStats[0].insight < 4 && playerStats[0].insight > 1) {
            var randomChoice =  Math.floor((Math.random() * 3) + 1)
            if (randomChoice == 1) {
                card1.IsVisible = false
                card2.IsVisible = false
            }
            else if (randomChoice == 2) {
                card2.IsVisible = false
                card3.IsVisible = false
            }
            else if (randomChoice == 3) {
                card1.IsVisible = false
                card3.IsVisible = false
            }
        }
        if (playerStats[0].insight < 2) {
            card1.IsVisible = false
            card2.IsVisible = false
            card3.IsVisible = false
        }

        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn, is_visible) \
            VALUES (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?)"
            , [playerStats[0].player_status_id, 1, card1.card_id,  req.session.roomId,  req.session.showdownTurn, card1.IsVisible
            , playerStats[0].player_status_id, 2, card2.card_id,  req.session.roomId,  req.session.showdownTurn, card2.IsVisible
            ,  playerStats[0].player_status_id, 3, card3.card_id,  req.session.roomId,  req.session.showdownTurn, card3.IsVisible],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            UpdateGameStateToDungeonCardSelection()
        })
    }

    function UpdateGameStateToDungeonCardSelection() {
        connection.query("UPDATE player_status SET state_id = 1 \
            WHERE match_id = ? AND player_status_id = ?"
            , [req.session.matchId, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                GetPlayerCardsAndStats()
            }
        )
    }

    function GetPlayerCardsAndStats() {
         connection.query("SELECT player_username, player_color, \
            player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, is_visible, \
            match_id, PS.player_id, max_health, current_health, energy, insight, damage, \
            card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, card_description, card_display_option \
            FROM player_card_slot PCS \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON P.player_id = PS.player_id \
            INNER JOIN card C ON PCS.card_id = C.card_id \
            WHERE PS.player_id = ? AND match_id = ? AND room_id = ?"
            , [req.session.playerId, req.session.matchId,  req.session.roomId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    
                    var card1 = rows[0]
                    var card2 = rows[1]
                    var card3 = rows[2]
                    
            
                    res.status(200).json({
                        "message": "Player stats and cards updated",
                        "state": "ROOM_LOADED",
                        "player_username": rows[0].player_username,
                        "player_color": rows[0].player_color,
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
    }

}

module.exports = router;