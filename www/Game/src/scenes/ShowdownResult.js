
// You can write more code here

var ShowdownAnimations = {
    "NormalAttack": {id: 1, visible: false},
	"HeavyAttack": 	2,
	"DoubleAttack": 	3,
	"RecoveryAttack": 	4,
	"CounterAttack": 	5,
	"ClumsyBlock": 	6,
	"SolidBlock": 		7,
	"ImpressiveBlock": 8,
	"Dodge": 			9,
	"Parry": 			10,
	"Anger": 			11,
	"Rage": 			12,
	"Focus": 			13,
	"Adrenaline": 		14,
	"Healing": 			15
	}

var doubleAttack = false

var firstSwing = false

var timer = 0

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
		opponentAttacks.visible = true;

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

	create(data) {

		this.editorCreate();
		console.log(data.opponent_cards)
		data.opponent_cards[0].card_id

		doubleAttack = false
		
		firstSwing = false
		
		this.opponentAttacks.angle = 30
		
		timer = 0
		

		if (data.opponent_cards[0].card_id == ShowdownAnimations.NormalAttack.id) {
			ShowdownAnimations.NormalAttack.visible = true
			//this.opponentAttacks.normal_Slash.visible = true
			doubleAttack = false
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.HeavyAttack) {
			this.opponentAttacks.heavy_Slash.visible = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.DoubleAttack) {
			this.opponentAttacks.normal_Slash.visible = true
			doubleAttack = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.RecoveryAttack) {
			this.opponentAttacks.recovery_Hit.visible = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.CounterAttack) {
			this.opponentAttacks.counter_Slash.visible = true
		}
	}

	update(time, dt) {
		timer += dt
		console.log("timer: "+timer)
		if (timer > 1500) {
			if (ShowdownAnimations.NormalAttack.visible 
				&& !doubleAttack && 
				(this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 30) || 
				(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -30)) {
				this.opponentAttacks.normal_Slash.visible = true
				this.opponentAttacks.angle += dt / 2
			}
			else if (this.opponentAttacks.normal_Slash.visible 
				&& !doubleAttack) {
				this.opponentAttacks.normal_Slash.visible = false
			}
			//else if ()

			if (doubleAttack && !firstSwing &&
				(this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 30) || 
				(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -30)) {
				this.opponentAttacks.angle += dt / 2
			}
			else if (doubleAttack && firstSwing &&
				(this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 40) || 
				(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -20)) {
				this.opponentAttacks.angle -= dt / 2
			}
			else if (doubleAttack) {
				this.opponentAttacks.normal_Slash.visible = false
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
