
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
		const endingBackground = this.add.image(960, 540, "EndingBackground");

		// endingText
		const endingText = this.add.text(1200, 400, "", {});
		endingText.setOrigin(0.5, 0.5);
		endingText.text = "IT'S A TIE...";
		endingText.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "128px", "stroke": "#000000ff", "strokeThickness":20});
		endingText.setWordWrapWidth(290);

		// girlWins
		const girlWins = this.add.image(960, 541, "GirlWins");
		girlWins.visible = false;

		// boyWins
		const boyWins = this.add.image(960, 540, "BoyWins");
		boyWins.visible = false;

		// draw
		const draw = this.add.image(960, 539, "Draw");
		draw.visible = false;

		// dungeonShowdown
		const dungeonShowdown = this.add.text(1132, 820, "", {});
		dungeonShowdown.setOrigin(0.5, 0.5);
		dungeonShowdown.text = "DUNGEON\nSHOWDOWN";
		dungeonShowdown.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "28px", "stroke": "#000000ff", "strokeThickness":10});
		dungeonShowdown.setWordWrapWidth(290);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		this.endingBackground = endingBackground;
		this.endingText = endingText;
		this.girlWins = girlWins;
		this.boyWins = boyWins;
		this.draw = draw;
		this.dungeonShowdown = dungeonShowdown;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	endingBackground;
	/** @type {Phaser.GameObjects.Text} */
	endingText;
	/** @type {Phaser.GameObjects.Image} */
	girlWins;
	/** @type {Phaser.GameObjects.Image} */
	boyWins;
	/** @type {Phaser.GameObjects.Image} */
	draw;
	/** @type {Phaser.GameObjects.Text} */
	dungeonShowdown;
	/** @type {PrefabNextRoom} */
	confirmButton;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();

		if(data.state == 8){
			this.endingText.text = "Victory!"
			this.girlWins.visible = true
		}
		else if (data.state == 9){
			this.endingText.text = "Defeat..."
			this.boyWins.visible = true
		}
		else if (data.state == 10){
			this.endingText.text = "It's a Tie..."
			this.draw.visible = true
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
