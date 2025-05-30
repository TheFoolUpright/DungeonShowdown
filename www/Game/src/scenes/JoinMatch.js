
// You can write more code here
var playerColor

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
	/** @type {Phaser.GameObjects.Text} */
	titleText;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();
		playerColor = data.player_color.replace("#", "0x")

		this.joinMatch.confirmButtonText.text = "Join"
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


	}

	update(){

	}

	colorButtonEvents(){
		this.pinkButton.on("pointerdown", () =>{
			playerColor = this.pinkButton.colorFill.tint
		})
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
