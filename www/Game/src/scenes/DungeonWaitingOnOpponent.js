
// You can write more code here

/* START OF COMPILED CODE */

class DungeonWaitingOnOpponent extends Phaser.Scene {

	constructor() {
		super("DungeonWaitingOnOpponent");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// rectangle_1
		const rectangle_1 = this.add.rectangle(868, 367, 128, 128);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 2785204;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

	}

	update(dt) {
		
	}
	
	CheckOpponentSelectionState() {
		var xhttp = new XMLHttpRequest();
    
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)
				
				if (xhttp.status == 200) {
					
					if (data.state == "NEXT_ROOM") {
						this.scene.start("DungeonResult", data)
					}
					else if (data.state == "WAITING_FOR_OPP") {
						return;
					}
				}
			}
		}

		xhttp.open("GET", "/getWaitingOnOpponentDungeon", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();

	}

	 getWaitingOnOpponentDungeon() {
    document.getElementById("waitingForOpponentText").innerHTML = "Waiting for your opponent to select a card..."
    //Display HTML Elements - ON
    document.getElementById("statsContainer").style.display = "block";
    document.getElementById("waitingForOpponent").style.display = "block";
    document.getElementById("dungeonRoom").style.display = "block";


    //Display HTML Elements - OFF
    document.getElementById("endingContainer").style.display = "none";
    document.getElementById("showdownTurn").style.display = "none";
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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
