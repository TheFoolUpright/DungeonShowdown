
// You can write more code here

	var nextSceneDataLoaded = false
	var dungeonWaitingOnOpponentInterval = null;
/* START OF COMPILED CODE */

class DungeonWaitingOnOpponent extends Phaser.Scene {

	constructor() {
		super("DungeonWaitingOnOpponent");

		/** @type {Phaser.GameObjects.Text} */
		this.waitingForOpponentText;


		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dungeonBackground
		this.add.image(960, 540, "DungeonBackground");

		// waitingForOpponentText
		const waitingForOpponentText = this.add.text(960, 540, "", {});
		waitingForOpponentText.setOrigin(0.5, 0.5);
		waitingForOpponentText.text = "Your opponent was struck with an indecisiveness spell. \nWait while they recover…";
		waitingForOpponentText.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "64px", "stroke": "#000000ff", "strokeThickness":25});

		this.waitingForOpponentText = waitingForOpponentText;

		this.events.emit("scene-awake");
	}


	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		nextSceneDataLoaded = false
		dungeonWaitingOnOpponentInterval = setInterval(this.CheckDungeonOpponentSelectionState, 2000, this);
	}

	// update() {
	// 	this.CheckDungeonOpponentSelectionState()
	// }

	CheckDungeonOpponentSelectionState(stateScene) {
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {

					if (data.state == "NEXT_ROOM" && !nextSceneDataLoaded) {
						nextSceneDataLoaded = true
						clearInterval(dungeonWaitingOnOpponentInterval);
						stateScene.scene.start("DungeonResult", data)
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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
