
// You can write more code here

/* START OF COMPILED CODE */

class PrefabPlayerDefense extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// clumsyBlock
		const clumsyBlock = scene.add.image(0, 0, "PlayerClumsyBlock");
		clumsyBlock.setOrigin(0.5, 0);
		clumsyBlock.visible = false;
		this.add(clumsyBlock);

		// impressiveBlock
		const impressiveBlock = scene.add.image(0, 0, "PlayerImpressiveBlock");
		impressiveBlock.setOrigin(0.5, 0);
		impressiveBlock.visible = false;
		this.add(impressiveBlock);

		// solidBlock
		const solidBlock = scene.add.image(0, 0, "PlayerSolidBlock");
		solidBlock.setOrigin(0.5, 0);
		solidBlock.visible = false;
		this.add(solidBlock);

		// parry
		const parry = scene.add.image(0, 0, "PlayerParry");
		parry.setOrigin(0.5, 0);
		parry.visible = false;
		this.add(parry);

		this.clumsyBlock = clumsyBlock;
		this.impressiveBlock = impressiveBlock;
		this.solidBlock = solidBlock;
		this.parry = parry;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	clumsyBlock;
	/** @type {Phaser.GameObjects.Image} */
	impressiveBlock;
	/** @type {Phaser.GameObjects.Image} */
	solidBlock;
	/** @type {Phaser.GameObjects.Image} */
	parry;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
