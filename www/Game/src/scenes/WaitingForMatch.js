
// You can write more code here
var waitingForMatchInterval = null;
/* START OF COMPILED CODE */

class WaitingForMatch extends Phaser.Scene {

	constructor() {
		super("WaitingForMatch");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// rectangle_1
		const rectangle_1 = this.add.rectangle(868, 367, 128, 128);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 14246462;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here
	

	create() {

		this.editorCreate();
		this.startInterval()
		
	}

	startInterval(){
		if(waitingForMatchInterval){
			clearInterval(waitingForMatchInterval);
		}
		waitingForMatchInterval = setInterval(this.GetMatchState, 2000, this);
	}

	GetMatchState(stateScene) {
		var xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200){
					if(data.state == "WAITING_FOR_MATCH"){
						return
					}
					else if (data.state == "MATCH_FOUND"){
						clearInterval(waitingForMatchInterval);
						stateScene.scene.start("Dungeon", data);
					} 
				}
			}
		}

		xhttp.open("GET", "/getWaitingForMatch", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
