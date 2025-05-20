
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

		// dungeonBackground
		const dungeonBackground = this.add.image(640, 360, "DungeonBackground");
		dungeonBackground.scaleX = 0.7;
		dungeonBackground.scaleY = 0.7;

		// StatsContainer
		const statsContainer = new PrefabStats(this, 50, 30);
		this.add.existing(statsContainer);

		// empty_Card
		const empty_Card = new PrefabCard(this, 640, 550);
		this.add.existing(empty_Card);

		// empty_Card_1
		const empty_Card_1 = new PrefabCard(this, 840, 550);
		this.add.existing(empty_Card_1);

		// empty_Card_2
		const empty_Card_2 = new PrefabCard(this, 440, 550);
		this.add.existing(empty_Card_2);

		// prefabNextRoom
		const prefabNextRoom = new PrefabNextRoom(this, 1140, 550);
		this.add.existing(prefabNextRoom);

		// info
		const info = new PrefabInfo(this, 1140, 20);
		this.add.existing(info);

		// empty_Card (prefab fields)
		empty_Card.cardId = 0;
		empty_Card.isVisible = true;

		// empty_Card_1 (prefab fields)
		empty_Card_1.cardId = 0;
		empty_Card_1.isVisible = true;

		// empty_Card_2 (prefab fields)
		empty_Card_2.cardId = 0;
		empty_Card_2.isVisible = true;

		this.statsContainer = statsContainer;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabStats} */
	statsContainer;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		
	}

	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
