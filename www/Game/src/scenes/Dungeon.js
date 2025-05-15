
// You can write more code here

/* START OF COMPILED CODE */

class Dungeon extends Phaser.Scene {

	constructor() {
		super("Dungeon");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// MaxHealthFill
		const maxHealthFill = this.add.rectangle(80, 30, 100, 20);
		maxHealthFill.isFilled = true;

		// HealthFill
		const healthFill = this.add.rectangle(80, 70, 100, 20);
		healthFill.isFilled = true;

		// EnergyFill
		const energyFill = this.add.rectangle(80, 110, 100, 20);
		energyFill.isFilled = true;

		// InsightFill
		const insightFill = this.add.rectangle(80, 150, 100, 20);
		insightFill.isFilled = true;

		// MightFill
		const mightFill = this.add.rectangle(80, 190, 100, 20);
		mightFill.isFilled = true;

		// max_Health
		this.add.image(30, 30, "Max Health");

		// damage
		this.add.image(30, 190, "Damage");

		// insight
		this.add.image(30, 149, "Insight");

		// energy
		this.add.image(30, 111, "Energy");

		// currentHealth
		this.add.image(30, 70, "CurrentHealth");

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
