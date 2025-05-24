
// You can write more code here

/* START OF COMPILED CODE */

class ShowdownResult extends Phaser.Scene {

	constructor() {
		super("ShowdownResult");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// showdownBackground
		const showdownBackground = this.add.image(960, 540, "ShowdownBackground");

		// statsContainer
		const statsContainer = new PrefabStats(this, 120, 50);
		this.add.existing(statsContainer);

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// opponent
		const opponent = new PrefabOpponent(this, 960, 600);
		this.add.existing(opponent);

		// opponentAttacks
		const opponentAttacks = new PrefabAttacks(this, 986, 769);
		this.add.existing(opponentAttacks);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		this.showdownBackground = showdownBackground;
		this.statsContainer = statsContainer;
		this.info = info;
		this.opponent = opponent;
		this.opponentAttacks = opponentAttacks;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	showdownBackground;
	/** @type {PrefabStats} */
	statsContainer;
	/** @type {PrefabInfo} */
	info;
	/** @type {PrefabOpponent} */
	opponent;
	/** @type {PrefabAttacks} */
	opponentAttacks;
	/** @type {PrefabNextRoom} */
	confirmButton;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
