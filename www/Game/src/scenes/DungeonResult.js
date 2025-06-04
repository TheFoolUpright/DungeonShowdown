
// You can write more code here

/* START OF COMPILED CODE */

class DungeonResult extends Phaser.Scene {

	constructor() {
		super("DungeonResult");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dungeonBackground
		const dungeonBackground = this.add.image(960, 540, "DungeonBackground");

		// opponentCard
		const opponentCard = new PrefabCard(this, 960, 600);
		this.add.existing(opponentCard);

		// moveInSceneActionScript
		const moveInSceneActionScript = new MoveInSceneActionScript(opponentCard.onAwakeScript);

		// confirmButton
		const confirmButton = new PrefabNextRoom(this, 1680, 800);
		this.add.existing(confirmButton);

		// info
		const info = new PrefabInfo(this, 1720, 40);
		this.add.existing(info);

		// statsContainer
		const statsContainer = new PrefabStats(this, 120, 50);
		this.add.existing(statsContainer);

		// descriptionText
		const descriptionText = this.add.text(968, 287, "", {});
		descriptionText.setOrigin(0.5, 0.5);
		descriptionText.text = "Thuds, crashes, and shrieks echo from afar... \nYour opponent just made a monstrous new friend!";
		descriptionText.setStyle({ "align": "center", "fontFamily": "Rockey", "fontSize": "40px", "stroke": "#000000ff", "strokeThickness":11});

		// moveInSceneActionScript (prefab fields)
		moveInSceneActionScript.from = "RIGHT";

		this.dungeonBackground = dungeonBackground;
		this.opponentCard = opponentCard;
		this.confirmButton = confirmButton;
		this.info = info;
		this.statsContainer = statsContainer;
		this.descriptionText = descriptionText;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	dungeonBackground;
	/** @type {PrefabCard} */
	opponentCard;
	/** @type {PrefabNextRoom} */
	confirmButton;
	/** @type {PrefabInfo} */
	info;
	/** @type {PrefabStats} */
	statsContainer;
	/** @type {Phaser.GameObjects.Text} */
	descriptionText;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate()

		this.loadAudioForDungeonResult()
		this.loadStatsData(data)
		this.displayCardInformation(data)
		this.confirmButtonGlow()

		this.confirmButton.on("pointerdown", () =>{
			ButtonSFX.play()
			this.setupNextRoom(data.room_id)
		})

		//Load Info
		this.info.phaseName.text = "DUNGEON"
		this.confirmButton.confirmButtonText.text = "Onward!"
		this.info.roomOrTurn.text = "Room " + data.room_id
		this.info.playerName.text = data.player_username
		this.info.playerName.setColor(data.player_color)
	}

	loadAudioForDungeonResult() {
		if (!DungeonBackgroundMusic.isPlaying) {
			DungeonBackgroundMusic.play()
		}
		OpponentCardSFX.play()
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

		if (previousMaxHealth != maxHealth && previousCurrentHealth != currentHealth) {
			var maxHealthDiff = maxHealth - previousMaxHealth
			var currentHealthDiff = currentHealth - previousCurrentHealth

			if (maxHealthDiff > 0 && currentHealthDiff > 0) {
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
			else {
				this.statsContainer.healthDifferenceText.text =  currentHealthDiff + "/" + maxHealthDiff
			}
			this.statsContainer.healthDifferenceText.visible = true
		}
		else if (previousMaxHealth != maxHealth) {
			if (maxHealth - previousMaxHealth > 0) {
				this.statsContainer.healthDifferenceText.text =  "+" + (maxHealth - previousMaxHealth) + "/+" + (maxHealth - previousMaxHealth) 
			}
			else {
				this.statsContainer.healthDifferenceText.text =  (maxHealth - previousMaxHealth) + "/" + (maxHealth - previousMaxHealth)
			}
			this.statsContainer.healthDifferenceText.visible = true
		}
		else if (previousCurrentHealth != currentHealth) {
			if (currentHealth - previousCurrentHealth > 0) {
				this.statsContainer.healthDifferenceText.text =  "+" + (currentHealth - previousCurrentHealth) + "/0"
			}
			else {
				this.statsContainer.healthDifferenceText.text = (currentHealth - previousCurrentHealth) + "/0"
			}
			this.statsContainer.healthDifferenceText.visible = true
		}

		if (previousEnergy != energy) {
			if (energy - previousEnergy > 0) {
				this.statsContainer.energyDifferenceText.text =  "+" + (energy - previousEnergy)
			}
			else {
				this.statsContainer.energyDifferenceText.text = (energy - previousEnergy)
			}
			this.statsContainer.energyDifferenceText.visible = true
		}
		if (previousInsight != insight) {
			if (insight - previousInsight > 0) {
				this.statsContainer.insightDifferenceText.text =  "+" + (insight - previousInsight)
			}
			else {
				this.statsContainer.insightDifferenceText.text =  (insight - previousInsight)
			}
			this.statsContainer.insightDifferenceText.visible = true
		}
		if (previousDamage != damage) {
			if (damage - previousDamage > 0) {
				this.statsContainer.mightDifferenceText.text =  "+" + (damage - previousDamage)
			}
			else {
				this.statsContainer.mightDifferenceText.text = (damage - previousDamage)
			}
			this.statsContainer.mightDifferenceText.visible = true
		}

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

	displayCardInformation(data) {
		const cardColor = data.opponent_color.replace("#", "0x")

		this.opponentCard.cardGlow.active = false
		this.opponentCard.cardDescription.visible = false
		if (data.card_type_id == 5) {
			this.opponentCard.cardName.text = data.card_name
		}
		else {
			this.opponentCard.cardName.text = data.card_type_name
		}
		if (data.card_type_id == 1) {
			this.descriptionText.text = "A bottle clinks, a cap pops, and someone says, “That hit the spot.” \nYour rival leveled up their life force!"
		}
		else if (data.card_type_id == 2) {
			this.descriptionText.text = "You hear ripping cloth and a relieved sigh. \nSomeone has patched themselves up!"
		}
		else if (data.card_type_id == 3) {
			this.descriptionText.text = "You hear the sound of metal scraping on stone... \nyour opponent is becoming mighty!"
		}
		else if (data.card_type_id == 4) {
			this.descriptionText.text = "A gentle snore echoes throughout the room. \nYour opponent is napping!"
		}
		else if (data.card_type_id == 5) {
			if (data.card_name == "Slime") {
				this.descriptionText.text = "Squish. Squish. SPLAT. \nYour rival has found a blob with a bad attitude."
			}
			else if (data.card_name == "Bat") {
				this.descriptionText.text = "You hear frantic swatting and tiny screeches... \nSomeone woke up the dungeon bats."
			}
			else if (data.card_name == "Ghost") {
				this.descriptionText.text = "The temperature drops and a chill creeps over you. \nSomeone’s dealing with a very floaty problem."
			}
			else {
				this.descriptionText.text = "Thuds, crashes, and shrieks echo from afar... \nYour opponent just made a monstrous new friend!"
			}
		}
		this.opponentCard.cardImage.setTexture(data.card_image_path)
		this.opponentCard.cardBorder.setTint(cardColor)

		this.opponentCard.option1RewardIcon1.setTexture("HiddenIconSmall")
		this.opponentCard.option1RewardIcon1.x = 0
		this.opponentCard.option1RewardText1.text = ""
		this.opponentCard.option1Container.visible = true
	}

	setupNextRoom(roomId) {

		if (roomId <= 4) {

			var xhttp = new XMLHttpRequest()

			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4) {

					var data = JSON.parse(xhttp.responseText)
					console.log(data)

					if (xhttp.status == 200) {
						this.scene.start("Dungeon", data);
					}
				}
			}

			xhttp.open("POST", "/setupNextDungeonRoom", true)

			xhttp.setRequestHeader("Content-Type", "application/json")

			xhttp.send();
		}
		else {
			var xhttp = new XMLHttpRequest()

			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4) {

					var data = JSON.parse(xhttp.responseText)
					console.log(data)

					if (xhttp.status == 200) {
						if (DungeonBackgroundMusic.isPlaying) {
							DungeonBackgroundMusic.stop()
						}
						this.scene.start("Showdown", data);
					}
				}
			}

			xhttp.open("POST", "/setupShowdown", true);

			xhttp.setRequestHeader("Content-Type", "application/json");

			xhttp.send();
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
