
// You can write more code here
var playerColor
var playerColorText
var pinkGlow = false
var redGlow = false
var orangeRedGlow = false
var orangeGlow = false
var yellowGlow = false
var yellowGreenGlow = false
var greenGlow = false
var greenBlueGlow = false
var blueGlow = false
var purpleGlow = false

/* START OF COMPILED CODE */

class JoinMatch extends Phaser.Scene {

	constructor() {
		super("JoinMatch");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// joinMatchBackground
		this.add.image(960, 540, "JoinMatchBackground");

		// joinMatch
		const joinMatch = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(joinMatch);

		// purpleButton
		const purpleButton = new ColorPrefab(this, 250, 900);
		this.add.existing(purpleButton);

		// blueButton
		const blueButton = new ColorPrefab(this, 150, 900);
		this.add.existing(blueButton);

		// greenBlueButton
		const greenBlueButton = new ColorPrefab(this, 250, 800);
		this.add.existing(greenBlueButton);

		// greenButton
		const greenButton = new ColorPrefab(this, 150, 800);
		this.add.existing(greenButton);

		// yellowGreenButton
		const yellowGreenButton = new ColorPrefab(this, 250, 700);
		this.add.existing(yellowGreenButton);

		// yellowButton
		const yellowButton = new ColorPrefab(this, 150, 700);
		this.add.existing(yellowButton);

		// orangeButton
		const orangeButton = new ColorPrefab(this, 250, 600);
		this.add.existing(orangeButton);

		// orangeRedButton
		const orangeRedButton = new ColorPrefab(this, 150, 600);
		this.add.existing(orangeRedButton);

		// redButton
		const redButton = new ColorPrefab(this, 250, 500);
		this.add.existing(redButton);

		// pinkButton
		const pinkButton = new ColorPrefab(this, 150, 500);
		this.add.existing(pinkButton);

		// playerCharater
		const playerCharater = new PrefabOpponent(this, 958, 655);
		this.add.existing(playerCharater);

		// titleText
		const titleText = this.add.text(68, 69, "", {});
		titleText.text = "DUNGEON \nSHOWDOWN";
		titleText.setStyle({ "fontFamily": "ROCKEY", "fontSize": "100px", "stroke": "#000000ff", "strokeThickness":15});

		this.joinMatch = joinMatch;
		this.purpleButton = purpleButton;
		this.blueButton = blueButton;
		this.greenBlueButton = greenBlueButton;
		this.greenButton = greenButton;
		this.yellowGreenButton = yellowGreenButton;
		this.yellowButton = yellowButton;
		this.orangeButton = orangeButton;
		this.orangeRedButton = orangeRedButton;
		this.redButton = redButton;
		this.pinkButton = pinkButton;
		this.playerCharater = playerCharater;
		this.titleText = titleText;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabNextRoom} */
	joinMatch;
	/** @type {ColorPrefab} */
	purpleButton;
	/** @type {ColorPrefab} */
	blueButton;
	/** @type {ColorPrefab} */
	greenBlueButton;
	/** @type {ColorPrefab} */
	greenButton;
	/** @type {ColorPrefab} */
	yellowGreenButton;
	/** @type {ColorPrefab} */
	yellowButton;
	/** @type {ColorPrefab} */
	orangeButton;
	/** @type {ColorPrefab} */
	orangeRedButton;
	/** @type {ColorPrefab} */
	redButton;
	/** @type {ColorPrefab} */
	pinkButton;
	/** @type {PrefabOpponent} */
	playerCharater;
	/** @type {Phaser.GameObjects.Text} */
	titleText;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();

		this.loadPresets(data)
		this.ButtonGlowEvents()
		this.ButtonEvents()

		if(!MenuBackgroundMusic.isPlaying){
			MenuBackgroundMusic.play()
		}


	}

	update() {
		this.playerCharater.characterColor.setTint(playerColor)
		playerColorText = playerColor.replace("0x", "#")
		this.playerCharater.opponentName.setColor(playerColorText)

		// switch (playerColor) {
		// 	case "0xc23670":
		// 		this.pinkButton.glowFx.active = true
		// 		break;
		// 	case "0xc23847":
		// 		this.redButton.glowFx.active = true
		// 		break;
		// 	case "0xd9623e":
		// 		this.orangeRedButton.glowFx.active = true
		// 		break;
		// 	case "0xdb8b3e":
		// 		this.orangeButton.glowFx.active = true
		// 		break;
		// 	case "0xe2c36d":
		// 		this.yellowButton.glowFx.active = true
		// 		break;
		// 	case "0xc7d581":
		// 		this.yellowGreenButton.glowFx.active = true
		// 		break;
		// 	case "0x91cb89":
		// 		this.greenButton.glowFx.active = true
		// 		break;
		// 	case "0x64b89d":
		// 		this.greenBlueButton.glowFx.active = true
		// 		break;
		// 	case "0x2a7fb4":
		// 		this.blueButton.glowFx.active = true
		// 		break;
		// 	case "0x5b4e99":
		// 		this.purpleButton.glowFx.active = true
		// 		break;
		// }
		this.checkColorSelection()
	}

	loadPresets(data) {
		playerColor = data.player_color.replace("#", "0x")
		playerColorText = data.player_color
		this.joinMatch.confirmButtonText.text = "Join"
		this.playerCharater.opponentName.text = data.player_username

		this.pinkButton.colorFill.setTint("0xc23670")
		this.redButton.colorFill.setTint("0xc23847")
		this.orangeRedButton.colorFill.setTint("0xd9623e")
		this.orangeButton.colorFill.setTint("0xdb8b3e")
		this.yellowButton.colorFill.setTint("0xe2c36d")
		this.yellowGreenButton.colorFill.setTint("0xc7d581")
		this.greenButton.colorFill.setTint("0x91cb89")
		this.greenBlueButton.colorFill.setTint("0x64b89d")
		this.blueButton.colorFill.setTint("0x2a7fb4")
		this.purpleButton.colorFill.setTint("0x5b4e99")

		this.joinMatch.glowFx.active = false
		this.pinkButton.glowFx.active = false
		this.redButton.glowFx.active = false
		this.orangeRedButton.glowFx.active = false
		this.orangeButton.glowFx.active = false
		this.yellowButton.glowFx.active = false
		this.yellowGreenButton.glowFx.active = false
		this.greenButton.glowFx.active = false
		this.greenBlueButton.glowFx.active = false
		this.blueButton.glowFx.active = false
		this.purpleButton.glowFx.active = false

	}

	ButtonGlowEvents() {
		this.joinMatch.on("pointerover", () => {
			this.joinMatch.glowFx.active = true
		})
		this.joinMatch.on("pointerout", () => {
			this.joinMatch.glowFx.active = false
		})

		this.pinkButton.on("pointerover", () => {
			this.pinkButton.glowFx.active = true
			pinkGlow = true
		})
		this.pinkButton.on("pointerout", () => {
			this.pinkButton.glowFx.active = false
			pinkGlow = false
		})

		this.redButton.on("pointerover", () => {
			this.redButton.glowFx.active = true
			redGlow = true
		})
		this.redButton.on("pointerout", () => {
			this.redButton.glowFx.active = false
			redGlow = false
		})

		this.orangeRedButton.on("pointerover", () => {
			this.orangeRedButton.glowFx.active = true
			orangeRedGlow = true
		})
		this.orangeRedButton.on("pointerout", () => {
			this.orangeRedButton.glowFx.active = false
			orangeRedGlow = false
		})

		this.orangeButton.on("pointerover", () => {
			this.orangeButton.glowFx.active = true
			orangeGlow = true
		})
		this.orangeButton.on("pointerout", () => {
			this.orangeButton.glowFx.active = false
			orangeGlow = false
		})

		this.yellowButton.on("pointerover", () => {
			this.yellowButton.glowFx.active = true
			yellowGlow = true
		})
		this.yellowButton.on("pointerout", () => {
			this.yellowButton.glowFx.active = false
			yellowGlow = false
		})

		this.yellowGreenButton.on("pointerover", () => {
			this.yellowGreenButton.glowFx.active = true
			yellowGreenGlow = true
		})
		this.yellowGreenButton.on("pointerout", () => {
			this.yellowGreenButton.glowFx.active = false
			yellowGreenGlow = false
		})

		this.greenButton.on("pointerover", () => {
			this.greenButton.glowFx.active = true
			greenGlow = true
		})
		this.greenButton.on("pointerout", () => {
			this.greenButton.glowFx.active = false
			greenGlow = false
		})

		this.greenBlueButton.on("pointerover", () => {
			this.greenBlueButton.glowFx.active = true
			greenBlueGlow = true
		})
		this.greenBlueButton.on("pointerout", () => {
			this.greenBlueButton.glowFx.active = false
			greenBlueGlow = false
		})

		this.blueButton.on("pointerover", () => {
			this.blueButton.glowFx.active = true
			blueGlow = true
		})
		this.blueButton.on("pointerout", () => {
			this.blueButton.glowFx.active = false
			blueGlow = false
		})

		this.purpleButton.on("pointerover", () => {
			this.purpleButton.glowFx.active = true
			purpleGlow = true
		})
		this.purpleButton.on("pointerout", () => {
			this.purpleButton.glowFx.active = false
			purpleGlow = false
		})

	}

	ButtonEvents() {
		this.joinMatch.on("pointerdown", () => {
			ButtonSFX.play()
			this.confirmJoinMatch()
		})

		this.pinkButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.pinkButton.colorFill.tint

			if (!this.pinkButton.isSelected) {
				this.pinkButton.isSelected = true
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.pinkButton.isSelected = false
			}
		})
		this.redButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.redButton.colorFill.tint

			if (!this.redButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = true
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.redButton.isSelected = false
			}
		})
		this.orangeRedButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.orangeRedButton.colorFill.tint

			if (!this.orangeRedButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = true
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.orangeRedButton.isSelected = false
			}
		})
		this.orangeButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.orangeButton.colorFill.tint

			if (!this.orangeButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = true
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.orangeButton.isSelected = false
			}
		})
		this.yellowButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.yellowButton.colorFill.tint

			if (!this.yellowButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = true
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.yellowButton.isSelected = false
			}
		})
		this.yellowGreenButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.yellowGreenButton.colorFill.tint

			if (!this.yellowGreenButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = true
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.yellowGreenButton.isSelected = false
			}
		})
		this.greenButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.greenButton.colorFill.tint

			if (!this.greenButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = true
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.greenButton.isSelected = false
			}
		})
		this.greenBlueButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.greenBlueButton.colorFill.tint

			if (!this.greenBlueButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = true
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = false
			}
			else {
				this.greenBlueButton.isSelected = false
			}
		})
		this.blueButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.blueButton.colorFill.tint

			if (!this.blueButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = true
				this.purpleButton.isSelected = false
			}
			else {
				this.blueButton.isSelected = false
			}
		})
		this.purpleButton.on("pointerdown", () => {
			ButtonSFX.play()
			playerColor = this.purpleButton.colorFill.tint

			if (!this.purpleButton.isSelected) {
				this.pinkButton.isSelected = false
				this.redButton.isSelected = false
				this.orangeRedButton.isSelected = false
				this.orangeButton.isSelected = false
				this.yellowButton.isSelected = false
				this.yellowGreenButton.isSelected = false
				this.greenButton.isSelected = false
				this.greenBlueButton.isSelected = false
				this.blueButton.isSelected = false
				this.purpleButton.isSelected = true
			}
			else {
				this.purpleButton.isSelected = false
			}
		})
	}

	confirmJoinMatch() {
		var dataToSend = {  
			"player_color": playerColorText
			}

		var xhttp = new XMLHttpRequest()

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					if (data.state == "WAITING_FOR_MATCH") {
						this.scene.start("WaitingForMatch")
					}
					else if (data.state == "MATCH_FOUND") {
						if(MenuBackgroundMusic.isPlaying){
							MenuBackgroundMusic.stop()
						}
						this.scene.start("Dungeon", data)
					}
				}
			}
		}

		xhttp.open("PUT", "/joinMatch", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send(JSON.stringify(dataToSend))
	}

	checkColorSelection() {

		// orangeRed
		// orange
		// yellow
		// yellowGreen
		// green
		// greenBlue
		// blue
		// purple

		// pink
		if (this.pinkButton.isSelected == true && this.pinkButton.glowFx.active == false) {
			this.pinkButton.glowFx.active = true
		}

		if (this.pinkButton.isSelected == false && (this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !pinkGlow && this.pinkButton.glowFx.active == true) {
			this.pinkButton.glowFx.active = false
		}

		// red
		if (this.redButton.isSelected == true && this.redButton.glowFx.active == false) {
			this.redButton.glowFx.active = true
		}

		if (this.redButton.isSelected == false && (this.pinkButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !redGlow && this.redButton.glowFx.active == true) {
			this.redButton.glowFx.active = false
		}
		
		// orangeRed
		if (this.orangeRedButton.isSelected == true && this.orangeRedButton.glowFx.active == false) {
			this.orangeRedButton.glowFx.active = true
		}

		if (this.orangeRedButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !orangeRedGlow && this.orangeRedButton.glowFx.active == true) {
			this.orangeRedButton.glowFx.active = false
		}
		
		// orange
		if (this.orangeButton.isSelected == true && this.orangeButton.glowFx.active == false) {
			this.orangeButton.glowFx.active = true
		}

		if (this.orangeButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !orangeGlow && this.orangeButton.glowFx.active == true) {
			this.orangeButton.glowFx.active = false
		}
		
		// yellow
		if (this.yellowButton.isSelected == true && this.yellowButton.glowFx.active == false) {
			this.yellowButton.glowFx.active = true
		}

		if (this.yellowButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !yellowGlow && this.yellowButton.glowFx.active == true) {
			this.yellowButton.glowFx.active = false
		}
		
		// yellowGreen
		if (this.yellowGreenButton.isSelected == true && this.yellowGreenButton.glowFx.active == false) {
			this.yellowGreenButton.glowFx.active = true
		}

		if (this.yellowGreenButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !yellowGreenGlow && this.yellowGreenButton.glowFx.active == true) {
			this.yellowGreenButton.glowFx.active = false
		}
		
		// green
		if (this.greenButton.isSelected == true && this.greenButton.glowFx.active == false) {
			this.greenButton.glowFx.active = true
		}

		if (this.greenButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !greenGlow && this.greenButton.glowFx.active == true) {
			this.greenButton.glowFx.active = false
		}
		
		// greenBlue
		if (this.greenBlueButton.isSelected == true && this.greenBlueButton.glowFx.active == false) {
			this.greenBlueButton.glowFx.active = true
		}

		if (this.greenBlueButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.blueButton.isSelected == true || this.purpleButton.isSelected == true) && !greenBlueGlow && this.greenBlueButton.glowFx.active == true) {
			this.greenBlueButton.glowFx.active = false
		}
		
		// blue
		if (this.blueButton.isSelected == true && this.blueButton.glowFx.active == false) {
			this.blueButton.glowFx.active = true
		}

		if (this.blueButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.purpleButton.isSelected == true) && !blueGlow && this.blueButton.glowFx.active == true) {
			this.blueButton.glowFx.active = false
		}
		
		// purple
		if (this.purpleButton.isSelected == true && this.purpleButton.glowFx.active == false) {
			this.purpleButton.glowFx.active = true
		}

		if (this.purpleButton.isSelected == false && (this.pinkButton.isSelected == true || this.redButton.isSelected == true || this.orangeRedButton.isSelected == true || this.orangeButton.isSelected == true || this.yellowButton.isSelected == true || this.yellowGreenButton.isSelected == true || this.greenButton.isSelected == true || this.greenBlueButton.isSelected == true || this.blueButton.isSelected == true) && !purpleGlow && this.purpleButton.glowFx.active == true) {
			this.purpleButton.glowFx.active = false
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
