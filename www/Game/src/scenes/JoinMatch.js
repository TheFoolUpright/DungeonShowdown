
// You can write more code here
var playerColor
var playerColorText

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

		
	}

	update(){
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
	}

	loadPresets(data){
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

	ButtonGlowEvents(){
		this.joinMatch.on("pointerover", () => {
			this.joinMatch.glowFx.active = true
		})
		this.joinMatch.on("pointerout", () => {
			this.joinMatch.glowFx.active = false
		})

		this.pinkButton.on("pointerover", () => {
			this.pinkButton.glowFx.active = true
		})
		this.pinkButton.on("pointerout", () => {
			this.pinkButton.glowFx.active = false
		})

		this.redButton.on("pointerover", () => {
			this.redButton.glowFx.active = true
		})
		this.redButton.on("pointerout", () => {
			this.redButton.glowFx.active = false
		})

		this.orangeRedButton.on("pointerover", () => {
			this.orangeRedButton.glowFx.active = true
		})
		this.orangeRedButton.on("pointerout", () => {
			this.orangeRedButton.glowFx.active = false
		})

		this.orangeButton.on("pointerover", () => {
			this.orangeButton.glowFx.active = true
		})
		this.orangeButton.on("pointerout", () => {
			this.orangeButton.glowFx.active = false
		})

		this.yellowButton.on("pointerover", () => {
			this.yellowButton.glowFx.active = true
		})
		this.yellowButton.on("pointerout", () => {
			this.yellowButton.glowFx.active = false
		})

		this.yellowGreenButton.on("pointerover", () => {
			this.yellowGreenButton.glowFx.active = true
		})
		this.yellowGreenButton.on("pointerout", () => {
			this.yellowGreenButton.glowFx.active = false
		})

		this.greenButton.on("pointerover", () => {
			this.greenButton.glowFx.active = true
		})
		this.greenButton.on("pointerout", () => {
			this.greenButton.glowFx.active = false
		})

		this.greenBlueButton.on("pointerover", () => {
			this.greenBlueButton.glowFx.active = true
		})
		this.greenBlueButton.on("pointerout", () => {
			this.greenBlueButton.glowFx.active = false
		})

		this.blueButton.on("pointerover", () => {
			this.blueButton.glowFx.active = true
		})
		this.blueButton.on("pointerout", () => {
			this.blueButton.glowFx.active = false
		})

		this.purpleButton.on("pointerover", () => {
			this.purpleButton.glowFx.active = true
		})
		this.purpleButton.on("pointerout", () => {
			this.purpleButton.glowFx.active = false
		})

	}

	ButtonEvents(){
		this.joinMatch.on("pointerdown", () =>{
			this.confirmJoinMatch()
		})

		this.pinkButton.on("pointerdown", () =>{
			playerColor = this.pinkButton.colorFill.tint
		})
		this.redButton.on("pointerdown", () =>{
			playerColor = this.redButton.colorFill.tint
		})
		this.orangeRedButton.on("pointerdown", () =>{
			playerColor = this.orangeRedButton.colorFill.tint
		})
		this.orangeButton.on("pointerdown", () =>{
			playerColor = this.orangeButton.colorFill.tint
		})
		this.yellowButton.on("pointerdown", () =>{
			playerColor = this.yellowButton.colorFill.tint
		})
		this.yellowGreenButton.on("pointerdown", () =>{
			playerColor = this.yellowGreenButton.colorFill.tint
		})
		this.greenButton.on("pointerdown", () =>{
			playerColor = this.greenButton.colorFill.tint
		})
		this.greenBlueButton.on("pointerdown", () =>{
			playerColor = this.greenBlueButton.colorFill.tint
		})
		this.blueButton.on("pointerdown", () =>{
			playerColor = this.blueButton.colorFill.tint
		})
		this.purpleButton.on("pointerdown", () =>{
			playerColor = this.purpleButton.colorFill.tint
		})
	}

	confirmJoinMatch(){
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
						this.scene.start("Dungeon", data);
					}
				}
			}
		}

		xhttp.open("PUT", "/joinMatch", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send(JSON.stringify(dataToSend))
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
