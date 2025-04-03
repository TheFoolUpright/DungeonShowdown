function SetGameState(){
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status == 200){
                console.log("success")
            }
        }
    }

    xhttp.open("POST", "/setGameState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();

    // make a xmlhttprequest to the server (GET - /game) and grab all the game state

    // update the page (game.html)
}

function GetGameState(){
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                document.getElementById("Max Health").innerHTML = "Max Health: " + data.max_health;
                document.getElementById("Current Health").innerHTML = "Current Health: " + data.current_health;
                document.getElementById("Energy").innerHTML = "Energy: " + data.energy;
                document.getElementById("Insight").innerHTML = "Insight: " + data.insight;
                document.getElementById("Damage").innerHTML = "Damage: " + data.damage;
            }
        }
    }

    xhttp.open("GET", "/getGameState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();

    // make a xmlhttprequest to the server (GET - /game) and grab all the game state

    // update the page (game.html)
}

function DungeonRequest(){



    
}
SetGameState()

setInterval(GetGameState, 3000)

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