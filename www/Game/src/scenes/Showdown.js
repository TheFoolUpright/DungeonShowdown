
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
		this.add.image(960, 540, "ShowdownBackground");

		// prefabOpponent
		const prefabOpponent = new PrefabOpponent(this, 960, 600);
		this.add.existing(prefabOpponent);
		prefabOpponent.scaleX = 1;
		prefabOpponent.scaleY = 1;

		// empty_Card
		const empty_Card = new PrefabCard(this, 480, 800);
		this.add.existing(empty_Card);
		empty_Card.visible = true;

		// empty_Card_1
		const empty_Card_1 = new PrefabCard(this, 800, 800);
		this.add.existing(empty_Card_1);
		empty_Card_1.visible = true;

		// empty_Card_2
		const empty_Card_2 = new PrefabCard(this, 1120, 800);
		this.add.existing(empty_Card_2);
		empty_Card_2.visible = true;

		// empty_Card_3
		const empty_Card_3 = new PrefabCard(this, 1440, 800);
		this.add.existing(empty_Card_3);
		empty_Card_3.visible = true;

		// confirm___End_Turn_Button
		const confirm___End_Turn_Button = new PrefabEndTurn(this, 1760, 800);
		this.add.existing(confirm___End_Turn_Button);

		// prefabStats
		const prefabStats = new PrefabStats(this, 120, 50);
		this.add.existing(prefabStats);
		prefabStats.scaleX = 2;
		prefabStats.scaleY = 2;

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// prefabAttacks
		const prefabAttacks = new PrefabAttacks(this, 960, 600);
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

		this.prefabOpponent = prefabOpponent;
		this.empty_Card = empty_Card;
		this.empty_Card_1 = empty_Card_1;
		this.empty_Card_2 = empty_Card_2;
		this.empty_Card_3 = empty_Card_3;
		this.prefabAttacks = prefabAttacks;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabOpponent} */
	prefabOpponent;
	/** @type {PrefabCard} */
	empty_Card;
	/** @type {PrefabCard} */
	empty_Card_1;
	/** @type {PrefabCard} */
	empty_Card_2;
	/** @type {PrefabCard} */
	empty_Card_3;
	/** @type {PrefabAttacks} */
	prefabAttacks;

	/* START-USER-CODE */

	// Write your code here

	awake () {
this.parent.on('pointerdown', () => {
console.log('Clicked');
});
}

	create(data) {

		console.log(data.bla);
		this.editorCreate();
	}

	update() {
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
