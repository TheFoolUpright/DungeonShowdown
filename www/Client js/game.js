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
            console.log(this.responseText)
            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                document.getElementById("Max Health").innerHTML = "Max Health: " + data.max_health;
                document.getElementById("Current Health").innerHTML = "Current Health: " + data.current_health;
                document.getElementById("Energy").innerHTML = "Energy: " + data.energy;
                document.getElementById("Insight").innerHTML = "Insight: " + data.insight;
                document.getElementById("Damage").innerHTML = "Damage: " + data.damage;

                
                // document.getElementById("Card1Name").innerHTML = data.card1[0].card_name
                // document.getElementById("Card1Image").innerHTML = data.card1[0].card_image_path
                // document.getElementById("Card1Stats").innerHTML = UnwrapCardStats(card1)
                
                // document.getElementById("Card2Name").innerHTML = data.card2[0].card_name
                // document.getElementById("Card2Image").innerHTML = data.card2[0].card_image_path
                // document.getElementById("Card2Stats").innerHTML = UnwrapCardStats(card2)

                // document.getElementById("Card3Name").innerHTML = data.card3[0].card_name
                // document.getElementById("Card3Image").innerHTML = data.card3[0].card_image_path
                // document.getElementById("Card3Stats").innerHTML = UnwrapCardStats(card3)
            }
        }
    }

    xhttp.open("GET", "/getGameState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();

    // make a xmlhttprequest to the server (GET - /game) and grab all the game state

    // update the page (game.html)
}

function UnwrapCardStats(card)
{
    var stringBuilder = "";

    if(card[0].card_type_Id = 1){
        stringBuilder = "Max Health Increase by: " + card[0].card_max_health;
    }
    if(card[0].card_type_Id = 2){
        stringBuilder = "Current Health Increase by: " + card[0].card_current_health;
    }
    if(card[0].card_type_Id = 3){
        stringBuilder = "Damage Increase by: " + card[0].card_damage;
    }
    if(card[0].card_type_Id = 4){
        
        if (card[0].card_energy > 0)
        {
            stringBuilder = stringBuilder + " Energy Increase by: " + card[0].card_energy;
        }
        if (card[0].card_insight > 0)
        {
            stringBuilder = stringBuilder + " Insight Increase by: " + card[0].card_insight;
        }
    }
    if(card[0].card_type_Id = 5){

        //Costs first
        if (card[0].card_current_health < 0)
        {
            stringBuilder = stringBuilder + " Current Health Decrease by: " + card[0].card_current_health
        }
        if (card[0].card_energy < 0)
        {
            stringBuilder = stringBuilder + " Energy Decrease by: " + card[0].card_energy
        }
        if (card[0].card_insight < 0)
        {
            stringBuilder = stringBuilder + " Insight Decrease by: " + card[0].card_insight
        }

        //Rewards
        if (card[0].card_max_health > 0)
            {
                stringBuilder = stringBuilder + " Max Health Increase by: " + card[0].card_max_health
            }
        if (card[0].card_energy > 0)
        {
            stringBuilder = stringBuilder + " Energy Increase by: " + card[0].card_energy
        }
        if (card[0].card_insight > 0)
        {
                stringBuilder = stringBuilder + " Insight Increase by: " + card[0].card_insight
        }
        if (card[0].card_damage > 0)
        {
            stringBuilder = stringBuilder + " Damage Increase by: " + card[0].card_damage
        }
       
    }
    return stringBuilder;
}


SetGameState()

setInterval(GetGameState, 3000)


