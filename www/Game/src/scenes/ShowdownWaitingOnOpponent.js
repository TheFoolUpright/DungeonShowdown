
// You can write more code here

	var nextSceneDataLoaded = false

/* START OF COMPILED CODE */

class ShowdownWaitingOnOpponent extends Phaser.Scene {

	constructor() {
		super("ShowdownWaitingOnOpponent");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// showdownBackground
		this.add.image(960, 538, "ShowdownBackground");

		// waitingForOpponentText
		const waitingForOpponentText = this.add.text(960, 540, "", {});
		waitingForOpponentText.setOrigin(0.5, 0.5);
		waitingForOpponentText.text = "Your opponent was struck with an indecisiveness spell. \nWait while they recover…";
		waitingForOpponentText.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "64px", "stroke": "#000000ff", "strokeThickness":25});

		this.waitingForOpponentText = waitingForOpponentText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	waitingForOpponentText;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		
		nextSceneDataLoaded = false
	}

	update() {
		this.CheckShowdownOpponentSelectionState()
	}

	CheckShowdownOpponentSelectionState() {
		var xhttp = new XMLHttpRequest()

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {

					if (data.state == "SHOW_RESULT"  && !nextSceneDataLoaded) {
						this.scene.start("ShowdownResult", data)
						nextSceneDataLoaded = true
					}
					else if (data.state == "WAITING_FOR_OPP") {
						return
					}
				}
			}
		}

		xhttp.open("GET", "/getWaitingOnOpponentShowdown", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
