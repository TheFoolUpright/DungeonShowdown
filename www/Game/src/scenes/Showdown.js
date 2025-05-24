
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

		// normalAttackSlot
		const normalAttackSlot = new PrefabCard(this, 480, 800);
		this.add.existing(normalAttackSlot);
		normalAttackSlot.visible = true;

		// specialAttackSlot
		const specialAttackSlot = new PrefabCard(this, 800, 800);
		this.add.existing(specialAttackSlot);
		specialAttackSlot.visible = true;

		// defenseSlot
		const defenseSlot = new PrefabCard(this, 1120, 800);
		this.add.existing(defenseSlot);
		defenseSlot.visible = true;

		// skillSlot
		const skillSlot = new PrefabCard(this, 1440, 800);
		this.add.existing(skillSlot);
		skillSlot.visible = true;

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

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1760, 800);
		this.add.existing(confirmButton);

		// normalAttackSlot (prefab fields)
		normalAttackSlot.cardId = 0;
		normalAttackSlot.isVisible = true;

		// specialAttackSlot (prefab fields)
		specialAttackSlot.cardId = 0;
		specialAttackSlot.isVisible = true;

		// defenseSlot (prefab fields)
		defenseSlot.cardId = 0;
		defenseSlot.isVisible = true;

		// skillSlot (prefab fields)
		skillSlot.cardId = 0;
		skillSlot.isVisible = true;

		this.prefabOpponent = prefabOpponent;
		this.normalAttackSlot = normalAttackSlot;
		this.specialAttackSlot = specialAttackSlot;
		this.defenseSlot = defenseSlot;
		this.skillSlot = skillSlot;
		this.info = info;
		this.prefabAttacks = prefabAttacks;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabOpponent} */
	prefabOpponent;
	/** @type {PrefabCard} */
	normalAttackSlot;
	/** @type {PrefabCard} */
	specialAttackSlot;
	/** @type {PrefabCard} */
	defenseSlot;
	/** @type {PrefabCard} */
	skillSlot;
	/** @type {PrefabInfo} */
	info;
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

		this.editorCreate();

		//load Data
		this.loadInfoData(data)
	}

	loadInfoData(data){
		//Load Info
		
		this.info.phaseName.text = "SHOWDOWN"
		this.info.roomOrTurn.text = "Turn " + data.showdown_turn
		this.info.playerName.text = data.player_username
		this.info.playerName.setColor(data.player_color)
		return;
	}

	loadStats(){

	}

	loadCards(){

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
