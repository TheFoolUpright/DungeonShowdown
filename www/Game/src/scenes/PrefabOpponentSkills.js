
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

		// healing
		const healing = scene.add.image(0, -100, "opponentHealing");
		this.add(healing);

		// anger
		const anger = scene.add.image(-70, -80, "opponentAnger");
		this.add(anger);

		// rage
		const rage = scene.add.image(60, -90, "opponentRage");
		this.add(rage);

		this.focus = focus;
		this.adrenaline = adrenaline;
		this.healing = healing;
		this.anger = anger;
		this.rage = rage;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	focus;
	/** @type {Phaser.GameObjects.Image} */
	adrenaline;
	/** @type {Phaser.GameObjects.Image} */
	healing;
	/** @type {Phaser.GameObjects.Image} */
	anger;
	/** @type {Phaser.GameObjects.Image} */
	rage;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
