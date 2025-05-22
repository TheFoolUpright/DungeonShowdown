
// You can write more code here
var states = {
    "DungeonCardSelection": 1,
    "DungeonWaitingOnOpponent": 2,
    "DungeonResult": 3, 
    "ShowdownCardSelection": 4,
    "ShowdownWaitingOnOpponent": 5,
    "ShowdownResult": 6,
    "EndingCheck": 7, 
    "Won": 8,
    "Lost": 9,
    "Draw": 10
}



/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// guapen
		const guapen = this.add.image(505.0120544433594, 360, "guapen");
		guapen.scaleX = 0.32715486817515643;
		guapen.scaleY = 0.32715486817515643;

		// progressBar
		const progressBar = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(552.0120849609375, 329, "", {});
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "20px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

        this.load.on(Phaser.Loader.Events.COMPLETE, () => {
            this.LoginCheck();
        });

		
		
	}

	LoginCheck() {
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = () => {
			console.log(xhttp.readyState)
			if (xhttp.readyState == 4) {
				
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					if(data.state == "NOT_LOGGED_IN") {
						window.location.href = "/login.html";
						return
					}
					else if(data.state == "LOGGED_IN") {
						this.MatchCheck();
					}
				}
			}
		}

		xhttp.open("GET", "/idLoggedIn", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	MatchCheck() {

		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
					if(data.state == "MATCH_FOUND") {
						//Get State
						this.GetGameState()
					}
					else if (data.state == "NOT_IN_MATCH") {
						//Go to Main Menu 
						 this.scene.start("JoinMatch");

					}
					else if (data.state == "WAITING_FOR_MATCH") {
						//Go to waiting for a Match
						 this.scene.start("WaitingForMatch");

					}
				}
			}
		}

		xhttp.open("GET", "/getMatchState", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	GetGameState(){
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)


				if (xhttp.status == 200){
					if(data.state_id == states.DungeonCardSelection){
						this.GetDungeonData()
					}
					else if(data.state_id == states.DungeonWaitingOnOpponent){
						 this.scene.start("DungeonWaitingOnOpponent");
					}
					else if(data.state_id == states.DungeonResult){
						 this.scene.start("DungeonResult");
					}
					else if(data.state_id == states.ShowdownCardSelection){
						 this.scene.start("Showdown");
					}
					else if(data.state_id == states.ShowdownWaitingOnOpponent){
						 this.scene.start("ShowdownWaitingOnOpponent");
					}
					else if(data.state_id == states.ShowdownResult){
						 this.scene.start("ShowdownResult");
					}
				
				}
			}
		}

		xhttp.open("GET", "/getGameState", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	GetDungeonData() {
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
                    if(this.load){

                    }
				    this.scene.start("Dungeon", data);
				}
			}
		}

		xhttp.open("GET", "/getDungeonCardSelection", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	 getDungeonCardSelection() {
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
                    maxHealth = data.max_health
                    currentHealth = data.current_health
                    energy = data.energy
                    insight = data.insight
                    damage = data.damage

                    document.getElementById("maxHealth").innerHTML = "Max Health: " + maxHealth;
                    document.getElementById("currentHealth").innerHTML = "Current Health: " + currentHealth;
                    document.getElementById("energy").innerHTML = "Energy: " + energy;
                    document.getElementById("insight").innerHTML = "Insight: " + insight;
                    document.getElementById("damage").innerHTML = "Damage: " + damage;

                    if (previousMaxHealth == maxHealth) {
                        //disable html element
                        document.getElementById("maxHealthDifference").style.display = "none";
                    }
                    else{
                        document.getElementById("maxHealthDifference").style.display = "block"
                        if(maxHealth - previousMaxHealth > 0) {
                            document.getElementById("maxHealthDifference").innerHTML = "+" + (maxHealth - previousMaxHealth)
                        }
                        else {
                            document.getElementById("maxHealthDifference").innerHTML = maxHealth - previousMaxHealth
                        }
                    }

                    if (previousCurrentHealth == currentHealth) {
                        //disable html element
                        document.getElementById("currentHealthDifference").style.display = "none";
                    }
                    else{
                        document.getElementById("currentHealthDifference").style.display = "block";
                        if(currentHealth - previousCurrentHealth > 0) {
                            document.getElementById("currentHealthDifference").innerHTML =  "+" + (currentHealth - previousCurrentHealth)
                        }
                        else {
                            document.getElementById("currentHealthDifference").innerHTML = currentHealth - previousCurrentHealth
                        }
                    }
                    
                    if (previousEnergy == energy) {
                        //disable html element
                        document.getElementById("energyDifference").style.display = "none";
                    }
                    else{
                        document.getElementById("energyDifference").style.display = "block";
                        if(energy - previousEnergy > 0) {
                            document.getElementById("energyDifference").innerHTML =  "+" + (energy - previousEnergy)
                        }
                        else {
                            document.getElementById("energyDifference").innerHTML = energy - previousEnergy
                        }
                    }
                    
                    if (previousInsight == insight) {
                        //disable html element
                        document.getElementById("insightDifference").style.display = "none";
                    }
                    else{
                        document.getElementById("insightDifference").style.display = "block";
                        if(insight - previousInsight > 0) {
                            document.getElementById("insightDifference").innerHTML =  "+" + (insight - previousInsight)
                        }
                        else {
                            document.getElementById("insightDifference").innerHTML = insight - previousInsight
                        }
                    }
                    
                    if (previousDamage == damage) {
                        //disable html element
                        document.getElementById("damageDifference").style.display = "none";
                    }
                    else{
                        document.getElementById("damageDifference").style.display = "block";
                        if(damage - previousDamage > 0) {
                            document.getElementById("damageDifference").innerHTML =  "+" + (damage - previousDamage)
                        }
                        else {
                            document.getElementById("damageDifference").innerHTML = damage - previousDamage
                        }
                    }
                    
                    
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
                    document.getElementById("dungeonRoom").style.display = "block";
                    document.getElementById("dungeonCards").style.display = "block";
                    
                    //Display HTML Elements - OFF
                    document.getElementById("showdownTurn").style.display = "none";
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


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
