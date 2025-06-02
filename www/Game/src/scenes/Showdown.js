
// You can write more code here
var normalAttackCard
var specialAttackCard
var defenseCard
var skillCard


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

		// opponent
		const opponent = new PrefabOpponent(this, 960, 500);
		this.add.existing(opponent);
		opponent.scaleX = 1;
		opponent.scaleY = 1;

		// skillSlot
		const skillSlot = new PrefabCard(this, 1440, 800);
		this.add.existing(skillSlot);
		skillSlot.visible = true;

		// moveInSceneActionScript_4
		const moveInSceneActionScript_4 = new MoveInSceneActionScript(skillSlot.onAwakeScript);

		// defenseSlot
		const defenseSlot = new PrefabCard(this, 1120, 800);
		this.add.existing(defenseSlot);
		defenseSlot.visible = true;

		// moveInSceneActionScript_2
		const moveInSceneActionScript_2 = new MoveInSceneActionScript(defenseSlot.onAwakeScript);

		// specialAttackSlot
		const specialAttackSlot = new PrefabCard(this, 800, 800);
		this.add.existing(specialAttackSlot);
		specialAttackSlot.visible = true;

		// moveInSceneActionScript_1
		const moveInSceneActionScript_1 = new MoveInSceneActionScript(specialAttackSlot.onAwakeScript);

		// normalAttackSlot
		const normalAttackSlot = new PrefabCard(this, 480, 800);
		this.add.existing(normalAttackSlot);
		normalAttackSlot.visible = true;

		// moveInSceneActionScript_3
		const moveInSceneActionScript_3 = new MoveInSceneActionScript(normalAttackSlot.onAwakeScript);

		// statsContainer
		const statsContainer = new PrefabStats(this, 120, 50);
		this.add.existing(statsContainer);

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1760, 800);
		this.add.existing(confirmButton);

		// skillSlot (prefab fields)
		skillSlot.cardId = 0;
		skillSlot.isVisible = true;

		// moveInSceneActionScript_4 (prefab fields)
		moveInSceneActionScript_4.from = "BOTTOM";

		// defenseSlot (prefab fields)
		defenseSlot.cardId = 0;
		defenseSlot.isVisible = true;

		// moveInSceneActionScript_2 (prefab fields)
		moveInSceneActionScript_2.from = "BOTTOM";

		// specialAttackSlot (prefab fields)
		specialAttackSlot.cardId = 0;
		specialAttackSlot.isVisible = true;

		// moveInSceneActionScript_1 (prefab fields)
		moveInSceneActionScript_1.from = "BOTTOM";

		// normalAttackSlot (prefab fields)
		normalAttackSlot.cardId = 0;
		normalAttackSlot.isVisible = true;

		// moveInSceneActionScript_3 (prefab fields)
		moveInSceneActionScript_3.from = "BOTTOM";

		this.opponent = opponent;
		this.moveInSceneActionScript_4 = moveInSceneActionScript_4;
		this.skillSlot = skillSlot;
		this.moveInSceneActionScript_2 = moveInSceneActionScript_2;
		this.defenseSlot = defenseSlot;
		this.moveInSceneActionScript_1 = moveInSceneActionScript_1;
		this.specialAttackSlot = specialAttackSlot;
		this.moveInSceneActionScript_3 = moveInSceneActionScript_3;
		this.normalAttackSlot = normalAttackSlot;
		this.statsContainer = statsContainer;
		this.info = info;
		this.confirmButton = confirmButton;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabOpponent} */
	opponent;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_4;
	/** @type {PrefabCard} */
	skillSlot;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_2;
	/** @type {PrefabCard} */
	defenseSlot;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_1;
	/** @type {PrefabCard} */
	specialAttackSlot;
	/** @type {MoveInSceneActionScript} */
	moveInSceneActionScript_3;
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

		//Check if Ending
		if(data.state == 8 || data.state == 9 || data.state == 10){
			this.scene.start("Ending", data)
		}
		else{
			//load Data
			this.loadInfoData(data)
			this.loadStatsData(data)
			this.loadCardData(data)
			this.loadOpponentData(data)
			this.loadOpponentDamage(data)

			//Create events
			this.loadCardClickEvents()
			this.loadCardHoverEvents()
			this.loadButtonHoverEvents()

			this.confirmButton.on("pointerdown", () => {
				this.ConfirmShowdownChoice()
			})
		}
	}

	loadCardClickEvents(){
		this.normalAttackSlot.on("pointerdown", () => {
			if (!this.normalAttackSlot.isDisabled) {
				if (!this.normalAttackSlot.isSelected) {
					if (this.defenseSlot.isSelected && this.skillSlot.isSelected) {
						this.normalAttackSlot.isSelected = true
						this.defenseSlot.isSelected = false
						this.normalAttackSlot.setY(600)
						this.defenseSlot.setY(800)
					}
					else {
						this.normalAttackSlot.isSelected = true
						this.normalAttackSlot.setY(600)
					}
				}
				else {
					this.normalAttackSlot.isSelected = false
					this.normalAttackSlot.setY(800)
				}
			}
		})

		this.specialAttackSlot.on("pointerdown", () => {
			if (!this.specialAttackSlot.isDisabled) {
				if (!this.specialAttackSlot.isSelected) {
					if (this.defenseSlot.isSelected && this.skillSlot.isSelected) {
						this.specialAttackSlot.isSelected = true
						this.defenseSlot.isSelected = false
						this.specialAttackSlot.setY(600)
						this.defenseSlot.setY(800)
					}
					else {
						this.specialAttackSlot.isSelected = true
						this.specialAttackSlot.setY(600)
					}
				}
				else {
					this.specialAttackSlot.isSelected = false
					this.specialAttackSlot.setY(800)
				}
			}
		})

		this.defenseSlot.on("pointerdown", () => {
			if (!this.defenseSlot.isDisabled) {
				if (!this.defenseSlot.isSelected) {
					if (this.normalAttackSlot.isSelected && this.skillSlot.isSelected) {
						this.defenseSlot.isSelected = true
						this.skillSlot.isSelected = false
						this.defenseSlot.setY(600)
						this.skillSlot.setY(800)
					}
					else if (this.specialAttackSlot.isSelected && this.skillSlot.isSelected) {
						this.defenseSlot.isSelected = true
						this.skillSlot.isSelected = false
						this.defenseSlot.setY(600)
						this.skillSlot.setY(800)
					}
					else {
						this.defenseSlot.isSelected = true
						this.defenseSlot.setY(600)
					}
				}
				else {
					this.defenseSlot.setY(800)
					this.defenseSlot.isSelected = false
				}
			}
		})

		this.skillSlot.on("pointerdown", () => {
			if (!this.skillSlot.isDisabled) {
				if (!this.skillSlot.isSelected) {
					if (this.normalAttackSlot.isSelected && this.defenseSlot.isSelected) {
						this.defenseSlot.isSelected = false
						this.skillSlot.isSelected = true
						this.defenseSlot.setY(800)
						this.skillSlot.setY(600)
					}
					else if (this.specialAttackSlot.isSelected && this.defenseSlot.isSelected) {
						this.defenseSlot.isSelected = false
						this.skillSlot.isSelected = true
						this.defenseSlot.setY(800)
						this.skillSlot.setY(600)
					}
					else {
						this.skillSlot.isSelected = true
						this.skillSlot.setY(600)
					}
				}
				else {
					this.skillSlot.setY(800)
					this.skillSlot.isSelected = false
				}
			}
		})
	}

	loadCardHoverEvents(){
		this.normalAttackSlot.on("pointerover", () => {
			if (!this.normalAttackSlot.isDisabled) {
				this.normalAttackSlot.cardGlow.active = true
				this.normalAttackSlot.cardDescription.visible = true
				this.normalAttackSlot.cardDescriptionTextBox.visible = true
			}

		})
		this.normalAttackSlot.on("pointerout", () => {
			this.normalAttackSlot.cardGlow.active = false
			this.normalAttackSlot.cardDescription.visible = false
			this.normalAttackSlot.cardDescriptionTextBox.visible = false
		})

		this.specialAttackSlot.on("pointerover", () => {
			if (!this.specialAttackSlot.isDisabled) {
				this.specialAttackSlot.cardGlow.active = true
				this.specialAttackSlot.cardDescription.visible = true
				this.specialAttackSlot.cardDescriptionTextBox.visible = true
			}

		})
		this.specialAttackSlot.on("pointerout", () => {
			this.specialAttackSlot.cardGlow.active = false
			this.specialAttackSlot.cardDescription.visible = false
			this.specialAttackSlot.cardDescriptionTextBox.visible = false
		})

		this.defenseSlot.on("pointerover", () => {
			if (!this.defenseSlot.isDisabled) {
				this.defenseSlot.cardGlow.active = true
				this.defenseSlot.cardDescription.visible = true
				this.defenseSlot.cardDescriptionTextBox.visible = true
			}
		})
		this.defenseSlot.on("pointerout", () => {
			this.defenseSlot.cardGlow.active = false
			this.defenseSlot.cardDescription.visible = false
			this.defenseSlot.cardDescriptionTextBox.visible = false
		})

		this.skillSlot.on("pointerover", () => {
			if (!this.skillSlot.isDisabled) {
				this.skillSlot.cardGlow.active = true
				this.skillSlot.cardDescription.visible = true
				this.skillSlot.cardDescriptionTextBox.visible = true
			}
		})
		this.skillSlot.on("pointerout", () => {
			this.skillSlot.cardGlow.active = false
			this.skillSlot.cardDescription.visible = false
			this.skillSlot.cardDescriptionTextBox.visible = false
		})
	}

	loadButtonHoverEvents(){
		this.confirmButton.glowFx.active = false

		this.confirmButton.on("pointerover", () => {
			this.confirmButton.glowFx.active = true
		})

		this.confirmButton.on("pointerout", () => {
			this.confirmButton.glowFx.active = false
		})

	}

	sortShowdownCards(cardA, cardB) {
		return cardA.slot_id - cardB.slot_id
	}

	loadInfoData(data) {
		//Load Info

		this.info.phaseName.text = "SHOWDOWN"
		this.info.roomOrTurn.text = "Turn " + data.showdown_turn
		this.info.playerName.text = data.player_username
		this.info.playerName.setColor(data.player_color)

		return
	}

	loadOpponentData(data) {
		const opponentColor = data.opponent_color.replace("#", "0x")
		this.opponent.opponentName.text = data.opponent_username
		this.opponent.opponentName.setColor(data.opponent_color)
		this.opponent.characterColor.setTint(opponentColor)
		return
	}


	loadStatsData(data) {
		//Load Stats

		var maxHealth = data.max_health
		var currentHealth = data.current_health
		var energy = data.energy
		var insight = data.insight
		var damage = data.damage

		previousMaxHealth = maxHealth
		previousCurrentHealth = currentHealth
		previousEnergy = energy
		previousInsight = insight
		previousDamage = damage

		this.statsContainer.healthText.text = currentHealth + "/" +  maxHealth
		this.statsContainer.insightText.text = insight + "/10"
		this.statsContainer.energyText.text = energy
		this.statsContainer.mightText.text = damage

		return
	}

	loadCardData(data) {
		console.log(data)

		data.card.sort(this.sortShowdownCards)

		const cardColor = data.player_color.replace("#", "0x")

		//Normal Attack
		normalAttackCard = data.card[0]
		this.normalAttackSlot.cardId = data.card[0].card_id
		this.normalAttackSlot.cardBorder.setTint(cardColor)
		this.normalAttackSlot.cardGlow.active = false

		this.normalAttackSlot.cardName.text = data.card[0].card_name
		this.normalAttackSlot.cardImage.setTexture(data.card[0].card_image_path)
		this.normalAttackSlot.cardDescription.text = data.card[0].card_description

		//Special Attack
		specialAttackCard = data.card[1]
		this.specialAttackSlot.cardId = data.card[1].card_id
		this.specialAttackSlot.isVisible = data.card[1].is_visible
		this.specialAttackSlot.cardBorder.setTint(cardColor)
		this.specialAttackSlot.cardGlow.active = false

		if(this.specialAttackSlot.isVisible) {
			this.specialAttackSlot.cardName.text = data.card[1].card_name
			this.specialAttackSlot.cardImage.setTexture(data.card[1].card_image_path)
			this.specialAttackSlot.cardDescription.text = data.card[1].card_description
		}
		else {
			this.specialAttackSlot.cardName.text = "? ? ?"
			this.specialAttackSlot.cardImage.setTexture("Hidden")
			this.specialAttackSlot.cardDescription.text = "Not enough insight to see the card."

			this.specialAttackSlot.option1RewardIcon1.setTexture("HiddenIconSmall")
			this.specialAttackSlot.option1RewardIcon1.x = 0
			this.specialAttackSlot.option1RewardText1.text = ""
			this.specialAttackSlot.option1Container.visible = true
		}

		//Defense Attack
		defenseCard = data.card[2]
		this.defenseSlot.cardId = data.card[2].card_id
		this.defenseSlot.isVisible = data.card[2].is_visible
		this.defenseSlot.cardBorder.setTint(cardColor)
		this.defenseSlot.cardGlow.active = false

		if(this.defenseSlot.isVisible) {
			this.defenseSlot.cardName.text = data.card[2].card_name
			this.defenseSlot.cardImage.setTexture(data.card[2].card_image_path)
			this.defenseSlot.cardDescription.text = data.card[2].card_description
		}
		else {
			this.defenseSlot.cardName.text = "? ? ?"
			this.defenseSlot.cardImage.setTexture("Hidden")
			this.defenseSlot.cardDescription.text = "Not enough insight to see the card."

			this.defenseSlot.option1RewardIcon1.setTexture("HiddenIconSmall")
			this.defenseSlot.option1RewardIcon1.x = 0
			this.defenseSlot.option1RewardText1.text = ""
			this.defenseSlot.option1Container.visible = true
		}

		//Skill Attack
		skillCard = data.card[3]
		this.skillSlot.cardId = data.card[3].card_id
		this.skillSlot.isVisible = data.card[3].is_visible
		this.skillSlot.cardBorder.setTint(cardColor)
		this.skillSlot.cardGlow.active = false

		if(this.skillSlot.isVisible) {
			this.skillSlot.cardName.text = data.card[3].card_name
			this.skillSlot.cardImage.setTexture(data.card[3].card_image_path)
			this.skillSlot.cardDescription.text = data.card[3].card_description

			if(data.card[3].card_id == playerShowdownAnimations.Anger){

			}
			else if(data.card[3].card_id == playerShowdownAnimations.Rage){

			}
			else if(data.card[3].card_id == playerShowdownAnimations.Focus){

			}
			else if(data.card[3].card_id == playerShowdownAnimations.Adrenaline){

			}
			else if(data.card[3].card_id == playerShowdownAnimations.Healing){

			}

		}
		else {
			this.skillSlot.cardName.text = "? ? ?"
			this.skillSlot.cardImage.setTexture("Hidden")
			this.skillSlot.cardDescription.text = "Not enough insight to see the card."

			this.skillSlot.option1RewardIcon1.setTexture("HiddenIconSmall")
			this.skillSlot.option1RewardIcon1.x = 0
			this.skillSlot.option1RewardText1.text = ""
			this.skillSlot.option1Container.visible = true
		}
	}

	ConfirmShowdownChoice() {

		var cardIterator = 0
		var card = {}
		//determine which card(s) is selected
		if (this.normalAttackSlot.isSelected) {
			card[cardIterator] = this.normalAttackSlot.cardId
			cardIterator++
		}
		if (this.specialAttackSlot.isSelected) {
			card[cardIterator] = this.specialAttackSlot.cardId
			cardIterator++
		}
		if (this.defenseSlot.isSelected){
			card[cardIterator] = this.defenseSlot.cardId
			cardIterator++
		}
		if (this.skillSlot.isSelected){
			card[cardIterator] = this.skillSlot.cardId
			cardIterator++
		}

		var dataToSend = {  
			"card": card
			}

		var xhttp = new XMLHttpRequest()

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {

				var data = JSON.parse(xhttp.responseText)
				console.log(data)

				if (xhttp.status == 200) {
					if (data.state == "WAITING_FOR_OPP") {
						this.scene.start("ShowdownWaitingOnOpponent")
					}
					else if(data.state == "SHOW_RESULT") {
						this.scene.start("ShowdownResult", data)
					}
				}
			}
		}

		xhttp.open("POST", "/resolveShowdownTurn", true)

		xhttp.setRequestHeader("Content-Type", "application/json")

		xhttp.send(JSON.stringify(dataToSend))
	}
	
	loadOpponentDamage(data) {
		console.log(data.opponent_current_health)
		if (data.opponent_current_health > 20) {
			this.opponent.character.visible = true
			this.opponent.characterRipped1.visible = false
			this.opponent.characterRipped2.visible = false
		}
		if ((data.opponent_current_health <= 20) && (data.opponent_current_health > 10)) {
			this.opponent.character.visible = false
			this.opponent.characterRipped1.visible = true
			this.opponent.characterRipped2.visible = false
		}
		if (data.opponent_current_health <= 10 || !data.opponent_current_health) {
			this.opponent.character.visible = false
			this.opponent.characterRipped1.visible = false
			this.opponent.characterRipped2.visible = true
		}
		return
	}

	update() {
		//If any card is selected make the button visible
		if (this.normalAttackSlot.isSelected || this.specialAttackSlot.isSelected || this.defenseSlot.isSelected || this.skillSlot.isSelected) {
			if(this.normalAttackSlot.isSelected || this.specialAttackSlot.isSelected){
				this.confirmButton.confirmButtonText.text = "Rip & Tear!"
			}
			else{
				this.confirmButton.confirmButtonText.text = "Perservere!"
			}
			this.confirmButton.visible = true
		}
		else {
			this.confirmButton.visible = false
		}

		//Normal Attack
		//special attack relationship
		if (this.specialAttackSlot.isSelected) {
			this.normalAttackSlot.isDisabled = true
			if (!this.normalAttackSlot.isTinted) {
				this.normalAttackSlot.empty_Card.setTint("0xaaaaaa")
				this.normalAttackSlot.cardImage.setTint("0xaaaaaa")
				this.normalAttackSlot.isTinted = true
			}
		}
		else {
			this.normalAttackSlot.isDisabled = false
			if (this.normalAttackSlot.isTinted) {
				this.normalAttackSlot.empty_Card.setTint()
				this.normalAttackSlot.cardImage.setTint()
				this.normalAttackSlot.isTinted = false
			}
		}

		//Special Attack
		//not enough stats limitation

		if (this.normalAttackSlot.isSelected) {
			this.specialAttackSlot.isDisabled = true
			if (!this.specialAttackSlot.isTinted) {
				this.specialAttackSlot.empty_Card.setTint("0xaaaaaa")
				this.specialAttackSlot.cardImage.setTint("0xaaaaaa")
				this.specialAttackSlot.isTinted = true
			}
		}
		else {
			if (!this.defenseSlot.isSelected && !this.skillSlot.isSelected) {
				if ((specialAttackCard.energy + specialAttackCard.card_energy) < 0) {
					this.specialAttackSlot.isDisabled = true
					if (!this.specialAttackSlot.isTinted) {
						this.specialAttackSlot.empty_Card.setTint("0xaaaaaa")
						this.specialAttackSlot.cardImage.setTint("0xaaaaaa")
						this.specialAttackSlot.isTinted = true
					}
				}
				else {
					this.specialAttackSlot.isDisabled = false
					if (this.specialAttackSlot.isTinted) {
						this.specialAttackSlot.empty_Card.setTint()
						this.specialAttackSlot.cardImage.setTint()
						this.specialAttackSlot.isTinted = false
					}
				}
			}
			else {
				if (this.defenseSlot.isSelected) {
					if ((specialAttackCard.energy + specialAttackCard.card_energy + defenseCard.card_energy) < 0) {
						this.specialAttackSlot.isDisabled = true
						if (!this.specialAttackSlot.isTinted) {
							this.specialAttackSlot.empty_Card.setTint("0xaaaaaa")
							this.specialAttackSlot.cardImage.setTint("0xaaaaaa")
							this.specialAttackSlot.isTinted = true
						}
					}
					else {
						this.specialAttackSlot.isDisabled = false
						if (this.specialAttackSlot.isTinted) {
							this.specialAttackSlot.empty_Card.setTint()
							this.specialAttackSlot.cardImage.setTint()
							this.specialAttackSlot.isTinted = false
						}
					}
				}
				if (this.skillSlot.isSelected) {
					if ((specialAttackCard.energy + specialAttackCard.card_energy + skillCard.card_energy) < 0) {
						this.specialAttackSlot.isDisabled = true
						if (!this.specialAttackSlot.isTinted) {
							this.specialAttackSlot.empty_Card.setTint("0xaaaaaa")
							this.specialAttackSlot.cardImage.setTint("0xaaaaaa")
							this.specialAttackSlot.isTinted = true
						}
					}
					else {
						this.specialAttackSlot.isDisabled = false
						if (this.specialAttackSlot.isTinted) {
							this.specialAttackSlot.empty_Card.setTint()
							this.specialAttackSlot.cardImage.setTint()
							this.specialAttackSlot.isTinted = false
						}
					}
				}
			}
		}

		//deselecting card if not enough stats
		if (this.specialAttackSlot.isDisabled) {
			this.specialAttackSlot.isSelected = false
			this.specialAttackSlot.setY(800)
		}

		//Defense
		//not enough stats limitation
		if (!this.specialAttackSlot.isSelected && !this.skillSlot.isSelected) {
			if (((defenseCard.energy + defenseCard.card_energy) < 0) || ((defenseCard.insight + defenseCard.card_insight) < 0)) {
				this.defenseSlot.isDisabled = true
				if (!this.defenseSlot.isTinted) {
					this.defenseSlot.empty_Card.setTint("0xaaaaaa")
					this.defenseSlot.cardImage.setTint("0xaaaaaa")
					this.defenseSlot.isTinted = true
				}
			}
			else {
				this.defenseSlot.isDisabled = false
				if (this.defenseSlot.isTinted) {
					this.defenseSlot.empty_Card.setTint()
					this.defenseSlot.cardImage.setTint()
					this.defenseSlot.isTinted = false
				}
			}
		}
		else {
			if (this.specialAttackSlot.isSelected) {
				if (((defenseCard.energy + defenseCard.card_energy + specialAttackCard.card_energy) < 0) || ((defenseCard.insight + defenseCard.card_insight) < 0)) {
					this.defenseSlot.isDisabled = true
					if (!this.defenseSlot.isTinted) {
						this.defenseSlot.empty_Card.setTint("0xaaaaaa")
						this.defenseSlot.cardImage.setTint("0xaaaaaa")
						this.defenseSlot.isTinted = true
					}
				}
				else {
					this.defenseSlot.isDisabled = false
					if (this.defenseSlot.isTinted) {
						this.defenseSlot.empty_Card.setTint()
						this.defenseSlot.cardImage.setTint()
						this.defenseSlot.isTinted = false
					}
				}
			}
			if (this.skillSlot.isSelected) {
				if (((defenseCard.energy + defenseCard.card_energy + skillCard.card_energy) < 0) || ((defenseCard.insight + defenseCard.card_insight + skillCard.card_insight) < 0)) {
					this.defenseSlot.isDisabled = true
					if (!this.defenseSlot.isTinted) {
						this.defenseSlot.empty_Card.setTint("0xaaaaaa")
						this.defenseSlot.cardImage.setTint("0xaaaaaa")
						this.defenseSlot.isTinted = true
					}
				}
				else {
					this.defenseSlot.isDisabled = false
					if (this.defenseSlot.isTinted) {
						this.defenseSlot.empty_Card.setTint()
						this.defenseSlot.cardImage.setTint()
						this.defenseSlot.isTinted = false
					}
				}
			}
		}
		//deselecting card if not enough stats
		if (this.defenseSlot.isDisabled) {
			this.defenseSlot.isSelected = false
			this.defenseSlot.setY(800)
		}

		//Skill
		//not enough stats limitation
		if (!this.specialAttackSlot.isSelected && !this.defenseSlot.isSelected) {
			if ((skillCard.energy + skillCard.card_energy) < 0) {
				this.skillSlot.isDisabled = true
				if (!this.skillSlot.isTinted) {
					this.skillSlot.empty_Card.setTint("0xaaaaaa")
					this.skillSlot.cardImage.setTint("0xaaaaaa")
					this.skillSlot.isTinted = true
				}
			}
			else {
				this.skillSlot.isDisabled = false
				if (this.skillSlot.isTinted) {
					this.skillSlot.empty_Card.setTint()
					this.skillSlot.cardImage.setTint()
					this.skillSlot.isTinted = false
				}
			}
		}
		else {
			if (this.specialAttackSlot.isSelected) {
				if ((skillCard.energy + skillCard.card_energy + specialAttackCard.card_energy) < 0) {
					this.skillSlot.isDisabled = true
					if (!this.skillSlot.isTinted) {
						this.skillSlot.empty_Card.setTint("0xaaaaaa")
						this.skillSlot.cardImage.setTint("0xaaaaaa")
						this.skillSlot.isTinted = true
					}
				}
				else {
					this.skillSlot.isDisabled = false
					if (this.skillSlot.isTinted) {
						this.skillSlot.empty_Card.setTint()
						this.skillSlot.cardImage.setTint()
						this.skillSlot.isTinted = false
					}
				}
			}
			if (this.defenseSlot.isSelected) {
				if ((skillCard.energy + skillCard.card_energy + defenseCard.card_energy) < 0) {
					this.skillSlot.isDisabled = true
					if (!this.skillSlot.isTinted) {
						this.skillSlot.empty_Card.setTint("0xaaaaaa")
						this.skillSlot.cardImage.setTint("0xaaaaaa")
						this.skillSlot.isTinted = true
					}
				}
				else {
					this.skillSlot.isDisabled = false
					if (this.skillSlot.isTinted) {
						this.skillSlot.empty_Card.setTint()
						this.skillSlot.cardImage.setTint()
						this.skillSlot.isTinted = false
					}
				}
			}
		}

		//deselecting card if not enough stats
		if (this.skillSlot.isDisabled) {
			this.skillSlot.isSelected = false
			this.skillSlot.setY(800)
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
