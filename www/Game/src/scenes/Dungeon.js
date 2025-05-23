
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

		// statsContainer
		const statsContainer = new PrefabStats(this, 120, 50);
		this.add.existing(statsContainer);

		// slot3Card
		const slot3Card = new PrefabCard(this, 1320, 800);
		this.add.existing(slot3Card);

		// moveInSceneActionScript_1
		const moveInSceneActionScript_1 = new MoveInSceneActionScript(slot3Card.onAwakeScript);

		// onPointerDownScript_3
		const onPointerDownScript_3 = new OnPointerDownScript(slot3Card);

		// pushActionScript_3
		const pushActionScript_3 = new PushActionScript(onPointerDownScript_3);

		// slot2Card
		const slot2Card = new PrefabCard(this, 960, 800);
		this.add.existing(slot2Card);

		// moveInSceneActionScript_2
		const moveInSceneActionScript_2 = new MoveInSceneActionScript(slot2Card.onAwakeScript);

		// onPointerDownScript_2
		const onPointerDownScript_2 = new OnPointerDownScript(slot2Card);

		// pushActionScript_2
		const pushActionScript_2 = new PushActionScript(onPointerDownScript_2);

		// slot1Card
		const slot1Card = new PrefabCard(this, 600, 800);
		this.add.existing(slot1Card);

		// moveInSceneActionScript_3
		const moveInSceneActionScript_3 = new MoveInSceneActionScript(slot1Card.onAwakeScript);

		// onPointerDownScript_1
		const onPointerDownScript_1 = new OnPointerDownScript(slot1Card);

		// pushActionScript_1
		const pushActionScript_1 = new PushActionScript(onPointerDownScript_1);

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// onwardButton
		const onwardButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(onwardButton);
		onwardButton.visible = true;

		// slot3Card (prefab fields)
		slot3Card.cardId = 0;
		slot3Card.isVisible = true;
		slot3Card.isDisabled = false;

		// moveInSceneActionScript_1 (prefab fields)
		moveInSceneActionScript_1.from = "BOTTOM";

		// slot2Card (prefab fields)
		slot2Card.cardId = 0;
		slot2Card.isVisible = true;
		slot2Card.isDisabled = false;

		// moveInSceneActionScript_2 (prefab fields)
		moveInSceneActionScript_2.from = "BOTTOM";

		// slot1Card (prefab fields)
		slot1Card.cardId = 0;
		slot1Card.isVisible = true;
		slot1Card.isDisabled = false;

		// moveInSceneActionScript_3 (prefab fields)
		moveInSceneActionScript_3.from = "BOTTOM";

		this.statsContainer = statsContainer;
		this.moveInSceneActionScript_1 = moveInSceneActionScript_1;
		this.pushActionScript_3 = pushActionScript_3;
		this.onPointerDownScript_3 = onPointerDownScript_3;
		this.slot3Card = slot3Card;
		this.moveInSceneActionScript_2 = moveInSceneActionScript_2;
		this.pushActionScript_2 = pushActionScript_2;
		this.onPointerDownScript_2 = onPointerDownScript_2;
		this.slot2Card = slot2Card;
		this.moveInSceneActionScript_3 = moveInSceneActionScript_3;
		this.pushActionScript_1 = pushActionScript_1;
		this.onPointerDownScript_1 = onPointerDownScript_1;
		this.slot1Card = slot1Card;
		this.info = info;
		this.onwardButton = onwardButton;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabStats} */
	statsContainer;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_1;
	/** @type {PushActionScript} */
	pushActionScript_3;
	/** @type {OnPointerDownScript} */
	onPointerDownScript_3;
	/** @type {PrefabCard} */
	slot3Card;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_2;
	/** @type {PushActionScript} */
	pushActionScript_2;
	/** @type {OnPointerDownScript} */
	onPointerDownScript_2;
	/** @type {PrefabCard} */
	slot2Card;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_3;
	/** @type {PushActionScript} */
	pushActionScript_1;
	/** @type {OnPointerDownScript} */
	onPointerDownScript_1;
	/** @type {PrefabCard} */
	slot1Card;
	/** @type {PrefabInfo} */
	info;
	/** @type {PrefabNextRoom} */
	onwardButton;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();


		//Load Info
		console.log(data.player_color)
		this.info.phaseName.text = "DUNGEON"
		this.onwardButton.confirmButtonText.text = "Onward!"
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

		this.slot1Card.cardGlow.active = false

		if(this.slot1Card.isVisible) {
			this.slot1Card.cardName.text = data.card[0].card_name
			this.slot1Card.cardImage.setTexture(data.card[0].card_image_path);
			this.slot1Card.cardDescription.text
		}
		else{
			this.slot1Card.cardName.text = "? ? ?"
			this.slot1Card.cardImage.setTexture("HiddenDraft");
			this.slot1Card.cardDescription.text = "Not enough insight to see the card"
		}

		this.slot2Card.cardId = data.card[1].card_id
		this.slot2Card.isVisible = data.card[1].is_visible

		this.slot2Card.cardBorder.setTint(cardColor)

		this.slot2Card.cardGlow.active = false

		if(this.slot2Card.isVisible) {
			this.slot2Card.cardName.text = data.card[1].card_name
			this.slot2Card.cardImage.setTexture(data.card[1].card_image_path);
			this.slot2Card.cardDescription.text
		}
		else{
			this.slot2Card.cardName.text = "? ? ?"
			this.slot2Card.cardImage.setTexture("HiddenDraft");
			this.slot2Card.cardDescription.text = "Not enough insight to see the card"
		}

		this.slot3Card.cardId = data.card[2].card_id
		this.slot3Card.isVisible = data.card[2].is_visible

		this.slot3Card.cardBorder.setTint(cardColor)

		this.slot3Card.cardGlow.active = false

		if(this.slot3Card.isVisible) {
			this.slot3Card.cardName.text = data.card[2].card_name
			this.slot3Card.cardImage.setTexture(data.card[2].card_image_path); 
			this.slot3Card.cardDescription.text
		}
		else{
			this.slot3Card.cardName.text = "? ? ?"
			this.slot3Card.cardImage.setTexture("HiddenDraft");
			this.slot3Card.cardDescription.text = "Not enough insight to see the card"
		}

		this.slot1Card.on("pointerdown", () => {
			if (!this.slot1Card.isSelected) {
				this.slot1Card.isSelected = true
				this.slot2Card.isSelected = false
				this.slot3Card.isSelected = false
				this.slot1Card.setY(600)
				this.slot2Card.setY(800)
				this.slot3Card.setY(800)
			}
			else {
				this.slot1Card.setY(800)
				this.slot1Card.isSelected = false
			}
		})

		this.slot2Card.on("pointerdown", () => {
			if (!this.slot2Card.isSelected) {
				this.slot1Card.isSelected = false
				this.slot2Card.isSelected = true
				this.slot3Card.isSelected = false
				this.slot1Card.setY(800)
				this.slot2Card.setY(600)
				this.slot3Card.setY(800)
			}
			else {
				this.slot2Card.setY(800)
				this.slot2Card.isSelected = false
			}
		})

		this.slot3Card.on("pointerdown", () => {
			if (!this.slot3Card.isSelected) {
				this.slot1Card.isSelected = false
				this.slot2Card.isSelected = false
				this.slot3Card.isSelected = true
				this.slot1Card.setY(800)
				this.slot2Card.setY(800)
				this.slot3Card.setY(600)
			}
			else {
				this.slot3Card.setY(800)
				this.slot3Card.isSelected = false
			}
		})

		this.slot1Card.on("pointerover", () => {
			console.log(this.slot1Card)
			this.slot1Card.cardGlow.active = true
			this.slot1Card.cardDescription.visible = true

		})
		this.slot1Card.on("pointerout", () => {
			this.slot1Card.cardGlow.active = false
			this.slot1Card.cardDescription.visible = false
		})

		this.slot2Card.on("pointerover", () => {
			this.slot2Card.cardGlow.active = true
			this.slot2Card.cardDescription.visible = true

		})
		this.slot2Card.on("pointerout", () => {
			this.slot2Card.cardGlow.active = false
			this.slot2Card.cardDescription.visible = false
		})

		this.slot3Card.on("pointerover", () => {
			this.slot3Card.cardGlow.active = true
			this.slot3Card.cardDescription.visible = true

		})
		this.slot3Card.on("pointerout", () => {
			this.slot3Card.cardGlow.active = false
			this.slot3Card.cardDescription.visible = false
		})
		
		this.onwardButton.glowFx.active = false
		
		this.onwardButton.on("pointerover", () => {
			console.log(this.onwardButton)
			this.onwardButton.glowFx.active = true

		})
		

		this.onwardButton.on("pointerout", () => {
			this.onwardButton.glowFx.active = false
		})

		this.onwardButton.on("pointerdown", () =>{
			this.ConfirmDungeonChoice()
		})

	}

	update() {

		//If any card is selected make the button visible
		if (this.slot1Card.isSelected || this.slot2Card.isSelected || this.slot3Card.isSelected) {
			this.onwardButton.visible = true
		}
		else {
			this.onwardButton.visible = false
		}
	}

	sortCards(cardA, cardB) {
			return cardA.slot_id - cardB.slot_id
	};

	ConfirmDungeonChoice() {

		//determine which card is selected
		if (this.slot1Card.isSelected) {
			var dataToSend = {  
			"cardId": this.slot1Card.cardId
			}
		}
		if (this.slot2Card.isSelected) {
			var dataToSend = {  
			"cardId": this.slot2Card.cardId
			}
		}
		if (this.slot3Card.isSelected) {
			var dataToSend = {  
			"cardId": this.slot3Card.cardId
			}
		}


		var xhttp = new XMLHttpRequest();


		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					if (data.state == "NEXT_ROOM") {
						this.scene.start("DungeonResult", data)
					}
					else if (data.state == "WAITING_FOR_OPP") {
						this.scene.start("DungeonWaitingOnOpponent")
					}
				}
			}
		}

		xhttp.open("POST", "/resolveDungeonTurn", true);

		xhttp.setRequestHeader("Content-Type", "application/json");

		xhttp.send(JSON.stringify(dataToSend));
	}



	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
