
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

		// StatsContainer
		const statsContainer = new PrefabStats(this, 50, 30);
		this.add.existing(statsContainer);

		// empty_Card
		const empty_Card = new PrefabCard(this, 640, 550);
		this.add.existing(empty_Card);

		// empty_Card_1
		const empty_Card_1 = new PrefabCard(this, 840, 550);
		this.add.existing(empty_Card_1);
		// healthText
		const healthText = this.add.text(13, 0, "", {});
		healthText.setOrigin(0.5, 0);
		healthText.text = "20/20";
		healthText.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(healthText);

		// empty_Card_2
		const empty_Card_2 = new PrefabCard(this, 440, 550);
		this.add.existing(empty_Card_2);

		// prefabNextRoom
		const prefabNextRoom = new PrefabNextRoom(this, 1140, 550);
		this.add.existing(prefabNextRoom);
		// energyText
		const energyText = this.add.text(10, 80, "", {});
		energyText.setOrigin(0.5, 0);
		energyText.text = "30";
		energyText.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(energyText);

		// info
		const info = new PrefabInfo(this, 1140, 20);
		this.add.existing(info);

		// empty_Card (prefab fields)
		empty_Card.cardId = 0;
		empty_Card.isVisible = true;
		// insightText
		const insightText = this.add.text(16, 39, "", {});
		insightText.setOrigin(0.6, 0);
		insightText.text = "10/10";
		insightText.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(insightText);

		// empty_Card_1 (prefab fields)
		empty_Card_1.cardId = 0;
		empty_Card_1.isVisible = true;

		// empty_Card_2 (prefab fields)
		empty_Card_2.cardId = 0;
		empty_Card_2.isVisible = true;
		// mightText
		const mightText = this.add.text(10, 120, "", {});
		mightText.setOrigin(0.5, 0);
		mightText.text = "15";
		mightText.setStyle({ "align": "center", "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(mightText);

		this.statsContainer = statsContainer;

		this.events.emit("scene-awake");
	}

	/** @type {PrefabStats} */
	statsContainer;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
