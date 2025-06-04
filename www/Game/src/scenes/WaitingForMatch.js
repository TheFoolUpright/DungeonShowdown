
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

		// joinMatchBackgroundBlur
		this.add.image(960, 540, "JoinMatchBackgroundBlur");

		// text_1
		const text_1 = this.add.text(960, 540, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Please Wait..\nWe're selecting the best opponent for you...";
		text_1.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "64px", "stroke": "#000000ff", "strokeThickness":25});

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here


	create() {

		this.editorCreate();
		if (!MenuBackgroundMusic.isPlaying) {
			MenuBackgroundMusic.play()
		}
		this.startInterval()

	}

	startInterval() {
		if (waitingForMatchInterval) {
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

				if (xhttp.status == 200) {
					if (data.state == "WAITING_FOR_MATCH") {
						return
					}
					else if (data.state == "MATCH_FOUND") {
						clearInterval(waitingForMatchInterval);
						if (MenuBackgroundMusic.isPlaying) {
							MenuBackgroundMusic.stop()
						}
						stateScene.scene.start("Dungeon", data);
					} 
				}
			}
		}

		xhttp.open("GET", "/joinMatch/getWaitingForMatch", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
