//#region Variables

//Initialize Variables
var dungeonCard1Id
var dungeonCard2Id
var dungeonCard3Id
var dungeonSelectedCardId
var showdownCard1Id = 1;
var showdownCard2Id
var showdownCard3Id
var showdownCard4Id
var showdownSelectedCard1Id = null;
var showdownSelectedCard2Id = null;
var roomId = 1;
var showdownTurn = 0;


var states = {
    "DungeonCardSelection": 1,
    "WaitingOnOpponentDungeon": 2,
    "DungeonResult": 3, 
    "ShowdownCardSelection": 4,
    "WaitingOnOpponentShowdown": 5,
    "ShowdownResult": 6,
    "Won": 7,
    "Lost": 8,
    "Draw": 9
}

var currentState = 1
//#endregion


// function SetDungeonState() {
    
//     var xhttp = new XMLHttpRequest();
    
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4) {

//             if (this.status == 200) {
//                 console.log("success")
//             }
//         }
//     }

//     xhttp.open("POST", "/setDungeonState", true);

//     xhttp.setRequestHeader("Content-Type", "application/json");

//     xhttp.send();

// }

//#region Game

setInterval(GetGameState, 3000)


/**
 * Displays the HTML element needed for the waiting for opponent state. 
 * Called by GetGameState.
 * @param none
 * @returns none
 */
function getWaitingOnOpponentShowdown() {


    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status == 200) {
                //Display HTML Elements - ON
                document.getElementById("statsContainer").style.display = "block";
                document.getElementById("waitingForOpponent").style.display = "block";
                
                //Display HTML Elements - OFF
                document.getElementById("endingContainer").style.display = "none";
                document.getElementById("opponentChoiceSection").style.display = "none";  
                document.getElementById("opponentShowdownActionsSection").style.display = "none";
                document.getElementById("dungeonCards").style.display = "none";
                document.getElementById("showdownCards").style.display = "none";
                
                return;
            }
        }
    }

    xhttp.open("GET", "/getWaitingOnOpponentShowdown", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();


}

/**
 * Displays the HTML element needed for the waiting for opponent state. 
 * Called by GetGameState.
 * @param none
 * @returns none
 */
function getWaitingOnOpponentDungeon() {
    //Display HTML Elements - ON
    document.getElementById("statsContainer").style.display = "block";
    document.getElementById("waitingForOpponent").style.display = "block";


    //Display HTML Elements - OFF
    document.getElementById("endingContainer").style.display = "none";
    document.getElementById("opponentChoiceSection").style.display = "none";
    document.getElementById("opponentShowdownActionsSection").style.display = "none";
    document.getElementById("dungeonCards").style.display = "none";
    document.getElementById("showdownCards").style.display = "none";

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status == 200) {
                
                return;
            }
        }
    }

    xhttp.open("GET", "/getWaitingOnOpponentDungeon", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();


}

/**
 * Assisting bubble sort function that sorts both dungeon and showdown cards by slot_id.
 * Called by getDungeonCardSelection and getShowdownCardSelection.
 * @param {object} cardA - The first card in the array.
 * @param {object} cardB - The next card in the array.
 * @returns {object} cardA.slot_id - cardB.slot_id
 */
function sortCards(cardA, cardB) {
    return cardA.slot_id - cardB.slot_id
}


/**
 * Sends a XMLHTTPRequest to get the state and calls other functions depending on the state. 
 * Called by setInterval every 3 seconds.
 * @param none
 * @returns none
 */
function GetGameState() {
    //Get Room, state, etc
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200) {
                roomId = data.room_id
                document.getElementById("roomId").innerHTML = "Room " + roomId 

                showdownTurn = data.showdown_turn
                document.getElementById("showdownTurn").innerHTML = "Turn " + showdownTurn
                
                currentState = data.state_id
                console.log("currentState " + currentState)

                if(currentState == states.DungeonCardSelection) {
                    getDungeonCardSelection()
                }
                else if (currentState == states.WaitingOnOpponentDungeon) {
                    getWaitingOnOpponentDungeon()
                }
                else if (currentState == states.DungeonResult) {
                    getDungeonResult()
                }
                else if (currentState == states.ShowdownCardSelection) {
                    getShowdownCardSelection()
                }
                else if (currentState == states.WaitingOnOpponentShowdown) {
                    getWaitingOnOpponentShowdown()
                }
                else if (currentState == states.ShowdownResult) {
                    getShowdownResult()
                }
                else if (currentState == states.Won) {
                    showWonEnding()
                }
                else if (currentState == states.Lost) {
                    showLostEnding()
                }
                else if (currentState == states.Draw) {
                    showDrawEnding()
                }
            }
        }
    }

    xhttp.open("GET", "/getGameState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}


/**
 * Sends a XMLHTTPRequest to populate the next room in the dungeon or turn in the showdown.
 * Called by opponentChoiceConfirm button and the opponentShowdownActionConfirm button.
 * @param none
 * @returns none
 */
function SetupNextRoom() {

    if(roomId <= 4) {
        
        document.getElementById("dungeonCards").style.display = "block";
        document.getElementById("opponentChoiceSection").style.display = "none";
        
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
    
                if (this.status == 200) {
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
        document.getElementById("showdownCards").style.display = "block";
        document.getElementById("statsContainer").style.display = "block";
        document.getElementById("opponentChoiceSection").style.display = "none";
        document.getElementById("opponentShowdownActionsSection").style.display = "none";


        console.log("RoomID: " + roomId)
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
    
                if (this.status == 200) {

                    console.log("success")
                }
            }
        }
    
        xhttp.open("POST", "/setupShowdown", true);
    
        xhttp.setRequestHeader("Content-Type", "application/json");
    
        xhttp.send();
    }
}


function showWonEnding() {
    document.getElementById("endingText").innerHTML = "You Won!";
    
    //Display HTML Elements - ON
    document.getElementById("endingContainer").style.display = "block";
  
    //Display HTML Elements - OFF
    document.getElementById("statsContainer").style.display = "none";
    document.getElementById("opponentChoiceSection").style.display = "none";
    document.getElementById("waitingForOpponent").style.display = "none";
    document.getElementById("opponentShowdownActionsSection").style.display = "none";
    document.getElementById("dungeonCards").style.display = "none";
    document.getElementById("showdownCards").style.display = "none";
}

function showLostEnding() {
    document.getElementById("endingText").innerHTML = "You Lost..."
    //Display HTML Elements - ON
    document.getElementById("endingContainer").style.display = "block";
    
    //Display HTML Elements - OFF
    document.getElementById("statsContainer").style.display = "none";
    document.getElementById("opponentChoiceSection").style.display = "none";
    document.getElementById("waitingForOpponent").style.display = "none";
    document.getElementById("opponentShowdownActionsSection").style.display = "none";
    document.getElementById("dungeonCards").style.display = "none";
    document.getElementById("showdownCards").style.display = "none";

}

function showDrawEnding() {
    document.getElementById("endingText").innerHTML = "It's a Draw...";
    
    //Display HTML Elements - ON
    document.getElementById("endingContainer").style.display = "block";
  
    //Display HTML Elements - OFF
    document.getElementById("statsContainer").style.display = "none";
    document.getElementById("opponentChoiceSection").style.display = "none";
    document.getElementById("waitingForOpponent").style.display = "none";
    document.getElementById("opponentShowdownActionsSection").style.display = "none";
    document.getElementById("dungeonCards").style.display = "none";
    document.getElementById("showdownCards").style.display = "none";
}
//#endregion

//#region Dungeon

/**
 * Sends a XMLHTTPRequest to populate the HTML elements for the dungeon cards and player stats.
 * Called by getGameState when in the DungeonCardSelection state.
 * @param none
 * @returns none
 */
function getDungeonCardSelection() {
    var xhttp = new XMLHttpRequest();
        
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            //console.log(this.responseText)
            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200) {
                    data.card.sort(sortCards)

                    //Update data on page
                    //console.log("Data.Card: "+ data.card)
                    document.getElementById("maxHealth").innerHTML = "Max Health: " + data.max_health;
                    document.getElementById("currentHealth").innerHTML = "Current Health: " + data.current_health;
                    document.getElementById("energy").innerHTML = "Energy: " + data.energy;
                    document.getElementById("insight").innerHTML = "Insight: " + data.insight;
                    document.getElementById("damage").innerHTML = "Damage: " + data.damage;
                    
                    console.log(data.card[0].is_visible)
                    if (data.card[0].is_visible) {
                        dungeonCard1Id = data.card[0].card_id
                        document.getElementById("card1Name").innerHTML = data.card[0].card_name
                        document.getElementById("card1Image").src = data.card[0].card_image_path
                        document.getElementById("card1Stats").innerHTML = UnwrapDungeonCardStats(data.card[0])
                    }
                    else{
                        dungeonCard1Id = data.card[0].card_id
                        document.getElementById("card1Name").innerHTML = "???"
                        document.getElementById("card1Image").src = "../Assets/Art/Cards/1x/HiddenDraft.png"
                        document.getElementById("card1Stats").innerHTML = "???"
                    }
                    
                    if (data.card[1].is_visible) {
                        dungeonCard2Id = data.card[1].card_id
                        document.getElementById("card2Name").innerHTML = data.card[1].card_name
                        document.getElementById("card2Image").src = data.card[1].card_image_path
                        document.getElementById("card2Stats").innerHTML = UnwrapDungeonCardStats(data.card[1])
                    }
                    else{
                        dungeonCard2Id = data.card[1].card_id
                        document.getElementById("card2Name").innerHTML = "???"
                        document.getElementById("card2Image").src = "../Assets/Art/Cards/1x/HiddenDraft.png"
                        document.getElementById("card2Stats").innerHTML = "???"
                    }

                    if (data.card[2].is_visible) {
                        dungeonCard3Id = data.card[2].card_id
                        document.getElementById("card3Name").innerHTML = data.card[2].card_name
                        document.getElementById("card3Image").src = data.card[2].card_image_path
                        document.getElementById("card3Stats").innerHTML = UnwrapDungeonCardStats(data.card[2])
                    }
                    else{
                        dungeonCard3Id = data.card[2].card_id
                        document.getElementById("card3Name").innerHTML = "???"
                        document.getElementById("card3Image").src = "../Assets/Art/Cards/1x/HiddenDraft.png"
                        document.getElementById("card3Stats").innerHTML = "???"
                    }

                    //Display HTML Elements - ON
                    document.getElementById("statsContainer").style.display = "block";
                    document.getElementById("dungeonCards").style.display = "block";
                    
                    //Display HTML Elements - OFF
                    document.getElementById("endingContainer").style.display = "none";
                    document.getElementById("opponentChoiceSection").style.display = "none";
                    document.getElementById("waitingForOpponent").style.display = "none";
                    document.getElementById("showdownCards").style.display = "none";
                    document.getElementById("opponentShowdownActionsSection").style.display = "none";

                    return;
                }
            }
        }

        xhttp.open("GET", "/getDungeonCardSelection", true);

        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

}

/**
 * Sends a XMLHTTPRequest to populate the HTML elements for the Opponent's card choice.
 * Called by getGameState when in the DungeonResult state.
 * @param none
 * @returns none
 */
function getDungeonResult() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200) {

                if (data.card_type_id == 5) {
                document.getElementById("opponentChoice").innerHTML = "Your oppponent chose an " + data.card_type_name + " card";
                }
                else {
                    document.getElementById("opponentChoice").innerHTML = "Your oppponent chose a " + data.card_type_name + " card";
                }

                //Display HTML Elements - ON
                document.getElementById("statsContainer").style.display = "block";
                document.getElementById("opponentChoiceSection").style.display = "block";
                
                
                //Display HTML Elements - OFF
                document.getElementById("endingContainer").style.display = "none";
                document.getElementById("waitingForOpponent").style.display = "none";
                document.getElementById("opponentShowdownActionsSection").style.display = "none";
                document.getElementById("dungeonCards").style.display = "none";
                document.getElementById("showdownCards").style.display = "none";
                
                return;
            }
        }
    }

    xhttp.open("GET", "/getOpponentCard", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}

/**
 * Builds a string for the dungeon cards description based on the type of card and value of the card's stats. 
 * Called by getDungeonCardSelection.
 * @param {object} card - One dungeon card object
 * @returns {string} - returns the card description.
 */
function UnwrapDungeonCardStats(card) {
    //console.log(card.card_type_id)
    var stringBuilder = "";

    if(card.card_type_id == 1) {
        stringBuilder = "Max Health Increase by: " + card.card_max_health;
    }
    if(card.card_type_id == 2) {
        stringBuilder = "Current Health Increase by: " + card.card_current_health;
    }
    if(card.card_type_id == 3) {
        stringBuilder = "Damage Increase by: " + card.card_damage;
    }
    if(card.card_type_id == 4) {
        
        if (card.card_energy > 0)
        {
            stringBuilder = stringBuilder + " Energy Increase by: " + card.card_energy;
        }
        if (card.card_insight > 0)
        {
            stringBuilder = stringBuilder + " Insight Increase by: " + card.card_insight;
        }
    }
    if(card.card_type_id == 5) {

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

/**
 * Updates the selectedDungeonCard HTML elements for the current selected dungeon card 
 * Called by radio inputs: dungeonCard1Selection, dungeonCard2Selection, dungeonCard3Selection.
 * @param none
 * @returns none
 */
function DungeonSelectCard() {
    if (document.getElementById("dungeonCard1Selection").checked) 
    {
        dungeonSelectedCardId = dungeonCard1Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card1Name").innerHTML;
        document.getElementById("selectedCardImage").src = document.getElementById("card1Image").src;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card1Stats").innerHTML;
    }
    if (document.getElementById("dungeonCard2Selection").checked) 
    {
        dungeonSelectedCardId = dungeonCard2Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card2Name").innerHTML;
        document.getElementById("selectedCardImage").src = document.getElementById("card2Image").src;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card2Stats").innerHTML;
    }
    if (document.getElementById("dungeonCard3Selection").checked) 
    {
        dungeonSelectedCardId = dungeonCard3Id;
        document.getElementById("selectedCardName").innerHTML = document.getElementById("card3Name").innerHTML;
        document.getElementById("selectedCardImage").src = document.getElementById("card3Image").src;
        document.getElementById("selectedCardStats").innerHTML = document.getElementById("card3Stats").innerHTML;
    }
    
}

/**
 * Sends a XMLHTTPRequest to update the database on the selected dungeon card. 
 * The callback populates the HTML elements for the Opponent's card choice.
 * Called by the dungeon confirm button.
 * @param none
 * @returns none
 */
function DungeonEndTurn() {
    
    document.getElementById("dungeonCards").style.display = "none";

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


            if (this.status == 200) {
                dungeonSelectedCardId = null

                document.getElementById("selectedCardName").innerHTML = "Selected Card Name";
                document.getElementById("selectedCardImage").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
                document.getElementById("selectedCardStats").innerHTML = "Selected Card Stats";

                if(data.state == "WAITING_FOR_OPP") {
                    //display a screen for wait for opponent choice
                    document.getElementById("waitingForOpponent").style.display = "block";
                }
                else if (data.state == "NEXT_ROOM") {
                    document.getElementById("opponentChoiceSection").style.display = "block";

                    if (data.card_type_id == 5) {
                    document.getElementById("opponentChoice").innerHTML = "Your oppponent chose an " + data.card_type_name + " card";
                    }
                    else {
                        document.getElementById("opponentChoice").innerHTML = "Your oppponent chose a " + data.card_type_name + " card";
                    }
                    GetGameState()
                }
            }


        }
    }

    xhttp.open("POST", "/resolveDungeonTurn", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(dataToSend));
}


//#endregion

//#region Showdown


/**
 * Sends a XMLHTTPRequest to get card stats, name, and image for the showdown selectable cards.
 * Called by GetGameState.
 * @param none
 * @returns none
 */
function getShowdownCardSelection() {
    var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                //console.log(this.responseText)
                var data = JSON.parse(this.responseText)
                console.log(data)

                if (this.status == 200) {
                    data.card.sort(sortCards)

                    //Update page data
                    //console.log("Data.Card: "+ data.card)
                    document.getElementById("maxHealth").innerHTML = "Max Health: " + data.max_health;
                    document.getElementById("currentHealth").innerHTML = "Current Health: " + data.current_health;
                    document.getElementById("energy").innerHTML = "Energy: " + data.energy;
                    document.getElementById("insight").innerHTML = "Insight: " + data.insight;
                    document.getElementById("damage").innerHTML = "Damage: " + data.damage;
                    
                    showdownCard1Id = 1
                    document.getElementById("normalAttackCardName").innerHTML = data.card[0].card_name
                    document.getElementById("normalAttackCardImage").src = data.card[0].card_image_path
                    document.getElementById("normalAttackCardStats").innerHTML = UnwrapShowdownCardStats(data.card[0], data.damage)

                    showdownCard2Id = data.card[1].card_id
                    document.getElementById("specialAttackCardName").innerHTML = data.card[1].card_name
                    document.getElementById("specialAttackCardImage").src = data.card[1].card_image_path
                    document.getElementById("specialAttackCardStats").innerHTML = UnwrapShowdownCardStats(data.card[1], data.damage)
                    
                    showdownCard3Id = data.card[2].card_id
                    document.getElementById("defenseCardName").innerHTML = data.card[2].card_name
                    document.getElementById("defenseCardImage").src = data.card[2].card_image_path
                    document.getElementById("defenseCardStats").innerHTML = UnwrapShowdownCardStats(data.card[2], data.damage)

                    showdownCard4Id = data.card[3].card_id
                    document.getElementById("skillCardName").innerHTML = data.card[3].card_name
                    document.getElementById("skillCardImage").src = data.card[3].card_image_path
                    document.getElementById("skillCardStats").innerHTML = UnwrapShowdownCardStats(data.card[3], data.damage)

                    //Display HTML Elements - ON
                    document.getElementById("statsContainer").style.display = "block";
                    document.getElementById("showdownCards").style.display = "block";
                    
                    //Display HTML Elements - OFF
                    document.getElementById("endingContainer").style.display = "none";
                    document.getElementById("opponentChoiceSection").style.display = "none";
                    document.getElementById("waitingForOpponent").style.display = "none";
                    document.getElementById("dungeonCards").style.display = "none";
                    document.getElementById("opponentShowdownActionsSection").style.display = "none";

                    return;
                }
            }
        }
        xhttp.open("GET", "/getShowdownCardSelection", true);

        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

    
}

/**
 * Displays the player's and opponent's actions at the end of a showdown turn and hides the stats and cards.
 * Called by GetGameState.
 * @param none
 * @returns none
 */
function getShowdownResult() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.responseText)
            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200) {
                //show opponent actions 
                document.getElementById("opponentShowdownActionsSection").style.display = "block";
                document.getElementById("opponentShowdownAction").innerHTML = data.opponentActions + "\n" + data.playerActions;

                //Display HTML Elements - ON          
                document.getElementById("opponentShowdownActionsSection").style.display = "block";
                
                //Display HTML Elements - OFF
                document.getElementById("endingContainer").style.display = "none";
                document.getElementById("statsContainer").style.display = "none";    
                document.getElementById("waitingForOpponent").style.display = "none";
                document.getElementById("opponentChoiceSection").style.display = "none";
                document.getElementById("dungeonCards").style.display = "none";
                document.getElementById("showdownCards").style.display = "none";
                
                return;

            }
        }
    }

    xhttp.open("GET", "/getShowdownResult", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}

/**
 * Creates the description of the Showdown cards.
 * Called in GetShowdownCardSelection.
 * @param {object} card - one card object that contains the information about the card's stats
 * @param {number} playerDamage - the player's damage stat used to show how much damage the attack cards will make the player deal
 * @returns - string that holds the cards description
 */
function UnwrapShowdownCardStats(card, playerDamage) {
    var stringBuilder = "";
    if(card.card_type_id == 6) {

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
    if(card.card_type_id == 7) {

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
    if(card.card_type_id == 8) {
         
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

/**
 * Displays on the client which cards are selected.
 * Called when the player presses one of the showdownCheck checkboxes.
 * @param none
 * @returns none
 */
function ShowdownSelectCard() {

    // console.log("showdownSelectedCard1Id = " + showdownSelectedCard1Id)
    // console.log("showdownSelectedCard2Id = " + showdownSelectedCard2Id)

    if (document.getElementById("showdownCard1Selection").checked) 
    {
        //disable the second attack
        document.getElementById("showdownCard2Selection").disabled = true

        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard1Id) {
            showdownSelectedCard1Id = showdownCard1Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("normalAttackCardName").innerHTML;
            document.getElementById("selectedCardImage1").src = document.getElementById("normalAttackCardImage").src;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("normalAttackCardStats").innerHTML;
            return;
        } 
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard1Id) {
            showdownSelectedCard2Id = showdownCard1Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("normalAttackCardName").innerHTML;
            document.getElementById("selectedCardImage2").src = document.getElementById("normalAttackCardImage").src;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("normalAttackCardStats").innerHTML;
            return;
        } 
    }
    else {
        //enable the second attack
        document.getElementById("showdownCard2Selection").disabled = false

        if(showdownSelectedCard1Id == showdownCard1Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard1Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }

    if (document.getElementById("showdownCard2Selection").checked) {
        
        //disable the first attack
        document.getElementById("showdownCard1Selection").disabled = true

        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard2Id) {
            showdownSelectedCard1Id = showdownCard2Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("specialAttackCardName").innerHTML;
            document.getElementById("selectedCardImage1").src = document.getElementById("specialAttackCardImage").src;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("specialAttackCardStats").innerHTML;
            return;
        }
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard2Id) {
            showdownSelectedCard2Id = showdownCard2Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("specialAttackCardName").innerHTML;
            document.getElementById("selectedCardImage2").src = document.getElementById("specialAttackCardImage").src;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("specialAttackCardStats").innerHTML;
            return;
        } 
    }
    else {

        //enable the first attack
        document.getElementById("showdownCard1Selection").disabled = false

        if(showdownSelectedCard1Id == showdownCard2Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard2Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }

    if (document.getElementById("showdownCard3Selection").checked) {
        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard3Id) {
            showdownSelectedCard1Id = showdownCard3Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("defenseCardName").innerHTML;
            document.getElementById("selectedCardImage1").src = document.getElementById("defenseCardImage").src;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("defenseCardStats").innerHTML;
            return;
        }
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard3Id) {
            showdownSelectedCard2Id = showdownCard3Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("defenseCardName").innerHTML;
            document.getElementById("selectedCardImage2").src = document.getElementById("defenseCardImage").src;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("defenseCardStats").innerHTML;
            return;
        } 
    }
    else {
        if(showdownSelectedCard1Id == showdownCard3Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard3Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }

    if (document.getElementById("showdownCard4Selection").checked) {
        if(showdownSelectedCard1Id == null && showdownSelectedCard2Id != showdownCard4Id) {
            showdownSelectedCard1Id = showdownCard4Id;
            document.getElementById("selectedCardName1").innerHTML = document.getElementById("skillCardName").innerHTML;
            document.getElementById("selectedCardImage1").src = document.getElementById("skillCardImage").src;
            document.getElementById("selectedCardStats1").innerHTML = document.getElementById("skillCardStats").innerHTML;
            return;
        }
        else if(showdownSelectedCard2Id == null && showdownSelectedCard1Id != showdownCard4Id) {
            showdownSelectedCard2Id = showdownCard4Id;
            document.getElementById("selectedCardName2").innerHTML = document.getElementById("skillCardName").innerHTML;
            document.getElementById("selectedCardImage2").src = document.getElementById("skillCardImage").src;
            document.getElementById("selectedCardStats2").innerHTML = document.getElementById("skillCardStats").innerHTML;
            return;
        } 
    }
    else {
        if(showdownSelectedCard1Id == showdownCard4Id) {
            showdownSelectedCard1Id = null;
            document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage1").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
            

        }
        if(showdownSelectedCard2Id == showdownCard4Id) {
            showdownSelectedCard2Id = null;
            document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
            document.getElementById("selectedCardImage2").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
            document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
        }
    }
   
}

/**
 * Sends the cards selected by the player in the showdown turn to the endpoint.
 * Called when the plyer presses the showdownConfirm button.
 * @param none
 * @returns none
 */
function ShowdownEndTurn() {
    
    var xhttp = new XMLHttpRequest();
    //Create a JSON object with the registration data
    var dataToSend = {  
        "cardId1": showdownSelectedCard1Id,
        "cardId2": showdownSelectedCard2Id
    }
    
    

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.responseText)
            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200) {
                console.log("server responded")
                document.getElementById("showdownCard1Selection").checked = false;
                document.getElementById("showdownCard2Selection").checked = false;
                document.getElementById("showdownCard3Selection").checked = false;
                document.getElementById("showdownCard4Selection").checked = false;

                showdownSelectedCard1Id = null
                showdownSelectedCard2Id = null

                document.getElementById("selectedCardName1").innerHTML = "Selected Card Name";
                document.getElementById("selectedCardName2").innerHTML = "Selected Card Name";
                document.getElementById("selectedCardImage1").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
                document.getElementById("selectedCardImage2").src = "../Assets/Art/Cards/1x/HiddenDraft.png";
                document.getElementById("selectedCardStats1").innerHTML = "Selected Card Stats";
                document.getElementById("selectedCardStats2").innerHTML = "Selected Card Stats";
                // //hide cards
                // document.getElementById("showdownCards").style.display = "none";

                // //hide stats
                // document.getElementById("statsContainer").style.display = "none";

                // //show opponent actions 
                // document.getElementById("opponentShowdownActionsSection").style.display = "block";
                // document.getElementById("opponentShowdownAction").innerHTML = data.opponentActions + data.playerActions;
            }
        }
    }

    xhttp.open("POST", "/resolveShowdownTurn", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(dataToSend));
    console.log("sent to the server")
}
//#endregion















