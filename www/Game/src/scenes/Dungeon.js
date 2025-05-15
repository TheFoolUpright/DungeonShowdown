
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
		const statsContainer = this.add.container(50, 20);

		// healthBar
		const healthBar = this.add.image(0, 10, "MaxHealthBar");
		statsContainer.add(healthBar);

		// healthText
		const healthText = this.add.text(-3, 0, "", {});
		healthText.text = "20/20";
		healthText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(healthText);

		// energyBar
		const energyBar = this.add.image(0, 90, "EnergyBar");
		statsContainer.add(energyBar);

		// energyText
		const energyText = this.add.text(0, 80, "", {});
		energyText.text = "30";
		energyText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(energyText);

		// insightBar
		const insightBar = this.add.image(0, 50, "InsightBar");
		statsContainer.add(insightBar);

		// insightText
		const insightText = this.add.text(0, 40, "", {});
		insightText.text = "10/10";
		insightText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(insightText);

		// mightBar
		const mightBar = this.add.image(0, 130, "MightBar");
		statsContainer.add(mightBar);

		// mightText
		const mightText = this.add.text(0, 120, "", {});
		mightText.text = "30";
		mightText.setStyle({ "color": "#000000ff", "fontFamily": "ROCKEY", "fontSize": "13px" });
		statsContainer.add(mightText);

		this.healthText = healthText;
		this.energyText = energyText;
		this.insightText = insightText;
		this.mightText = mightText;
		this.statsContainer = statsContainer;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	healthText;
	/** @type {Phaser.GameObjects.Text} */
	energyText;
	/** @type {Phaser.GameObjects.Text} */
	insightText;
	/** @type {Phaser.GameObjects.Text} */
	mightText;
	/** @type {Phaser.GameObjects.Container} */
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
