
// You can write more code here

/* START OF COMPILED CODE */

class Ending extends Phaser.Scene {

	constructor() {
		super("Ending");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// endingBackground
		this.add.image(960, 540, "EndingBackground");

		// endingText
		const endingText = this.add.text(1200, 400, "", {});
		endingText.setOrigin(0.5, 0.5);
		endingText.text = "IT'S A TIE...";
		endingText.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "128px", "stroke": "#000000ff", "strokeThickness":20});

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		// girlWins
		const girlWins = this.add.image(960, 541, "GirlWins");
		girlWins.visible = false;

		// boyWins
		const boyWins = this.add.image(960, 540, "BoyWins");
		boyWins.visible = false;

		// draw
		this.add.image(960, 539, "Draw");

		this.endingText = endingText;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	endingText;
	/** @type {PrefabNextRoom} */
	confirmButton;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
