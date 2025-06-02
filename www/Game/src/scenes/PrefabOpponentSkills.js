
// You can write more code here

/* START OF COMPILED CODE */

class PrefabOpponentSkills extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// focus
		const focus = scene.add.image(0, 0, "opponentFocus");
		this.add(focus);

		// adrenaline
		const adrenaline = scene.add.image(0, 0, "opponentAdrenaline");
		this.add(adrenaline);

		// opponentHealing
		const opponentHealing = scene.add.image(0, -100, "opponentHealing");
		this.add(opponentHealing);

		// opponentAnger
		const opponentAnger = scene.add.image(-67, -87, "opponentAnger");
		this.add(opponentAnger);

		// opponentRage
		const opponentRage = scene.add.image(59, -92, "opponentRage");
		this.add(opponentRage);

		this.focus = focus;
		this.adrenaline = adrenaline;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	focus;
	/** @type {Phaser.GameObjects.Image} */
	adrenaline;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
