
// You can write more code here

var playerShowdownAnimations = {
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

var opponentShowdownAnimations = {
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

// Attck animation variables	
var	playerAttack = false

var	opponentAttack = false

var playerSecondSwing = false

var opponentSecondSwing = false

var playerAttackAnimationFinished = false

var opponentAttackAnimationFinished = false

// Defence animation variables	
var	playerDefense = false

var	opponentDefense = false

var playerDefenseAnimationFinished = false

var opponentDefenseAnimationFinished = false

// Skill animation variables	
// var	playerAttack = false

// var	opponentAttack = false

// var playerSecondSwing = false

// var opponentSecondSwing = false

// var playerAttackAnimationFinished = false

// var opponentAttackAnimationFinished = false

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
		const opponent = new PrefabOpponent(this, 960, 500);
		this.add.existing(opponent);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		// playerAttacks
		const playerAttacks = new PrefabPlayerAttacks(this, 960, 1132);
		this.add.existing(playerAttacks);
		playerAttacks.angle = 0;
		playerAttacks.visible = true;

		// opponentAttacks
		const opponentAttacks = new PrefabAttacks(this, 986, 769);
		this.add.existing(opponentAttacks);
		opponentAttacks.angle = 0;
		opponentAttacks.visible = true;

		// playerBlock
		const playerBlock = new PrefabPlayerDefense(this, 960, 1080);
		this.add.existing(playerBlock);

		// opponentBlock
		const opponentBlock = new PrefabOpponentBlock(this, 1165, 540);
		this.add.existing(opponentBlock);
		opponentBlock.scaleX = 1;
		opponentBlock.scaleY = 1;
		opponentBlock.visible = true;

		this.showdownBackground = showdownBackground;
		this.statsContainer = statsContainer;
		this.info = info;
		this.opponent = opponent;
		this.confirmButton = confirmButton;
		this.playerAttacks = playerAttacks;
		this.opponentAttacks = opponentAttacks;
		this.playerBlock = playerBlock;
		this.opponentBlock = opponentBlock;

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
	/** @type {PrefabNextRoom} */
	confirmButton;
	/** @type {PrefabPlayerAttacks} */
	playerAttacks;
	/** @type {PrefabAttacks} */
	opponentAttacks;
	/** @type {PrefabPlayerDefense} */
	playerBlock;
	/** @type {PrefabOpponentBlock} */
	opponentBlock;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();

		playerShowdownAnimations.NormalAttack.visible = false
		playerShowdownAnimations.HeavyAttack.visible = false
		playerShowdownAnimations.DoubleAttack.visible = false
		playerShowdownAnimations.RecoveryAttack.visible = false
		playerShowdownAnimations.CounterAttack.visible = false
		playerShowdownAnimations.ClumsyBlock.visible = false
		playerShowdownAnimations.SolidBlock.visible = false
		playerShowdownAnimations.ImpressiveBlock.visible = false
		playerShowdownAnimations.Dodge.visible = false
		playerShowdownAnimations.Parry.visible = false
		playerShowdownAnimations.Anger.visible = false
		playerShowdownAnimations.Rage.visible = false
		playerShowdownAnimations.Focus.visible = false
		playerShowdownAnimations.Adrenaline.visible = false
		playerShowdownAnimations.Healing.visible = false
		playerShowdownAnimations.NormalAttack.visible = false

		opponentShowdownAnimations.NormalAttack.visible = false
		opponentShowdownAnimations.HeavyAttack.visible = false
		opponentShowdownAnimations.DoubleAttack.visible = false
		opponentShowdownAnimations.RecoveryAttack.visible = false
		opponentShowdownAnimations.CounterAttack.visible = false
		opponentShowdownAnimations.ClumsyBlock.visible = false
		opponentShowdownAnimations.SolidBlock.visible = false
		opponentShowdownAnimations.ImpressiveBlock.visible = false
		opponentShowdownAnimations.Dodge.visible = false
		opponentShowdownAnimations.Parry.visible = false
		opponentShowdownAnimations.Anger.visible = false
		opponentShowdownAnimations.Rage.visible = false
		opponentShowdownAnimations.Focus.visible = false
		opponentShowdownAnimations.Adrenaline.visible = false
		opponentShowdownAnimations.Healing.visible = false
		opponentShowdownAnimations.NormalAttack.visible = false

		playerAttack = false

		opponentAttack = false

		playerSecondSwing = false

		opponentSecondSwing = false

		playerAttackAnimationFinished = false

		opponentAttackAnimationFinished = false

		playerDefense = false

		opponentDefense = false

		playerDefenseAnimationFinished = false

		opponentDefenseAnimationFinished = false

		timer = 0

		this.playerAttacks.angle = -110

		this.opponentAttacks.angle = 40

		this.confirmButton.visible = false

		this.loadStatsData(data)
		this.loadInfoData(data)
		this.loadOpponentData(data)
		this.confirmButtonGlow()

		// Loading Player Attacks
		if (data.player_cards[0].card_id == playerShowdownAnimations.NormalAttack.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.NormalAttack.id)) {
			playerShowdownAnimations.NormalAttack.visible = true
			playerAttack = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.HeavyAttack.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.HeavyAttack.id)) {
			playerShowdownAnimations.HeavyAttack.visible = true
			playerAttack = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.DoubleAttack.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.DoubleAttack.id)) {
			playerShowdownAnimations.DoubleAttack.visible = true
			playerAttack = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.RecoveryAttack.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.RecoveryAttack.id)) {
			playerShowdownAnimations.RecoveryAttack.visible = true
			playerAttack = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.CounterAttack.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.CounterAttack.id)) {
			playerShowdownAnimations.CounterAttack.visible = true
			playerAttack = true
		}

		// Loading Player Defense
		if (data.player_cards[0].card_id == playerShowdownAnimations.ClumsyBlock.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.ClumsyBlock.id)) {
			playerShowdownAnimations.ClumsyBlock.visible = true
			playerDefense = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.SolidBlock.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.SolidBlock.id)) {
			playerShowdownAnimations.SolidBlock.visible = true
			playerDefense = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.ImpressiveBlock.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.ImpressiveBlock.id)) {
			playerShowdownAnimations.ImpressiveBlock.visible = true
			playerDefense = true
		}
		// else if (data.player_cards[0].card_id == playerShowdownAnimations.Dodge.id) {
		// 	playerShowdownAnimations.Dodge.visible = true
		// 	playerDefense = true
		// }
		// else if (data.player_cards[0].card_id == playerShowdownAnimations.Parry.id) {
		// 	playerShowdownAnimations.Parry.visible = true
		// 	playerDefense = true
		// }

		// Loading Opponent Attacks
		if (data.opponent_cards[0].card_id == opponentShowdownAnimations.NormalAttack.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.NormalAttack.id)) {
			opponentShowdownAnimations.NormalAttack.visible = true
			opponentAttack = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.HeavyAttack.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.HeavyAttack.id)) {
			opponentShowdownAnimations.HeavyAttack.visible = true
			opponentAttack = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.DoubleAttack.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.DoubleAttack.id)) {
			opponentShowdownAnimations.DoubleAttack.visible = true
			opponentAttack = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.RecoveryAttack.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.RecoveryAttack.id)) {
			opponentShowdownAnimations.RecoveryAttack.visible = true
			opponentAttack = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.CounterAttack.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.CounterAttack.id)) {
			opponentShowdownAnimations.CounterAttack.visible = true
			opponentAttack = true
		}

		// Loading Opponent Defense
		if (data.opponent_cards[0].card_id == opponentShowdownAnimations.ClumsyBlock.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.ClumsyBlock.id)) {
			opponentShowdownAnimations.ClumsyBlock.visible = true
			opponentDefense = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.SolidBlock.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.SolidBlock.id)) {
			opponentShowdownAnimations.SolidBlock.visible = true
			opponentDefense = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.ImpressiveBlock.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.ImpressiveBlock.id)) {
			opponentShowdownAnimations.ImpressiveBlock.visible = true
			opponentDefense = true
		}
		// else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.Dodge.id) {
		// 	opponentShowdownAnimations.Dodge.visible = true
		// 	opponentDefense = true
		// }
		// else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.Parry.id) {
		// 	opponentShowdownAnimations.Parry.visible = true
		// 	opponentDefense = true
		// }

		this.confirmButton.on("pointerdown", () => {
			this.setupNextTurn()
		})
	}

	loadInfoData(data) {
		//Load Info

		this.info.phaseName.text = "SHOWDOWN"
		this.confirmButton.confirmButtonText.text = "Perservere!"
		this.info.roomOrTurn.text = "Turn " + data.showdown_turn
		this.info.playerName.text = data.player_username
		this.info.playerName.setColor(data.player_color)
		return
	}

	loadStatsData(data) {
		//Load Stats

		var maxHealth = data.max_health
		var currentHealth = data.current_health
		var energy = data.energy
		var insight = data.insight
		var damage = data.damage

		this.statsContainer.healthText.text = currentHealth + "/" +  maxHealth
		this.statsContainer.insightText.text = insight + "/10"
		this.statsContainer.energyText.text = energy
		this.statsContainer.mightText.text = damage

		if(previousMaxHealth != maxHealth && previousCurrentHealth != currentHealth){
			var maxHealthDiff = maxHealth - previousMaxHealth
			var currentHealthDiff = currentHealth - previousCurrentHealth

			if(maxHealthDiff > 0 && currentHealthDiff > 0) {
				this.statsContainer.healthDifferenceText.text =  "+" + currentHealthDiff + "/+" + maxHealthDiff
			}
			else if (maxHealthDiff < 0 && currentHealthDiff < 0){
				this.statsContainer.healthDifferenceText.text =   currentHealthDiff + "/" + maxHealthDiff
			}
			else if (maxHealthDiff > 0 && currentHealthDiff < 0){
				this.statsContainer.healthDifferenceText.text =   currentHealthDiff + "/+" + maxHealthDiff
			}
			else if (maxHealthDiff < 0 && currentHealthDiff > 0){
				this.statsContainer.healthDifferenceText.text =   "+" + currentHealthDiff + "/" + maxHealthDiff
			}
			else{
				this.statsContainer.healthDifferenceText.text =  currentHealthDiff + "/" + maxHealthDiff
			}
			this.statsContainer.healthDifferenceText.visible = true
		}
		else if(previousMaxHealth != maxHealth) {
			if(maxHealth - previousMaxHealth > 0){
				this.statsContainer.healthDifferenceText.text =  "+" + (maxHealth - previousMaxHealth) + "/+" + (maxHealth - previousMaxHealth) 
			}
			else{
				this.statsContainer.healthDifferenceText.text =  (maxHealth - previousMaxHealth) + "/" + (maxHealth - previousMaxHealth)
			}
			this.statsContainer.healthDifferenceText.visible = true
		}
		else if(previousCurrentHealth != currentHealth) {
			if(currentHealth - previousCurrentHealth > 0) {
				this.statsContainer.healthDifferenceText.text =  "+" + (currentHealth - previousCurrentHealth) + "/0"
			}
			else{
				this.statsContainer.healthDifferenceText.text = (currentHealth - previousCurrentHealth) + "/0"
			}
			this.statsContainer.healthDifferenceText.visible = true
		}

		if(previousEnergy != energy) {
			if(energy - previousEnergy > 0) {
				this.statsContainer.energyDifferenceText.text =  "+" + (energy - previousEnergy)
			}
			else{
				this.statsContainer.energyDifferenceText.text = (energy - previousEnergy)
			}
			this.statsContainer.energyDifferenceText.visible = true
		}
		if(previousInsight != insight) {
			if(insight - previousInsight > 0) {
				this.statsContainer.insightDifferenceText.text =  "+" + (insight - previousInsight)
			}
			else{
				this.statsContainer.insightDifferenceText.text =  (insight - previousInsight)
			}
			this.statsContainer.insightDifferenceText.visible = true
		}
		if(previousDamage != damage) {
			if(damage - previousDamage > 0) {
				this.statsContainer.mightDifferenceText.text =  "+" + (damage - previousDamage)
			}
			else{
				this.statsContainer.mightDifferenceText.text = (damage - previousDamage)
			}
			this.statsContainer.mightDifferenceText.visible = true
		}

		return
	}

	loadOpponentData(data) {
		this.opponent.opponentName.text = data.opponent_cards[0].player_username
		this.opponent.opponentName.setColor(data.opponent_cards[0].player_color)	

		return
	}

	confirmButtonGlow() {
		this.confirmButton.glowFx.active = false

		this.confirmButton.on("pointerover", () => {
			this.confirmButton.glowFx.active = true

		})

		this.confirmButton.on("pointerout", () => {
			this.confirmButton.glowFx.active = false
		})
	}

	setupNextTurn() {
		var xhttp = new XMLHttpRequest()

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					this.scene.start("Showdown", data);
				}
			}
		}

		xhttp.open("POST", "/setupShowdown", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send();
	}

	update(time, dt) {
		timer += dt
		if (timer > 1200) {
			if (playerAttack && !playerAttackAnimationFinished) {
				this.loadPlayerAttackAnimations()
				if (((this.playerAttacks.angle <= 130 && this.playerAttacks.angle >= 0) || (this.playerAttacks.angle >= -110 && this.playerAttacks.angle <= 0)) && !playerSecondSwing) {
					this.playerAttacks.angle += dt / 3
					if (opponentDefense && !opponentDefenseAnimationFinished) {
						this.playOpponentDefenseAnimations(dt)
					}
				}
				else if (playerShowdownAnimations.DoubleAttack.visible) {
					this.playPlayerSecondSwing(dt)
				}
				else {
					this.finishPlayerAttackAnimations()
				}
			}

			else if (opponentAttack && !opponentAttackAnimationFinished) {
				this.loadOpponentAttackAnimations()
				if (((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 40) || (this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -40)) && !opponentSecondSwing) {
					this.opponentAttacks.angle += dt / 3
					if (playerDefense && !playerDefenseAnimationFinished) {
						this.playPlayerDefenseAnimations(dt)
					}
				}
				else if (opponentShowdownAnimations.DoubleAttack.visible) {
					this.playOpponentSecondSwing(dt)
				}
				else {
					this.finishOpponentAttackAnimations()
				}
			}
		}
		if (playerAttack && playerAttackAnimationFinished) {
			this.finishOpponentDefenseAnimations()
		}

		if (opponentAttack && opponentAttackAnimationFinished) {
			this.finishPlayerDefenseAnimations()
		}

		if ((!playerAttack || (playerAttack && playerAttackAnimationFinished)) && 
		(!opponentAttack || (opponentAttack && opponentAttackAnimationFinished)) && 
		(!opponentDefense || (opponentDefense && opponentDefenseAnimationFinished)) && 
		(!playerDefense || (playerDefense && playerDefenseAnimationFinished))) {
			this.confirmButton.visible = true
		}
		else {
			this.confirmButton.visible = false
		}
		console.log(this.opponentAttacks.angle)
	}

	//	END OF UPDATE FUNCTION	//	END OF UPDATE FUNCTION	//	END OF UPDATE FUNCTION (yes I'm blind and will probably forget to take this out)
	loadPlayerAttackAnimations() {
		if (playerShowdownAnimations.NormalAttack.visible || playerShowdownAnimations.DoubleAttack.visible) {
			this.playerAttacks.normal_Slash.visible = true
		}
		else if (playerShowdownAnimations.HeavyAttack.visible) {
			this.playerAttacks.heavy_Slash.visible = true
		}
		else if (playerShowdownAnimations.RecoveryAttack.visible) {
			this.playerAttacks.recovery_Hit.visible = true
		}
		else if (playerShowdownAnimations.CounterAttack.visible) {
			this.playerAttacks.counter_Slash.visible = true
		}
	}

	loadOpponentAttackAnimations() {
		if (opponentShowdownAnimations.NormalAttack.visible || opponentShowdownAnimations.DoubleAttack.visible) {
			this.opponentAttacks.normal_Slash.visible = true
		}
		else if (opponentShowdownAnimations.HeavyAttack.visible) {
			this.opponentAttacks.heavy_Slash.visible = true
		}
		else if (opponentShowdownAnimations.RecoveryAttack.visible) {
			this.opponentAttacks.recovery_Hit.visible = true
		}
		else if (opponentShowdownAnimations.CounterAttack.visible) {
			this.opponentAttacks.counter_Slash.visible = true
		}
	}

	playOpponentDefenseAnimations(dt) {
		if (opponentShowdownAnimations.ClumsyBlock.visible) {
			this.opponentBlock.clumsyBlock.visible = true
		}
		else if (opponentShowdownAnimations.SolidBlock.visible) {
			this.opponentBlock.solidBlock.visible = true
		}
		else if (opponentShowdownAnimations.ImpressiveBlock.visible) {
			this.opponentBlock.impressiveBlock.visible = true
		}
		// else if (opponentShowdownAnimations.Dodge.visible) {
		// 	this.visible = true
		// }
		// else if (opponentShowdownAnimations.Parry.visible) {
		// 	this.visible = true
		// }
		if (this.playerAttacks.angle <= 0 && this.opponentBlock.scale < 2.5) {
			this.opponentBlock.scale += dt / 256
		}
		else if (this.opponentAttacks.angle >= 0 && this.opponentBlock.scale > 1) {
			this.opponentBlock.scale -= dt / 256
		}
		if (this.opponentBlock.scale < 1) {
			this.opponentBlock.scale = 1
		}
	}

	playPlayerDefenseAnimations(dt) {
		if (playerShowdownAnimations.ClumsyBlock.visible) {
			this.playerBlock.clumsyBlock.visible = true
		}
		else if (playerShowdownAnimations.SolidBlock.visible) {
			this.playerBlock.solidBlock.visible = true
		}
		else if (playerShowdownAnimations.ImpressiveBlock.visible) {
			this.playerBlock.impressiveBlock.visible = true
		}
		// else if (playerShowdownAnimations.Dodge.visible) {
		// 	this.visible = true
		// }
		// else if (playerShowdownAnimations.Parry.visible) {
		// 	this.visible = true
		// }
		if (this.playerBlock.y > 750 && 
			((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 80) || 
			(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -140))) {
			this.playerBlock.y -= dt
		}
		else if (this.opponentAttacks.angle >= -140 && this.opponentBlock.y < 1080) {
			this.playerBlock.y += dt
		}
		if (this.playerBlock.y > 1080) {
			this.playerBlock.y == 1080
		}
	}

	playPlayerSecondSwing(dt) {
		playerSecondSwing = true
		if (playerSecondSwing && this.playerAttacks.normal_Slash.scaleX > 0) {
			this.playerAttacks.normal_Slash.flipX = true
		}
		if (playerSecondSwing &&
			((this.playerAttacks.angle <= 140 && this.playerAttacks.angle >= 0) || 
			(this.playerAttacks.angle >= -120 && this.playerAttacks.angle <= 0))) {
			this.playerAttacks.angle -= dt / 3
		}
		else {
			this.finishPlayerAttackAnimations()
		}
	}

	playOpponentSecondSwing(dt) {
		opponentSecondSwing = true
		if (opponentSecondSwing && this.opponentAttacks.normal_Slash.scaleX > 0) {
			this.opponentAttacks.normal_Slash.flipX = true
		}
		if (opponentSecondSwing &&
			((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 50) || 
			(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -30))) {
			this.opponentAttacks.angle -= dt / 3
		}
		else {
			this.finishOpponentAttackAnimations()
		}
	}

	finishPlayerAttackAnimations() {
		this.playerAttacks.normal_Slash.visible = false
		this.playerAttacks.heavy_Slash.visible = false
		this.playerAttacks.recovery_Hit.visible = false
		this.playerAttacks.counter_Slash.visible = false
		playerAttackAnimationFinished = true
		timer = 40
	}
	finishOpponentAttackAnimations() {
		this.opponentAttacks.normal_Slash.visible = false
		this.opponentAttacks.heavy_Slash.visible = false
		this.opponentAttacks.recovery_Hit.visible = false
		this.opponentAttacks.counter_Slash.visible = false
		opponentAttackAnimationFinished = true
		timer = 40
	}

	finishOpponentDefenseAnimations() {
		this.opponentBlock.clumsyBlock.visible = false
		this.opponentBlock.solidBlock.visible = false
		this.opponentBlock.impressiveBlock.visible = false
		opponentDefenseAnimationFinished = true
	}

	finishPlayerDefenseAnimations() {
		this.playerBlock.clumsyBlock.visible = false
		this.playerBlock.solidBlock.visible = false
		this.playerBlock.impressiveBlock.visible = false
		playerDefenseAnimationFinished = true
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
