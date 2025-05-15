
// You can write more code here

/* START OF COMPILED CODE */

class Showdown extends Phaser.Scene {

	constructor() {
		super("Showdown");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// hidden_Card
		const hidden_Card = this.add.image(302, 558, "Hidden_Card");
		hidden_Card.scaleX = 0.6;
		hidden_Card.scaleY = 0.6;

		// hidden_Card_1
		const hidden_Card_1 = this.add.image(541, 557, "Hidden_Card");
		hidden_Card_1.scaleX = 0.6;
		hidden_Card_1.scaleY = 0.6;

		// hidden_Card_2
		const hidden_Card_2 = this.add.image(775, 554, "Hidden_Card");
		hidden_Card_2.scaleX = 0.6;
		hidden_Card_2.scaleY = 0.6;

		// hidden_Card_3
		const hidden_Card_3 = this.add.image(990, 552, "Hidden_Card");
		hidden_Card_3.scaleX = 0.6;
		hidden_Card_3.scaleY = 0.6;

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
