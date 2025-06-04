//Import modules
const express = require("express")
const connection = require("./database")
const router = express.Router();

//#region Match

/**
 * Gets the  req.session.roomId,  req.session.showdownTurn, and  req.session.state from the database
 * Called by client side function getGameState.
 * @param none
 * @returns {JSON} - returns the  req.session.roomId,  req.session.showdownTurn, and  req.session.state to the client side. 
 */
//TODO: Add the state in and only retern the room, turn and state
router.get("/getGameState", (req, res) => {
    GetLastRoom()
    function GetLastRoom() {
        connection.query("SELECT room_id, showdown_turn, state_id \
            FROM player_card_slot PCS \
            INNER JOIN player_status PS ON PS.player_status_id = PCS.player_status_id \
            INNER JOIN card C ON PCS.card_id = C.card_id WHERE player_id = ? AND match_id = ? \
            ORDER BY room_id DESC, showdown_turn DESC"
            , [req.session.playerId, req.session.matchId], 
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
                    req.session.showdownTurn = rows[0].showdown_turn
                    req.session.state = rows[0].state_id
                    
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

router.post("/endGame", (req, res) => {
    UpdateMatchFinished()
    
    function UpdateMatchFinished() {
        connection.query("UPDATE game_match SET is_match_finished = 1 WHERE match_id = ?", [req.session.matchId],
            function(err, rows, fields) {
                if (err) {
                    console.log("Database Error: " + err)
                    res.status(500).json({
                        "message": err
                    })
                    return
                }
                req.session.matchId = null
                req.session.playerStatusId = null
                req.session.state = null
                req.session.roomId = null
                req.session.showdownTurn = null

                GetPlayerData()
            }
        )
    }

    function GetPlayerData() {
    connection.query("SELECT player_id, player_username, player_color \
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
                res.status(200).json({
                "message": "Ending state changed and session varibles cleared!",
                "player_username": rows[0].player_username,
                "player_color": rows[0].player_color
                })
                return 
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

//#endregion


module.exports = router;