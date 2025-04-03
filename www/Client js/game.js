function DungeonRequest(){



    
}

function UpdateGame(){
    console.log("update the game")

    // make a xmlhttprequest to the server (GET - /game) and grab all the game state

    // update the page (game.html)
}

setInterval(UpdateGame, 2000)

function SelectShowdownCard() {
    var totalChecked = 0

    //for all the checkboxs in Showdown Cards class 

}

function FetchShowdownHand() {

}

function ConfirmShowdownCards() {
    
}

function GetGameState() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                //Update client page
                
            }
        }
    }

    xhttp.open("GET", "/getGameState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}