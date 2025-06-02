
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

var playerParrySwing = false

var opponentParrySwing = false

var playerDefenseAnimationFinished = false

var opponentDefenseAnimationFinished = false

// Skill animation variables	
var	playerSkill = false

var	opponentSkill = false

var playerSkillAnimationFinished = false

var opponentSkillAnimationFinished = false

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

		// opponentAttacks
		const opponentAttacks = new PrefabAttacks(this, 986, 769);
		this.add.existing(opponentAttacks);
		opponentAttacks.angle = 0;
		opponentAttacks.visible = true;

		// playerBlock
		const playerBlock = new PrefabPlayerDefense(this, 960, 1080);
		this.add.existing(playerBlock);

		// opponentBlock
		const opponentBlock = new PrefabOpponentBlock(this, 1171, 535);
		this.add.existing(opponentBlock);
		opponentBlock.visible = true;

		// playerAttacks
		const playerAttacks = new PrefabPlayerAttacks(this, 960, 1132);
		this.add.existing(playerAttacks);
		playerAttacks.angle = 0;
		playerAttacks.visible = true;

		// playerSkills
		const playerSkills = new PrefabPlayerSkills(this, 960, 1080);
		this.add.existing(playerSkills);

		// opponenetMissText
		const opponenetMissText = this.add.text(1250, 400, "", {});
		opponenetMissText.setOrigin(0.5, 0.5);
		opponenetMissText.visible = false;
		opponenetMissText.text = "MISS!";
		opponenetMissText.setStyle({ "align": "center", "color": "#5b4e99", "fontFamily": "Rockey", "fontSize": "72px", "stroke": "#000000ff", "strokeThickness":10});
		opponenetMissText.setWordWrapWidth(280);

		// playerMissText
		const playerMissText = this.add.text(960, 1080, "", {});
		playerMissText.setOrigin(0.5, 0);
		playerMissText.visible = false;
		playerMissText.text = "MISS!";
		playerMissText.setStyle({ "align": "center", "color": "#5b4e99", "fontFamily": "Rockey", "fontSize": "72px", "stroke": "#000000ff", "strokeThickness":10});

		// playerCard1
		const playerCard1 = new PrefabCard(this, 150, 850);
		this.add.existing(playerCard1);
		playerCard1.removeInteractive();
		playerCard1.setInteractive(new Phaser.Geom.Rectangle(-150, -218, 300, 436.4214080647836), Phaser.Geom.Rectangle.Contains);
		playerCard1.scaleX = 0.7;
		playerCard1.scaleY = 0.7;
		playerCard1.visible = true;

		// moveInSceneActionScript_4
		const moveInSceneActionScript_4 = new MoveInSceneActionScript(playerCard1.onAwakeScript);

		// playerCard2
		const playerCard2 = new PrefabCard(this, 400, 850);
		this.add.existing(playerCard2);
		playerCard2.removeInteractive();
		playerCard2.setInteractive(new Phaser.Geom.Rectangle(-150, -218, 300, 436.4214080647836), Phaser.Geom.Rectangle.Contains);
		playerCard2.scaleX = 0.7;
		playerCard2.scaleY = 0.7;
		playerCard2.visible = false;

		// moveInSceneActionScript_2
		const moveInSceneActionScript_2 = new MoveInSceneActionScript(playerCard2.onAwakeScript);

		// opponenetCard2
		const opponenetCard2 = new PrefabCard(this, 400, 475);
		this.add.existing(opponenetCard2);
		opponenetCard2.removeInteractive();
		opponenetCard2.setInteractive(new Phaser.Geom.Rectangle(-150, -218, 300, 436.4214080647836), Phaser.Geom.Rectangle.Contains);
		opponenetCard2.scaleX = 0.7;
		opponenetCard2.scaleY = 0.7;
		opponenetCard2.visible = false;

		// moveInSceneActionScript_1
		const moveInSceneActionScript_1 = new MoveInSceneActionScript(opponenetCard2.onAwakeScript);

		// opponenetCard1
		const opponenetCard1 = new PrefabCard(this, 150, 475);
		this.add.existing(opponenetCard1);
		opponenetCard1.removeInteractive();
		opponenetCard1.setInteractive(new Phaser.Geom.Rectangle(-150, -218, 300, 436.4214080647836), Phaser.Geom.Rectangle.Contains);
		opponenetCard1.scaleX = 0.7;
		opponenetCard1.scaleY = 0.7;
		opponenetCard1.visible = true;

		// moveInSceneActionScript_3
		const moveInSceneActionScript_3 = new MoveInSceneActionScript(opponenetCard1.onAwakeScript);

		// opponentAdrenaline
		const opponentAdrenaline = new PrefabOpponentSkills(this, 968, 413);
		this.add.existing(opponentAdrenaline);

		// moveInSceneActionScript_4 (prefab fields)
		moveInSceneActionScript_4.from = "LEFT";

		// moveInSceneActionScript_2 (prefab fields)
		moveInSceneActionScript_2.from = "LEFT";

		// moveInSceneActionScript_1 (prefab fields)
		moveInSceneActionScript_1.from = "LEFT";

		// moveInSceneActionScript_3 (prefab fields)
		moveInSceneActionScript_3.from = "LEFT";

		this.showdownBackground = showdownBackground;
		this.statsContainer = statsContainer;
		this.info = info;
		this.opponent = opponent;
		this.confirmButton = confirmButton;
		this.opponentAttacks = opponentAttacks;
		this.playerBlock = playerBlock;
		this.opponentBlock = opponentBlock;
		this.playerAttacks = playerAttacks;
		this.playerSkills = playerSkills;
		this.opponenetMissText = opponenetMissText;
		this.playerMissText = playerMissText;
		this.moveInSceneActionScript_4 = moveInSceneActionScript_4;
		this.playerCard1 = playerCard1;
		this.moveInSceneActionScript_2 = moveInSceneActionScript_2;
		this.playerCard2 = playerCard2;
		this.moveInSceneActionScript_1 = moveInSceneActionScript_1;
		this.opponenetCard2 = opponenetCard2;
		this.moveInSceneActionScript_3 = moveInSceneActionScript_3;
		this.opponenetCard1 = opponenetCard1;

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
	/** @type {PrefabAttacks} */
	opponentAttacks;
	/** @type {PrefabPlayerDefense} */
	playerBlock;
	/** @type {PrefabOpponentBlock} */
	opponentBlock;
	/** @type {PrefabPlayerAttacks} */
	playerAttacks;
	/** @type {PrefabPlayerSkills} */
	playerSkills;
	/** @type {Phaser.GameObjects.Text} */
	opponenetMissText;
	/** @type {Phaser.GameObjects.Text} */
	playerMissText;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_4;
	/** @type {PrefabCard} */
	playerCard1;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_2;
	/** @type {PrefabCard} */
	playerCard2;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_1;
	/** @type {PrefabCard} */
	opponenetCard2;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_3;
	/** @type {PrefabCard} */
	opponenetCard1;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();

		this.loadAudioForShowdownResult()

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

		playerParrySwing = false

		opponentParrySwing = false

		playerDefenseAnimationFinished = false

		opponentDefenseAnimationFinished = false

		playerSkill = false

		opponentSkill = false

		playerSkillAnimationFinished = false

		opponentSkillAnimationFinished = false

		timer = 0

		this.playerAttacks.angle = -110

		this.opponentAttacks.angle = 40

		this.playerSkills.y = 1080

		this.confirmButton.visible = false

		this.loadStatsData(data)
		this.loadInfoData(data)
		this.loadOpponentData(data)
		this.confirmButtonGlow()
		this.loadPlayerAttack(data)
		this.loadPlayerDefense(data)
		this.loadPlayerSkill(data)
		this.loadOpponentAttack(data)
		this.loadOpponentDefence(data)
		this.loadCards(data)
		this.loadOpponentDamage(data)

		this.confirmButton.on("pointerdown", () => {
			ButtonSFX.play()
			this.setupNextTurn()
		})
	}

	loadAudioForShowdownResult(){
		if(!ShowdownBackgroundMusic.isPlaying){
			ShowdownBackgroundMusic.play()
		}
		OpponentCardSFX.play()
		PlayerCardSFX.play()
	}

	loadCards(data) {
		this.playerCard1.cardGlow.active = false
		this.playerCard2.cardGlow.active = false
		this.opponenetCard1.cardGlow.active = false
		this.opponenetCard2.cardGlow.active = false

		const playerCardColor = data.player_color.replace("#", "0x")

		const opponentCardColor = data.opponent_cards[0].player_color.replace("#", "0x")

		this.playerCard1.cardBorder.setTint(playerCardColor)
		this.playerCard1.cardName.text = data.player_cards[0].card_name
		this.playerCard1.cardImage.setTexture(data.player_cards[0].card_image_path)

		if (data.player_cards[1]) {
			this.playerCard2.visible = true
			this.playerCard2.cardBorder.setTint(playerCardColor)
			this.playerCard2.cardName.text = data.player_cards[1].card_name
			this.playerCard2.cardImage.setTexture(data.player_cards[1].card_image_path)
		}

		this.opponenetCard1.cardBorder.setTint(opponentCardColor)
		this.opponenetCard1.cardName.text = data.opponent_cards[0].card_name
		this.opponenetCard1.cardImage.setTexture(data.opponent_cards[0].card_image_path)

		if (data.opponent_cards[1]) {
			this.opponenetCard2.visible = true
			this.opponenetCard2.cardBorder.setTint(opponentCardColor)
			this.opponenetCard2.cardName.text = data.opponent_cards[1].card_name
			this.opponenetCard2.cardImage.setTexture(data.opponent_cards[1].card_image_path)
		}
	}

	loadPlayerAttack(data) {
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
	}

	loadPlayerDefense(data) {
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
		else if (data.player_cards[0].card_id == playerShowdownAnimations.Dodge.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Dodge.id)) {
			playerShowdownAnimations.Dodge.visible = true
			playerDefense = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.Parry.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Parry.id)) {
			playerShowdownAnimations.Parry.visible = true
			playerDefense = true
		}
	}

	loadPlayerSkill(data) {
		if (data.player_cards[0].card_id == playerShowdownAnimations.Anger.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Anger.id)) {
			playerShowdownAnimations.Anger.visible = true
			playerSkill = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.Rage.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Rage.id)) {
			playerShowdownAnimations.Rage.visible = true
			playerSkill = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.Focus.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Focus.id)) {
			playerShowdownAnimations.Focus.visible = true
			playerSkill = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.Adrenaline.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Adrenaline.id)) {
			playerShowdownAnimations.Adrenaline.visible = true
			playerSkill = true
		}
		else if (data.player_cards[0].card_id == playerShowdownAnimations.Healing.id || (data.player_cards[1] && data.player_cards[1].card_id == playerShowdownAnimations.Healing.id)) {
			playerShowdownAnimations.Healing.visible = true
			playerSkill = true
		}
	}

	loadOpponentAttack(data) {
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
	}

	loadOpponentDefence(data) {
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
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.Dodge.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.Dodge.id)) {
			opponentShowdownAnimations.Dodge.visible = true
			opponentDefense = true
		}
		else if (data.opponent_cards[0].card_id == opponentShowdownAnimations.Parry.id || (data.opponent_cards[1] && data.opponent_cards[1].card_id == opponentShowdownAnimations.Parry.id)) {
			opponentShowdownAnimations.Parry.visible = true
			opponentDefense = true
		}
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

		this.statsContainer.healthText.text = previousCurrentHealth + "/" +  previousMaxHealth
		this.statsContainer.insightText.text = previousInsight + "/10"
		this.statsContainer.energyText.text = previousEnergy
		this.statsContainer.mightText.text = previousDamage

		if(previousMaxHealth != maxHealth && previousCurrentHealth != currentHealth){
			var maxHealthDiff = maxHealth - previousMaxHealth
			var currentHealthDiff = currentHealth - previousCurrentHealth

			if(maxHealthDiff > 0 && currentHealthDiff > 0) {
				this.statsContainer.healthDifferenceText.text =  "+" + currentHealthDiff + "/+" + maxHealthDiff
			}
			else if (maxHealthDiff < 0 && currentHealthDiff < 0) {
				this.statsContainer.healthDifferenceText.text =   currentHealthDiff + "/" + maxHealthDiff
			}
			else if (maxHealthDiff > 0 && currentHealthDiff < 0) {
				this.statsContainer.healthDifferenceText.text =   currentHealthDiff + "/+" + maxHealthDiff
			}
			else if (maxHealthDiff < 0 && currentHealthDiff > 0) {
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
		const opponentColor = data.opponent_cards[0].player_color.replace("#", "0x")
		this.opponent.opponentName.text = data.opponent_cards[0].player_username
		this.opponent.opponentName.setColor(data.opponent_cards[0].player_color)	
		this.opponent.characterColor.setTint(opponentColor)
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

					this.scene.start("Showdown", data)
				}
			}
		}

		xhttp.open("POST", "/setupShowdown", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send()
	}

	loadOpponentDamage(data) {
		console.log(data.opponent_cards[0].current_health)
		if (data.opponent_cards[0].current_health > 20) {
			this.opponent.character.visible = true
			this.opponent.characterRipped1.visible = false
			this.opponent.characterRipped2.visible = false
		}
		if ((data.opponent_cards[0].current_health <= 20) && (data.opponent_cards[0].current_health > 10)) {
			this.opponent.character.visible = false
			this.opponent.characterRipped1.visible = true
			this.opponent.characterRipped2.visible = false
		}
		if (data.opponent_cards[0].current_health <= 10 || !data.opponent_cards[0].current_health) {
			this.opponent.character.visible = false
			this.opponent.characterRipped1.visible = false
			this.opponent.characterRipped2.visible = true
		}
		return
	}

	update(time, dt) {
		timer += dt
		if (timer > 1200) {
			if (playerSkill && !playerSkillAnimationFinished) {
				if (this.playerSkills.y > -2400) {
					if (playerShowdownAnimations.Anger.visible) {
						this.playerSkills.angerSkill.visible = true
					}
					else if (playerShowdownAnimations.Rage.visible) {
						this.playerSkills.rageSkill.visible = true
					}
					else if (playerShowdownAnimations.Focus.visible) {
						this.playerSkills.focusSkill.visible = true
					}
					else if (playerShowdownAnimations.Adrenaline.visible) {
						this.playerSkills.adrenalineSkill.visible = true
					}
					else if (playerShowdownAnimations.Healing.visible) {
						this.playerSkills.healingSkill.visible = true
					}
					this.playerSkills.y -= dt * 2
				}
				else {
					playerSkillAnimationFinished = true
				}
			}
			else if (playerAttack && !playerAttackAnimationFinished && (!opponentShowdownAnimations.Parry.visible || (opponentShowdownAnimations.Parry.visible && !opponentAttack || (opponentAttack && opponentAttackAnimationFinished)))) {
				this.loadPlayerAttackAnimations()
				if (opponentShowdownAnimations.Parry.visible) {
					this.opponentBlock.parry.visible = true
				}
				if (((this.playerAttacks.angle <= 130 && this.playerAttacks.angle >= 0) || 
				(this.playerAttacks.angle >= -120 && this.playerAttacks.angle <= 0)) && 
				!playerSecondSwing &&
				!this.opponentBlock.parry.visible) {
					this.playerAttacks.angle += dt / 3
					if (opponentDefense && !opponentDefenseAnimationFinished) {
						this.playOpponentDefenseAnimations(dt)
					}
				}
				else if ((this.playerAttacks.angle >= -120 && this.playerAttacks.angle <= 20) && 
				this.opponentBlock.parry.visible) {
					if (opponentDefense && !opponentDefenseAnimationFinished) {
						this.playOpponentParryAnimation(dt)
						if (!playerParrySwing) {
							this.playerAttacks.angle += dt / 3
						}
						else {
							this.playerAttacks.normal_Slash.flipX = true
							this.playerAttacks.heavy_Slash.flipX = true
							this.playerAttacks.recovery_Hit.flipX = true
							this.playerAttacks.counter_Slash.flipX = true
							this.playerAttacks.angle -= dt / 3
						}
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
				if (playerShowdownAnimations.Parry.visible) {
					this.playerBlock.parry.visible = true
				}
				if (((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 40) || 
				(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -40)) && 
				!opponentSecondSwing &&
				!this.playerBlock.parry.visible) {
					this.opponentAttacks.angle += dt / 3
					if (playerDefense && !playerDefenseAnimationFinished) {
						this.playPlayerDefenseAnimations(dt)
					}
				}
				else if (((this.opponentAttacks.angle >= 30 && this.opponentAttacks.angle <= 180) || 
				(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -160)) && 
				this.playerBlock.parry.visible) {
					if (playerDefense && !playerDefenseAnimationFinished) {
						this.playPlayerParryAnimation(dt)
						if (!opponentParrySwing) {
							this.opponentAttacks.angle += dt / 3
						}
						else {
							this.opponentAttacks.normal_Slash.flipX = true
							this.opponentAttacks.heavy_Slash.flipX = true
							this.opponentAttacks.recovery_Hit.flipX = true
							this.opponentAttacks.counter_Slash.flipX = true
							this.opponentAttacks.angle -= dt / 3
						}
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
		(!opponentDefense || (opponentDefense && (opponentDefenseAnimationFinished || !playerAttack))) && 
		(!playerDefense || (playerDefense && (playerDefenseAnimationFinished || !opponentAttack)))) {
			this.confirmButton.visible = true
		}
		else {
			this.confirmButton.visible = false
		}
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
		if (this.playerAttacks.angle <= 0) {
			if (this.opponentBlock.scale < 2.5) {
				this.opponentBlock.scale += dt / 256
			}
		}
		else if (this.opponentAttacks.angle >= 0) {
			if (this.opponentBlock.scale > 1) {
				this.opponentBlock.scale -= dt / 256
			}
		}
		if (this.opponentBlock.scale < 1) {
			this.opponentBlock.scale = 1
		}
		this.playOpponentDodgeAnimation(dt)
	}

	playOpponentDodgeAnimation(dt) {
		if (opponentShowdownAnimations.Dodge.visible) {
			if ((this.playerAttacks.angle <= 0) && this.opponent.character.scaleX > -1) {
				this.opponenetMissText.visible = true
				this.opponent.character.scaleX -= dt / 128
				this.opponent.characterRipped1.scaleX -= dt / 128
				this.opponent.characterRipped2.scaleX -= dt / 128
				this.opponent.characterColor.scaleX -= dt / 128
			}
			else if ((this.playerAttacks.angle >= 0) && this.opponent.character.scaleX < 1) {
				this.opponent.character.scaleX += dt / 128
				this.opponent.characterRipped1.scaleX += dt / 128
				this.opponent.characterRipped2.scaleX += dt / 128
				this.opponent.characterColor.scaleX += dt / 128
			}
		}

		if (this.opponent.character.scaleX > 1) {
			this.opponent.character.scaleX = 1
			this.opponent.characterRipped1.scaleX = 1
			this.opponent.characterRipped2.scaleX = 1
			this.opponent.characterColor.scaleX = 1
		}
	}

	playOpponentParryAnimation(dt) {
		if (opponentShowdownAnimations.Parry.visible) {
			this.opponentBlock.parry.visible = true
		}

		if (this.playerAttacks.angle <= 0 && !playerParrySwing) {
			if (this.opponentBlock.scale < 2.5) {
				this.opponentBlock.scale += dt / 256
			}
		}
		else if (!playerParrySwing) {
			playerParrySwing = true
		}
		else {
			if (this.opponentBlock.scale > 1) {
				this.opponentBlock.scale -= dt / 256
			}
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
		this.playPlayerDodgeAnimations(dt)
	}

	playPlayerDodgeAnimations(dt) {
		if (playerShowdownAnimations.Dodge.visible) {
			this.playerMissText.visible = true
		}
		if (((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 20) || 
			(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -140))) {
			if (this.playerMissText.y > 750) {
				this.playerMissText.y -= dt * 2
			}
			else if (this.playerMissText.y <= 750) {
				this.playerMissText.y == 750
			}
		}
		else if (this.opponentAttacks.angle >= -140 && this.opponentBlock.y < 1080) {
			this.playerMissText.y += dt * 2
		}
		if (this.playerMissText.y > 1080) {
			this.playerMissText.y == 1080
		}
	}

	playPlayerParryAnimation(dt) {
		if (playerShowdownAnimations.Parry.visible) {
			this.playerBlock.parry.visible = true
		}
		if (this.playerBlock.y > 600 && 
			(((this.opponentAttacks.angle <= 180 && this.opponentAttacks.angle >= 20) || 
			(this.opponentAttacks.angle >= -180 && this.opponentAttacks.angle <= -160)) && 
			!opponentParrySwing)) {
			this.playerBlock.y -= dt * 1.2
		}
		else if (!opponentParrySwing) {
			opponentParrySwing = true
		}
		else if (this.playerBlock.y < 1080) {
			this.playerBlock.y += dt * 1.2
		}
		if (this.playerBlock.y > 1080) {
			this.playerBlock.y == 1080
		}
	}

	playPlayerSecondSwing(dt) {
		if (playerParrySwing && !playerSecondSwing) {
			this.playerAttacks.angle = 130
			playerSecondSwing = true
		}
		playerSecondSwing = true
		this.opponenetMissText.visible = false
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
		if (opponentParrySwing && !opponentSecondSwing) {
			this.opponentAttacks.angle = -30
			opponentSecondSwing = true
		}
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
		this.opponentBlock.parry.visible = false
		this.opponenetMissText.visible = false
		opponentDefenseAnimationFinished = true
	}

	finishPlayerDefenseAnimations() {
		this.playerBlock.clumsyBlock.visible = false
		this.playerBlock.solidBlock.visible = false
		this.playerBlock.impressiveBlock.visible = false
		this.playerMissText.visible = false
		playerDefenseAnimationFinished = true
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
