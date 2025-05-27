
// You can write more code here

var ShowdownAnimations = {
    "NormalAttack":    {id: 1, visible: false},
	"HeavyAttack": 	   {id: 2, visible: false},
	"DoubleAttack":    {id: 3, visible: false},
	"RecoveryAttack":  {id: 4, visible: false},
	"CounterAttack":   {id: 5, visible: false},
	"ClumsyBlock": 	   {id: 6, visible: false},
	"SolidBlock": 	   {id: 7, visible: false},
	"ImpressiveBlock": {id: 8, visible: false},
	"Dodge": 		   {id: 9, visible: false},
	"Parry": 		   {id: 10, visible: false},
	"Anger": 		   {id: 11, visible: false},
	"Rage": 		   {id: 12, visible: false},
	"Focus":		   {id: 13, visible: false},
	"Adrenaline": 	   {id: 14, visible: false},
	"Healing": 		   {id: 15, visible: false},
	}

var secondSwing = false

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
		opponentAttacks.angle = 0;
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

		secondSwing = false

		this.opponentAttacks.angle = 30

		timer = 0

		if (data.opponent_cards[0].card_id == ShowdownAnimations.NormalAttack.id) {
			ShowdownAnimations.NormalAttack.visible = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.HeavyAttack.id) {
			ShowdownAnimations.HeavyAttack.visible = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.DoubleAttack.id) {
			ShowdownAnimations.DoubleAttack.visible = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.RecoveryAttack.id) {
			ShowdownAnimations.RecoveryAttack.visible = true
		}
		else if (data.opponent_cards[0].card_id == ShowdownAnimations.CounterAttack.id) {
			ShowdownAnimations.CounterAttack.visible = true
		}
	}

	update(time, dt) {
		timer += dt
		if (timer > 1200) {
			if (((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 30) || (this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -30)) && !secondSwing) {
				if (ShowdownAnimations.NormalAttack.visible || ShowdownAnimations.DoubleAttack.visible) {
					this.opponentAttacks.normal_Slash.visible = true
					this.opponentAttacks.angle += dt / 2
				}
				else if (ShowdownAnimations.HeavyAttack.visible) {
					this.opponentAttacks.heavy_Slash.visible = true
					this.opponentAttacks.angle += dt / 2
				}
				else if (ShowdownAnimations.RecoveryAttack.visible) {
					this.opponentAttacks.recovery_Hit.visible = true
					this.opponentAttacks.angle += dt / 2
				}
				else if (ShowdownAnimations.CounterAttack.visible) {
					this.opponentAttacks.counter_Slash.visible = true
					this.opponentAttacks.angle += dt / 2
				}
			}
			else if (ShowdownAnimations.DoubleAttack.visible) {
				secondSwing = true
				if (secondSwing && this.opponentAttacks.normal_Slash.scaleX == 1) {
					this.opponentAttacks.normal_Slash.flipX = true
				}
				if (secondSwing &&
					((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 40) || 
					(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -20))) {
					this.opponentAttacks.angle -= dt / 2
				}
				else {
					this.opponentAttacks.normal_Slash.visible = false
					this.opponentAttacks.heavy_Slash.visible = false
					this.opponentAttacks.recovery_Hit.visible = false
					this.opponentAttacks.counter_Slash.visible = false
				}
			}
			else {
				this.opponentAttacks.normal_Slash.visible = false
				this.opponentAttacks.heavy_Slash.visible = false
				this.opponentAttacks.recovery_Hit.visible = false
				this.opponentAttacks.counter_Slash.visible = false
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
