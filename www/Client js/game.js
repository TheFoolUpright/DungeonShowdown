//Initialize Variables
var dungeonCard1Id
var dungeonCard2Id
var dungeonCard3Id
var dungeonCard4Id


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

}

function sortCards(cardA, cardB){
    return cardA.slot_id - cardB.slot_id
}

function GetGameState(){

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            //console.log(this.responseText)
            var data = JSON.parse(this.responseText)
            //console.log(data)

            if (this.status == 200){
                data.card.sort(sortCards)

                //console.log("Data.Card: "+ data.card)
                document.getElementById("Max Health").innerHTML = "Max Health: " + data.max_health;
                document.getElementById("Current Health").innerHTML = "Current Health: " + data.current_health;
                document.getElementById("Energy").innerHTML = "Energy: " + data.energy;
                document.getElementById("Insight").innerHTML = "Insight: " + data.insight;
                document.getElementById("Damage").innerHTML = "Damage: " + data.damage;
                
                console.log(data.card[0].card_id + " " + data.card[0].card_name)
                dungeonCard1Id = data.card[0].card_id
                document.getElementById("Card1Name").innerHTML = data.card[0].card_name
                document.getElementById("Card1Image").innerHTML = data.card[0].card_image_path
                document.getElementById("Card1Stats").innerHTML = UnwrapCardStats(data.card[0])
                
                console.log(data.card[1].card_id + " " + data.card[1].card_name)
                dungeonCard2Id = data.card[1].card_id
                document.getElementById("Card2Name").innerHTML = data.card[1].card_name
                document.getElementById("Card2Image").innerHTML = data.card[1].card_image_path
                document.getElementById("Card2Stats").innerHTML = UnwrapCardStats(data.card[1])

                console.log(data.card[2].card_id + " " + data.card[2].card_name)
                dungeonCard3Id = data.card[2].card_id
                document.getElementById("Card3Name").innerHTML = data.card[2].card_name
                document.getElementById("Card3Image").innerHTML = data.card[2].card_image_path
                document.getElementById("Card3Stats").innerHTML = UnwrapCardStats(data.card[2])
                console.log(dungeonCard4Id)
            }
        }
    }

    xhttp.open("GET", "/getGameState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();

    DungeonSelectCard()
}

function UnwrapCardStats(card)
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

function DungeonSelectCard() {
    if (document.getElementById("DungeonCard1Selection").checked) 
    {
        dungeonCard4Id = dungeonCard1Id;
        document.getElementById("SelectedCardName").innerHTML = document.getElementById("Card1Name").innerHTML;
        document.getElementById("SelectedCardImage").innerHTML = document.getElementById("Card1Image").innerHTML;
        document.getElementById("SelectedCardStats").innerHTML = document.getElementById("Card1Stats").innerHTML;
    }
    if (document.getElementById("DungeonCard2Selection").checked) 
    {
        dungeonCard4Id = dungeonCard2Id;
        document.getElementById("SelectedCardName").innerHTML = document.getElementById("Card2Name").innerHTML;
        document.getElementById("SelectedCardImage").innerHTML = document.getElementById("Card2Image").innerHTML;
        document.getElementById("SelectedCardStats").innerHTML = document.getElementById("Card2Stats").innerHTML;
    }
    if (document.getElementById("DungeonCard3Selection").checked) 
    {
        dungeonCard4Id = dungeonCard3Id;
        document.getElementById("SelectedCardName").innerHTML = document.getElementById("Card3Name").innerHTML;
        document.getElementById("SelectedCardImage").innerHTML = document.getElementById("Card3Image").innerHTML;
        document.getElementById("SelectedCardStats").innerHTML = document.getElementById("Card3Stats").innerHTML;
    }
    
}

function DungeonEndTurn() {
    
    var xhttp = new XMLHttpRequest();
    
    //Create a JSON object with the registration data
    var dataToSend = {  
        "cardId": dungeonCard4Id
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status == 200){
                
                // update slot 4
                // update stats
                // update room
                console.log("success")
            }
        }
    }

    xhttp.open("POST", "/resolveDungeonTurn", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(dataToSend));
}

function SetupDungeon(){
    SetGameState()
}

setInterval(GetGameState, 3000)


