
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
		this.add.image(960, 540, "DungeonBackground");

		// StatsContainer
		const statsContainer = new PrefabStats(this, 120, 50);
		this.add.existing(statsContainer);

		// slot3Card
		const slot3Card = new PrefabCard(this, 1320, 800);
		this.add.existing(slot3Card);

		// slot2Card
		const slot2Card = new PrefabCard(this, 960, 800);
		this.add.existing(slot2Card);

		// slot1Card
		const slot1Card = new PrefabCard(this, 600, 800);
		this.add.existing(slot1Card);

		// prefabNextRoom
		const prefabNextRoom = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(prefabNextRoom);

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// slot3Card (prefab fields)
		slot3Card.cardId = 0;
		slot3Card.isVisible = true;
		slot3Card.isDisabled = false;

		// slot2Card (prefab fields)
		slot2Card.cardId = 0;
		slot2Card.isVisible = true;
		slot2Card.isDisabled = false;

		// slot1Card (prefab fields)
		slot1Card.cardId = 0;
		slot1Card.isVisible = true;
		slot1Card.isDisabled = false;

		this.statsContainer = statsContainer;
		this.slot3Card = slot3Card;
		this.slot2Card = slot2Card;
		this.slot1Card = slot1Card;
		this.prefabNextRoom = prefabNextRoom;
		this.info = info;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabStats} */
	statsContainer;
	/** @type {PrefabCard} */
	slot3Card;
	/** @type {PrefabCard} */
	slot2Card;
	/** @type {PrefabCard} */
	slot1Card;
	/** @type {PrefabNextRoom} */
	prefabNextRoom;
	/** @type {PrefabInfo} */
	info;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();


		//Load Info
		console.log(data.player_color)
		this.info.phaseName.text = "DUNGEON"
		this.info.roomOrTurn.text = "Room " + data.room_id
		this.info.playerName.text = data.player_username
		this.info.playerName.setColor(data.player_color)

		//Load Stats

		var maxHealth = data.max_health
		var currentHealth = data.current_health
		var energy = data.energy
		var insight = data.insight
		var damage = data.damage
		
		var previousMaxHealth
		var previousCurrentHealth
		var previousEnergy
		var previousInsight
		var previousDamage

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


		//Load Cards
		data.card.sort(this.sortCards);

		this.slot1Card.cardId = data.card[0].card_id
		this.slot1Card.isVisible = data.card[0].is_visible

		const cardColor = data.player_color.replace("#", "0x")

		this.slot1Card.cardBorder.setTint(cardColor)

		if(this.slot1Card.isVisible) {
			this.slot1Card.cardName.text = data.card[0].card_name
			this.slot1Card.cardImage.setTexture(data.card[0].card_image_path);
			this.slot1Card.cardDescription.text
		}
		else{
			this.slot1Card.cardName.text = "? ? ?"
			this.slot1Card.cardImage.setTexture("HiddenDraft.png");
			this.slot1Card.cardDescription.text = "Not enough insight to see the card"
		}

		this.slot2Card.cardId = data.card[1].card_id
		this.slot2Card.isVisible = data.card[1].is_visible

		this.slot2Card.cardBorder.setTint(cardColor)

		if(this.slot2Card.isVisible) {
			this.slot2Card.cardName.text = data.card[1].card_name
			this.slot2Card.cardImage.setTexture(data.card[1].card_image_path);
			this.slot2Card.cardDescription.text
		}
		else{
			this.slot2Card.cardName.text = "? ? ?"
			this.slot2Card.cardImage.setTexture("HiddenDraft.png");
			this.slot2Card.cardDescription.text = "Not enough insight to see the card"
		}

		this.slot3Card.cardId = data.card[2].card_id
		this.slot3Card.isVisible = data.card[2].is_visible

		this.slot3Card.cardBorder.setTint(cardColor)

		if(this.slot3Card.isVisible) {
			this.slot3Card.cardName.text = data.card[2].card_name
			this.slot3Card.cardImage.setTexture(data.card[2].card_image_path); 
			this.slot3Card.cardDescription.text
		}
		else{
			this.slot3Card.cardName.text = "? ? ?"
			this.slot3Card.cardImage.setTexture("HiddenDraft.png");
			this.slot3Card.cardDescription.text = "Not enough insight to see the card"
		}
		
		this.slot1Card.on("pointerdown", () => {
			if (!this.slot1Card.isSelected) {
				this.slot1Card.setY(600)
				this.slot1Card.isSelected = true
			}
			else {
				this.slot1Card.setY(800)
				this.slot1Card.isSelected = false
			}
		})
	}

	update(data) {
		// Im crazy and Im making a subscription EVERY FRAME
	}

	sortCards(cardA, cardB) {
			return cardA.slot_id - cardB.slot_id
	};

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
