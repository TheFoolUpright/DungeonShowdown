
// You can write more code here

/* START OF COMPILED CODE */

class PrefabOpponentSkills extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// focus
		const focus = scene.add.image(0, 0, "opponentFocus");
		focus.visible = false;
		this.add(focus);

		// adrenaline
		const adrenaline = scene.add.image(0, 0, "opponentAdrenaline");
		adrenaline.visible = false;
		this.add(adrenaline);

		// healing
		const healing = scene.add.image(0, -100, "opponentHealing");
		healing.visible = false;
		this.add(healing);

		// anger
		const anger = scene.add.image(-70, -80, "opponentAnger");
		anger.visible = false;
		this.add(anger);

		// rage
		const rage = scene.add.image(60, -90, "opponentRage");
		rage.visible = false;
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
