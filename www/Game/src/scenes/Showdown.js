
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

		// skillSlot
		const skillSlot = new PrefabCard(this, 1440, 800);
		this.add.existing(skillSlot);
		skillSlot.visible = true;

		// defenseSlot
		const defenseSlot = new PrefabCard(this, 1120, 800);
		this.add.existing(defenseSlot);
		defenseSlot.visible = true;

		// specialAttackSlot
		const specialAttackSlot = new PrefabCard(this, 800, 800);
		this.add.existing(specialAttackSlot);
		specialAttackSlot.visible = true;

		// normalAttackSlot
		const normalAttackSlot = new PrefabCard(this, 480, 800);
		this.add.existing(normalAttackSlot);
		normalAttackSlot.visible = true;

		// statsContainer
		const statsContainer = new PrefabStats(this, 120, 50);
		this.add.existing(statsContainer);
		statsContainer.scaleX = 2;
		statsContainer.scaleY = 2;

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1760, 800);
		this.add.existing(confirmButton);

		// skillSlot (prefab fields)
		skillSlot.cardId = 0;
		skillSlot.isVisible = true;

		// defenseSlot (prefab fields)
		defenseSlot.cardId = 0;
		defenseSlot.isVisible = true;

		// specialAttackSlot (prefab fields)
		specialAttackSlot.cardId = 0;
		specialAttackSlot.isVisible = true;

		// normalAttackSlot (prefab fields)
		normalAttackSlot.cardId = 0;
		normalAttackSlot.isVisible = true;

		this.prefabOpponent = prefabOpponent;
		this.skillSlot = skillSlot;
		this.defenseSlot = defenseSlot;
		this.specialAttackSlot = specialAttackSlot;
		this.normalAttackSlot = normalAttackSlot;
		this.statsContainer = statsContainer;
		this.info = info;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabOpponent} */
	prefabOpponent;
	/** @type {PrefabCard} */
	skillSlot;
	/** @type {PrefabCard} */
	defenseSlot;
	/** @type {PrefabCard} */
	specialAttackSlot;
	/** @type {PrefabCard} */
	normalAttackSlot;
	/** @type {PrefabStats} */
	statsContainer;
	/** @type {PrefabInfo} */
	info;
	/** @type {PrefabNextRoom} */
	confirmButton;

	/* START-USER-CODE */

	// Write your code here


	create(data) {

		this.editorCreate();

		//load Data
		this.loadInfoData(data)
		this.loadStatsData(data)
		this.loadCardData(data)

		//Create events
		this.normalAttackSlot.on("pointerdown", () => {
			if (!this.normalAttackSlot.isSelected) {
				this.normalAttackSlot.isSelected = true
				this.specialAttackSlot.isSelected = false
				this.defenseSlot.isSelected = false
				this.skillSlot.isSelected = false
				this.normalAttackSlot.setY(600)
				this.specialAttackSlot.setY(800)
				this.defenseSlot.setY(800)
				this.skillSlot.setY(800)
			}
			else {
				this.normalAttackSlot.setY(800)
				this.normalAttackSlot.isSelected = false
			}
		})

		this.specialAttackSlot.on("pointerdown", () => {
			if (!this.specialAttackSlot.isSelected) {
				this.normalAttackSlot.isSelected = false
				this.specialAttackSlot.isSelected = true
				this.defenseSlot.isSelected = false
				this.skillSlot.isSelected = false
				this.normalAttackSlot.setY(800)
				this.specialAttackSlot.setY(600)
				this.defenseSlot.setY(800)
				this.skillSlot.setY(800)
			}
			else {
				this.specialAttackSlot.setY(800)
				this.specialAttackSlot.isSelected = false
			}
		})

		this.defenseSlot.on("pointerdown", () => {
			if (!this.defenseSlot.isSelected) {
				this.normalAttackSlot.isSelected = false
				this.specialAttackSlot.isSelected = false
				this.defenseSlot.isSelected = true
				this.skillSlot.isSelected = false
				this.normalAttackSlot.setY(800)
				this.specialAttackSlot.setY(800)
				this.defenseSlot.setY(600)
				this.skillSlot.setY(800)
			}
			else {
				this.defenseSlot.setY(800)
				this.defenseSlot.isSelected = false
			}
		})

		this.skillSlot.on("pointerdown", () => {
			if (!this.skillSlot.isSelected) {
				this.normalAttackSlot.isSelected = false
				this.specialAttackSlot.isSelected = false
				this.defenseSlot.isSelected = false
				this.skillSlot.isSelected = true
				this.normalAttackSlot.setY(800)
				this.specialAttackSlot.setY(800)
				this.defenseSlot.setY(800)
				this.skillSlot.setY(600)
			}
			else {
				this.skillSlot.setY(800)
				this.skillSlot.isSelected = false
			}
		})

		this.normalAttackSlot.on("pointerover", () => {
			console.log(this.normalAttackSlot)
			this.normalAttackSlot.cardGlow.active = true
			this.normalAttackSlot.cardDescription.visible = true

		})
		this.normalAttackSlot.on("pointerout", () => {
			this.normalAttackSlot.cardGlow.active = false
			this.normalAttackSlot.cardDescription.visible = false
		})

		this.specialAttackSlot.on("pointerover", () => {
			this.specialAttackSlot.cardGlow.active = true
			this.specialAttackSlot.cardDescription.visible = true

		})
		this.specialAttackSlot.on("pointerout", () => {
			this.specialAttackSlot.cardGlow.active = false
			this.specialAttackSlot.cardDescription.visible = false
		})

		this.defenseSlot.on("pointerover", () => {
			this.defenseSlot.cardGlow.active = true
			this.defenseSlot.cardDescription.visible = true

		})
		this.defenseSlot.on("pointerout", () => {
			this.defenseSlot.cardGlow.active = false
			this.defenseSlot.cardDescription.visible = false
		})

		this.skillSlot.on("pointerover", () => {
			this.skillSlot.cardGlow.active = true
			this.skillSlot.cardDescription.visible = true

		})
		this.skillSlot.on("pointerout", () => {
			this.skillSlot.cardGlow.active = false
			this.skillSlot.cardDescription.visible = false
		})

		this.confirmButton.glowFx.active = false

		this.confirmButton.on("pointerover", () => {
			console.log(this.confirmButton)
			this.confirmButton.glowFx.active = true

		})


		this.confirmButton.on("pointerout", () => {
			this.confirmButton.glowFx.active = false
		})

		this.confirmButton.on("pointerdown", () =>{
			//
		})
	}

	sortShowdownCards(cardA, cardB) {
			return cardA.slot_id - cardB.slot_id
	};

	loadInfoData(data) {
		//Load Info

		this.info.phaseName.text = "SHOWDOWN"
		this.info.roomOrTurn.text = "Turn " + data.showdown_turn
		this.info.playerName.text = data.player_username
		this.info.playerName.setColor(data.player_color)
		return;
	}

	loadStatsData(data) {
		//Load Stats

		var maxHealth = data.max_health
		var currentHealth = data.current_health
		var energy = data.energy
		var insight = data.insight
		var damage = data.damage

		if(isNaN(previousMaxHealth)) {
				previousMaxHealth = maxHealth
			}
			if(isNaN(previousCurrentHealth)) {
				previousCurrentHealth = currentHealth
			}
			if(isNaN(previousEnergy)) {
				previousEnergy = energy
			}
			if(isNaN(previousInsight)) {
				previousInsight = insight
			}
			if(isNaN(previousDamage)) {
				previousDamage = damage
		}

		this.statsContainer.healthText.text = currentHealth + "/" +  maxHealth;
		this.statsContainer.insightText.text = insight + "/10";
		this.statsContainer.energyText.text = energy;
		this.statsContainer.mightText.text = damage;

		return;
	}

	loadCardData(data){

		data.card.sort(this.sortShowdownCards);

		const cardColor = data.player_color.replace("#", "0x")

		//Normal Attack
		this.normalAttackSlot.cardId = data.card[0].card_id
		this.normalAttackSlot.cardBorder.setTint(cardColor)
		this.normalAttackSlot.cardGlow.active = false

		this.normalAttackSlot.cardName.text = data.card[0].card_name
		this.normalAttackSlot.cardImage.setTexture(data.card[0].card_image_path);
		this.normalAttackSlot.cardDescription.text = ""

		//Special Attack
		this.specialAttackSlot.cardId = data.card[1].card_id
		this.specialAttackSlot.isVisible = data.card[1].is_visible
		this.specialAttackSlot.cardBorder.setTint(cardColor)
		this.specialAttackSlot.cardGlow.active = false

		if(this.specialAttackSlot.isVisible) {
			this.specialAttackSlot.cardName.text = data.card[1].card_name
			this.specialAttackSlot.cardImage.setTexture(data.card[1].card_image_path);
			this.specialAttackSlot.cardDescription.text
		}
		else{
			this.specialAttackSlot.cardName.text = "? ? ?"
			this.specialAttackSlot.cardImage.setTexture("HiddenDraft");
			this.specialAttackSlot.cardDescription.text = "Not enough insight to see the card"
		}

		//Defense Attack
		this.defenseSlot.cardId = data.card[2].card_id
		this.defenseSlot.isVisible = data.card[2].is_visible
		this.defenseSlot.cardBorder.setTint(cardColor)
		this.defenseSlot.cardGlow.active = false

		if(this.defenseSlot.isVisible) {
			this.defenseSlot.cardName.text = data.card[2].card_name
			this.defenseSlot.cardImage.setTexture(data.card[2].card_image_path);
			this.defenseSlot.cardDescription.text
		}
		else{
			this.defenseSlot.cardName.text = "? ? ?"
			this.defenseSlot.cardImage.setTexture("HiddenDraft");
			this.defenseSlot.cardDescription.text = "Not enough insight to see the card"
		}

		//Skill Attack
		this.skillSlot.cardId = data.card[3].card_id
		this.skillSlot.isVisible = data.card[3].is_visible
		this.skillSlot.cardBorder.setTint(cardColor)
		this.skillSlot.cardGlow.active = false

		if(this.skillSlot.isVisible) {
			this.skillSlot.cardName.text = data.card[3].card_name
			this.skillSlot.cardImage.setTexture(data.card[3].card_image_path);
			this.skillSlot.cardDescription.text
		}
		else{
			this.skillSlot.cardName.text = "? ? ?"
			this.skillSlot.cardImage.setTexture("HiddenDraft");
			this.skillSlot.cardDescription.text = "Not enough insight to see the card"
		}

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
