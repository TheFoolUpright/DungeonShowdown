function DungeonRequest(){
    var health = document.getElementById("health").value
    var energy = document.getElementById("energy").value
    var insight = document.getElementById("insight").value
    var damage = document.getElementById("damage").value

    
}

function UpdateGame(){
    console.log("update the game")

    // make a xmlhttprequest to the server (GET - /game) and grab all the game state

    // update the page (game.html)
}

setInterval(UpdateGame, 2000)