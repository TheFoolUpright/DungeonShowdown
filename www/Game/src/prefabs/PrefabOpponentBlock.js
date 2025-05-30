
// You can write more code here

/* START OF COMPILED CODE */

class PrefabOpponentBlock extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// impressiveBlock
		const impressiveBlock = scene.add.image(0, 0, "OpponentImpressiveBlock");
		impressiveBlock.scaleX = 0.5;
		impressiveBlock.scaleY = 0.5;
		impressiveBlock.setOrigin(1, 0.5);
		impressiveBlock.visible = false;
		this.add(impressiveBlock);

		// solidBlock
		const solidBlock = scene.add.image(0, 0, "OpponentSolidBlock");
		solidBlock.scaleX = 0.5;
		solidBlock.scaleY = 0.5;
		solidBlock.setOrigin(1, 0.5);
		solidBlock.visible = false;
		this.add(solidBlock);

		// clumsyBlock
		const clumsyBlock = scene.add.image(0, 0, "OpponentClumsyBlock");
		clumsyBlock.scaleX = 0.5;
		clumsyBlock.scaleY = 0.5;
		clumsyBlock.setOrigin(1, 0.5);
		clumsyBlock.visible = false;
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
