//Initialize Variables
var dungeonCard1Id
var dungeonCard2Id
var dungeonCard3Id
var dungeonSelectedCardId
var showdownCard1Id = 8;
var showdownCard2Id
var showdownCard3Id
var showdownCard4Id
var showdownSelectedCard1Id = null;
var showdownSelectedCard2Id = null;
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
                    console.log(data.card[0])
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
                    console.log(data.card)
                    data.card.sort(sortCards)

                    //console.log("Data.Card: "+ data.card)
                    document.getElementById("maxHealth").innerHTML = "Max Health: " + data.max_health;
                    document.getElementById("currentHealth").innerHTML = "Current Health: " + data.current_health;
                    document.getElementById("energy").innerHTML = "Energy: " + data.energy;
                    document.getElementById("insight").innerHTML = "Insight: " + data.insight;
                    document.getElementById("damage").innerHTML = "Damage: " + data.damage;
                    
                    showdownCard2Id = data.card[0].card_id
                    document.getElementById("specialAttackCardName").innerHTML = data.card[0].card_name
                    document.getElementById("specialAttackCardImage").innerHTML = data.card[0].card_image_path
                    document.getElementById("specialAttackCardStats").innerHTML = UnwrapShowdownCardStats(data.card[0], data.damage)
                    
                    
                    showdownCard3Id = data.card[1].card_id
                    document.getElementById("defenseCardName").innerHTML = data.card[1].card_name
                    document.getElementById("defenseCardImage").innerHTML = data.card[1].card_image_path
                    document.getElementById("defenseCardStats").innerHTML = UnwrapShowdownCardStats(data.card[1], data.damage)

                    showdownCard4Id = data.card[2].card_id
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

    if(card.attribute_id == 1){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Max Health Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Max Health Decrease by: " + card.card_attribute_value;
        }  
    }
    if(card.attribute_id == 2){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Current Health Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Current Health Decrease by: " + card.card_attribute_value;
        }  
    }
    if(card.attribute_id == 3){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Energy Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Energy Decrease by: " + card.card_attribute_value;
        }  
    }
    if(card.attribute_id == 4){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Insight Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Insight Decrease by: " + card.card_attribute_value;
        }  
    }
    if(card.attribute_id == 5){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Damage Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Damage Decrease by: " + card.card_attribute_value;
        }  
    }
    if(card.attribute_id == 6){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Attack Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Attack Decrease by: " + card.card_attribute_value;
        }  
    }
    if(card.attribute_id == 7){
        if(card.card_attribute_value > 0) {
            stringBuilder = stringBuilder + " Defence Increase by: " + card.card_attribute_value;
        }
        if(card.card_attribute_value < 0) {
            stringBuilder = stringBuilder + " Defence Decrease by: " + card.card_attribute_value;
        }  
    }
    
    return stringBuilder;
}

function DungeonSelectCard() {
    if (document.getElementById("dungeonCard1Selection").checked) 
    {
        dungeonSelectedCardId = dungeonCard1Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card1Name").innerHTML;
        document.getElementById("selectedCardImage").innerHTML = document.getElementById("card1Image").innerHTML;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card1Stats").innerHTML;
    }
    if (document.getElementById("dungeonCard2Selection").checked) 
    {
        dungeonSelectedCardId = dungeonCard2Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card2Name").innerHTML;
        document.getElementById("selectedCardImage").innerHTML = document.getElementById("card2Image").innerHTML;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card2Stats").innerHTML;
    }
    if (document.getElementById("dungeonCard3Selection").checked) 
    {
        dungeonSelectedCardId = dungeonCard3Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card3Name").innerHTML;
        document.getElementById("selectedCardImage").innerHTML = document.getElementById("card3Image").innerHTML;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card3Stats").innerHTML;
    }
    
}

function ShowdownSelectCard() {
    console.log("showdownSelectedCard1Id = " + showdownSelectedCard1Id)
    console.log("showdownSelectedCard2Id = " + showdownSelectedCard2Id)
    if (document.getElementById("showdownCard1Selection").checked) 
    {
        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard1Id) {
            showdownSelectedCard1Id = showdownCard1Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("normalAttackCardName").innerHTML;
            document.getElementById("selectedCardImage1").innerHTML = document.getElementById("normalAttackCardImage").innerHTML;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("normalAttackCardStats").innerHTML;
            return;
        } 
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard1Id) {
            showdownSelectedCard2Id = showdownCard1Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("normalAttackCardName").innerHTML;
            document.getElementById("selectedCardImage2").innerHTML = document.getElementById("normalAttackCardImage").innerHTML;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("normalAttackCardStats").innerHTML;
            return;
        } 
    }
    else {
        if(showdownSelectedCard1Id == showdownCard1Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard1Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }

    if (document.getElementById("showdownCard2Selection").checked) {
        console.log("showdownCard2Selection")
        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard2Id) {
            showdownSelectedCard1Id = showdownCard2Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("specialAttackCardName").innerHTML;
            document.getElementById("selectedCardImage1").innerHTML = document.getElementById("specialAttackCardImage").innerHTML;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("specialAttackCardStats").innerHTML;
            return;
        }
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard2Id) {
            showdownSelectedCard2Id = showdownCard2Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("specialAttackCardName").innerHTML;
            document.getElementById("selectedCardImage2").innerHTML = document.getElementById("specialAttackCardImage").innerHTML;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("specialAttackCardStats").innerHTML;
            return;
        } 
    }
    else {
        if(showdownSelectedCard1Id == showdownCard2Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard2Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }

    if (document.getElementById("showdownCard3Selection").checked) {
        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard3Id) {
            showdownSelectedCard1Id = showdownCard3Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("defenseCardName").innerHTML;
            document.getElementById("selectedCardImage1").innerHTML = document.getElementById("defenseCardImage").innerHTML;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("defenseCardStats").innerHTML;
            return;
        }
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard3Id) {
            showdownSelectedCard2Id = showdownCard3Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("defenseCardName").innerHTML;
            document.getElementById("selectedCardImage2").innerHTML = document.getElementById("defenseCardImage").innerHTML;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("defenseCardStats").innerHTML;
            return;
        } 
    }
    else {
        if(showdownSelectedCard1Id == showdownCard3Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard3Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }

    if (document.getElementById("showdownCard4Selection").checked) {
        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard4Id) {
            showdownSelectedCard1Id = showdownCard4Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("skillCardName").innerHTML;
            document.getElementById("selectedCardImage1").innerHTML = document.getElementById("skillCardImage").innerHTML;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("skillCardStats").innerHTML;
            return;
        }
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard4Id) {
            showdownSelectedCard2Id = showdownCard4Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("skillCardName").innerHTML;
            document.getElementById("selectedCardImage2").innerHTML = document.getElementById("skillCardImage").innerHTML;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("skillCardStats").innerHTML;
            return;
        } 
    }
    else {
        if(showdownSelectedCard1Id == showdownCard4Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard4Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").innerHTML = "[Selected Card Image]";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }
   
}

function DungeonEndTurn() {
    
    document.getElementById("dungeonCards").style.display = "none";
    document.getElementById("opponentChoiceSection").style.display = "block";

    document.getElementById("dungeonCard1Selection").checked = false;
    document.getElementById("dungeonCard2Selection").checked = false;
    document.getElementById("dungeonCard3Selection").checked = false;

    var xhttp = new XMLHttpRequest();
    //Create a JSON object with the registration data
    var dataToSend = {  
        "cardId": dungeonSelectedCardId
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

function ShowdownEndTurn() {
    var xhttp = new XMLHttpRequest();
    //Create a JSON object with the registration data
    var dataToSend = {  
        "cardId1": showdownSelectedCard1Id,
        "cardId2": showdownSelectedCard2Id
    }

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){

                console.log("success")
            }
        }
    }

    xhttp.open("POST", "/resolveShowdownTurn", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(dataToSend));
}

// function SetupDungeon() {
//     SetGameState()
// }

function SetupNextRoom() {

    if(roomId <= 5){
        document.getElementById("dungeonCards").style.display = "block";
        document.getElementById("opponentChoiceSection").style.display = "none";
        
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
    
                if (this.status == 200){
                    GetGameState()
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