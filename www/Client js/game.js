//Initialize Variables
var dungeonCard1Id
var dungeonCard2Id
var dungeonCard3Id
var dungeonCard4Id
var roomId = 1;
var showdownTurn = 0;


function SetDungeonState(){
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status == 200){
                console.log("success")
            }
        }
    }

    xhttp.open("POST", "/setDungeonState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();

}

function sortCards(cardA, cardB){
    return cardA.slot_id - cardB.slot_id
}

function GetGameState() {


    //If in Dungeon
    if(roomId <= 5) {
        document.getElementById("showdownCards").style.display = "none";

        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                //console.log(this.responseText)
                var data = JSON.parse(this.responseText)
                console.log(data)

                if (this.status == 200){
                    data.card.sort(sortCards)

                    //console.log("Data.Card: "+ data.card)
                    document.getElementById("maxHealth").innerHTML = "Max Health: " + data.max_health;
                    document.getElementById("currentHealth").innerHTML = "Current Health: " + data.current_health;
                    document.getElementById("energy").innerHTML = "Energy: " + data.energy;
                    document.getElementById("insight").innerHTML = "Insight: " + data.insight;
                    document.getElementById("damage").innerHTML = "Damage: " + data.damage;
                    
                    dungeonCard1Id = data.card[0].card_id
                    document.getElementById("card1Name").innerHTML = data.card[0].card_name
                    document.getElementById("card1Image").innerHTML = data.card[0].card_image_path
                    document.getElementById("card1Stats").innerHTML = UnwrapDungeonCardStats(data.card[0])
                    
                    
                    dungeonCard2Id = data.card[1].card_id
                    document.getElementById("card2Name").innerHTML = data.card[1].card_name
                    document.getElementById("card2Image").innerHTML = data.card[1].card_image_path
                    document.getElementById("card2Stats").innerHTML = UnwrapDungeonCardStats(data.card[1])

                    dungeonCard3Id = data.card[2].card_id
                    document.getElementById("card3Name").innerHTML = data.card[2].card_name
                    document.getElementById("card3Image").innerHTML = data.card[2].card_image_path
                    document.getElementById("card3Stats").innerHTML = UnwrapDungeonCardStats(data.card[2])

                    roomId = data.room_id
                    document.getElementById("roomId").innerHTML = "Room " + roomId
                }
            }
        }

        xhttp.open("GET", "/getGameState", true);

        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        DungeonSelectCard()
    }
    //In Showdown Phase
    else{
        document.getElementById("dungeonCards").style.display = "none";
        document.getElementById("showdownCards").style.display = "block";

        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                //console.log(this.responseText)
                var data = JSON.parse(this.responseText)
                console.log(data)

                if (this.status == 200){
                    data.card.sort(sortCards)

                    //console.log("Data.Card: "+ data.card)
                    document.getElementById("maxHealth").innerHTML = "Max Health: " + data.max_health;
                    document.getElementById("currentHealth").innerHTML = "Current Health: " + data.current_health;
                    document.getElementById("energy").innerHTML = "Energy: " + data.energy;
                    document.getElementById("insight").innerHTML = "Insight: " + data.insight;
                    document.getElementById("damage").innerHTML = "Damage: " + data.damage;
                    
                    dungeonCard1Id = data.card[0].card_id
                    document.getElementById("specialAttackCardName").innerHTML = data.card[0].card_name
                    document.getElementById("specialAttackCardImage").innerHTML = data.card[0].card_image_path
                    document.getElementById("specialAttackCardStats").innerHTML = UnwrapShowdownCardStats(data.card[0], data.damage)
                    
                    
                    dungeonCard2Id = data.card[1].card_id
                    document.getElementById("defenseCardName").innerHTML = data.card[1].card_name
                    document.getElementById("defenseCardImage").innerHTML = data.card[1].card_image_path
                    document.getElementById("defenseCardStats").innerHTML = UnwrapShowdownCardStats(data.card[1], data.damage)

                    dungeonCard3Id = data.card[2].card_id
                    document.getElementById("skillCardName").innerHTML = data.card[2].card_name
                    document.getElementById("skillCardImage").innerHTML = data.card[2].card_image_path
                    document.getElementById("skillCardStats").innerHTML = UnwrapShowdownCardStats(data.card[2], data.damage)

                    showdownTurn = data.showdown_turn
                    document.getElementById("showdownTurn").innerHTML = "Turn " + showdownTurn
                    roomId = data.room_id
                    document.getElementById("roomId").innerHTML = "Room " + roomId
                }
            }
        }

        xhttp.open("GET", "/getGameState", true);

        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        DungeonSelectCard()

    }
}

function UnwrapDungeonCardStats(card)
{
    //console.log(card.card_type_id)
    var stringBuilder = "";

    if(card.card_type_id == 1){
        stringBuilder = "Max Health Increase by: " + card.card_max_health;
    }
    if(card.card_type_id == 2){
        stringBuilder = "Current Health Increase by: " + card.card_current_health;
    }
    if(card.card_type_id == 3){
        stringBuilder = "Damage Increase by: " + card.card_damage;
    }
    if(card.card_type_id == 4){
        
        if (card.card_energy > 0)
        {
            stringBuilder = stringBuilder + " Energy Increase by: " + card.card_energy;
        }
        if (card.card_insight > 0)
        {
            stringBuilder = stringBuilder + " Insight Increase by: " + card.card_insight;
        }
    }
    if(card.card_type_id == 5){

        //Costs first
        if (card.card_current_health < 0)
        {
            stringBuilder = stringBuilder + " Current Health Decrease by: " + card.card_current_health
        }
        if (card.card_energy < 0)
        {
            stringBuilder = stringBuilder + " Energy Decrease by: " + card.card_energy
        }
        if (card.card_insight < 0)
        {
            stringBuilder = stringBuilder + " Insight Decrease by: " + card.card_insight
        }

        //Rewards
        if (card.card_max_health > 0)
            {
                stringBuilder = stringBuilder + " Max Health Increase by: " + card.card_max_health
            }
        if (card.card_energy > 0)
        {
            stringBuilder = stringBuilder + " Energy Increase by: " + card.card_energy
        }
        if (card.card_insight > 0)
        {
                stringBuilder = stringBuilder + " Insight Increase by: " + card.card_insight
        }
        if (card.card_damage > 0)
        {
            stringBuilder = stringBuilder + " Damage Increase by: " + card.card_damage
        }
       
    }
    
    return stringBuilder;
}

function UnwrapShowdownCardStats(card, playerDamage)
{
    var stringBuilder = "";
    if(card.card_type_id == 6){

        //Cost first
        if(card.card_energy < 0)
        {
            stringBuilder = stringBuilder + " Energy Decrease by: " + card.card_energy
        }
        // Rewards
        if (card.card_attack > 0)
        {
            stringBuilder = stringBuilder + " Attack is: " + (card.card_attack * playerDamage)
        }
    }
    if(card.card_type_id == 7){
        console.log(card.insight)
        //Cost first
        if(card.card_energy < 0)
        {
            stringBuilder = stringBuilder + " Energy Decrease by: " + card.card_energy
        }
        if(card.card_insight < 0)
        {
            stringBuilder = stringBuilder + " Insight Decrease by: " + card.card_insight
        }
        
        // Rewards
        if (card.card_defense > 0)
        {
            stringBuilder = stringBuilder + " Defense is: " +  card.card_defense
        }
    }
    if(card.card_type_id == 8){
         
            //Cost first
         if(card.card_energy < 0)
        {
            stringBuilder = stringBuilder + " Energy Decrease by: " + card.card_energy
        }
        if(card.card_insight < 0)
        {
            stringBuilder = stringBuilder + " Insight Decrease by: " + card.card_insight
        }
        
        // Rewards
        if (card.card_current_health > 0)
            {
                stringBuilder = stringBuilder + " Current Health Increase by: " + card.card_current_health
            }
        if (card.card_energy > 0)
        {
            stringBuilder = stringBuilder + " Energy Increase by: " + card.card_energy
        }
        if (card.card_insight > 0)
        {
                stringBuilder = stringBuilder + " Insight Increase by: " + card.card_insight
        }
        if (card.card_damage > 0)
        {
            stringBuilder = stringBuilder + " Damage Increase by: " + card.card_damage
        }
    }
    
    
    return stringBuilder;
}

function DungeonSelectCard() {
    if (document.getElementById("dungeonCard1Selection").checked) 
    {
        dungeonCard4Id = dungeonCard1Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card1Name").innerHTML;
        document.getElementById("selectedCardImage").innerHTML = document.getElementById("card1Image").innerHTML;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card1Stats").innerHTML;
    }
    if (document.getElementById("dungeonCard2Selection").checked) 
    {
        dungeonCard4Id = dungeonCard2Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card2Name").innerHTML;
        document.getElementById("selectedCardImage").innerHTML = document.getElementById("card2Image").innerHTML;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card2Stats").innerHTML;
    }
    if (document.getElementById("dungeonCard3Selection").checked) 
    {
        dungeonCard4Id = dungeonCard3Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card3Name").innerHTML;
        document.getElementById("selectedCardImage").innerHTML = document.getElementById("card3Image").innerHTML;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card3Stats").innerHTML;
    }
    
}

function DungeonEndTurn() {
    
    document.getElementById("dungeonCards").style.display = "none";
    document.getElementById("opponentChoiceSection").style.display = "block";

    document.getElementById("dungeonCard1Selection").checked = false;
    document.getElementById("dungeonCard2Selection").checked = false;
    document.getElementById("dungeonCard3Selection").checked = false;

    var xhttp = new XMLHttpRequest();
    console.log(dungeonCard4Id)
    //Create a JSON object with the registration data
    var dataToSend = {  
        "cardId": dungeonCard4Id
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                document.getElementById("opponentChoice").innerHTML = "Your oppponent chose a(n) " + data.card_type_name + " card";
                GetGameState()
                console.log("success")
            }
        }
    }

    xhttp.open("POST", "/resolveDungeonTurn", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(dataToSend));
}

function SetupDungeon() {
    SetGameState()
}

function SetupNextRoom() {

    if(roomId <= 5){
        document.getElementById("dungeonCards").style.display = "block";
        document.getElementById("opponentChoiceSection").style.display = "none";
        
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
    
                if (this.status == 200){
                    console.log("success")
                }
            }
        }
    
        xhttp.open("POST", "/setupNextDungeonRoom", true);
    
        xhttp.setRequestHeader("Content-Type", "application/json");
    
        xhttp.send();
    }
    else {
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
    
                if (this.status == 200){
                    console.log("success")
                }
            }
        }
    
        xhttp.open("POST", "/setupShowdown", true);
    
        xhttp.setRequestHeader("Content-Type", "application/json");
    
        xhttp.send();
    }
}

setInterval(GetGameState, 3000)