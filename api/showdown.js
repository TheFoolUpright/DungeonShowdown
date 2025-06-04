//Import modules
const express = require("express")
const connection = require("./database")
const router = express.Router();

//#region Showdown

router.get("/getWaitingOnOpponentShowdown", (req, res) => {

    GetOpponentShowdownCardStats()

     /**
     * Get all the information from the opponent's selected cards to use in the next function.
     * Called by UpdateSelectedCardSlot2.
     * @param none
     * @returns none
     */
     function GetOpponentShowdownCardStats() {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, \
            player_username, player_color, \
            max_health, current_health, energy, insight, damage \
            FROM card C \
            INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON P.player_id = PS.player_id \
            WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?"
            , [req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0 && !opponentReadyShowdown) {
                    GetPlayerShowdownCardStatsWaitingOnOpponent(rows)
                    
                }
                else {
                    res.status(200).json({
                        "message": "Opponent hasn't confirmed their card(s)",
                        "state": "WAITING_FOR_OPP"
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
    function GetPlayerShowdownCardStatsWaitingOnOpponent(opponentCards) {
        opponentReadyShowdown = true

        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path \
            FROM card C \
            INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
            WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10)"
            , [req.session.playerStatusId,  req.session.showdownTurn], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetPlayerShowdownStats(opponentCards, rows)
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
        connection.query("SELECT player_status_id, Player.match_id, player_id, max_health, current_health, energy, insight, Player.damage, Opponent.damage op_damage \
            FROM (SELECT damage, match_id FROM player_status WHERE match_id = ? AND player_status_id != ?) Opponent \
            INNER JOIN player_status Player ON Opponent.match_id = Player.match_id \
            WHERE player_status_id = ?"
            , [req.session.matchId, req.session.playerStatusId, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                var opponentDamage = rows[0].op_damage
                var opponentAttack = 0
                var opponentParryAttack = 0
                var playerMaxHealth = rows[0].max_health
                var playerCurrentHealth = rows[0].current_health
                var playerEnergy = rows[0].energy
                var playerInsight = rows[0].insight
                var playerDamage = rows[0].damage
                var playerAttack = 0
                var playerDefense = 0
                var isParry = false
                var isDodge = false
                var isDoubleAttackOpponent = false
                var isCounterOpponent = false
                var isParryOpponent = false

                // console.log("Before Calculation 2, Player: " + [req.session.playerId])
                // console.log("playerCurrentHealth: " + playerCurrentHealth)
                // console.log("playerEnergy: "+ playerEnergy)
                // console.log("playerInsight: "+ playerInsight)
                // console.log("playerDamage: "+ playerDamage)
                // console.log(playerCards)
                // console.log(opponentCards)

                //Player Skills
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 8) {
                        playerCurrentHealth = playerCurrentHealth + playerCards[i].card_current_health
                        playerInsight = playerInsight + playerCards[i].card_insight
                        playerEnergy = playerEnergy + playerCards[i].card_energy
                        playerDamage = playerDamage + playerCards[i].card_damage
                    }
                }

                //Opponent Skills
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 8) {
                        opponentDamage = opponentDamage + opponentCards[i].card_damage
                    }
                }
                
                //Player Defense
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 7) {
                        playerDefense = playerDefense + Math.round(playerCards[i].card_defense * (playerMaxHealth - 20))
                        playerInsight = playerInsight + playerCards[i].card_insight
                        playerEnergy = playerEnergy + playerCards[i].card_energy

                        if (playerCards[i].card_id == 10) {
                            isParry = true
                        }
                        if (playerCards[i].card_id == 9) {
                            isDodge = true
                        }
                    }
                }

                //Opponent Defense
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 7) {
                        if (opponentCards[i].card_id == 10) {
                            opponentParryAttack = opponentCards[i].card_attack
                            isParryOpponent = true
                        }
                    }
                }

                //Player Attack
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 6) {
                        playerAttack = playerAttack + playerCards[i].card_attack
                        playerEnergy = playerEnergy + playerCards[i].card_energy

                        if (playerCards[i].card_id == 3) {
                            isDoubleAttack = true
                        }
                        if (playerCards[i].card_id == 5) {
                            isCounter = true
                        }
                    }
                }

                //Opponent Attack
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 6) {
                        opponentAttack = opponentAttack + opponentCards[i].card_attack

                        if (opponentCards[i].card_id == 3) {
                            isDoubleAttackOpponent = true
                        }
                        if (opponentCards[i].card_id == 5) {
                            isCounterOpponent = true
                        }
                    }
                }

                if (isCounterOpponent) {
                    if ((!isDodge && !isParry) && playerAttack != 0) {
                        
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    }
                }
                if (isDoubleAttackOpponent) {
                    if (!isDodge && !isParry) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - ((opponentAttack * opponentDamage) * 2))
                        playerDefense = Math.max(0, playerDefense - ((opponentAttack * opponentDamage) * 2))
                    }
                    else {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    }
                }
                if (isParryOpponent) {
                    if ((opponentAttack != 0 || !isDodge) && playerAttack != 0) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentParryAttack * (playerAttack * playerDamage)))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentParryAttack * playerDamage))
                    }
                }
                
                //Apply Normal, Heavy or Recovery Attack Damage
                if (!isCounterOpponent && !isDoubleAttackOpponent && !isDodge && !isParry) {
                    playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                }
                
                // console.log("After Calculation")
                // console.log("playerCurrentHealth: " + playerCurrentHealth)
                // console.log("playerEnergy: " + playerEnergy)
                // console.log("playerInsight: " + playerInsight)
                // console.log("playerDamage: " + playerDamage)

                UpdateShowdownPlayerStats(Math.min(playerCurrentHealth, playerMaxHealth), playerEnergy, Math.min(playerInsight, 10), playerDamage, opponentCards)
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
     * @returns {JSON} The sum of a and b.
     */
    function UpdateShowdownPlayerStats(playerCurrentHealth, playerEnergy, playerInsight, playerDamage, opponentCards) {
        connection.query("UPDATE player_status SET current_health = ?, energy = ?, insight = ?, damage = ? \
            WHERE player_status_id = ?"
            , [playerCurrentHealth, playerEnergy, playerInsight, playerDamage, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                UpdateGameStateToShowdownResult(opponentCards)
            }
        )
    }
    

    function UpdateGameStateToShowdownResult(opponentCards) {
        connection.query("UPDATE player_status SET state_id = 6 WHERE player_status_id = ?", [req.session.playerStatusId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetPlayerShowdownCardStatsForReturnData(opponentCards)
            }
        )
    }

        /**
         * Get all the information from the player's selected cards to use in the next function.
         * Called by GetOpponentShowdownCardStats.
         * @param {object} opponentCards - An array of the opponent's selected cards.
         * @returns none
         */
        function GetPlayerShowdownCardStatsForReturnData(opponentCards) {
            connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path \
                FROM card C \
                INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
                WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10)"
                , [req.session.playerStatusId,  req.session.showdownTurn], 
                function(err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    if (rows.length != 0) {
                        WhoIsPlayerOne(opponentCards, rows)
                    }
                }
            )
        }

        function WhoIsPlayerOne(opponentCards, playerCards) {
            connection.query("SELECT player_1_id \
                        FROM game_match \
                        WHERE match_id = ?;", [req.session.matchId],
                function (err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    if (rows.length != 0) {
                        var IsPlayer1 = false
                        if (rows[0].player_1_id == req.session.playerId) {
                            IsPlayer1 = true
                        }
                        GetPlayerShowdownPlayerState(opponentCards, playerCards, IsPlayer1)
                    }
                })
        }

        function GetPlayerShowdownPlayerState(opponentCards, playerCards, IsPlayer1) {
            connection.query("SELECT showdown_turn, max_health, current_health, energy, insight, damage, player_username, player_color \
                FROM player_card_slot PCS \
                INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
                INNER JOIN player P ON PS.player_id = P.player_id \
                WHERE P.player_id = ? AND match_id = ? AND showdown_turn = ?"
                , [req.session.playerId, req.session.matchId, req.session.showdownTurn],
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
                            "message": "Opponent hasn't confirmed their card(s)",
                            "state": "SHOW_RESULT",
                            "opponent_cards": opponentCards,
                            "opponent_current_health": opponentCards[0].current_health,
                            "IsPlayer1": IsPlayer1,
                            "player_cards": playerCards,
                            "player_color": rows[0].player_color,
                            "player_username": rows[0].player_username,
                            "max_health": rows[0].max_health,
                            "current_health": rows[0].current_health,
                            "energy": rows[0].energy,
                            "insight": rows[0].insight,
                            "damage": rows[0].damage,
                            "showdown_turn": rows[0].showdown_turn
                        })
                    }
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
router.get("/getShowdownCardSelection", (req, res) => {

    GetOpponentNameAndColor()

    function GetOpponentNameAndColor() {
        connection.query("SELECT P.player_username, P.player_color, current_health, damage \
                    FROM player P \
                    INNER JOIN game_match GM ON GM.player_1_id = P.player_id OR GM.player_2_id = P.player_id \
                    INNER JOIN player_status PS ON PS.player_id = P.player_id \
                    WHERE P.player_id != ? AND GM.match_id = ?", [req.session.playerId, req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetPlayerCardsAndStats(rows)
                }
            })
    }

    function GetPlayerCardsAndStats(opponentInfo) {
        connection.query("SELECT player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, is_visible, \
            match_id, P.player_id, max_health, current_health, energy, insight, damage, \
            P.player_username, P.player_color, \
            card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, card_description, state_id \
            FROM player_card_slot PCS \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON PS.player_id = P.player_id \
            INNER JOIN card C ON PCS.card_id = C.card_id \
            WHERE P.player_id = ? AND match_id = ? AND room_id = ? AND showdown_turn = ?"
            , [req.session.playerId, req.session.matchId,  req.session.roomId,  req.session.showdownTurn],
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
                    var card4 = rows[3]

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

                    res.status(200).json({
                        "message": "Player stats and cards updated",
                        "state": rows[0].state_id,
                        "room_id":  req.session.roomId,
                        "showdown_turn":  req.session.showdownTurn,
                        "opponent_username": opponentInfo[0].player_username,
                        "opponent_color": opponentInfo[0].player_color,
                        "opponent_current_health": opponentInfo[0].current_health,
                        "opponent_damage": opponentInfo[0].damage,
                        "player_username": rows[0].player_username,
                        "player_color": rows[0].player_color,
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
router.get("/getShowdownResult", (req, res) => {
    if (!req.session.playerStatusId) {
        GetSessionPlayerStatusId()
    }
    else{
        GetOpponentShowdownCardStats()
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
                req.session.playerStatusId = rows[0].player_status_id
                
                GetOpponentShowdownCardStats()
                
            }
        )
    } 
    /**
     * Gets what cards the opponent chose for the showdown turn.
     * Called by endpoint getShowdownResult.
     * @param none
     * @returns none
     */
    function GetOpponentShowdownCardStats() {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, \
            player_username, player_color, \
            current_health \
            FROM card C \
            INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON P.player_id = PS.player_id \
            WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?"
            , [req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                console.log("Got to GetOpponentShowdownCardStats")
                GetPlayerShowdownCardStats(rows)
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
        var querybuilder = "SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path \
            FROM card C \
            INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
            WHERE player_status_id = " + req.session.playerStatusId + " AND showdown_turn = " + req.session.showdownTurn + " AND slot_id IN (9,10)"
        console.log(querybuilder)
        connection.query(querybuilder, 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    console.log("Got to GetPlayerShowdownCardStats1")
                    WhoIsPlayerOne(opponentCards, rows)
                }
                else{
                    console.log("Got to GetPlayerShowdownCardStats2")
                }
            }
        )
    }

    function WhoIsPlayerOne(opponentCards, playerCards) {
        connection.query("SELECT player_1_id \
                    FROM game_match \
                    WHERE match_id = ?;", [req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    var IsPlayer1 = false
                    if(rows[0].player_1_id == req.session.playerId){
                        IsPlayer1 = true
                    }
                    console.log("Got to WhoIsPlayerOne1")
                    GetPlayerShowdownPlayerState(opponentCards, playerCards, IsPlayer1)
                }
                else
                {
                    console.log("Got to WhoIsPlayerOne2")
                }
            })
    }

    function GetPlayerShowdownPlayerState(opponentCards, playerCards, IsPlayer1) {
        connection.query("SELECT showdown_turn, max_health, current_health, energy, insight, damage, player_username, player_color \
            FROM player_card_slot PCS \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON PS.player_id = P.player_id \
            WHERE P.player_id = ? AND match_id = ? AND showdown_turn = ?"
            , [req.session.playerId, req.session.matchId, req.session.showdownTurn], 
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
                        "message": "Opponent hasn't confirmed their card(s)",
                        "state": "SHOW_RESULT",
                        "opponent_cards": opponentCards,
                        "opponent_current_health": opponentCards[0].current_health,
                        "IsPlayer1": IsPlayer1,
                        "player_cards": playerCards,
                        "player_color": rows[0].player_color,
                        "player_username": rows[0].player_username,
                        "max_health": rows[0].max_health,
                        "current_health": rows[0].current_health,
                        "energy": rows[0].energy,
                        "insight": rows[0].insight,
                        "damage": rows[0].damage,
                        "showdown_turn": rows[0].showdown_turn
                    })
                }
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
router.post("/setupShowdown", (req, res) => {
    opponentReadyShowdown = false
    if (req.session.roomId == 5) {
        req.session.roomId++
        req.session.showdownTurn = 1

        if (!req.session.playerStatusId) {
            GetSessionPlayerStatusId()
        }
        else {
            CheckIfInitiativeIsSet()
        }
   }
   else {
    req.session.showdownTurn++

    if (!req.session.playerStatusId) {
        GetSessionPlayerStatusId()
    }
    else {
        CheckIfInitiativeIsSet()
        // GetPlayerStats()
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
            req.session.playerStatusId = rows[0].player_status_id
            CheckIfInitiativeIsSet()
            
        }
    )
} 

    function CheckIfInitiativeIsSet() {
        connection.query("SELECT showdown_initiative FROM player_status WHERE match_id = ?", [req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
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
        connection.query("UPDATE player_status SET showdown_initiative = 1 WHERE player_id = ?", [req.session.playerId],
            function (err, rows, fields) {
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
     * Gets the rows containing the information relating to the player.
     * Called by the setupShowdown endpoint.
     * @param none
     * @returns none
     */

    function GetPlayerStats() {
        // Now checks whether the current player is player 1 or 2
        connection.query("SELECT player_status_id, player_id, max_health, current_health, energy, insight, damage, showdown_initiative \
            FROM player_status \
            WHERE player_id = ? AND match_id = ?"
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
     * Gets the rows containing the cards available in a room.
     * Called by GetPlayerStats.
     * @param {object} playerStats - the rows containing the information relating to the player.
     * @returns none
     */
    function GetRoomDeck(playerStats) {
        console.log(req.session.roomId)
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path \
            FROM card_room cr \
            INNER JOIN card c ON c.card_id = cr.card_id \
            INNER JOIN room r ON cr.room_id = r.room_id \
            WHERE r.room_id = ? AND c.card_id != 1"
            , [req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
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
            var attackDeck = []
            var attackIterator = 0
            var defenseDeck = []
            var defenseIterator = 0
            var skillDeck = []
            var skillIterator = 0

            for (let i = 0; i < deck.length; i++) {
                if (deck[i].card_type_id == 6) {
                    attackDeck[attackIterator] = deck[i]
                    attackIterator++
                }
                else if (deck[i].card_type_id == 7) {
                    defenseDeck[defenseIterator] = deck[i]
                    defenseIterator++
                }
                else if (deck[i].card_type_id == 8) {
                    skillDeck[skillIterator] = deck[i]
                    skillIterator++
                }
            }

            var card1 = attackDeck[Math.floor(Math.random() * attackDeck.length)]
            var card2 = defenseDeck[Math.floor(Math.random() * defenseDeck.length)]
            var card3 = skillDeck[Math.floor(Math.random() * skillDeck.length)]

            
            console.log("Player"+req.session.playerStatusId+" card 1: "+card1)
            console.log("Player"+req.session.playerStatusId+" card 2: "+card2)
            console.log("Player"+req.session.playerStatusId+" card 3: "+card3)
            console.log("showdownTurn: "+req.session.showdownTurn)

            InsertCards(playerStats, card1, card2, card3)
        }
        else {
            console.log("playerStatusId: "+req.session.playerStatusId)
            console.log("showdownTurn: "+req.session.showdownTurn)
            console.log("matchId: "+req.session.matchId)
            connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path \
                                FROM card C \
                                WHERE card_type_id IN (6, 7, 8) AND card_id NOT IN \
                                (SELECT C.card_id \
                                FROM card C \
                                INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
                                INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
                                WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (5,6,7,8,9,10) AND match_id = ?)"
                ,[req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId],
                function (err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                        
                    if (rows.length != 0) {

                        console.log(rows)
                        var attackDeck = []
                        var attackIterator = 0
                        var defenseDeck = []
                        var defenseIterator = 0
                        var skillDeck = []
                        var skillIterator = 0

                        for (let i = 0; i < rows.length; i++) {
                            if (rows[i].card_type_id == 6) {
                                attackDeck[attackIterator] = rows[i]
                                attackIterator++
                            }
                            else if (rows[i].card_type_id == 7) {
                                defenseDeck[defenseIterator] = rows[i]
                                defenseIterator++
                            }
                            else if (rows[i].card_type_id == 8) {
                                skillDeck[skillIterator] = rows[i]
                                skillIterator++
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
            VALUES (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?)"
            , [playerStats[0].player_status_id, 5, 1,  req.session.roomId,  req.session.showdownTurn, 1
            , playerStats[0].player_status_id, 6, card1.card_id,  req.session.roomId,  req.session.showdownTurn, card1.IsVisible
            , playerStats[0].player_status_id, 7, card2.card_id,  req.session.roomId,  req.session.showdownTurn, card2.IsVisible
            , playerStats[0].player_status_id, 8, card3.card_id,  req.session.roomId,  req.session.showdownTurn, card3.IsVisible],
        function (err, rows, fields) {
            if (err) {

                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            UpdateGameStateToEndingCheck()
        })
    }
    
    function UpdateGameStateToEndingCheck() {
        connection.query("UPDATE player_status SET state_id = 4 \
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
                GetOpponentNameAndColor()
            }
        )
    }

    function GetOpponentNameAndColor() {
        connection.query("SELECT P.player_username, P.player_color , PS.current_health, PS.damage \
                FROM player P \
                INNER JOIN game_match GM ON GM.player_1_id = P.player_id OR GM.player_2_id = P.player_id \
                INNER JOIN player_status PS ON PS.player_id = P.player_id \
                WHERE P.player_id != ? AND PS.match_id = ?", [req.session.playerId, req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetCardsAndStats(rows)
                }
            })
    }

    function GetCardsAndStats(opponentNameAndColor) {
         connection.query("SELECT player_username, player_color, player_card_slot_id, PCS.player_status_id, \
            slot_id, PCS.card_id, room_id, showdown_turn, is_visible, match_id, \
            P.player_id, max_health, current_health, energy, insight, damage, \
            card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, card_description, state_id \
            FROM player_card_slot PCS \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON P.player_id = PS.player_id \
            INNER JOIN card C ON PCS.card_id = C.card_id \
            WHERE P.player_id = ? AND match_id = ? AND room_id = ? AND showdown_turn = ?"
            , [req.session.playerId, req.session.matchId,  req.session.roomId,  req.session.showdownTurn],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    var state
                    if (rows[0].current_health > 0 && opponentNameAndColor[0].current_health <= 0) {
                        state = 8
                        UpdatePlayerStateToEnding(state, rows[0].player_color, opponentNameAndColor[0].player_color)
                    }
                    else if (rows[0].current_health <= 0 && opponentNameAndColor[0].current_health > 0) {
                        state = 9
                        UpdatePlayerStateToEnding(state, rows[0].player_color, opponentNameAndColor[0].player_color)
                    }
                    else if (rows[0].current_health <= 0 && opponentNameAndColor[0].current_health <= 0) {
                        state = 10
                        UpdatePlayerStateToEnding(state, rows[0].player_color, opponentNameAndColor[0].player_color)
                    }
                    else {
                        
                        var card1 = rows[0]
                        var card2 = rows[1]
                        var card3 = rows[2]
                        var card4 = rows[3]

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
                        res.status(200).json({
                            "message": "Player stats and cards updated",
                            "state": rows[0].state_id,
                            "player_username": rows[0].player_username,
                            "player_color": rows[0].player_color,
                            "opponent_username": opponentNameAndColor[0].player_username,
                            "opponent_color": opponentNameAndColor[0].player_color,
                            "opponent_current_health": opponentNameAndColor[0].current_health, // If anything breaks come here
                            "opponent_damage": opponentNameAndColor[0].damage,
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
            }
        )   
    }

    function UpdatePlayerStateToEnding(state, player_color, opponent_color) {
        var queryString1

        if (state == 8) {
            queryString1 = "UPDATE player_status SET state_id = " + 8 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
        }
        else if (state == 9) {
            queryString1 = "UPDATE player_status SET state_id = " + 9 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
        }
        else if (state == 10) {
            queryString1 = "UPDATE player_status SET state_id = " + 10 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
        }
        else {
            queryString1 = "UPDATE player_status SET state_id = " + 4 + " WHERE player_status_id = " + req.session.playerStatusId + ";"
        }
        
        connection.query(queryString1, 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                WhoIsPlayerOne(state, player_color, opponent_color)
                
            }
        )
    }

    function WhoIsPlayerOne(state, player_color, opponent_color) {
        connection.query("SELECT player_1_id \
                    FROM game_match \
                    WHERE match_id = ?;", [req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    var IsPlayer1 = false
                    if (rows[0].player_1_id == req.session.playerId) {
                        IsPlayer1 = true
                    }
                    res.status(200).json({
                            "message": "Player stats and cards updated",
                            "state": state,
                            "IsPlayer1": IsPlayer1,
                            "player_color": player_color,
                            "opponent_color": opponent_color
                        })
                }
            })
    }
})

/**
 * Checks the cards selected by the player and opponent by the end of a showdown turn and applies their effects to the player
 * Called by client side function ShowdownEndTurn.
 * @param none
 * @returns {JSON} - returns the srings for the playerActions and opponentActions stating which cards each one chose
 */
router.post("/resolveShowdownTurn", (req, res) => {

    if (!req.session.playerStatusId) {
        GetSessionPlayerStatusId()
    }
    else {
        UpdateSelectedCardSlot1()
    }

    function GetSessionPlayerStatusId() {
        connection.query("SELECT player_status_id \
            FROM player_status \
            WHERE player_id = ? AND match_id = ?"
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
                UpdateSelectedCardSlot1()
            }
        )
    }

    /**
     * Update in the database what card is in the first selection slot at the end of the showdown turn.
     * Called by resolve req.session.showdownTurn endpoint.
     * @param none
     * @returns none
     */
    function UpdateSelectedCardSlot1() {
        connection.query("UPDATE player_card_slot SET slot_id = 9 \
            WHERE card_id = ? AND player_status_id = ? AND showdown_turn = ?"
            , [req.body.card[0], req.session.playerStatusId,  req.session.showdownTurn], 
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
        connection.query("UPDATE player_card_slot SET slot_id = 10 \
            WHERE card_id = ? AND player_status_id = ? AND showdown_turn = ?"
            , [req.body.card[1], req.session.playerStatusId,  req.session.showdownTurn], 
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
        connection.query("UPDATE player_status SET state_id = 5, showdown_initiative = 0 \
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
                GetOpponentShowdownCardStats()
            }
        )
    } 

    function GetOpponentShowdownCardStats() {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, \
            player_username, player_color, \
            max_health, current_health, energy, insight, damage \
            FROM card C \
            INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN player P ON P.player_id = PS.player_id \
            WHERE PCS.player_status_id != ? AND showdown_turn = ? AND slot_id IN (9,10) AND match_id = ?"
            , [req.session.playerStatusId,  req.session.showdownTurn, req.session.matchId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetPlayerShowdownCardStatsShowdownResult(rows) 
                }
                else {
                    res.status(200).json({
                        "message": "Opponent hasn't confirmed their card(s)",
                        "state": "WAITING_FOR_OPP"
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
    function GetPlayerShowdownCardStatsShowdownResult(opponentCards) {
        connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path \
            FROM card C \
            INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
            WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10)"
            , [req.session.playerStatusId,  req.session.showdownTurn], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    GetPlayerShowdownStatsAndCalculateResult(opponentCards, rows)
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
    function GetPlayerShowdownStatsAndCalculateResult(opponentCards, playerCards) {
        connection.query("SELECT player_status_id, Player.match_id, player_id, max_health, current_health, energy, insight, Player.damage, Opponent.damage op_damage \
            FROM (SELECT damage, match_id FROM player_status WHERE match_id = ? AND player_status_id != ?) Opponent \
            INNER JOIN player_status Player ON Opponent.match_id = Player.match_id \
            WHERE player_status_id = ?"
            , [req.session.matchId, req.session.playerStatusId, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                var opponentDamage = rows[0].op_damage
                var opponentAttack = 0
                var opponentParryAttack = 0
                var playerMaxHealth = rows[0].max_health
                var playerCurrentHealth = rows[0].current_health
                var playerEnergy = rows[0].energy
                var playerInsight = rows[0].insight
                var playerDamage = rows[0].damage
                var playerAttack = 0
                var playerDefense = 0
                var isParry = false
                var isDodge = false
                var isDoubleAttackOpponent = false
                var isCounterOpponent = false
                var isParryOpponent = false

                // console.log("Before Calculation 1, Player: " + [req.session.playerId])
                // console.log("playerCurrentHealth: "+ playerCurrentHealth)
                // console.log("playerEnergy: "+ playerEnergy)
                // console.log("playerInsight: "+ playerInsight)
                // console.log("playerDamage: "+ playerDamage)
                // console.log(playerCards)
                // console.log(opponentCards)

                //Player Skills
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 8) {
                        playerCurrentHealth = playerCurrentHealth + playerCards[i].card_current_health
                        playerInsight = playerInsight + playerCards[i].card_insight
                        playerEnergy = playerEnergy + playerCards[i].card_energy
                        playerDamage = playerDamage + playerCards[i].card_damage
                    }
                }

                //Opponent Skills
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 8) {
                        opponentDamage = opponentDamage + opponentCards[i].card_damage
                    }
                }
                
                //Player Defense
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 7) {
                        playerDefense = playerDefense + Math.round(playerCards[i].card_defense * (playerMaxHealth - 20))
                        playerInsight = playerInsight + playerCards[i].card_insight
                        playerEnergy = playerEnergy + playerCards[i].card_energy

                        if (playerCards[i].card_id == 10) {
                            isParry = true
                        }
                        if (playerCards[i].card_id == 9) {
                            isDodge = true
                        }
                    }
                }

                //Opponent Defense
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 7) {
                        if (opponentCards[i].card_id == 10) {
                            opponentParryAttack = opponentCards[i].card_attack
                            isParryOpponent = true
                        }
                    }
                }

                //Player Attack
                for (let i = 0; i < playerCards.length; i++) {
                    if (playerCards[i].card_type_id == 6) {
                        playerAttack = playerAttack + playerCards[i].card_attack
                        playerEnergy = playerEnergy + playerCards[i].card_energy

                        if (playerCards[i].card_id == 3) {
                            isDoubleAttack = true
                        }
                        if (playerCards[i].card_id == 5) {
                            isCounter = true
                        }
                    }
                }

                //Opponent Attack
                for (let i = 0; i < opponentCards.length; i++) {
                    if (opponentCards[i].card_type_id == 6) {
                        opponentAttack = opponentAttack + opponentCards[i].card_attack

                        if (opponentCards[i].card_id == 3) {
                            isDoubleAttackOpponent = true
                        }
                        if (opponentCards[i].card_id == 5) {
                            isCounterOpponent = true
                        }
                    }
                }

                if (isCounterOpponent) {
                    if ((!isDodge && !isParry) && playerAttack != 0) {
                        
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    }
                }
                if (isDoubleAttackOpponent) {
                    if (!isDodge && !isParry) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - ((opponentAttack * opponentDamage) * 2))
                        playerDefense = Math.max(0, playerDefense - ((opponentAttack * opponentDamage) * 2))
                    }
                    else {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    }
                }
                if (isParryOpponent) {
                    if ((opponentAttack != 0 || !isDodge) && playerAttack != 0) {
                        playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentParryAttack * (playerAttack * playerDamage)))
                        playerDefense = Math.max(0, playerDefense - Math.ceil(opponentParryAttack * playerDamage))
                    }
                }
                
                //Apply Normal, Heavy or Recovery Attack Damage
                if (!isCounterOpponent && !isDoubleAttackOpponent && !isDodge && !isParry) {
                    playerCurrentHealth = Math.min(playerCurrentHealth, playerCurrentHealth + playerDefense - Math.ceil(opponentAttack * opponentDamage))
                    playerDefense = Math.max(0, playerDefense - Math.ceil(opponentAttack * opponentDamage))
                }
                
                // console.log("After Calculation")
                // console.log("playerCurrentHealth: " + playerCurrentHealth)
                // console.log("playerEnergy: " + playerEnergy)
                // console.log("playerInsight: " + playerInsight)
                // console.log("playerDamage: " + playerDamage)

                UpdateShowdownPlayerStats(Math.min(playerCurrentHealth, playerMaxHealth), playerEnergy, Math.min(playerInsight, 10), playerDamage, opponentCards)
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
     * @returns {JSON} The sum of a and b.
     */
    function UpdateShowdownPlayerStats(playerCurrentHealth, playerEnergy, playerInsight, playerDamage, opponentCards) {
        connection.query("UPDATE player_status SET current_health = ?, energy = ?, insight = ?, damage = ? \
            WHERE player_status_id = ?"
            , [playerCurrentHealth, playerEnergy, playerInsight, playerDamage, req.session.playerStatusId], 
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                UpdateGameStateToShowdownResult(opponentCards)
            }
        )
    }
    

    function UpdateGameStateToShowdownResult(opponentCards) {
        connection.query("UPDATE player_status SET state_id = 6 WHERE player_status_id = ?", [req.session.playerStatusId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                console.log("I should be in state 6: " + [req.session.playerStatusId])
                GetPlayerShowdownCardStats(opponentCards)
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
            connection.query("SELECT C.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path \
                FROM card C \
                INNER JOIN player_card_slot PCS ON C.card_id = PCS.card_id \
                WHERE player_status_id = ? AND showdown_turn = ? AND slot_id IN (9,10)"
                , [req.session.playerStatusId,  req.session.showdownTurn], 
                function(err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    if (rows.length != 0) {
                        WhoIsPlayerOne(opponentCards, rows)
                    }
                }
            )
        }

        function WhoIsPlayerOne(opponentCards, playerCards) {
            connection.query("SELECT player_1_id \
                        FROM game_match \
                        WHERE match_id = ?;", [req.session.matchId],
                function (err, rows, fields) {
                    if (err) {
                        console.log("Database Error: " + err)
                        res.status(500).json({
                            "message": err
                        })
                        return
                    }
                    if (rows.length != 0) {
                        var IsPlayer1 = false
                        if (rows[0].player_1_id == req.session.playerId) {
                            IsPlayer1 = true
                        }
                        GetPlayerShowdownPlayerState(opponentCards, playerCards, IsPlayer1)
                    }
                })
        }

        function GetPlayerShowdownPlayerState(opponentCards, playerCards, IsPlayer1) {
            connection.query("SELECT showdown_turn, max_health, current_health, energy, insight, damage, player_username, player_color \
                FROM player_card_slot PCS \
                INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
                INNER JOIN player P ON PS.player_id = P.player_id \
                WHERE P.player_id = ? AND match_id = ? AND showdown_turn = ?"
                , [req.session.playerId, req.session.matchId, req.session.showdownTurn], 
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
                            "message": "Opponent hasn't confirmed their card(s)",
                            "state": "SHOW_RESULT",
                            "opponent_cards": opponentCards,
                            "opponent_current_health": opponentCards[0].current_health,
                            "IsPlayer1": IsPlayer1,
                            "player_cards": playerCards,
                            "player_color": rows[0].player_color,
                            "player_username": rows[0].player_username,
                            "max_health": rows[0].max_health,
                            "current_health": rows[0].current_health,
                            "energy": rows[0].energy,
                            "insight": rows[0].insight,
                            "damage": rows[0].damage,
                            "showdown_turn": rows[0].showdown_turn
                        })
                    }
                }
            )
        }
})


//#endregion

module.exports = router;