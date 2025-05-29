
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

		// joinMatch
		const joinMatch = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(joinMatch);

		this.joinMatch = joinMatch;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabNextRoom} */
	joinMatch;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
