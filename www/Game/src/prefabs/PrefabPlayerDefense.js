
// You can write more code here

/* START OF COMPILED CODE */

class PrefabPlayerDefense extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// impressiveBlock
		const impressiveBlock = scene.add.image(0, 0, "ImpressiveBlock");
		impressiveBlock.setOrigin(0.5, 0);
		this.add(impressiveBlock);

		// solidBlock
		const solidBlock = scene.add.image(0, 0, "SolidBlock");
		solidBlock.setOrigin(0.5, 0);
		this.add(solidBlock);

		// clumsyBlock
		const clumsyBlock = scene.add.image(0, 0, "ClumsyBlock");
		clumsyBlock.setOrigin(0.5, 0);
		this.add(clumsyBlock);

		this.impressiveBlock = impressiveBlock;
		this.solidBlock = solidBlock;
		this.clumsyBlock = clumsyBlock;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	impressiveBlock;
	/** @type {Phaser.GameObjects.Image} */
	solidBlock;
	/** @type {Phaser.GameObjects.Image} */
	clumsyBlock;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
