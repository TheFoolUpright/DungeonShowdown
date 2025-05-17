
// You can write more code here

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

		// rectangle_1
		const rectangle_1 = this.add.rectangle(868, 367, 128, 128);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 9554825;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
