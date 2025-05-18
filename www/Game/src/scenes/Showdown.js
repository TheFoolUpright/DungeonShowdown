
// You can write more code here

/* START OF COMPILED CODE */

class Showdown extends Phaser.Scene {

	constructor() {
		super("Showdown");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// showdownBackground
		const showdownBackground = this.add.image(640, 360, "ShowdownBackground");
		showdownBackground.scaleX = 0.7;
		showdownBackground.scaleY = 0.7;

		// prefabOpponent
		const prefabOpponent = new PrefabOpponent(this, 640, 380);
		this.add.existing(prefabOpponent);

		// empty_Card
		const empty_Card = new PrefabCard(this, 340, 550);
		this.add.existing(empty_Card);

		// empty_Card_1
		const empty_Card_1 = new PrefabCard(this, 540, 550);
		this.add.existing(empty_Card_1);

		// empty_Card_2
		const empty_Card_2 = new PrefabCard(this, 740, 550);
		this.add.existing(empty_Card_2);

		// empty_Card_3
		const empty_Card_3 = new PrefabCard(this, 940, 550);
		this.add.existing(empty_Card_3);

		// confirm___End_Turn_Button
		const confirm___End_Turn_Button = new PrefabEndTurn(this, 1140, 550);
		this.add.existing(confirm___End_Turn_Button);

		// prefabStats
		const prefabStats = new PrefabStats(this, 50, 30);
		this.add.existing(prefabStats);
		prefabStats.scaleX = 1;
		prefabStats.scaleY = 1;

		// info
		const info = new PrefabInfo(this, 1140, 20);
		this.add.existing(info);

		// prefabAttacks
		const prefabAttacks = new PrefabAttacks(this, 675, 400);
		this.add.existing(prefabAttacks);
		prefabAttacks.angle = 0;

		// empty_Card (prefab fields)
		empty_Card.cardId = 0;
		empty_Card.isVisible = true;

		// empty_Card_1 (prefab fields)
		empty_Card_1.cardId = 0;
		empty_Card_1.isVisible = true;

		// empty_Card_2 (prefab fields)
		empty_Card_2.cardId = 0;
		empty_Card_2.isVisible = true;

		// empty_Card_3 (prefab fields)
		empty_Card_3.cardId = 0;
		empty_Card_3.isVisible = true;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	awake () {
this.parent.on('pointerdown', () => {
console.log('Clicked');
});
}

	create() {

		this.editorCreate();
	}

	update() {
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
