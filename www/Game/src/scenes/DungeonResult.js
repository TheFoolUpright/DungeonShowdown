
// You can write more code here

/* START OF COMPILED CODE */

class DungeonResult extends Phaser.Scene {

	constructor() {
		super("DungeonResult");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dungeonBackground
		this.add.image(960, 540, "DungeonBackground");

		// opponentCard
		const opponentCard = new PrefabCard(this, 960, 600);
		this.add.existing(opponentCard);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(opponentCard.onAwakeScript);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "RIGHT";

		this.opponentCard = opponentCard;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabCard} */
	opponentCard;
	/** @type {PrefabNextRoom} */
	confirmButton;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();
		this.DisplayCardInformation(data)
		this.ConfirmButtonGlow()

		this.confirmButton.on("pointerdown", () =>{
			this.SetupNextRoom(data.room_id)
		})
		

	}

	ConfirmButtonGlow() {
		this.confirmButton.glowFx.active = false

		this.confirmButton.on("pointerover", () => {
			this.confirmButton.glowFx.active = true

		})

		this.confirmButton.on("pointerout", () => {
			this.confirmButton.glowFx.active = false
		})
	}

	DisplayCardInformation(data) {
		const cardColor = data.player_color.replace("#", "0x")

		this.opponentCard.cardGlow.active = false
		this.opponentCard.cardDescription.visible = true
		if (data.card_type_id == 5) {
			this.opponentCard.cardName.text = data.card_name
		}
		else {
			this.opponentCard.cardName.text = data.card_type_name
		}
		this.opponentCard.cardDescription.text = "Your opponent chose a " + data.card_name + " card!"
		this.opponentCard.cardImage.setTexture(data.card_image_path)
		this.opponentCard.cardBorder.setTint(cardColor)

	}

	SetupNextRoom(roomId) {

		if(roomId <= 4) {

			var xhttp = new XMLHttpRequest();



			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4) {

					var data = JSON.parse(xhttp.responseText)
					console.log(data)

					if (xhttp.status == 200) {
						this.scene.start("Dungeon", data);
					}
				}
			}

			xhttp.open("POST", "/setupNextDungeonRoom", true);

			xhttp.setRequestHeader("Content-Type", "application/json");

			xhttp.send();
		}
		else {
			var xhttp = new XMLHttpRequest();

			var data = JSON.parse(xhttp.responseText)
			console.log(data)

			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4) {

					if (xhttp.status == 200) {
						this.scene.start("Showdown", data);
					}
				}
			}

			xhttp.open("POST", "/setupShowdown", true);

			xhttp.setRequestHeader("Content-Type", "application/json");

			xhttp.send();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
