
// You can write more code here

/* START OF COMPILED CODE */

class PrefabPlayerSkills extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// healingSkill
		const healingSkill = scene.add.image(0, 0, "HealSkill");
		healingSkill.setOrigin(0.5, 0);
		healingSkill.visible = false;
		this.add(healingSkill);

		// adrenalineSkill
		const adrenalineSkill = scene.add.image(0, 0, "AdrenalineSkill");
		adrenalineSkill.setOrigin(0.5, 0);
		adrenalineSkill.visible = false;
		this.add(adrenalineSkill);

		// focusSkill
		const focusSkill = scene.add.image(0, 0, "FocusSkill");
		focusSkill.setOrigin(0.5, 0);
		focusSkill.visible = false;
		this.add(focusSkill);

		// rageSkill
		const rageSkill = scene.add.image(0, 0, "RageSkill");
		rageSkill.setOrigin(0.5, 0);
		rageSkill.visible = false;
		this.add(rageSkill);

		// angerSkill
		const angerSkill = scene.add.image(0, 0, "AngerSkill");
		angerSkill.setOrigin(0.5, 0);
		angerSkill.visible = false;
		this.add(angerSkill);

		this.healingSkill = healingSkill;
		this.adrenalineSkill = adrenalineSkill;
		this.focusSkill = focusSkill;
		this.rageSkill = rageSkill;
		this.angerSkill = angerSkill;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	healingSkill;
	/** @type {Phaser.GameObjects.Image} */
	adrenalineSkill;
	/** @type {Phaser.GameObjects.Image} */
	focusSkill;
	/** @type {Phaser.GameObjects.Image} */
	rageSkill;
	/** @type {Phaser.GameObjects.Image} */
	angerSkill;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
