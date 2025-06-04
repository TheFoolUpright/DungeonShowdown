//Import modules
const express = require("express")
const connection = require("./database")
const router = express.Router();

router.get("/getWaitingForMatch", (req, res) => {

    MatchCheck()

    function MatchCheck() {
        connection.query("SELECT match_id, player_id, is_waiting_for_match \
            FROM game_match INNER JOIN player ON player_id = player_1_id OR player_id = player_2_id \
            WHERE player_id = ? AND is_match_finished = 0"
            , [req.session.playerId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            if (rows.length == 0) {
                res.status(200).json({
                    "message": "Waiting for another player",
                    "state": "WAITING_FOR_MATCH"
                    })
            }
            else {
                req.session.matchId = rows[0].match_id
                GetDungeonData()
            }
        })
    }

    
    function GetDungeonData(){
        connection.query("SELECT player_username, player_color, \
        player_card_slot_id, PCS.player_status_id, slot_id, PCS.card_id, room_id, showdown_turn, is_visible, \
        match_id, PS.player_id, max_health, current_health, energy, insight, damage, \
        card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_attack, card_defense, card_image_path, card_description, card_display_option \
        FROM player_card_slot PCS \
        INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
        INNER JOIN player P ON P.player_id = PS.player_id \
        INNER JOIN card C ON PCS.card_id = C.card_id \
        WHERE PS.player_id = ? AND match_id = ? AND room_id = ?"
        , [req.session.playerId, req.session.matchId,  1],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                if (rows.length != 0) {
                    req.session.roomId = rows[0].room_id
                    req.session.playerStatusId = rows[0].player_status_id

                    var card1 = rows[0]
                    var card2 = rows[1]
                    var card3 = rows[2]
            
                    res.status(200).json({
                        "message": "Player stats and cards updated",
                        "state": "MATCH_FOUND",
                        "player_username": rows[0].player_username,
                        "player_color": rows[0].player_color,
                        "room_id":  req.session.roomId,
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


router.get("/getMatchState", (req, res) => {
    if (req.session.matchId) {
       res.status(200).json({
           "message": "Player already in a match",
           "state": "MATCH_FOUND"
       })
       return
    }

    MatchCheck()

    function MatchCheck() {
        connection.query("SELECT match_id, player_id, is_waiting_for_match \
            FROM game_match INNER JOIN player ON player_id = player_1_id OR player_id = player_2_id \
            WHERE player_id = ? AND is_match_finished = 0"
            , [req.session.playerId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            if (rows.length == 0) {
                WaitingForMatchCheck()
            }
            else {
                req.session.matchId = rows[0].match_id

                res.status(200).json({
                    "message": "Player already in a match",
                    "state": "MATCH_FOUND"
                })
                return   
            }
        })
    }

    function WaitingForMatchCheck() {
        console.log("Player: "+[req.session.playerId])
        connection.query("SELECT player_id, player_username, player_color, is_waiting_for_match \
            FROM player WHERE player_id = ?", [req.session.playerId],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            if (rows.length != 0) {
                if (rows[0].is_waiting_for_match == 1) {
                    res.status(200).json({
                    "message": "Player already in a match",
                    "state": "WAITING_FOR_MATCH"
                    })
                    return  
                }
                else {
                    res.status(200).json({
                    "message": "Player already in a match",
                    "state": "NOT_IN_MATCH",
                    "player_username": rows[0].player_username,
                    "player_color": rows[0].player_color
                    })
                    return 
                }
            }
            else {
                res.status(200).json({
                    "message": "Player Not Found"
                })
                return   
            }
        })
    }


    
})

router.put("/joinMatch", (req, res) => {
     if (!req.session.playerId) {
        //not logged in
        res.status(401).json({
            "message": "Player not logged in"
        })
        return
        
     }

     if (req.session.matchId) {
        res.status(200).json({
            "message": "Player already in a match",
            "state": "MATCH_FOUND"
        })
        return
     }

     UpdateWaitingForMatchSearch()

    function UpdateWaitingForMatchSearch() {
        connection.query("UPDATE player SET is_waiting_for_match = 1, player_color = ? WHERE player_id = ?", [req.body.player_color, req.session.playerId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                FindAnOpponent()

            }
        )
    }

    function FindAnOpponent() {
        connection.query("SELECT player_id FROM player WHERE is_waiting_for_match = 1 AND player_id != ? ", [req.session.playerId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                if (rows.length == 0) {
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
        )
    }

    function CreateAMatch(player1) {
        connection.query("INSERT INTO game_match (player_1_id, player_2_id) VALUES (?, ?)", [player1, req.session.playerId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }

                FindMatch(player1, req.session.playerId)

            }
        )
    }

    function FindMatch(player1, player2) {
        connection.query("SELECT match_id FROM game_match WHERE player_1_id = ? AND player_2_id = ? AND is_match_finished = 0", [player1, player2],
            function (err, rows, fields) {
                if (err) {
                    console.log("FindMatch")
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                req.session.matchId = rows[0].match_id
                
                CreatePlayerStatus(player1) 
            }
        )
    }
    
    function CreatePlayerStatus(player1) {
        connection.query("INSERT INTO player_status (match_id, player_id) VALUES (?, ?), (?, ?)"
            , [req.session.matchId, req.session.playerId, req.session.matchId, player1], 
            function (err, rows, fields) {
                if (err) {
                    console.log("FindMatch")
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetPlayerStatus()

            }
        )
    }

    function GetPlayerStatus() {
        connection.query("SELECT player_status_id, match_id, player_id, max_health, current_health, energy, insight, damage \
            FROM player_status WHERE match_id = ?"
            , [req.session.matchId],
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                var player1Status = rows[0]
                var player2Status = rows[1]

                req.session.roomId = 1
                GetRoomDeck(player1Status, player2Status)
            }
        )
    }

    function GetRoomDeck(playerStatus, opponentStatus) {
        
        connection.query("SELECT c.card_id, card_type_id, card_name, card_max_health, card_current_health, card_energy, card_insight, card_damage, card_image_path \
            FROM (SELECT max_health, current_health, energy, insight FROM player_status WHERE player_status_id = ?) ps, card_room cr \
            INNER JOIN card c ON c.card_id = cr.card_id INNER JOIN room r ON cr.room_id = r.room_id \
            WHERE  (ps.current_health + card_current_health <= ps.max_health) \
            AND (ps.insight + card_insight <= 10) \
            AND (ps.current_health + card_current_health > 0) \
            AND (ps.energy + card_energy >= 0) \
            AND (ps.insight + card_insight >= 0) \
            AND r.room_id = ?"
            , [playerStatus.player_status_id,  req.session.roomId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                //call function to set cards
                InsertDungeonCards(playerStatus, opponentStatus, rows)

            }
        )
    }


    function InsertDungeonCards(playerStats, opponentStatus, deck) {

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

        var playerTypesDeck = []
        var opponentTypesDeck = []
        var typeIterator = 0

        if (MaxHealthDeck.length != 0) {
            playerTypesDeck[typeIterator] = MaxHealthDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = MaxHealthDeck[0].card_type_id
            typeIterator++
        }
        if (HealingDeck.length != 0) {
            playerTypesDeck[typeIterator] = HealingDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = HealingDeck[0].card_type_id
            typeIterator++
        }
        if (DamageDeck.length != 0) {
            playerTypesDeck[typeIterator] = DamageDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = DamageDeck[0].card_type_id
            typeIterator++
        }
        if (RestDeck.length != 0) {
            playerTypesDeck[typeIterator] = RestDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = RestDeck[0].card_type_id
            typeIterator++
        }
        if (EnemyDeck.length != 0) {
            playerTypesDeck[typeIterator] = EnemyDeck[0].card_type_id
            opponentTypesDeck[typeIterator] = EnemyDeck[0].card_type_id
            typeIterator++
        }

        var playerType1 = playerTypesDeck[Math.floor(Math.random() * playerTypesDeck.length)]
        indexOfElement = playerTypesDeck.indexOf(playerType1)
        playerTypesDeck.splice(indexOfElement, 1)
        
        var playerType2 = playerTypesDeck[Math.floor(Math.random() * playerTypesDeck.length)]
        indexOfElement = playerTypesDeck.indexOf(playerType2)
        playerTypesDeck.splice(indexOfElement, 1)
        
        var playerType3 = playerTypesDeck[Math.floor(Math.random() * playerTypesDeck.length)]

        var opponentType1 = opponentTypesDeck[Math.floor(Math.random() * opponentTypesDeck.length)]
        indexOfElement = opponentTypesDeck.indexOf(opponentType1)
        opponentTypesDeck.splice(indexOfElement, 1)
        
        var opponentType2 = opponentTypesDeck[Math.floor(Math.random() * opponentTypesDeck.length)]
        indexOfElement = opponentTypesDeck.indexOf(opponentType2)
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
              break
            case 2:
                playerCard1 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                playerCard1 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                playerCard1 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                playerCard1 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }
        switch(playerType2) {
            case 1:
                playerCard2 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                playerCard2 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                playerCard2 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                playerCard2 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                playerCard2 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }
        switch(playerType3) {
            case 1:
                playerCard3 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                playerCard3 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                playerCard3 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                playerCard3 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                playerCard3 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }

        switch(opponentType1) {
            case 1:
                opponentCard1 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                opponentCard1 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                opponentCard1 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                opponentCard1 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                opponentCard1 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }
        switch(opponentType2) {
            case 1:
                opponentCard2 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                opponentCard2 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                opponentCard2 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                opponentCard2 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                opponentCard2 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }
        switch(opponentType3) {
            case 1:
                opponentCard3 = MaxHealthDeck[Math.floor(Math.random() * MaxHealthDeck.length)]
              break
            case 2:
                opponentCard3 = HealingDeck[Math.floor(Math.random() * HealingDeck.length)]
              break
            case 3:
                opponentCard3 = DamageDeck[Math.floor(Math.random() * DamageDeck.length)]
              break
            case 4:
                opponentCard3 = RestDeck[Math.floor(Math.random() * RestDeck.length)]
              break
            case 5:
                opponentCard3 = EnemyDeck[Math.floor(Math.random() * EnemyDeck.length)]
              break
            default:
                console.log("Case Error")
        }

        //Make cards visible by default
        playerCard1.IsVisible = true
        playerCard2.IsVisible = true
        playerCard3.IsVisible = true
        opponentCard1.IsVisible = true
        opponentCard2.IsVisible = true
        opponentCard3.IsVisible = true
        
        connection.query("INSERT INTO player_card_slot (player_status_id, slot_id, card_id, room_id, showdown_turn, is_visible) \
            VALUES (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?), (?,?,?,?,?,?)", 
            [playerStats.player_status_id, 1, playerCard1.card_id,  req.session.roomId,  req.session.showdownTurn, playerCard1.IsVisible, 
             playerStats.player_status_id, 2, playerCard2.card_id,  req.session.roomId,  req.session.showdownTurn, playerCard2.IsVisible,  
             playerStats.player_status_id, 3, playerCard3.card_id,  req.session.roomId,  req.session.showdownTurn, playerCard3.IsVisible,
             opponentStatus.player_status_id, 1, opponentCard1.card_id,  req.session.roomId,  req.session.showdownTurn, opponentCard1.IsVisible, 
             opponentStatus.player_status_id, 2, opponentCard2.card_id,  req.session.roomId,  req.session.showdownTurn, opponentCard2.IsVisible,  
             opponentStatus.player_status_id, 3, opponentCard3.card_id,  req.session.roomId,  req.session.showdownTurn, opponentCard3.IsVisible],
        function (err, rows, fields) {
            if (err) {
                console.log("Database Error: " + err)
                res.status(500).json({
                    "message": err
                })
                return
            }
            UpdateWaitingForMatchFound()
        })
    }

    function UpdateWaitingForMatchFound() {
        connection.query("UPDATE player p INNER JOIN game_match m ON m.player_1_id = p.player_id or m.player_2_id = p.player_id SET p.is_waiting_for_match = 0 WHERE m.match_id = ?", [req.session.matchId], 
            function (err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                GetDungeonDataForScene()
            }
        )
    }

    function GetDungeonDataForScene() {
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
                        "message": "Match Found!",
                        "state": "MATCH_FOUND",
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
            })
    }
})

module.exports = router;