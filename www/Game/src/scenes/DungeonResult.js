
// You can write more code here

/* START OF COMPILED CODE */

class DungeonResult extends Phaser.Scene {

	constructor() {
		super("DungeonResult");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dungeonBackground
		this.add.image(960, 540, "DungeonBackground");

		// prefabCard
		const prefabCard = new PrefabCard(this, 1680, 540);
		this.add.existing(prefabCard);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(prefabCard.onAwakeScript);

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "RIGHT";

		this.prefabCard = prefabCard;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabCard} */
	prefabCard;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
